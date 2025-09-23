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
    Growth: true,
    Goals: true
  };

  // Default daily goals
  let goals = {
    Feeding: 8,
    Sleep: 12,
    Diaper: 6,
    PhotoMemory: 1
  };

  // Load from localStorage
  onMount(() => {
    const storedSettings = JSON.parse(localStorage.getItem("todaySettings"));
    const storedGoals = JSON.parse(localStorage.getItem("goals"));
    if (storedSettings) {
      for (let key of activities) settings[key] = storedSettings[key];
    }
    if (storedGoals) {
      goals = storedGoals;
    }
  });

  function save() {
    localStorage.setItem("todaySettings", JSON.stringify(settings));
    localStorage.setItem("goals", JSON.stringify(goals));
    saveSettings();
    alert("Settings saved!");
  }

  function resetDefaults() {
    for (let key of activities) settings[key] = true;
    goals = {
      Feeding: 8,
      Sleep: 12,
      Diaper: 6,
      PhotoMemory: 1
    };
  }
</script>

<div class="settings-container card-style">
  <h2>Page Settings</h2>

  <!-- Activity Toggles -->
{#each activities as activity}
  <div class="setting-item">
    <label class="checkbox-label">
      <span class="label-text">Show {activity} card</span>
      <input type="checkbox" bind:checked={settings[activity]} />
    </label>
  </div>
{/each}

<!-- Goals Section -->
<div class="goals-section">
  <h3>Daily Goals</h3>
  {#each Object.keys(goals) as goal}
    <div class="setting-item">
      <label class="goal-label">
        <span class="goal-name">{goal} Goal:</span>
        <div class="goal-input-container">
          <input
            type="number"
            min="0"
            bind:value={goals[goal]}
            class="goal-input"
          />
          <span class="goal-unit">
            {goal === 'Feeding' ? 'times/day' : 
             goal === 'Sleep' ? 'hours/day' :
             goal === 'Diaper' ? 'times/day' :
             goal === 'PhotoMemory' ? 'photos/day' : ''}
          </span>
        </div>
      </label>
    </div>
  {/each}
</div>


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
/* ================= Card Container ================= */
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

/* ================= Setting Item ================= */
.setting-item {
  padding: 0.8rem 1rem;
  background: var(--setting-bg, #fff3f0);
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* ================= Activity Toggle ================= */
.checkbox-label {
  display: flex;
  justify-content: space-between; /* text left, checkbox right */
  align-items: center;
  width: 100%;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: 22px;
  height: 22px;
  accent-color: #2e7d32; /* green accent */
}

.label-text {
  font-weight: 500;
  color: var(--text-color, #5a4d4c);
  font-size: 1rem;
}

/* ================= Goals Section ================= */
.goals-section h3 {
  margin-top: 0.5rem;
  margin-bottom: 0.3rem;
  font-size: 1.1rem;
  color: var(--text-color, #444);
}

.goal-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.goal-name {
  font-weight: 500;
  color: var(--text-color, #444);
}

.goal-input-container {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.goal-input {
  width: 70px;
  padding: 0.3rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
  font-size: 0.95rem;
}

.goal-unit {
  font-size: 0.9rem;
  color: var(--text-color, #444);
}

/* ================= Buttons ================= */
.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  gap: 1rem;
}


/* ================= Dark Mode Toggle ================= */
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

/* ================= Dark Mode ================= */
:global(.dark-mode) .card-style {
  --card-bg: #1e1e1e;
  --setting-bg: #2b2b2b;
  --text-color: #e0e0e0;
}

:global(.dark-mode) .checkbox-label input[type="checkbox"] {
  accent-color: #66bb6a;
}
:global(.dark-mode) .goal-unit,
:global(.dark-mode) .label-text,
:global(.dark-mode) .goal-name {
  color: #e0e0e0;
}
</style>