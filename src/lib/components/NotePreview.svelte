<script>
  import { formatDateFromMs } from "../../utils";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch("click");
  }

  export let title;
  // export let content;
  export let lastEditTime;
  export let isActive = false;

  const date = formatDateFromMs(lastEditTime);
</script>

<div
  on:click={handleClick}
  class="cursor-pointer px-2.5 py-3 rounded-md transition-colors duration-75 w-full"
  class:bg-gray-400={isActive}
  class:hover:bg-nav-gray={!isActive}
>
  <h3 class="mb-1 font-bold truncate">{title}</h3>
  <span class="inline-block w-full mb-2 text-xs font-light text-left"
    >{date}</span
  >
</div>
