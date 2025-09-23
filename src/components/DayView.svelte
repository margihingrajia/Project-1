<script>
  export let selectedDay;
  export let mockEntries;
  let editMode = false;
  let dayData = structuredClone(mockEntries[selectedDay] || {});

  // Handle new image uploads for PhotoMemory
  function handleImageUpload(event) {
    const files = event.target.files;
    if (!files.length) return;

    if (!dayData.PhotoMemory) dayData.PhotoMemory = [];

    for (let file of files) {
      const reader = new FileReader();
      reader.onload = () => {
        dayData.PhotoMemory.push({ type: 'image', src: reader.result, caption: '' });
      };
      reader.readAsDataURL(file);
    }
  }

  function toggleEdit() { editMode = !editMode; }

  function saveChanges() {
    mockEntries[selectedDay] = dayData;
    localStorage.setItem("littleMoments", JSON.stringify(mockEntries));
    alert("Changes saved!");
    editMode = false;
  }

  function removePhoto(index) {
    dayData.PhotoMemory.splice(index, 1);
  }
</script>

<div class="container">
  <h2>{selectedDay} Entries</h2>

  <div class="grid">
    {#each Object.entries(dayData) as [key, value]}
      <div class="card dayview-card">
        <h3>{key}</h3>

        {#if key === 'PhotoMemory'}
          <div class="photo-container">
            {#each value as item, i}
              <div class="photo-item">
                {#if item.type === 'image'}
                  <img src={item.src} alt={item.caption} class="memory-img" />
                {:else if item.type === 'video'}
                  <video src={item.src} controls class="memory-video"></video>
                {/if}
                {#if editMode}
                  <input type="text" placeholder="Caption" bind:value={item.caption} />
                  <button class="remove-btn" on:click={() => removePhoto(i)}>Remove</button>
                {:else}
                  <p>{item.caption}</p>
                {/if}
              </div>
            {/each}
          </div>

          {#if editMode}
            <input type="file" accept="image/*,video/*" multiple on:change={handleImageUpload} />
          {/if}

        {:else if editMode}
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

<style>
.memory-img { max-width: 200px; border-radius: 12px; margin: 0.5rem; display:block; }
.memory-video { max-width: 300px; border-radius: 12px; margin: 0.5rem; display:block; }
.photo-container { display: flex; flex-wrap: wrap; gap: 1rem; }
.photo-item { display: flex; flex-direction: column; align-items: center; }
.photo-item input[type="text"] { width: 150px; margin-top: 0.3rem; padding: 0.3rem; border-radius: 6px; border: 1px solid #ccc; }
.remove-btn { margin-top: 0.3rem; background: #f44336; color: #fff; border: none; padding: 0.3rem 0.5rem; border-radius: 6px; cursor: pointer; }
.remove-btn:hover { background: #d32f2f; }
</style>
