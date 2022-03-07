<script>
  export let lang;
  export let text;

  if (lang === "") {
    lang = "plaintext";
  }

  if (lang === "sass") {
    lang = "scss";
  }

  import hljs from "highlight.js";

  const highlight = (code, lang) => {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  }

  const langHighlight = highlight(text, lang);
</script>

<pre class="rounded"><code class={`language-${lang} hljs`}>{@html langHighlight}</code></pre>
