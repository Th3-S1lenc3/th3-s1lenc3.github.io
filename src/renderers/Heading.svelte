<script>
  export let depth;
  export let raw;
</script>

{#if depth === 1}
  <h3><slot></slot></h3>
{:else if depth === 2}
  <h4><slot></slot></h4>
{:else if depth === 3}
  <h5><slot></slot></h5>
{:else if depth === 4}
  <h6><slot></slot></h6>
{:else if depth === 5}
  <h6><slot></slot></h6>
{:else if depth === 6}
  <h6><slot></slot></h6>
{:else}
  {raw}
{/if}
