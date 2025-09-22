<script>
  export let entries = {};
  
  // Dropdown selection
  let selectedFirst = "";
  
  const babyFirsts = {
    "Physical Development": [
      "First smile",
      "First laugh",
      "First coo or babble",
      "First roll over",
      "First sit up unassisted",
      "First crawl",
      "First stand with support",
      "First walk",
      "First climb",
      "First jump or bounce"
    ],
    "Motor Skills": [
      "First grasp of a toy",
      "First finger feeding",
      "First use of utensils",
      "First scribble",
      "First stack of blocks"
    ],
    "Sensory & Cognitive": [
      "First response to own name",
      "First recognize familiar faces",
      "First point at objects",
      "First play peek-a-boo",
      "First problem-solving attempts"
    ],
    "Language & Communication": [
      "First word",
      "First sentence or phrase",
      "First 'mama' or 'dada'",
      "First signs",
      "First mimic of words or sounds"
    ],
    "Feeding & Eating": [
      "First breastfeed or bottle feed",
      "First taste of solid food",
      "First independent feeding",
      "First reaction to new foods",
      "First drink from a sippy cup"
    ],
    "Health & Growth": [
      "First tooth",
      "First haircut",
      "First bath",
      "First rash or illness",
      "First doctor visit milestone"
    ],
    "Sleep": [
      "First night slept through",
      "First nap routine established"
    ],
    "Social & Emotional": [
      "First hug or kiss given",
      "First wave or clap",
      "First peek-a-boo interaction",
      "First playdate",
      "First reaction to strangers"
    ],
    "Milestones & Experiences": [
      "First outing",
      "First trip in car/plane",
      "First holiday celebration",
      "First birthday party",
      "First encounter with pets"
    ]
  };

  // Suggestion logic
  let suggestion = "";
  const suggestions = ["First smile", "First crawl", "First steps", "First words", "First tooth"];

  function pickSuggestion() {
    suggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    entry = suggestion;
    update();
  }

  // Entry textarea
  let entry = "";

  // Update entries object whenever selection or entry changes
  $: update();
  function update() {
    entries.firsts = { entry: entry || selectedFirst, suggestion };
  }
</script>

<div class="card card-firsts">
  <h2>Firsts</h2>

  <!-- Dropdown selection -->
  <label for="baby-firsts">Select a Baby First:</label>
  <select id="baby-firsts" bind:value={selectedFirst} on:change={update}>
    <option value="" disabled selected>Select a milestone</option>
    {#each Object.entries(babyFirsts) as [category, items]}
      <optgroup label={category}>
        {#each items as item}
          <option value={item}>{item}</option>
        {/each}
      </optgroup>
    {/each}
  </select>

  <!-- Textarea for custom entry -->
  <textarea
    placeholder="Describe baby's first..."
    bind:value={entry}
    on:input={update}>
  </textarea>

  <!-- Random suggestion -->
  <hr style="margin: 1rem 0;" />
  <p style="margin-bottom: 0.5rem; font-weight: 500;">Generate Random First!</p>
  <button on:click={pickSuggestion} style="display: block; margin-top: 0.25rem;">Suggest</button>

  {#if suggestion}
    <p>Suggestion: <strong>{suggestion}</strong></p>
  {/if}

  {#if selectedFirst && !entry}
    <p>You selected: <strong>{selectedFirst}</strong></p>
  {/if}
</div>
