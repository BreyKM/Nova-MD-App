<script>
  import "./Content.css";
  import { onMount, onDestroy, afterUpdate } from "svelte";
  import { Editor } from "@tiptap/core";
  import StarterKit from "@tiptap/starter-kit";
  import Document from "@tiptap/extension-document";
  import Placeholder from "@tiptap/extension-placeholder";
  import FloatingNoteTitle from "../../components/FloatingNoteTitle.svelte";
  import { useMarkdownEditor } from "../../../hooks/useMarkdownEditor";
  import {
    selectedNoteStore,
    selectedNoteWithContentStore,
    editorStore
  } from "../../../store/Store";

  let noteContent;
  $: if (!$selectedNoteWithContentStore) {
    // console.log("No note selected");
  } else {
    // console.log($selectedNoteWithContentStore.content);
    noteContent = $selectedNoteWithContentStore.content;
    // console.log(noteContent);
  }
  let unsubscribe;
  let element;
  let editor;

  const { handleAutoSaving, getNewNotecontent } = useMarkdownEditor();

  const CustomDocument = Document.extend({
    content: "heading block*",
  });

  const notePromise = new Promise(resolve => {
  const unsubscribe = selectedNoteStore.subscribe(note => {
    resolve(note);
  });
});

  onMount(() => {
    // console.log("selectedNoteStore", $selectedNoteStore);
    editor = new Editor({
      element: element,
      extensions: [
        CustomDocument,
        StarterKit.configure({
          document: false,
        }),
        Placeholder.configure({
          placeholder: ({ node }) => {
            if (node.type.name === "heading") {
              return "What’s the title?";
            }

            return "Can you add some further context?";
          },
        }),
      ],
      content: $selectedNoteStore ? `<h1>${$selectedNoteStore.title}</h1>` : "",
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

      onUpdate: () => {
        handleAutoSaving(editor.getJSON());
        console.log("editor.getJSON()", editor.getJSON());
      },
      
    });
    editorStore.set(editor)
    getNewNotecontent(editor.getJSON());
    // selectedNoteStore.subscribe((note) => {
    //   if (note) {
    //     editor.commands.setContent(note.content);
    //     console.log("note.content", note.content);
    //     console.log("note.content", $selectedNoteStore);
    //   } else {
    //     editor.commands.setContent(note.title);
    //   }
    // });
  });

  afterUpdate(() => {
    if (editor && $selectedNoteWithContentStore) {
      if ($selectedNoteWithContentStore) {
      editor.commands.setContent($selectedNoteWithContentStore.content);
      console.log("note.content", $selectedNoteWithContentStore.content);
    } else {
      editor.commands.setContent($selectedNoteWithContentStore.title);
    }
    }
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

