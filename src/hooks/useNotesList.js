import { notesStore, selectedNoteIndexStore } from "../store/Store";


export const useNotesList = ({ onSelect }) => {
    let notes;
    notesStore.subscribe(value => {
        notes = value;
        // console.log(notes)
      });
    

    
    const handleNotesSelect = (index) => async() => {
        console.log(`Note ${index} was selected`);
         selectedNoteIndexStore.set(index)
        //  console.log(index)

        if(onSelect) {
            onSelect()
            // console.log('onSelect')
        }
    }

    return {
        notes,
        handleNotesSelect

    }
}