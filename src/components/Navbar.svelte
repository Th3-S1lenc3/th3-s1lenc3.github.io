<script>
  export let router;

  import { RouterLink } from "@easyroute/svelte";
  import { get } from "svelte/store";

  import Logo from "@assets/logo.svelte";
  import NavItem from "@components/NavItem.svelte";

</script>

<style lang="scss">
</style>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <RouterLink to="/" class="navbar-brand">
      <Logo />
    </RouterLink>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarContent">
      <ul class="navbar-nav me-auto">
        <NavItem
          data={{path: "/", name: "Home"}}
          active={get(router.currentRouteData).name === "Home"}
        />
        <NavItem
          data={{path: "/projects", name: "Projects"}}
          active={get(router.currentRouteData).name.includes("Project")}
        />
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item">
          <RouterLink to="https://github.com/Th3-S1lenc3" class="nav-link">
            <i class="bi bi-github link-logo" />
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
