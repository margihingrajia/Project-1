<script>
  export let entries = {};

  // Dropdown selection
  let selectedVaccine = "";

  const vaccines = {
    "Birth": [
      "Hepatitis B (HepB) – dose 1"
    ],
    "1–2 Months": [
      "Hepatitis B (HepB) – dose 2"
    ],
    "2 Months": [
      "DTaP (Diphtheria, Tetanus, Pertussis) – dose 1",
      "Hib (Haemophilus influenzae type b) – dose 1",
      "IPV (Polio) – dose 1",
      "PCV13 (Pneumococcal) – dose 1",
      "Rotavirus (RV) – dose 1"
    ],
    "4 Months": [
      "DTaP – dose 2",
      "Hib – dose 2",
      "IPV – dose 2",
      "PCV13 – dose 2",
      "Rotavirus – dose 2"
    ],
    "6 Months": [
      "DTaP – dose 3",
      "HepB – dose 3",
      "PCV13 – dose 3",
      "Rotavirus – dose 3 (if 3-dose series)",
      "Influenza – annually (start at 6 months)"
    ],
    "12–15 Months": [
      "Hib – final dose",
      "PCV13 – final dose",
      "MMR (Measles, Mumps, Rubella) – dose 1",
      "Varicella (Chickenpox) – dose 1",
      "HepA – dose 1"
    ],
    "15–18 Months": [
      "DTaP – final dose"
    ],
    "18–23 Months": [
      "HepA – dose 2"
    ],
    "4–6 Years": [
      "DTaP – booster",
      "IPV – booster",
      "MMR – dose 2",
      "Varicella – dose 2"
    ],
    "11–12 Years": [
      "Tdap – booster (Tetanus, Diphtheria, Pertussis)",
      "HPV – dose 1",
      "Meningococcal (MenACWY) – dose 1"
    ],
    "16 Years": [
      "Meningococcal (MenACWY) – booster",
      "MenB – optional, shared decision"
    ],
    "6 Months and Older": [
      "COVID-19 – age-specific schedule"
    ]
  };

  // Custom input
  let vaccineName = "";
  let date = "";

  // Update entries object whenever selection, input, or date changes
  $: update();
  function update() {
    entries.health = { vaccineName: vaccineName || selectedVaccine, date };
  }
</script>

<div class="card card-health">
  <h2>Health / Vaccine</h2>

  <!-- Dropdown selection -->
  <label for="child-vaccines">Select a Vaccine:</label>
  <select id="child-vaccines" bind:value={selectedVaccine} on:change={update}>
    <option value="" disabled selected>Select a vaccine milestone</option>
    {#each Object.entries(vaccines) as [ageGroup, items]}
      <optgroup label={ageGroup}>
        {#each items as item}
          <option value={item}>{item}</option>
        {/each}
      </optgroup>
    {/each}
  </select>

  <!-- Custom vaccine input -->
  <input
    type="text"
    placeholder="Or enter custom vaccine name"
    bind:value={vaccineName}
    on:input={update} />

  <!-- Date picker -->
  <input
    type="date"
    bind:value={date}
    on:change={update} />

  {#if entries.health.vaccineName}
    <p>You selected: <strong>{entries.health.vaccineName}</strong> on <strong>{entries.health.date}</strong></p>
  {/if}
</div>
