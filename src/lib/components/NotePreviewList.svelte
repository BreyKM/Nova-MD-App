<script>
    import { notesMock } from "../../store/mocks";
    import NotePreview from "./NotePreview.svelte";
    import { useNotesList } from "../../hooks/useNotesList";
    import { selectedNoteIndexStore, notesStore } from "../../store/Store";
    
    const { notes, selectedNoteIndex, handleNotesSelect } = useNotesList([])
</script>

<ul {...$$props}>
    {#if notes.length === 0}
        <p class='flex justify-center items-center w-full h-full text-2xl'>No notes yet!</p>
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