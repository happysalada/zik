<script lang="ts">
  import type { DropEvent, FileState } from "globals";
  import Dropzone from "svelte-file-dropzone";

  let files: FileState = {
    accepted: [],
    rejected: []
  };

  function handleFilesSelect(event: DropEvent) {
    const { acceptedFiles, fileRejections } = event.detail;
    files.accepted = [...files.accepted, ...acceptedFiles];
    files.rejected = [...files.rejected, ...fileRejections];
  }

  async function submitForm(event: Event){
    event.preventDefault();

    const dataArray = new FormData();
    files.accepted.forEach(file => dataArray.append("file", file));

    console.log(dataArray);
    let res = await fetch("http://localhost:8787/audiowave", {
      method: "POST",
      headers: [["Content-Type", "multipart/form-data"]],
      body: dataArray
    })
    console.log(res)
  }
</script>

<Dropzone on:drop={handleFilesSelect}>
  <p>Drop your music file here to get the audiowave</p>
</Dropzone>
<ol>
  {#each files.accepted as item}
    <li>{item.name}</li>
  {/each}
</ol>

<div>
  <form on:submit={submitForm}>
    <input type="submit" />
  </form>
</div>