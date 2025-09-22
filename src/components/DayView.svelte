<script>
  export let selectedDay;
  export let mockEntries;
  let editMode = false;
  let dayData = structuredClone(mockEntries[selectedDay] || {});

  function toggleEdit() { editMode = !editMode; }

  function saveChanges() {
    mockEntries[selectedDay] = dayData;
    localStorage.setItem("littleMoments", JSON.stringify(mockEntries));
    alert("Changes saved!");
    editMode = false;
  }
</script>

<div class="container">
  <h2>{selectedDay} Entries</h2>

  <div class="grid">
    {#each Object.entries(dayData) as [key, value]}
      <div class="card dayview-card">
        <h3>{key}</h3>
        {#if editMode}
          <textarea bind:value={dayData[key]}></textarea>
        {:else}
          <p>{value}</p>
        {/if}
      </div>
    {/each}
  </div>

  <div style="margin-top:1.5rem; text-align:center;">
    {#if editMode}
      <button on:click={saveChanges}>💾 Save</button>
      <button on:click={toggleEdit} style="margin-left:0.5rem;">Cancel</button>
    {:else}
      <button on:click={toggleEdit}>✏️ Edit</button>
    {/if}
  </div>
</div>
