<script>
  import { createEventDispatcher, onMount } from "svelte";
  export let activePage = "today"; // today | calendar | day | settings
  export let userName = "Parent"; // default user name
  const dispatch = createEventDispatcher();

  // Current datetime
  let currentTime = new Date().toLocaleString();
  let timer;

  onMount(() => {
    timer = setInterval(() => {
      currentTime = new Date().toLocaleString();
    }, 1000);
  });

  function navigate(page) {
    dispatch("navigate", page);
  }

  function toggleSettings() {
    dispatch("toggleSettings");
  }
</script>

<header class="header">
  <!-- Left: App Title + User Name -->
  <div class="header-left">
    <h1>Little Moments</h1>
    <span class="user-name">Hi, {userName}!</span>
    <span class="tagline">Capture Every Memory</span>
  </div>

  <!-- Center: Navigation -->
  <nav class="header-nav">
    <button class:selected={activePage === "today"} on:click={() => navigate("today")}>Today</button>
    <button class:selected={activePage === "calendar"} on:click={() => navigate("calendar")}>Previous Entries</button>
  </nav>

  <!-- Right: Datetime + Settings Icon -->
  <div class="header-right">
    <span class="datetime">{currentTime}</span>
    <button class="settings-icon" on:click={toggleSettings} title="Settings">
      ⚙️
    </button>
  </div>
</header>

<style>
/* ================= Header ================= */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f3f4f1;
  padding: 0.75rem 1.5rem;
  border-bottom: 2px solid #d6e0d9;
  position: sticky;
  top: 0;
  z-index: 100;
  flex-wrap: wrap;
}

/* Left section: App title + user */
.header-left h1 {
  font-size: 1.4rem;
  margin: 0;
  color: #34403c;
}

.header-left .user-name {
  display: block;
  font-size: 0.9rem;
  color: #34403c;
  font-weight: 500;
  margin-top: 0.2rem;
}

.header-left .tagline {
  display: block;
  font-size: 0.85rem;
  color: #66736b;
  margin-top: 0.1rem;
}

/* Center navigation */
.header-nav {
  display: flex;
  gap: 1rem;
  margin: 0.5rem 0;
  flex-wrap: wrap;
}

.header-nav button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  background: #dbe6d4;
  cursor: pointer;
  color: #34403c;
  font-weight: 500;
  transition: all 0.2s;
}

.header-nav button:hover {
  background: #c8ddb8;
  color: #000;
}

.header-nav button.selected {
  background: #a3b18a;
  font-weight: bold;
}

/* Right section: datetime + settings gear */
.header-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 0.85rem;
  color: #34403c;
}

.header-right .datetime {
  font-size: 0.8rem;
  color: #66736b;
  margin-bottom: 0.3rem;
}

.settings-icon {
  font-size: 1.2rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
  color: #34403c;
}

.settings-icon:hover {
  transform: rotate(20deg);
}

/* ================= Dark Mode Overrides ================= */
:global(.dark-mode) .header {
  background: #1f2920 !important;
  border-bottom: 2px solid #2f3d34 !important;
}

:global(.dark-mode) .header-left h1,
:global(.dark-mode) .header-left .user-name,
:global(.dark-mode) .header-left .tagline,
:global(.dark-mode) .header-right,
:global(.dark-mode) .header-right .datetime {
  color: #e0f2e9 !important;
}

:global(.dark-mode) .header-nav button {
  background: #2b3a2f !important;
  color: #e0f2e9 !important;
}

:global(.dark-mode) .header-nav button:hover {
  background: #3b4c41 !important;
  color: #fff !important;
}

:global(.dark-mode) .header-nav button.selected {
  background: #556b2f !important;
  color: #fff !important;
}

:global(.dark-mode) .settings-icon {
  color: #e0f2e9 !important;
}
</style>
