<script>
  export let languages;

  import { getByValue, round } from "@/utilities.js";
  import { onMount } from "svelte";
  import { translate } from "@th3-s1lenc3/gh-colors";

  const render = async () => {
    let languageMap = new Map(Object.entries(languages));

    let values = Array.from(languageMap.values());

    let total = values.reduce((t, c) => t + c);

    values = values.map(el => [el, (el / total) * 100]);

    let languageData = values.map(el => {
      const language = getByValue(languageMap, el[0]);

      return {
        language,
        percentage: round(el[1], 1),
        "progress-class": translate(language, "bg"),
        class: translate(language),
      }
    });

    return languageData;
  };
</script>

<style lang="scss">
  .language-list {
    display: flex;
    flex-wrap: wrap;
  }
</style>

{#await render() then languageData}
  <div class="languages">
    <div class="language-breakdown progress">
      {#each languageData as data}
        <div
          class={`progress-bar ${data["progress-class"]}`}
          role="progressbar"
          style={`width: ${data.percentage}%`}
          aria-valuenow={data.percentage}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      {/each}
    </div>
    <ul class="language-list list-inline mt-1">
      {#each languageData as data}
        <li class="list-inline-item me-2">
          <code class="hljs rounded">
            <span class={`fw-bold me-1 ${data.class}`}>
              {data.language}
            </span>
            <span>
              {data.percentage}%
            </span>
          </code>
        </li>
      {/each}
    </ul>
  </div>
{/await}
