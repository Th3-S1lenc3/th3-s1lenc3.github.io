<script>
  export let router;

  import Navbar from "@components/Navbar.svelte";
  import ProjectCard from "@components/ProjectCard.svelte";
  import Error from "@components/Error.svelte";
  import Loading from "@components/Loading.svelte";

  import axios from "axios";

  const localStorage = window.localStorage;

  const loadRecentProjects = async () => {
    if (localStorage.getItem("recentProjects") != null) {
      return JSON.parse(localStorage.getItem("recentProjects"));
    }

    const response = await axios.get(
      "https://api.github.com/users/Th3-S1lenc3/repos",
      {
        params: {
          "sort": "pushed",
          "per_page": 5,
          "type": "owner"
        }
      }
    );

    localStorage.setItem("recentProjects", JSON.stringify(response.data));

    return response.data;
  }
</script>

<style lang="scss">
</style>

<div>
  <Navbar {router} />
  <div class="page">
    {#await loadRecentProjects()}
      <Loading msg={"Loading Recent Projects..."} />
    {:then data}
      {#each data as item}
        <ProjectCard data={item} />
      {/each}
    {:catch errorMsg}
      <Error {errorMsg} />
    {/await}
  </div>
</div>
