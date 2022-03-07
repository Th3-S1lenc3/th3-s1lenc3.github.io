<script>
  export let data;

  import { RouterLink } from "@easyroute/svelte";
  import dayjs from "dayjs";
  import advancedFormat from "dayjs/plugin/advancedFormat";

  dayjs.extend(advancedFormat);

  const formatDefault = "MMMM Do YYYY";
  const formatUpdated = `${formatDefault} [at] HH:mm`;
</script>

<style lang="scss">
  .card {
    text-align: left;
  }
</style>

<RouterLink to={`/project/${data.name}`} class="project-card-link">
  <div class="card mx-2 my-3">
    <div class="card-body">
      <h5 class="card-title">{data.name}</h5>
      <p class="card-text">{data.description ?? "No Description"}</p>
    </div>
    <div class="card-footer">
      <span class="me-2">
        Created: {dayjs(data.created_at).format(formatDefault)}
      </span>
      <span class="me-2">
        Last Commit: {dayjs(data.pushed_at).format(formatUpdated)}
      </span>
      <span class="me-2">
        License: {data.license?.name ?? "No License"}
      </span>
      <span>
        Language: {data.language}
      </span>
    </div>
  </div>
</RouterLink>
