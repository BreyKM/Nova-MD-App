<script>
  import { Pane, Splitpanes } from "svelte-splitpanes";
  import { ListItem } from "svelte-ux";
  import { Button, Input } from "svelte-ux";
  import { openDirectory } from "../store/Store.js";
  import "../lib/css/starter.scss";
  import { NewNotebookDir, newNotebookDirNameStore, createNewNotebookDir, newNotebookDirNameInputStore } from '../store/Store.js'

  $: console.log($newNotebookDirNameStore)

  let newNotebookDirNameInput = '';
  $: newNotebookDirNameInputStore.set(newNotebookDirNameInput)


  let slideInRight = false;
  let slideOutRight = false;
  let slideOutLeft = false;
  let slideInLeft = false;

  let slideContainerOne = null;
  let slideContainerTwo = null;

  function createBtnSlide() {
    slideInRight = !slideInRight;
    slideOutLeft = !slideOutLeft;
    
  }

  function backBtnSlide() {
    slideOutRight = !slideOutRight;
    slideInLeft = !slideInLeft;
    slideOutLeft = !slideOutLeft;
    slideInRight = !slideInRight;
    setTimeout(() => {
      slideOutRight = !slideOutRight;
      slideInLeft = !slideInLeft;
    }, 500);
  }
</script>

<div class="starter-container flex justify-between">
  <Splitpanes theme="starter-theme" style="width: 100vw; height: 100vh;">
    <Pane size={30} minSize={30} maxSize={30} class="recent-folder-pane">
      <div class="recent-folder-container h-full relative">
        <ListItem title="Title" subheading="Subheading" />
        <ListItem title="Title" subheading="Subheading" />
        <ListItem title="Title" subheading="Subheading" />
      </div>
    </Pane>
    <Pane class="main-pane">
      <div
        class="starter-main-container flex flex-row h-full w-full items-center justify-center absolute"
      >
        <div
          bind:this={slideContainerOne}
          class="starter-container-slide-one w-full absolute justify-self-center left-full"
          class:slide-out-left={slideOutLeft}
          class:slide-in-left={slideInLeft}
        >
          <div class="create-notebook-container flex mb-10 mx-10">
            <div class="create-notebook-info mr-10">
              <p>Create a new notebook</p>
              <p>Create a new Nova notebook in a folder.</p>
            </div>
            <Button
              on:click={createBtnSlide}
              variant="fill"
              color="secondary"
              rounded>Create</Button
            >
          </div>
          <div class="create-notebook-container flex mx-10">
            <div class="create-notebook-info mr-10">
              <p>Open Existing Notebook folder</p>
              <p>Choose an existing folder of Nova notes.</p>
            </div>
            <Button
              on:click={openDirectory}
              variant="fill"
              color="secondary"
              rounded>Open</Button
            >
          </div>
        </div>
        <div
          bind:this={slideContainerTwo}
          class="starter-container-slide-two absolute flex flex-col"
          class:slide-in-right={slideInRight}
          class:slide-out-right={slideOutRight}
        >
          <div
            class="starter-back-btn-container flex items-center justify-start mb-2 ml-8 text-zinc-400 hover:text-bone"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              {...$$props}
              ><path
                fill="none"
                class="fill-current"
                d="m9.55 12l7.35 7.35q.375.375.363.875t-.388.875q-.375.375-.875.375t-.875-.375l-7.7-7.675q-.3-.3-.45-.675t-.15-.75q0-.375.15-.75t.45-.675l7.7-7.7q.375-.375.888-.363t.887.388q.375.375.375.875t-.375.875z"
              /></svg
            >
            <button
              on:click={backBtnSlide}
              class="starter-back-btn ml-1 cursor-default">Back</button
            >
          </div>
          <div class="create-notebook-container flex mb-10 mx-10">
            <h1>Create Local Notebook</h1>
          </div>
          <div
            class="create-notebook-container flex justify-between mb-10 mx-10"
          >
            <div class="create-notebook-info mr-10">
              <p>Notebook name</p>
              <p>pick a name for your Notebook.</p>
            </div>
            <div class="notebook-name-input-container">
              <input
              bind:value={newNotebookDirNameInput}
                class="notebook-name-input"
                type="text"
                placeholder="Notebook name"
                minlength="1"
              />
            </div>
          </div>
          <div class="create-notebook-container flex justify-between mx-10">
            <div class="create-notebook-info mr-10">
              <p class="text-lg">Location</p>
              <p class="text-xs text-gray-400">
                {#if ($newNotebookDirNameStore)}
                Your new notebook will be created in: 
                <span class="text-purple-400">{$newNotebookDirNameStore}</span>
                {:else}
                pick a place to put your new notebook.
                {/if}
              </p>
            </div>
            <button on:click={NewNotebookDir} class="h-8 bg-red-500 px-5 rounded">Browse</button>
          </div>
          <button on:click={createNewNotebookDir} class="createNewNotebook-btn h-8 bg-red-500 px-5 mt-10 rounded w-32 self-center">Create</button>
        </div>
      </div>
    </Pane>
  </Splitpanes>
</div>

<style>
  .notebook-name-input {
    padding: 0.25rem;
    font-size: 0.75rem;
    border-radius: 5px;
    border: 1px solid #555555;
  }

  .starter-subtext {
    font-size: 0.75rem;
  }

  .recent-folder-container {
    z-index: 13;
  }

  .slide-in-right {
    -webkit-animation: slide-in-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    animation: slide-in-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    left: 0;
  }

  .slide-out-right {
    -webkit-animation: slide-out-right 0.25s
      cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
    animation: slide-out-right 0.25s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
    left: 100%;
  }

  .slide-out-left {
    -webkit-animation: slide-out-left 0.25s
      cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
    animation: slide-out-left 0.25s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
    right: 100%;
  }

  .slide-in-left {
    -webkit-animation: slide-in-left 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      both;
    animation: slide-in-left 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

  /* ----------------------------------------------
 * Generated by Animista on 2024-3-6 14:1:43
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

  /**
 * ----------------------------------------
 * animation slide-in-right
 * ----------------------------------------
 */
  @-webkit-keyframes slide-in-right {
    0% {
      left: 100%;
      opacity: 0;
    }
    100% {
      left: 50%;
      opacity: 1;
    }
  }
  @keyframes slide-in-right {
    0% {
      left: 100%;
      opacity: 0;
    }
    100% {
      left: 0;
      opacity: 1;
    }
  }

  /* ----------------------------------------------
 * Generated by Animista on 2024-3-6 14:12:48
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

  /**
 * ----------------------------------------
 * animation slide-out-left
 * ----------------------------------------
 */

  @-webkit-keyframes slide-out-left {
    0% {
      right: 0;
      opacity: 1;
    }
    100% {
      right: 100%;
      opacity: 0;
    }
  }
  @keyframes slide-out-left {
    0% {
      right: 0;
      opacity: 1;
    }
    100% {
      right: 100%;
      opacity: 0;
    }
  }

  /* ----------------------------------------------
 * Generated by Animista on 2024-3-6 16:51:14
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

  /**
 * ----------------------------------------
 * animation slide-out-right
 * ----------------------------------------
 */
  @-webkit-keyframes slide-out-right {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      -webkit-transform: translateX(1000px);
      transform: translateX(1000px);
      opacity: 0;
    }
  }
  @keyframes slide-out-right {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      -webkit-transform: translateX(1000px);
      transform: translateX(1000px);
      opacity: 0;
    }
  }

  /* ----------------------------------------------
 * Generated by Animista on 2024-3-6 16:51:53
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

  /**
 * ----------------------------------------
 * animation slide-in-left
 * ----------------------------------------
 */
  @-webkit-keyframes slide-in-left {
    0% {
      -webkit-transform: translateX(-1000px);
      transform: translateX(-1000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slide-in-left {
    0% {
      -webkit-transform: translateX(-1000px);
      transform: translateX(-1000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
  }
</style>
