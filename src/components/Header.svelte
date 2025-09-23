<script>
  import { createEventDispatcher, onMount } from "svelte";
  export let activePage = "today"; // today | calendar | trends | settings
  export let userName = "Demo User";
  export let startDate = new Date("2025-01-01");
  export let activeDays = 15;

  const dispatch = createEventDispatcher();

  let currentTime = new Date().toLocaleString();
  $: daysSinceStart = Math.floor(
    (new Date() - new Date(startDate)) / (1000 * 60 * 60 * 24)
  );

  onMount(() => {
    const timer = setInterval(() => {
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
  <!-- Left: Logo + App Info -->
  <div class="header-left">
    <img src="/images/logo.png" alt="Little Moments Logo" class="logo" />
    <div class="app-info">
      <h1>Little Moments</h1>
      <span class="user-name">Hi, {userName}!</span>
      <span class="tagline">{daysSinceStart} days since beginning | {activeDays} active days</span>
    </div>
  </div>

  <!-- Right: Navigation buttons + Datetime -->
  <div class="header-right">
    <span class="datetime">{currentTime}</span>
    <div class="nav-buttons">
      <button on:click={() => navigate("today")} class:selected={activePage==="today"}>
        <img src="/images/today.png" alt="Today" class="btn-icon" /> New Entry
      </button>
      <button on:click={() => navigate("calendar")} class:selected={activePage==="calendar"}>
        <img src="/images/calendar.png" alt="Previous Entries" class="btn-icon" /> Previous
      </button>
      <button on:click={() => navigate("trends")} class:selected={activePage==="trends"}>
        <img src="/images/trend.png" alt="Trends" class="btn-icon" /> Trends
      </button>
      <button on:click={toggleSettings} class:selected={activePage==="settings"}>
        <img src="/images/settings.png" alt="Settings" class="btn-icon" /> Settings
      </button>
    </div>
  </div>
</header>

<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background: #f3f4f1;
  border-bottom: 2px solid #d6e0d9;
  position: sticky;
  top: 0;
  z-index: 100;
  flex-wrap: wrap;
  gap: 1rem;
}

/* Left: Logo + App Info */
.header-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo {
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 8px;
}

.app-info h1 {
  margin: 0;
  font-size: 1.5rem;
  color: #34403c;
}

.app-info .user-name {
  display: block;
  font-size: 0.9rem;
  color: #34403c;
  font-weight: 500;
  margin-top: 0.15rem;
}

.app-info .tagline {
  display: block;
  font-size: 0.8rem;
  color: #66736b;
  margin-top: 0.1rem;
}

/* Right: datetime + nav buttons */
.header-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.header-right .datetime {
  font-size: 0.8rem;
  color: #66736b;
  margin-bottom: 0.3rem;
}

/* Navigation buttons group */
.nav-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.nav-buttons button {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  border: none;
  background: #dbe6d4;         /* base color */
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  color: #34403c;
}

.nav-buttons button:hover {
  background: #c8ddb8;
}

.nav-buttons button.selected {
  background: #a3b18a !important; /* important ensures override */
  color: #fff !important;
  font-weight: bold;
}

.btn-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

/* Dark mode */
:global(.dark-mode) .header {
  background: #1f2920;
  border-bottom: 2px solid #2f3d34;
}

:global(.dark-mode) .app-info h1,
:global(.dark-mode) .app-info .user-name,
:global(.dark-mode) .app-info .tagline,
:global(.dark-mode) .header-right .datetime {
  color: #e0f2e9;
}

:global(.dark-mode) .nav-buttons button {
  background: #2b3a2f;
  color: #e0f2e9;
}

:global(.dark-mode) .nav-buttons button:hover {
  background: #3b4c41;
  color: #fff;
}

:global(.dark-mode) .nav-buttons button.selected {
  background: #556b2f !important;
  color: #fff !important;
}

/* Responsive */
@media(max-width: 600px){
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  .header-right {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .nav-buttons {
    gap: 0.25rem;
    flex-wrap: wrap;
  }
}
</style>
