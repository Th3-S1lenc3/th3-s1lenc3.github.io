<script>
  export let currentRoute;

  import Link from '@components/Link.svelte';
  import ThemeButton from '@components/ThemeButton.svelte';

  import { beforeNavigate } from '$app/navigation';
  import { onMount } from "svelte";

  let links = [
    {
      path: '/',
      name: 'Home',
      active: false,
    },
    {
      path: '/projects',
      name: 'Project',
      active: false,
    }
  ];

  onMount(() => {
    links = links.map(el => {
      if (el.path === currentRoute) {
        el.active = true;
      } else {
        el.active = false;
      }

      return el;
    });
  });

  beforeNavigate(({ to }) => {
    if (to != null) {
      const path = to.pathname;

      links = links.map(el => {
        if (el.path === path) {
          el.active = true;
        } else {
          el.active = false;
        }

        return el;
      });
    }
  });
</script>

<style lang="scss">
</style>

<nav class="bg-dark px-2 sm:px-4 py-2.5 w-screen h-20">
  <div class="container-fluid flex flex-row justify-start items-center">
    <Link to='/' class="flex items-centre">
      <img src="/logo.svg" class="mr-3 h-6 sm:h-16" alt="Th3-S1lenc3 Logo" />
    </Link>
    <button data-collapse-toggle="mobile-menu" type="button" class="ml-auto inline-flex items-center p-2 text-xl text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
      <span class="sr-only">Open main menu</span>
      <i class="bi bi-list">
    </button>
    <div class="hidden w-full md:block" id="mobile-menu">
      <div class="flex flex-col md:flex-row mt-4 md:space-x-8 md:mt-0 md:text-sm md:font-medium justify-between">
        <ul class="flex flex-col md:flex-row">
          {#each links as link, i}
            <li class="mr-2">
              <Link to={link.path} active={link.active}>
                {link.name}
              </Link>
            </li>
          {/each}
        </ul>
        <ul class="flex flex-col md:flex-row">
          <ThemeButton />
        </ul>
      </div>
    </div>
  </div>
</nav>
