<script context="module">
  export async function load({ url }) {
    return {
      props: {
        currentRoute: url.pathname,
      },
    }
  }
</script>

<script>
  export let currentRoute;

  import Navbar from "@components/Navbar.svelte";
</script>

<style lang="scss" global>
  @import-normalize;
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>

<svelte:head>
  <link rel="stylesheet" href="../node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css">
  <link rel="stylesheet" href="../node_modules/@fortawesome/fontawesome-free/css/brands.min.css">
  <link rel="stylesheet" href="../node_modules/@fortawesome/fontawesome-free/css/solid.min.css">
  <link rel="stylesheet" href="../node_modules/@fortawesome/fontawesome-free/css/regular.min.css">
</svelte:head>

<header>
  <Navbar {currentRoute} />
</header>

<main class="flex-1">
  <slot />
</main>

<footer>

</footer>
