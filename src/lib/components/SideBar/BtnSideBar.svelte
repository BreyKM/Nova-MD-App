<script>
  export let onClick;
  export let padding;
  export let margin;
  export let bgColor;
</script>

<button style="padding: {padding}; margin: {margin}; background-color: {bgColor}" on:click={onClick}
  ><svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.75em"
    height="1.75em"
    viewBox="0 0 24 24"
    {...$$props}
    ><path fill=""
    stroke=""
    stroke-linecap=""
    stroke-linejoin=""
    stroke-width="" d="" {...$$props} />
  </svg></button
>


