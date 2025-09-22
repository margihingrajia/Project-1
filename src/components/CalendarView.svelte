<script>
  import { createEventDispatcher } from "svelte";
  export let mockEntries = {};
  const dispatch = createEventDispatcher();

  let today = new Date();
  let displayYear = today.getFullYear();
  let displayMonth = today.getMonth(); // 0-11

  let years = Array.from({ length: 10 }, (_, i) => displayYear - 5 + i);

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Navigate month via buttons
  function prevMonth() {
    const d = new Date(displayYear, displayMonth - 1, 1);
    displayYear = d.getFullYear();
    displayMonth = d.getMonth();
  }
  function nextMonth() {
    const d = new Date(displayYear, displayMonth + 1, 1);
    displayYear = d.getFullYear();
    displayMonth = d.getMonth();
  }

  function daysInMonth(y, m) {
    return new Date(y, m + 1, 0).getDate();
  }

  $: days = Array.from({ length: daysInMonth(displayYear, displayMonth) }, (_, i) => i + 1);

  function selectDay(day) {
    const key = `${displayYear}-${displayMonth + 1}-${day}`;
    if (mockEntries[key]) {
      dispatch('selectDay', key);
    } else {
      alert("No entry for this day.");
    }
  }

  function monthName(m) {
    return new Date(displayYear, m, 1).toLocaleString('default', { month: 'long' });
  }
</script>

<div class="calendar-container">
  <div class="calendar-header">
    <button on:click={prevMonth}>&lt;</button>

    <div class="month-year">
      <h2>{monthName(displayMonth)} {displayYear}</h2>
    </div>

    <button on:click={nextMonth}>&gt;</button>
  </div>

  <!-- Weekday headers -->
  <div class="calendar-grid weekdays">
    {#each weekdays as w}
      <div>{w}</div>
    {/each}
  </div>

  <div class="calendar-grid days">
    {#each days as d}
      <div
        class:has-entry={mockEntries[`${displayYear}-${displayMonth+1}-${d}`]}
        on:click={() => selectDay(d)}
      >
        {d}
      </div>
    {/each}
  </div>
</div>
