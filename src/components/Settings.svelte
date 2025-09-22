<script>
  import { onMount } from "svelte";
  export let settings;
  export let saveSettings;
  export let darkMode; // bind from App.svelte

  const activities = Object.keys(settings);

  // Default settings
  const defaultSettings = {
    Feeding: true,
    Diaper: true,
    Sleep: true,
    Firsts: true,
    PhotoMemory: true,
    HealthVaccine: true,
    Growth: true
  };

  onMount(() => {
    const stored = JSON.parse(localStorage.getItem("todaySettings"));
    if (stored) {
      for (let key of activities) settings[key] = stored[key];
    }
  });

  function save() {
    localStorage.setItem("todaySettings", JSON.stringify(settings));
    saveSettings();
    alert("Settings saved!");
  }

  function resetDefaults() {
    for (let key of activities) settings[key] = true;
  }
</script>

<div class="settings-container card-style">
  <h2>Page Settings</h2>

  <!-- Activity Toggles -->
  {#each activities as activity}
    <div class="setting-item">
      <label class="checkbox-label">
        <input type="checkbox" bind:checked={settings[activity]} />
        <span class="label-text">Show {activity} card</span>
      </label>
    </div>
  {/each}

  <!-- Appearance Section -->
  <div class="setting-item appearance-section">
    <h3>Appearance</h3>
    <label class="switch">
      <input type="checkbox" bind:checked={darkMode} />
      <span class="slider round"></span>
    </label>
    <span style="margin-left:0.5rem;">Dark Mode</span>
  </div>

  <!-- Buttons -->
  <div class="buttons">
    <button on:click={save}>Save Settings</button>
    <button class="reset-btn" on:click={resetDefaults}>Reset to Default</button>
  </div>
</div>

<style>
  .card-style {
    padding: 1.5rem;
    border-radius: 16px;
    background: var(--card-bg, #fef9f7);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: var(--text-color, #333);
  }

  .setting-item {
    padding: 0.8rem 1rem;
    background: var(--setting-bg, #fff3f0);
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.05);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    cursor: pointer;
  }

  .checkbox-label input[type="checkbox"] {
    width: 20px;
    height: 20px;
    accent-color: #ffb3a7;
  }

  .label-text {
    font-weight: 500;
    color: var(--text-color, #5a4d4c);
    font-size: 1rem;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    gap: 1rem;
  }

  .buttons button {
    flex: 1;
    padding: 0.6rem 1rem;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    background: #ffb3a7;
    color: #fff;
    font-weight: 600;
  }

  .buttons button:hover { background: #ff9680; }
  .reset-btn { background: #fcd5d1; color: #7a2f2f; }
  .reset-btn:hover { background: #f9b8b2; }

  /* Dark mode toggle switch */
  .switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 26px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 34px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 20px; width: 20px;
    left: 3px; bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: #2e7d32; /* Dark green */
  }

  input:checked + .slider:before {
    transform: translateX(24px);
  }

  /* Appearance in Dark Mode */
  :global(.dark-mode) .card-style {
    --card-bg: #1e1e1e;
    --setting-bg: #2b2b2b;
    --text-color: #e0e0e0;
  }

  :global(.dark-mode) .checkbox-label input[type="checkbox"] {
    accent-color: #66bb6a;
  }
</style>
