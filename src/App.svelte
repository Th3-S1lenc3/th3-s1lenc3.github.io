<script>
  import { EasyrouteProvider, RouterOutlet } from "@easyroute/svelte";
  import { router } from "@/router.js";

  import Navbar from "@components/Navbar.svelte";

  import { onDestroy, onMount } from "svelte";

  const clearLocalStorage = () => {
    console.info("[App] Clearing Local Storage...");

    window.localStorage.clear();
  }

  onMount(clearLocalStorage)
  onDestroy(clearLocalStorage);

</script>

<style lang="scss" global>
  @import "./assets/bi-fonts";
  @import "../node_modules/bootswatch/dist/darkly/variables";
  @import "../node_modules/bootstrap/scss/bootstrap";
  @import "../node_modules/bootswatch/dist/darkly/bootswatch";
  @import "../node_modules/bootstrap-icons/font/bootstrap-icons";
  @import "../node_modules/@th3-s1lenc3/gh-colors/dist/scss/gh-colors";
  @import "../node_modules/highlight.js/scss/a11y-dark";

  $navbar-height: 4rem;
  $project-header-margin-top: 0.5rem;
  $logo-height: calc($navbar-height - 1rem);
  $links-logo-height: calc($logo-height - 1rem);

  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    --project-header-margin-top: #{$project-header-margin-top};
  }

  .navbar {
    height: $navbar-height;
  }

  .logo {
    width: $logo-height;
    height: $logo-height;
  }

  .link-logo {
    font-size: $links-logo-height;
  }

  main {
    text-align: center;
    margin: 0;
  }

  .page {
    height: calc(100vh - $navbar-height - $project-header-margin-top);
  }

  .centre {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  a {
    text-decoration: none !important;
    color: var(--bs-white);
    &:hover {
      color: var(--bs-white);
    }
  }

  .page-item {
    &.disabled {
      > .page-link {
        background-color: var(--bs-dark) !important;
      }
    }
    > .page-link {
      background-color: var(--bs-secondary) !important;
      &:focus {
        background-color: #666 !important;
      }
      &:hover {
        background-color: #666 !important;
      }
    }
  }
</style>

<EasyrouteProvider {router}>
  <main>
    <RouterOutlet />
  </main>
</EasyrouteProvider>
