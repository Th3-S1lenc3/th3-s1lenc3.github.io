<script>
  export let data;
  export let active;

  import { RouterLink } from "@easyroute/svelte";
  import classNames from "classnames";
</script>

<style lang="scss">
</style>

{#if typeof data != "undefined"}
  <li class="nav-item">
    <RouterLink to={data.path} class={classNames(
      "nav-link",
      {
        "active": active,
      },
    )}>
      {data.name}
    </RouterLink>
  </li>
{/if}
