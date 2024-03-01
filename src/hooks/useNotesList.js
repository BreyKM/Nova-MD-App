import { notesStore, selectedNoteIndexStore } from "../store/Store";

let selectedNoteIndex
export const useNotesList = ({ onSelect }) => {
    const notes = notesStore

    
    const handleNotesSelect = (index) => async() => {
        console.log(`Note ${index} was selected`);
         selectedNoteIndexStore.set(index)
        //  console.log(index)

        if(onSelect) {
            onSelect()
        }
    }

    return {
        notes,
        handleNotesSelect

    }
}