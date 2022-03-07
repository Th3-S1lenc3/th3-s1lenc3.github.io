<script>
  export let router;

  import Navbar from "@components/Navbar.svelte";
  import ProjectCard from "@components/ProjectCard.svelte";
  import { parseURL } from "@/utilities.js";
  import Error from "@components/Error.svelte";
  import Loading from "@components/Loading.svelte";

  import { onDestroy, onMount } from "svelte";
  import axios from "axios";
  import { RouterLink } from "@easyroute/svelte";
  import { get } from "svelte/store";
  import useCurrentRoute from "@easyroute/svelte/useCurrentRoute";
  import classNames from "classnames";

  const currentRoute = useCurrentRoute()

  const urlRegex = /[<>;]+/g;

  let sortByOptions = [
   {
     name: "Created",
     value: "created_at",
     default: true,
   },
   {
     name: "Last Commit",
     value: "pushed_at",
     default: false,
   },
   {
     name: "Name",
     value: "name",
     default: false,
   }
  ];

  let sortDirectionOptions = [
   {
     name: "Ascending",
     value: "asc",
     default: false,
   },
   {
     name: "Descending",
     value: "desc",
     default: true,
   },
  ];

  let perPageOptions = [
   {
     name: "All",
     value: "all",
     default: false,
   },
  ];

  const perPageDefault = 5;

  const loadProjects = async (pageNum) => {
    let data = {};
    pageNum = Number(pageNum);
    let sortBy = sortByOptions.filter(el => el.default)[0].value;
    let sortDirection = sortDirectionOptions.filter(el => el.default)[0].value;

    if (localStorage.getItem("projects") != null) {
      let oldData = JSON.parse(localStorage.getItem("projects"));

      data = oldData;
    }

    if (typeof data.allProjects === "undefined" || data.sort_by != sortBy || data.sort_direction != sortDirection) {
      data["allProjects"] = await getProjects();
    }

    data.sort_by = sortBy;
    data.sort_direction = sortDirection;

    if (perPageOptions.filter(el => el.default === true).length === 0) {
      data.allProjects.forEach((el, i) => {
        let index = i + 1;
        perPageOptions.push({
          name: index,
          value: index,
          default: index === perPageDefault,
        });
      });
    }

    let currentPerPage = perPageOptions.filter(el => el.default === true)[0].value;

    if (typeof data.per_page === "undefined" || data.per_page != currentPerPage) {
      data.per_page = currentPerPage;
    }

    let defaultPerPage = data.per_page;

    let endIndex = pageNum * defaultPerPage;
    let startIndex = (endIndex - (defaultPerPage - 1)) - 1;

    data.page = pageNum;
    data.pages = Number(Math.ceil(data.allProjects.length / defaultPerPage));

    if (pageNum > 1) {
      data.first = 1;
      data.prev = pageNum - 1;
    }

    if (pageNum < data.pages) {
      data.next = pageNum + 1;
      data.last = data.pages;
    }

    data.projects = data.allProjects.slice(startIndex, endIndex);

    localStorage.setItem("projects", JSON.stringify(data));

    return data;
  }

  const getProjects = async () => {
    let sortBy = sortByOptions.filter(el => el.default)[0].value;
    let sortDirection = sortDirectionOptions.filter(el => el.default)[0].value;
    sortBy = sortBy.split("_")[0];
    sortDirection = sortDirection.split("_")[0];

    const response = await axios.get(
      "https://api.github.com/users/Th3-S1lenc3/repos",
      {
        params: {
          "sort": sortBy,
          "direction": sortDirection,
          "type": "owner",
        }
      }
    );
    return response.data;
  }

  let promise = loadProjects(1);

  let currentPage;

  const unsubscribe = currentRoute.subscribe(route => {
    currentPage = route.query.page;
    if (typeof currentPage === "undefined") {
      currentPage = "1";
    }
    promise = loadProjects(currentPage)
  })
  onDestroy(() => {
    unsubscribe();
  });

  const computeSpacer = () => {
    const spacer = document.querySelector(".projects-header-spacer");
    const filter = document.querySelector("#filter");
    let filterWidth = window.getComputedStyle(filter).width;
    filterWidth = filterWidth.replace("px", "");
    filterWidth = Number(filterWidth);

    const spacerWidth = filterWidth / 16;

    spacer.style.minWidth = `${spacerWidth}rem`;
  };

  const isActive = (page, pageNum) => Number(page) === pageNum + 1;

  const handleChange = (e, what) => {
    if (what === "sortBy") {
      sortByOptions = sortByOptions.map(el => {
        if (el.value === e.target.value) {
          el.default = true;
        } else {
          el.default = false;
        }

        return el;
      });
    }

    if (what === "sortDirection") {
      sortDirectionOptions = sortDirectionOptions.map(el => {
        if (el.value === e.target.value) {
          el.default = true;
        } else {
          el.default = false;
        }

        return el;
      });
    }

    if (what === "perPage") {
      if (e.target.value === "all") {
        perPageOptions = perPageOptions.map(el => {
          if (el.default === true) {
            el.default = false;
          }

          return el;
        });
        perPageOptions[perPageOptions.length - 1].default = true;
      } else {
        perPageOptions = perPageOptions.map(el => {
          if (el.value === Number(e.target.value)) {
            el.default = true;
          } else {
            el.default = false;
          }

          return el;
        });
      }
    }

    promise = loadProjects(currentPage);
  }
</script>

<style lang="scss">
  .projects-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: var(--project-header-margin-top) !important;
  }

  .dropdown-item {
    &:hover {
      background-color: transparent !important;
      color: #fff !important;
    }
    &:focus {
      background-color: transparent !important;
      color: #fff !important;
    }
  }

  .form-select-dark {
  	background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
  }

  .form-select {
    width: auto;
  }
</style>

<div>
  <Navbar {router} />
  <div class="page">
    {#await promise}
      <Loading msg={"Getting Projects..."}/>
    {:then data}
      <div class="projects-header mx-2">
        <span class="projects-header-spacer" on:load={computeSpacer()}/>
        <h2>Projects</h2>
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="filter"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
            aria-expanded="false"
          >
            <i class="bi bi-filter" />
            <span class="visually-hidden">Filter Projects</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="filter">
            <li class="dropdown-item">
              <div class="mb-2">
                <label for="filter-sortBy" class="form-label me-auto">Sort By</label>
                <select
                  class="form-select form-select-dark bg-dark text-white ms-auto"
                  id="filter-sortBy"
                  on:change="{e => handleChange(e, "sortBy")}"
                >
                  {#each sortByOptions as item}
                    <option
                      value={item.value}
                      selected={item.default}
                    >
                      {item.name}
                    </option>
                  {/each}
                </select>
              </div>
            </li>
            <li class="dropdown-item">
              <div class="mb-2">
                <label for="filter-sortDirection" class="form-label me-auto">Sort Direction</label>
                <select
                  class="form-select form-select-dark bg-dark text-white ms-auto me-auto"
                  id="filter-sortDirection"
                  on:change="{e => handleChange(e, "sortDirection")}"
                >
                  {#each sortDirectionOptions as item}
                    <option
                      value={item.value}
                      selected={item.default}
                    >
                      {item.name}
                    </option>
                  {/each}
                </select>
              </div>
            </li>
            <li class="dropdown-item">
              <div class="mb-2">
                <label for="filter-perPage" class="form-label me-auto">Per Page</label>
                <select
                  class="form-select form-select-dark bg-dark text-white ms-auto me-auto"
                  id="filter-perPage"
                  on:change="{e => handleChange(e, "perPage")}"
                >
                  {#each perPageOptions as item}
                    <option
                      value={item.value}
                      selected={item.default}
                    >
                      {item.name}
                    </option>
                  {/each}
                </select>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="projects-content">
        {#each data.projects as item}
          <ProjectCard data={item} />
        {/each}
      </div>
      <nav>
        <ul class="pagination justify-content-center">
          <li
            class={classNames({
              "page-item": true,
              "disabled": typeof data.prev === "undefined",
            })}
          >
            <RouterLink
              to={"/projects?page=1"}
              class="page-link"
              aria-label="First"
            >
              <span aria-hidden="true">First</span>
            </RouterLink>
          </li>
          <li
            class={classNames({
              "page-item": true,
              "disabled": typeof data.prev === "undefined",
            })}
          >
            <RouterLink
              to={`/projects?page=${Number(data.page) - 1}`}
              class="page-link"
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </RouterLink>
          </li>
          {#if data.pages > 0}
            {#each Array(data.pages) as _, page}
              <li class="page-item">
                <RouterLink
                  to={`/projects?page=${page + 1}`}
                  class="page-link"
                >
                  {page + 1}
                </RouterLink>
              </li>
            {/each}
          {:else}
            <li
              class="page-item"
            >
              <RouterLink
                to={`/projects?page=${0 + 1}`}
                class="page-link"
              >
                {0 + 1}
              </RouterLink>
            </li>
          {/if}
          <li
            class={classNames({
              "page-item": true,
              "disabled": typeof data.next === "undefined",
            })}
          >
            <RouterLink
              to={`/projects?page=${Number(data.page) + 1}`}
              class="page-link"
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </RouterLink>
          </li>
          <li
            class={classNames({
              "page-item": true,
              "disabled": typeof data.last === "undefined",
            })}
          >
            <RouterLink
              to={`/projects?page=${data.pages}`}
              class="page-link"
              aria-label="First"
            >
              <span aria-hidden="true">Last</span>
            </RouterLink>
          </li>
        </ul>
      </nav>
    {:catch errorMsg}
      <Error {errorMsg} />
    {/await}
  </div>
</div>
