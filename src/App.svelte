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
  import Trends from './components/Trends.svelte';
  import Goals from './components/Goals.svelte';
  import { mockEntries } from './data/mockEntries.js';

  let page = "today"; 
  let entries = {};
  let selectedDay = null;
  let showToast = false;

  let settings = JSON.parse(localStorage.getItem("todaySettings")) || {
    Feeding: true, Diaper: true, Sleep: true, Firsts: true,
    PhotoMemory: true, HealthVaccine: true, Growth: true, Goals: true
  };

  let darkMode = JSON.parse(localStorage.getItem("darkMode")) || false;

  function saveData() {
    localStorage.setItem("littleMoments", JSON.stringify(entries));
    showToast = true;
    setTimeout(() => (showToast = false), 3000);
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

  $: {
    if (darkMode) document.documentElement.classList.add("dark-mode");
    else document.documentElement.classList.remove("dark-mode");
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }
</script>

<Header 
  {currentHeaderPage}
  userName="Emily Johnson"
  startDate={new Date("2025-07-01")}
  activeDays={20}
  on:navigate={handleNavigate}
  on:toggleSettings={toggleSettingsPage}
/>

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
      {#if settings.Goals}<Goals bind:entries />{/if}
    </div>
    <div style="text-align:center; margin-top: 1.5rem;">
      <button on:click={saveData}>Save Entries</button>
    </div>
  </div>
{:else if page === "calendar"}
  <CalendarView {mockEntries} on:selectDay={(e) => goToDay(e.detail)} />
{:else if page === "day"}
  <DayView {selectedDay} {mockEntries} />
{:else if page === "trends"}
  <Trends entries={mockEntries} />
{/if}

{#if showToast}
  <div class="overlay">
    <div class="toast">✅ Entry saved successfully!</div>
  </div>
{/if}

<style>
:global(.dark-mode) { background-color: #121911; color: #e0f2e9; }
:global(.dark-mode .card) { background-color: #1f2920; color: #e0f2e9; }
:global(.dark-mode input, .dark-mode select, .dark-mode textarea) { background-color: #2b3a2f; color: #e0f2e9; border: 1px solid #44503f; }
:global(.dark-mode button) { background-color: #3a5f3a; color: #e0f2e9; }

.overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex; justify-content: center; align-items: center;
  z-index: 2000;
  animation: fadeIn 0.3s ease;
}
.toast {
  background: #fff; padding: 1.2rem 2rem; border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.25); font-size: 1.2rem; font-weight: 500; color: #2e7d32;
  animation: scaleUp 0.3s ease;
}
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@keyframes scaleUp { from { transform: scale(0.8); opacity:0 } to { transform: scale(1); opacity:1 } }
</style>
