<script>
  export let errorMsg;

  import {
      Toaster,
      ToasterPosition,
      ToasterType,
  } from "bs-toaster";
  import { onMount } from "svelte";

  const showError = (err) => {
    const errorToast = new Toaster({
      position: ToasterPosition.TOP_END,
      type: ToasterType.DANGER,
      delay: 20000,
      defaultIconMarkup: `<i class="bi bi-exclamation-triangle p-2 me-2 text-white fs-4"/>`,
    });

    errorToast.create("Error", err)

    return errorToast;
  }

  onMount(() => showError(errorMsg));

</script>

<style lang="scss">
  .error {
    &-icon {
      font-size: 10rem;
    }
    &-msg {
      font-size: 1.5rem;
    }
  }
</style>

<div class="centre">
  <i class="bi bi-exclamation-triangle error-icon text-danger" />
  <span class="error-msg">Well that's embarrasing... something went wrong</span>
</div>
