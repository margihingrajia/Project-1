<!-- components/Goals.svelte -->
<script>
  export let entries = {};
  export let goals = {
    Feeding: 8,        // feeds per day
    Sleep: 12,         // hours
    Diaper: 6,         // changes
    PhotoMemory: 1     // upload per day
  };

  // Count helper
  function countFeeding() {
    return entries.Feeding ? entries.Feeding.length : 0;
  }
  function countSleep() {
    return entries.Sleep ? entries.Sleep.reduce((a, b) => a + b.hours, 0) : 0;
  }
  function countDiaper() {
    return entries.Diaper ? entries.Diaper.length : 0;
  }
  function countPhotos() {
    return entries.PhotoMemory ? entries.PhotoMemory.length : 0;
  }

  // Compute progress for each
  $: progress = {
    Feeding: { current: countFeeding(), goal: goals.Feeding },
    Sleep: { current: countSleep(), goal: goals.Sleep },
    Diaper: { current: countDiaper(), goal: goals.Diaper },
    PhotoMemory: { current: countPhotos(), goal: goals.PhotoMemory }
  };
</script>

<div class="card goals-card">
  <h2>🎯 Daily Goals</h2>

  {#each Object.entries(progress) as [key, data]}
    <div class="goal-item">
      <span class="goal-label">{key}</span>
      <div class="progress-bar">
        <div
          class="progress-fill {data.current >= data.goal ? 'completed' : ''}"
          style="width: {Math.min((data.current / data.goal) * 100, 100)}%"
        ></div>
      </div>
      <span class="goal-count">
        {data.current}/{data.goal}
      </span>
      {#if data.current >= data.goal}
        <span class="goal-success">✅ Goal Reached!</span>
      {/if}
    </div>
  {/each}
</div>

<style>
.goals-card {
  padding: 1rem;
  background: #fefefe;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.goals-card h2 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #34403c;
}

.goal-item {
  margin-bottom: 1rem;
}

.goal-label {
  font-weight: 600;
  color: #34403c;
}

.progress-bar {
  height: 10px;
  background: #e0e6e3;
  border-radius: 6px;
  overflow: hidden;
  margin: 0.3rem 0;
}

.progress-fill {
  height: 100%;
  background: #a3b18a;
  transition: width 0.3s ease;
}

.progress-fill.completed {
  background: #3a5f3a;
}

.goal-count {
  font-size: 0.85rem;
  color: #66736b;
  margin-left: 0.5rem;
}

.goal-success {
  display: block;
  font-size: 0.8rem;
  color: #2e7d32;
  margin-top: 0.2rem;
}
</style>
