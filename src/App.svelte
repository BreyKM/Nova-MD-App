<script>
  import { Pane, Splitpanes } from "svelte-splitpanes";
  import { Router, createRouter } from "@roxi/routify";
  import routes from "../.routify/routes.default.js";
  import Nav from "./lib/components/Nav/Nav.svelte";
  import Content from "./lib/components/Content/Content.svelte";
  import SideBar from "./lib/components/SideBar/SideBar.svelte";
  import NotePreviewList from "./lib/components/NotePreviewList.svelte";
  import "./App.scss";

  export const router = createRouter({ routes });
  
</script>

<Router {router} />
