<script>
  export let entries = {};
  let type = "";
  let notes = "";

  function update() {
    entries.feeding = { type, notes };
  }
</script>

<div class="card card-feeding">
  <h2>Feeding</h2>
  <select bind:value={type} on:change={update}>
    <option value="">Select</option>
    <option value="solids">Solids</option>
    <option value="bottle">Bottle/Formula</option>
    <option value="breastfeed">Breastfeed</option>
  </select>
  <textarea placeholder="Notes..." bind:value={notes} on:input={update}></textarea>
</div>
