<script>
  import { Pane, Splitpanes } from "svelte-splitpanes";
  import Nav from "./lib/components/Nav/Nav.svelte";
  import Content from "./lib/components/Content/Content.svelte";
  import SideBar from "./lib/components/SideBar/SideBar.svelte";
  import NotePreviewList from "./lib/components/NotePreviewList.svelte";
  import "./App.scss";

  let contnetContainerRef;

  const resetScroll = () => {
    contnetContainerRef.scrollTop = (0, 0);
  };
</script>

<Nav />
<div class="main-container">
  <Splitpanes theme="my-theme" style="width: 100vw; height: 100vh">
    <Pane size={18} minSize={18} maxSize={18}>
      <div class="sidebar-container">
        <SideBar />
        <NotePreviewList
          class="text-bone flex flex-col justify-center mt-6  w-full h-auto"
          onSelect={resetScroll}
        />
      </div>
    </Pane>
    <Pane>
      <Content bind:this={contnetContainerRef} />
    </Pane>
  </Splitpanes>
</div>

<style>
  .main-container {
    position: relative;
    top: 40px;
  }

  .sidebar-container {
    position: relative;
    top: 40px;
  }
</style>
