<script>
  // import { Editor, rootCtx, defaultValueCtx } from "@milkdown/core";
  import { commonmark } from "@milkdown/preset-commonmark";
  import { nord } from "@milkdown/theme-nord";
  import "@milkdown/theme-nord/style.css";
  import "./Content.css";
  import { history } from "@milkdown/plugin-history";
  import { cursor } from "@milkdown/plugin-cursor";
  import { trailing } from "@milkdown/plugin-trailing";
  import { onMount, onDestroy } from "svelte";
  import { Editor } from "@tiptap/core";
  import StarterKit from "@tiptap/starter-kit";
  import placeholder from "@tiptap/extension-placeholder";
  import FloatingNoteTitle from "../../components/FloatingNoteTitle.svelte";
  import { useMarkdownEditor } from "../../../hooks/useMarkdownEditor";
  import { selectedNoteStore } from "../../../store/Store";

  let noteContent;
  $: if (!$selectedNoteStore) {
    console.log("No note selected");
  } else {
    console.log($selectedNoteStore.content);
    noteContent = $selectedNoteStore.content;
  }

  let element;
  let editor;

  onMount(() => {
    editor = new Editor({
      element: element,
      extensions: [
        StarterKit,
        placeholder.configure({
          placeholder: "Start typing...",
        }),
      ],
      content: $selectedNoteStore ? $selectedNoteStore.content : '',
      
      editorProps: {
        attributes: {
          class:
            "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-lg m-5 focus:outline-none",
        },
      },
      autofocus: "end",
      injectCSS: false,

      onTransaction: () => {
        editor = editor;
      },
    });
    unsubscribe = selectedNoteStore.subscribe(note => {
      if (note) {
        editor.commands.setContent(note.content);
      } else {
        editor.commands.setContent('');
      }
  });
});

  // $: {
  // if (editor && $selectedNote && editor.getText() != $selectedNote.content) {
  //   editor.commands.setContent($selectedNote.content);
  //   console.log(typeof(editor.getText()))
  //   console.log(typeof($selectedNote.content))
  // }

  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
    if (unsubscribe) {
      unsubscribe();
    }
  });


  // let isUpdating = false;

  
    // if (
    //   editor &&
    //   $selectedNoteStore
    // ) {
    //   editor.commands.setContent($selectedNoteStore.content);
    //   console.log("noteText");
    // }
  

  // $: if (
  //   editor &&
  //   $selectedNoteStore &&
  //   editor.getText() == $selectedNoteStore.content
  // ) {
  //   console.log("not equal");
  // }
</script>

<div class="editor-container" bind:this={element}>
  <FloatingNoteTitle />
</div>

<style>
</style>
