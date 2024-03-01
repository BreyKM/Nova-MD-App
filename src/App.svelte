<script>
  import { Pane, Splitpanes } from "svelte-splitpanes";
  import Nav from "./lib/components/Nav/Nav.svelte";
  import Content from "./lib/components/Content/Content.svelte";
  import SideBar from "./lib/components/SideBar/SideBar.svelte";
  import "./App.scss";
</script>

<Nav />
<div class="main-container">
  <Splitpanes theme="my-theme" style="width: 100vw; height: 100vh">
    <Pane size={18} minSize={18} maxSize={18}>
      <SideBar />
    </Pane>
    <Pane>
      <Content />
    </Pane>
  </Splitpanes>
</div>

<style>
  .main-container {
    position: relative;
    top: 40px;
  }
</style>
