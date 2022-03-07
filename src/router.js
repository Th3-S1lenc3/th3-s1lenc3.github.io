import Router from "@easyroute/core";
import hashMode from "@easyroute/core/hash-mode";

import Index from "@pages/Index.svelte";
import Projects from "@pages/Projects.svelte";
import Project from "@pages/Project.svelte";

export const router = new Router({
  mode: hashMode,
  omitTrailingSlash: true,
  routes: [
    {
      path: '/',
      component: Index,
      name: 'Home',
    },
    {
      path: '/projects',
      component: Projects,
      name: 'Projects',
    },
    {
      path: '/project/:id',
      component: Project,
      name: 'Project',
    },
  ],
});
