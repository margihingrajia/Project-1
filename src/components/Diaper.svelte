<script>
  export let entries = {};
  let type = "";
  let rash = false;

  function update() {
    entries.diaper = { type, rash };
  }
</script>

<div class="card card-diaper">
  <h2>Diaper</h2>
  <select bind:value={type} on:change={update}>
    <option value="">Select</option>
    <option value="wet">Wet</option>
    <option value="dirty">Dirty</option>
    <option value="dry">Dry</option>
  </select>

  <!-- Flex container for checkbox + label -->
  <label class="checkbox-inline">
    Rash? 
    <input type="checkbox" bind:checked={rash} on:change={update} />
  </label>
</div>

<style>
  .checkbox-inline {
    display: flex;
    align-items: center;
    gap: 0.5rem; /* space between checkbox and label */
    margin-top: 0.5rem;
    font-size: 0.95rem;
  }

  .checkbox-inline input[type="checkbox"] {
    width: 18px;
    height: 18px;
  }
</style>
