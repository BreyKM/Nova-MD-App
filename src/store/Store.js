import { get, writable, derived } from "svelte/store";
import { notesMock } from "./mocks";
import { load } from "../../.routify/components/[...404].svelte";

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

export const NewNotebookNoteContentStore = writable(null);

export async function NewNotebookNote() {
  const title = `Welcome`;
  NewNotebookNoteContentStore.set(`{
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
  const NewNotebookNoteContent = get(NewNotebookNoteContentStore);

  await window.electronAPI.writeNote(title, NewNotebookNoteContent);
  console.log("note Written");
}

export async function createEmptyNote() {
  let notes = await get(notesStore);
  console.log("notes:", notes);
  if (!notes) {
    await loadNotes();
    notes = await get(notesStore);
  }
  const title = `Untitled ${notes.length + 1}`;
  console.log(notes.length);
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

export function openDirectory() {
  window.electronAPI.openFolder();
  window.electronAPI.getFolderName();

  window.electronAPI.folderSelectedLoad(() => {
    loadNotes();
    console.log("notes loaded");
  });
}

export const newNotebookDirNameStore = writable(null);

export const newNotebookDirNameInputStore = writable(null);

export async function NewNotebookDir() {
  window.starter.newNotebookDir();
  let newNotebookDirName = await window.starter.getNewNotebookDirName();
  newNotebookDirNameStore.set(newNotebookDirName);
  console.log("newNotebookDirNameStore:", get(newNotebookDirNameStore));
}

export const createNewNotebookDir = async (e) => {
  e.preventDefault();
  await window.starter.createNewNotebookDir(get(newNotebookDirNameInputStore));
  
  await NewNotebookNote();
  await window.starter.loadNotesInMainWin()
  console.log("please work");
  await window.starter.activeFolderSet();
  await window.starter.closeStarterWin();
  await window.starter.loadNotesInMainWin();
};

