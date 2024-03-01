<script>
import { selectedNoteStore } from '../../store/Store.js'
import { get } from "svelte/store"


let title;

console.log($selectedNoteStore)

$: if ($selectedNoteStore == null) {
    title = 'Untitled...'
} else {
    title = $selectedNoteStore.title
}





</script>

<div class="floating-title flex justify-center">
    <span class="text-gray-400">{title}</span>
</div>

<style>
.floating-title {
    position: relative;
    top: 40px;
}
</style>