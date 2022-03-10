<script>
  export let to;
  export let active;
</script>

<style lang="scss">
  .link {
    @apply block py-2 pr-4 pl-3 text-gray-600 bg-blue-700 rounded md:bg-transparent md:p-0 dark:text-gray-300 no-underline
  }

  .active {
    @apply text-dark dark:text-white #{!important}
  }
</style>

<a href={to} class={`link ${$$props.class || ''} ${active === true ? 'active': ''}`}>
  <slot />
</a>
