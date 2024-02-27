<script>
  import BtnSideBar from "./BtnSideBar.svelte";
</script>

<div class="sidebar-btns-container flex justify-center mt-5 ">
  <div class="btn-container h-[24px] p-2 hover:bg-gray-700 box-content">
    <BtnSideBar
      width="1.5rem"
      height="1.5rem"
      fill="#fafafa"
      d="M14 21v-1.65q0-.2.075-.387t.225-.338l5.225-5.2q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55q0 .275-.1.563t-.325.512l-5.2 5.2q-.15.15-.337.225T16.65 22H15q-.425 0-.712-.287T14 21m7.5-5.575l-.925-.925zm-6 5.075h.95l3.025-3.05l-.925-.925l-3.05 3.025zM6 22q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h7.175q.4 0 .763.15t.637.425l4.85 4.85q.275.275.425.638t.15.762v1.425q0 .425-.288.713T19 11.25q-.425 0-.712-.288T18 10.25V9h-4q-.425 0-.712-.288T13 8V4H6v16h5q.425 0 .713.288T12 21q0 .425-.288.713T11 22zm0-2V4zm13.025-3.025l-.475-.45l.925.925z"
    />
  </div>
  <div class="btn-container h-[24px] p-2 hover:bg-gray-700 box-content">
    <BtnSideBar
      
      class="sidebar-btn"
      width="1.5rem"
      height="1.5rem"
      fill="#fafafa"
      d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h5.175q.4 0 .763.15t.637.425L12 6h8q.825 0 1.413.588T22 8v10q0 .825-.587 1.413T20 20zm0-2h16V8h-8.825l-2-2H4zm0 0V6zm10-4v1q0 .425.288.713T15 16q.425 0 .713-.288T16 15v-1h1q.425 0 .713-.288T18 13q0-.425-.288-.712T17 12h-1v-1q0-.425-.288-.712T15 10q-.425 0-.712.288T14 11v1h-1q-.425 0-.712.288T12 13q0 .425.288.713T13 14z"
    />
  </div>
  <div class="btn-container h-[24px] p-2 hover:bg-gray-700 box-content">
    <BtnSideBar
      
      class="sidebar-btn"
      width="1.5rem"
      height="1.5rem"
      fill="none"
      stroke="#fafafa"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="m3 16l4 4l4-4m-4 4V4m13 4h-5m0 2V6.5a2.5 2.5 0 0 1 5 0V10m-5 4h5l-5 6h5"
    />
  </div>
</div>
