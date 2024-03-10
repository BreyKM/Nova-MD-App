<script>
  import { notesMock } from "../../store/mocks";
  import NotePreview from "./NotePreview.svelte";
  import { useNotesList } from "../../hooks/useNotesList";
  import { selectedNoteIndexStore, notesStore } from "../../store/Store";
  import { isEmpty } from "lodash";
  import { onMount, beforeUpdate, afterUpdate } from "svelte";
  export let onSelect;

  const { handleNotesSelect } = useNotesList({
    onSelect,
  });
  let isLoading = true;

  // Reactive statement that watches the notes variable

  $: $notesStore, (isLoading = false);
  $: console.log("notePreviewList NotesStore: ", $notesStore);

  async function loadNotes() {
    const notes = await window.electronAPI.getNotes();
    console.log("notes:", notes);
    //sort by lastEditTime
    const sortedNotes = notes.sort((a, b) => b.lastEditTime - a.lastEditTime);
    // console.log("Notes:", notes);
    console.log("sortedNotes:", sortedNotes);
    notesStore.set(sortedNotes);
    console.log("notesStore:", get(notesStore));
  }

  onMount(() => {
    loadNotes();
  });
</script>

<div class="note-preview-list-container">
  <ul {...$$props}>
    {#if isLoading}
      <p class="flex justify-center items-center w-full h-full text-2xl">
        Loading...
      </p>
    {:else if isEmpty($notesStore)}
      <p class="flex justify-center items-center w-full h-full text-2xl">
        No notes yet!
      </p>
    {:else}
      {#each $notesStore as note, index}
        <NotePreview
          title={note.title}
          content={note.content}
          lastEditTime={note.lastEditTime}
          isActive={$selectedNoteIndexStore === index}
          on:click={handleNotesSelect(index)}
        />
      {/each}
    {/if}
  </ul>
</div>

<style>
  .note-preview-list-container {
    overflow-y: auto;
    height: calc(100vh - 8rem);
  }
</style>
