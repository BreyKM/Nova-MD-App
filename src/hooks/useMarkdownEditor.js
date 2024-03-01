import { selectedNoteStore } from "../store/Store";


export const useMarkdownEditor = () => {
    const selectedNote = selectedNoteStore

    return {
        selectedNote
    }

}
