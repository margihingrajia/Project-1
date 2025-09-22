<!--
<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let activePage = "today";

  function navigate(page) {
    dispatch("navigate", page);
  }
</script>

<nav class="navbar">
  <button class:selected={activePage==="today"} on:click={()=>navigate("today")}>Today</button>
  <button class:selected={activePage==="calendar"} on:click={()=>navigate("calendar")}>Calendar</button>
  <button class:selected={activePage==="settings"} on:click={()=>navigate("settings")}>Settings</button>
</nav>

<style>
  .navbar {
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
    background: #f3f4f1;
    border-bottom: 2px solid #d6e0d9;
    position: sticky;
    top: 60px; /* below header */
    z-index: 90;
  }
  .navbar button {
    padding: 0.5rem 1rem;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    background: #dbe6d4;
    font-weight: 500;
    color: #34403c;
    transition: all 0.2s;
  }
  .navbar button:hover {
    background: #c8ddb8;
  }
  .navbar button.selected {
    background: #a3b18a;
    color: white;
    font-weight: bold;
  }
</style>
-->