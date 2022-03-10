<script>
</script>

<style lang="scss" global>
  @import-normalize;
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  $fa-font-path: "/fonts"

  @import "~@fortawesome/fontawesome-free/scss/fontawesome.scss";
  @import "~@fortawesome/fontawesome-free/scss/brands.scss";
  @import "~@fortawesome/fontawesome-free/scss/regular.scss";
  @import "~@fortawesome/fontawesome-free/scss/solid.scss";
</style>

<header>

</header>

<main class="flex-1">
  <slot />
</main>

<footer>

</footer>
