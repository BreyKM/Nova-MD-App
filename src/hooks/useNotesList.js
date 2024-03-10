import { notesStore, selectedNoteIndexStore } from "../store/Store";
import { get } from "svelte/store";

export const useNotesList = ({ onSelect }) => {
  let notes;
  notesStore.subscribe((value) => {
    notes = value;
    // console.log(notes)
  });

  const handleNotesSelect = (index) => async () => {
    console.log(`Note ${index} was selected`);
    selectedNoteIndexStore.set(index);
    console.log(get(selectedNoteIndexStore));

    if (onSelect) {
      onSelect();
      console.log("onSelect");
    }
  };

  return {
    notes,
    handleNotesSelect,
  };
};
