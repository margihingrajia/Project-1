<script>
  import Header from './components/Header.svelte';
  import Feeding from './components/Feeding.svelte';
  import Diaper from './components/Diaper.svelte';
  import Sleep from './components/Sleep.svelte';
  import Firsts from './components/Firsts.svelte';
  import PhotoMemory from './components/PhotoMemory.svelte';
  import HealthVaccine from './components/HealthVaccine.svelte';
  import Growth from './components/Growth.svelte';
  import CalendarView from './components/CalendarView.svelte';
  import DayView from './components/DayView.svelte';
  import Settings from './components/Settings.svelte';
  import { mockEntries } from './data/mockEntries.js';
  import Trends from './components/Trends.svelte';

  let page = "today"; 
  let entries = {};
  let selectedDay = null;

  let settings = {
    Feeding: true,
    Diaper: true,
    Sleep: true,
    Firsts: true,
    PhotoMemory: true,
    HealthVaccine: true,
    Growth: true
  };

  if (localStorage.getItem("todaySettings")) {
    settings = JSON.parse(localStorage.getItem("todaySettings"));
  }

  function saveData() {
    localStorage.setItem("littleMoments", JSON.stringify(entries));
    alert("Entries saved locally!");
  }

  function goToDay(day) {
    selectedDay = day;
    page = "day";
  }

  function handleNavigate(event) {
    page = event.detail;
  }

  function toggleSettingsPage() {
    page = page === "settings" ? "today" : "settings";
  }

  $: currentHeaderPage = (page === 'day' || page === 'settings') ? 'today' : page;

  // ---------------- Dark Mode ----------------
  let darkMode = false;

  // Load dark mode from localStorage at startup
  if (localStorage.getItem("darkMode")) {
    darkMode = JSON.parse(localStorage.getItem("darkMode"));
  }

  // Reactively apply and save dark mode changes
  $: {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }
</script>

<!-- Header -->
<Header {currentHeaderPage} on:navigate={handleNavigate} on:toggleSettings={toggleSettingsPage} />

<!-- Main Pages -->
{#if page === "settings"}
  <Settings bind:darkMode {settings} saveSettings={toggleSettingsPage} />

{:else if page === "today"}
  <div class="container">
    <div class="grid">
      {#if settings.Feeding}<Feeding bind:entries />{/if}
      {#if settings.Diaper}<Diaper bind:entries />{/if}
      {#if settings.Sleep}<Sleep bind:entries />{/if}
      {#if settings.Firsts}<Firsts bind:entries />{/if}
      {#if settings.PhotoMemory}<PhotoMemory bind:entries />{/if}
      {#if settings.HealthVaccine}<HealthVaccine bind:entries />{/if}
      {#if settings.Growth}<Growth bind:entries />{/if}
    </div>
    <div style="text-align:center; margin-top: 1.5rem;">
      <button on:click={saveData}>Save Entries</button>
    </div>
    <div style="text-align:center; margin-top: 1rem;">
      <button on:click={() => page='trends'}>View Trends</button>
    </div>
  </div>

{:else if page === "calendar"}
  <CalendarView {mockEntries} on:selectDay={(e) => goToDay(e.detail)} />

{:else if page === "day"}
  <DayView {selectedDay} {mockEntries} />

{:else if page === "trends"}
  <Trends entries={mockEntries} />
{/if}

<style>
  /* Dark Mode Styles */
  :global(.dark-mode) {
    background-color: #121911;
    color: #e0f2e9;
  }

  :global(.dark-mode .card) {
    background-color: #1f2920;
    color: #e0f2e9;
  }

  :global(.dark-mode input, .dark-mode select, .dark-mode textarea) {
    background-color: #2b3a2f;
    color: #e0f2e9;
    border: 1px solid #44503f;
  }

  :global(.dark-mode button) {
    background-color: #3a5f3a;
    color: #e0f2e9;
  }

  :global(.switch) {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 26px;
  }

  :global(.switch input) {
    opacity: 0;
    width: 0;
    height: 0;
  }

  :global(.slider) {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 34px;
  }

  :global(.slider:before) {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  :global(input:checked + .slider) {
    background-color: #2e7d32; /* Dark green when on */
  }

  :global(input:checked + .slider:before) {
    transform: translateX(24px);
  }
</style>
