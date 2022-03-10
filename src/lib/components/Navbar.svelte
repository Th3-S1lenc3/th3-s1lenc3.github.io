<script>
  export let pages;

  console.log(pages);

  import Link from '@components/Link.svelte';
  import ThemeButton from '@components/ThemeButton.svelte';
</script>

<style lang="scss">
</style>

<nav class="border-b border-gray-500/50 dark:border-gray-600/50 px-2 sm:px-4 py-2.5 w-screen h-20">
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
          <li class="mr-2">
            <Link to='/'>
              Home
            </Link>
          </li>
          <li>
            <Link to='/projects'>
              Projects
            </Link>
          </li>
        </ul>
        <ul class="flex flex-col md:flex-row">
          <ThemeButton />
        </ul>
      </div>
    </div>
  </div>
</nav>
