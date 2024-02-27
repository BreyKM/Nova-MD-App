<script>
  import { Editor, rootCtx, defaultValueCtx } from "@milkdown/core";
  import { commonmark } from "@milkdown/preset-commonmark";
  import { nord } from "@milkdown/theme-nord";
  import "@milkdown/theme-nord/style.css";
  import "./Content.css";
  import { history } from "@milkdown/plugin-history";
  import { cursor } from "@milkdown/plugin-cursor";
  import { trailing } from "@milkdown/plugin-trailing";

  const markdown = `# Untitled...`;

  function editor(dom) {
    Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, "#content-container");
        ctx.set(defaultValueCtx, markdown);
      })
      .config(nord)
      .use(cursor)
      .use(commonmark)
      .use(history)
      .use(trailing)
      .create();
  }
</script>

<div id="content-container" use:editor></div>
