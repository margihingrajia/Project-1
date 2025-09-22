<script>
  export let entries = {};
  let start = "";
  let end = "";
  let total = 0;

  const minSize = 60; // minimum circle size
  const maxSize = 120; // maximum circle size
  const maxHours = 12; // max hours for scaling

  function calculateTotal() {
    if (start && end) {
      const [startH, startM] = start.split(":").map(Number);
      const [endH, endM] = end.split(":").map(Number);

      let startDate = new Date();
      startDate.setHours(startH, startM);

      let endDate = new Date();
      endDate.setHours(endH, endM);

      if (endDate <= startDate) {
        endDate.setDate(endDate.getDate() + 1); // overnight sleep
      }

      const diff = (endDate - startDate) / (1000 * 60 * 60); // hours
      total = parseFloat(diff.toFixed(2));
    } else {
      total = 0;
    }
    updateEntries();
  }

  function updateEntries() {
    entries.sleep = { start, end, total };
  }

  $: calculateTotal();

  // Compute circle size based on hours
  $: circleSize = minSize + (Math.min(total, maxHours) / maxHours) * (maxSize - minSize);
</script>

<style>
  .sleep-container {
    display: flex;
    align-items: flex-start;
    gap: 3rem;
    flex-wrap: wrap;
  }
  .time-inputs {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .total-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }
  .circle-indicator {
    border-radius: 50%;
    border: 6px solid #d9e2c8;
    position: relative;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }
  .circle-fill {
    position: absolute;
    border-radius: 50%;
    background: #91a47f;
    top: 0;
    left: 0;
    transition: all 0.3s ease;
  }
  .total-text {
    position: absolute;
    font-weight: bold;
    font-size: 1.2rem;
    color: var(--text, #34403c);
  }
  @media (max-width: 600px) {
    .sleep-container {
      flex-direction: column;
      gap: 2rem;
    }
  }
</style>

<div class="card card-sleep">
  <h2>Sleep</h2>
  <div class="sleep-container">
    <div class="time-inputs">
      <label>Start:
        <input type="time" bind:value={start} on:change={calculateTotal} />
      </label>
      <label>End:
        <input type="time" bind:value={end} on:change={calculateTotal} />
      </label>
    </div>

    <div class="total-display">
      <div
        class="circle-indicator"
        style="width:{circleSize}px; height:{circleSize}px;"
      >
        <div
          class="circle-fill"
          style="width:{circleSize}px; height:{circleSize}px;"
        ></div>
        <div class="total-text">{total}h</div>
      </div>
      <span>Total Hours</span>
    </div>
  </div>
</div>
