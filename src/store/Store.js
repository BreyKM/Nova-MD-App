import { get, writable, derived } from "svelte/store";
import { notesMock } from "./mocks";

// async function loadNotes() {
//   const notes = await window.electronAPI.getNotes();
//   console.log("notes:", notes.length);
//   if (notes.length === 0) {
//     return notesStore.set(notesMock);
//   } else {
//     //sort by lastEditTime
//     const sortedNotes = notes.sort((a, b) => b.lastEditTime - a.lastEditTime);
//     notesStore.set(sortedNotes);
//   }
// }
// export const notesStore = writable(loadNotes(), []);

// notesStore.subscribe((value) => {
//   console.log("notesStore value:", value);
// });

export const notesStore = writable(null);
export const editorStore = writable(null);

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

// Call loadNotes after the store is defined
loadNotes();

// notesStore.subscribe((value) => {
//   console.log("notesStore value:", value);
// });

// const initialNotesStore = [];
// const noteStoreAsync = writable(initialNotesStore);

// loadNotes().then(notes => {
//   notesStoreAsync.set(notes)
// })

// export const notesStoreAsync = derived(notesStoreAsync, $notes => $notes)

// export const notesStore =

export const selectedNoteIndexStore = writable(null);

export const noteContentStore = writable("");

export const selectedNoteStore = derived(
  [notesStore, selectedNoteIndexStore],
  ([$notesStore, $selectedNoteIndexStore]) => {
    if (
      (!$selectedNoteIndexStore && $selectedNoteIndexStore !== 0) ||
      !notesStore
    )
      return null;

    const selectedNote = $notesStore[$selectedNoteIndexStore];
    console.log("selectedNote:", selectedNote.title);

    // const noteContent = window.electronAPI.readNote(selectedNote.title);
    window.electronAPI.readNote(selectedNote.title).then((content) => {
      console.log("selectedNote:", $selectedNoteIndexStore);
      console.log("content:", content);
      noteContentStore.set(content);
    });
    // console.log(noteContent);

    return {
      ...selectedNote,
      content: get(noteContentStore),
    };
  }
);

// console.log("selectedNoteStore:", selectedNoteStore);

export const selectedNoteWithContentStore = derived(
  [selectedNoteStore, noteContentStore],
  ([$selectedNoteStore, $noteContentStore]) => {
    if (!$selectedNoteStore) return null;

    return {
      ...$selectedNoteStore,
      content: $noteContentStore,
    };
  }
);

export const newNoteContentStore = writable(null);

export function createEmptyNote() {
  const notes = get(notesStore);
  const title = `Untitled ${notes.length + 1}`;
  console.log(notes.length)
  const editor = get(editorStore);
  console.log("editor:", editor);
  newNoteContentStore.set(`{
      "type": "doc",
      "content": [
        {
          "type": "heading",
          "attrs": {
            "level": 1
          },
          "content": [
            {
              "type": "text",
              "text": "${title}"
            }
          ]
        }
      ]
    }`);
  const emptyNoteContent = get(newNoteContentStore);

  window.electronAPI.writeNote(title, emptyNoteContent);
  console.log("note Written");
  setTimeout(() => {
    loadNotes();
    console.log("notes loaded");
  }, 200);

  // const notes = get(notesStore);
  // if (!notes) { loadNotes()}
  // console.log("notesStore:", get(notesStore));
  // console.log("notes:", notes);

  // const title = `Untitled ${notes.length + 1}`;

  // const newNote = {
  //   title,
  //   lastEditTime: Date.now(),
  // };

  // notesStore.set([
  //   newNote,
  //   ...notes.filter((note) => note.title !== newNote.title),
  // ]);
  selectedNoteIndexStore.set(0);
}

export function deleteNote() {
  window.electronAPI.openFolder();
  window.electronAPI.getFolderName();

  window.electronAPI.folderSelectedLoad(() => {
    loadNotes();
    console.log("notes loaded");
  });
}

// export const saveNoteStore = writable(null, (get, set, newContent) => {
//   const notes = get(notesStore);
//   const selectedNote = get(selectedNoteStore);

//   if (!selectedNote || !notes) return;

//   window.electronAPI.writeNote(selectedNote.title, newContent);

//   console.log(newContent);

//   const updatedNote = {
//     ...selectedNote,
//     lastEditTime: Date.now(),
//   };

//   set(
//     notesStore,
//     notes.map((note) => {
//       note.title === selectedNote.title ? updatedNote : note;
//     })
//   );

//   set(selectedNoteIndexStore, 0);
// });
