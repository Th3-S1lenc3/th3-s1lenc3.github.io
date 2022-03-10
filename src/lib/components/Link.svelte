<script>
  export let to;
  export let active;

  const activeClasses = "text-dark dark:text-white"
</script>

<style lang="scss">
  .link {
    @apply block py-2 pr-4 pl-3 bg-blue-700 rounded md:bg-transparent md:p-0 no-underline
  }
</style>

<a href={to} class={`link ${$$props.class || ''} ${active === true ? activeClasses : 'text-gray-600 dark:text-navlink'}`}>
  <slot />
</a>
