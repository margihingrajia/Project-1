<script>
  export let entries = {};
  let media = "";
  let memoryText = "";

  function handleFile(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        media = reader.result;
        updateEntries();
      };
      reader.readAsDataURL(file);
    }
  }

  function updateEntries() {
    entries.photoMemory = { media, memoryText };
  }
</script>

<div class="card card-photo">
  <h2>Photo / Memory</h2>

  <!-- File input -->
  <input type="file" accept="image/*,video/*" on:change={handleFile} />

  <!-- Memory description -->
  <textarea
    placeholder="Describe the memory related to this photo or video..."
    bind:value={memoryText}
    on:input={updateEntries}
    style="margin-top: 0.5rem;"
  ></textarea>

  <!-- Preview -->
  {#if media}
    <p style="margin-top: 0.5rem;">Preview:</p>
    {#if media.startsWith("data:image")}
      <img src={media} alt="memory" style="max-width:100%; border-radius: 8px;" />
    {:else if media.startsWith("data:video")}
      <video controls style="max-width:100%; border-radius: 8px;">
        <source src={media} />
        Your browser does not support the video tag.
      </video>
    {/if}
  {/if}
</div>
