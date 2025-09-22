<script>
  export let entries = {};
  let height = "";
  let weight = "";

  function update() {
    entries.growth = { height, weight };
  }
</script>

<div class="card card-growth">
  <h2>Growth</h2>
  <label>Height (cm): <input type="number" min="0" bind:value={height} on:input={update} /></label>
  <label>Weight (kg): <input type="number" min="0" step="0.1" bind:value={weight} on:input={update} /></label>
</div>
