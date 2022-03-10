<script>
  let theme = "light";

  import { browser } from "$app/env";

  const toggleTheme = e => {
    if (browser) {
      document.documentElement.classList.toggle('dark');

      if (document.documentElement.classList.contains("dark") === true) {
        theme = "dark";
      } else {
        theme = "light";
      }

      localStorage.setItem("theme", theme)
    }
  }

  if (browser) {
    const localStorage = window.localStorage;

    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      theme = "dark";
    } else {
      theme = "light";
    }
  }
</script>

<style lang="scss">
</style>

<button on:click={toggleTheme}>
  {#if theme === "dark"}
    <i class="bi bi-sun" />
  {:else}
    <i class="bi bi-moon" />
  {/if}
</button>
