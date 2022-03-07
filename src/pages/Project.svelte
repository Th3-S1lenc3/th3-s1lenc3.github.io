<script>
  export let router;

  import Navbar from "@components/Navbar.svelte";
  import RenderLanguages from "@components/RenderLanguages.svelte";
  import Error from "@components/Error.svelte";
  import Loading from "@components/Loading.svelte";

  import { get } from "svelte/store";
  import axios from "axios";
  import SvelteMarkdown from "svelte-markdown";

  import Code from "@renderers/Code.svelte";
  import Link from "@renderers/Link.svelte";
  import Codespan from "@renderers/Codespan.svelte";
  import Heading from "@renderers/Heading.svelte";
  import Paragraph from "@renderers/Paragraph.svelte";

  const localStorage = window.localStorage;

  const renderers = {
    code: Code,
    link: Link,
    codespan: Codespan,
  }

  const releaseRenderers = {
    ...renderers,
    heading: Heading,
    paragraph: Paragraph,
  };

  import dayjs from "dayjs";
  import advancedFormat from "dayjs/plugin/advancedFormat";

  dayjs.extend(advancedFormat);

  const formatDefault = "MMMM Do YYYY"
  const formatUpdated = `${formatDefault} [at] HH:mm`

  const getNumPages = link => {
    let fragment = link
      .replaceAll(/[<>;]+/g, "")
      .split(" ");

    fragment = fragment[fragment.length - 2];
    fragment = new URLSearchParams(fragment).get("page")

    return Number(fragment);
  }

  const loadProject = async () => {
    const project = get(router.currentRouteData).params.id;

    if (localStorage.getItem("project") != null) {
      let oldData = JSON.parse(localStorage.getItem("project"));

      if (oldData.name === project) {
        return oldData;
      }
    }

    let data = {};


    const response = await axios.get(
      `https://api.github.com/repos/Th3-S1lenc3/${project}`
    );
    data = response.data;

    const readMeContents = await axios.get(
      `${data.url}/readme`
    );

    data.read_me = atob(readMeContents.data.content);

    const languagesBreakdown = await axios.get(
      data.languages_url
    );

    data.languages = languagesBreakdown.data;

    const branchData = await axios.get(
      data.branches_url.split("{")[0],
      {
        params: {
          "per_page": 1,
        }
      }
    );

    if (typeof branchData.headers.link === "undefined") {
      data.branches = 1;
    }
    else {
      data.branches = getNumPages(branchData.headers.link);
    }

    const tagData = await axios.get(
      data.tags_url,
      {
        params: {
          "per_page": 1,
        }
      }
    )

    if (typeof tagData.headers.link === "undefined") {
      data.tags = 1;
    }
    else {
      data.tags = getNumPages(tagData.headers.link);
    }

    const releasesData = await axios.get(
      data.releases_url.split("{")[0]
    )

    data.releases = releasesData.data;

    localStorage.setItem("project", JSON.stringify(data));

    return data;
  }
</script>

<style lang="scss">
  :global(.md-link) {
    color: var(--bs-red) !important;
    &:hover {
      text-decoration: underline !important;
    }
  }

  .accordion-button {
    color: var(--bs-white);
    background-color: var(--bs-gray-dark);
    &:not(.collapsed) {
      color: var(--bs-white);
      background-color: var(--bs-gray-dark);
      &::after {
	       background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
      }
    }
  }
</style>

<div>
  <Navbar {router} />
  <div class="page">
    {#await loadProject()}
      <Loading msg={"Loading Project..."}/>
    {:then data}
      <div class="container-fluid justify-content-center row pt-2">
        <div class="col-7 text-start border border-secondary rounded p-1 me-2">
          <div class="container-fluid">
            <SvelteMarkdown source={data.read_me} {renderers} />
          </div>
        </div>
        <div class="col-4 border border-secondary rounded p-1">
          <div class="container-fluid text-start">
            <section class="project-name">
              <h3>Project:</h3>
              <h3>
                <a
                  href={data.html_url}
                  class="md-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {data.name}
                </a>
              </h3>
            </section>
            <section class="project-description">
              <h4 class="pt-2"><strong>Description</strong></h4>
              {data.description ?? "No Description"}
            </section>
            <section class="project-created">
              <h4 class="pt-2"><strong>Created</strong></h4>
              {dayjs(data.created_at).format(formatDefault)}
            </section>
            <section class="project-last-commit">
              <h4 class="pt-2"><strong>Last-Commit</strong></h4>
              {dayjs(data.pushed_at).format(formatUpdated)}
            </section>
            <section class="project-languages">
              <h4 class="pt-2"><strong>Languages</strong></h4>
              <RenderLanguages languages={data.languages} />
            </section>
            <section class="project-license">
              <h4 class="pt-2"><strong>License</strong></h4>
              {data.license?.name ?? "No License"}
            </section>
            <section class="project-other">
              <h4 class="pt-2"><strong>Other</strong></h4>
              <ul class="list-unstyled">
                <li class="fs-5">
                  <i class="bi bi-diagram-2 me-1" />
                  <span class="fw-bold">{data.branches}</span>
                  {#if data.branches === 1}
                    <span>branch</span>
                  {:else}
                    <span>branches</span>
                  {/if}
                </li>
                <li class="fs-5">
                  <i class="bi bi-tag me-1 fw-bold" />
                  <span class="fw-bold">{data.tags}</span>
                  <span>tags</span>
                </li>
                <li class="fs-5">
                  <i class="bi bi-diagram-3 me-1 fw-bold" />
                  <span class="fw-bold">{data.forks}</span>
                  <span>forks</span>
                </li>
                <li class="fs-5">
                  <i class="bi bi-exclamation-circle me-1 fw-bold" />
                  <span class="fw-bold">{data.open_issues}</span>
                  <span>open issues</span>
                </li>
                <li class="fs-5">
                  <i class="bi bi-star-fill me-1 fw-bold" />
                  <span class="fw-bold">{data.watchers}</span>
                  <span>stars</span>
                </li>
                <li class="fs-5">
                  <i class="bi bi-eye me-1 fw-bold" />
                  <span class="fw-bold">{data.subscribers_count}</span>
                  <span>watching</span>
                </li>
              </ul>
            </section>
            <section class="project-releases">
              <h4 class="pt-2"><strong>Releases</strong></h4>
              {#if data.releases.length === 0}
                <span>No Releases</span>
              {:else}
                <div class="accordion" id="releases">
                  {#each data.releases as release}
                    <div class="accordion-item">
                      <h2
                        class="accordion-header"
                        id={`release-header-${release.id}`}
                      >
                        <button
                          class="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#release-body-${release.id}`}
                          aria-expanded="true"
                          aria-controls={`release-body-${release.id}`}
                        >
                          {release.tag_name}
                        </button>
                      </h2>
                      <div
                        id={`release-body-${release.id}`}
                        class="accordion-collapse collapse"
                        aria-labelledby={`release-header-${release.id}`}
                        data-bs-parent="#releases"
                      >
                        <SvelteMarkdown source={release.body} renderers={releaseRenderers} />
                        <span>
                          See
                          <a
                            href={release.html_url}
                            class="md-link"
                          >
                            Assets
                          </a>
                        </span>
                      </div>
                    </div>
                  {/each}
                </div>
              {/if}
            </section>
          </div>
        </div>
      </div>
    {:catch errorMsg}
      <Error {errorMsg} />
    {/await}
  </div>
</div>
