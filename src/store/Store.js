import { writable, derived } from "svelte/store";
import { notesMock } from "./mocks";

export const notesStore = writable(notesMock);

export const selectedNoteIndexStore = writable(null);

export const selectedNoteStore = derived(
  [notesStore, selectedNoteIndexStore],
  ([$notesStore, $selectedNoteIndexStore]) => {
    if (!$selectedNoteIndexStore && $selectedNoteIndexStore !== 0) return null;

    const selectedNote = $notesStore[$selectedNoteIndexStore];
    // console.log('selectedNote:', selectedNote);

    return {
      ...selectedNote,
      content: `Hello from Note${$selectedNoteIndexStore}`,
    };
  }
);

selectedNoteStore.subscribe((value) => {
  // console.log('selectedNoteStore updated', value)
});
