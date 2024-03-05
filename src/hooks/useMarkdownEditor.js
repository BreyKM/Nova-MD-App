import { selectedNoteStore, newNoteContentStore } from "../store/Store";
import { throttle } from "lodash";
import { get } from "svelte/store";

export const useMarkdownEditor = () => {
  const selectedNote = selectedNoteStore;
  // console.log("selectedNote:", selectedNote);

  // const editorRef =
  const handleAutoSaving = throttle(
    (content) => {
      const selectedNote = get(selectedNoteStore);
      if (!selectedNote) return;

      // console.log("Auto saving", get(selectedNoteStore));

      let jsonString = JSON.stringify(content, null, 2);
      window.electronAPI.writeNote(selectedNote.title, jsonString);
      console.log("content", jsonString);
    },
    2000,
    {
      leading: false,
      trailing: true,
    }
  );

  const getNewNotecontent = (content) => {
    let jsonString = JSON.stringify(content, null, 2);
    newNoteContentStore.set(jsonString);
    console.log("content", jsonString);
  };

  return {
    handleAutoSaving,
    getNewNotecontent,
    selectedNote,
  };
};
