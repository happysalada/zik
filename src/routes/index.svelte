<script lang="ts">
	import type { DropEvent, FileState } from "globals";
	import Dropzone from "svelte-file-dropzone";
	import Line from "svelte-chartjs/src/Line.svelte"

	let files: FileState = {
		accepted: [],
		rejected: [],
	};

	function handleFilesSelect(event: DropEvent) {
		const { acceptedFiles, fileRejections } = event.detail;
		files.accepted = [...files.accepted, ...acceptedFiles];
		files.rejected = [...files.rejected, ...fileRejections];
	}

	let dataLine: any;

	async function submitForm(event: Event) {
		event.preventDefault();

		const dataArray = new FormData();
		files.accepted.forEach((file) => dataArray.append("file", file));

		let res = await fetch("http://localhost:8787/audiowave", {
			method: "POST",
			body: dataArray,
		});
		let array: [{min: number, max: number}] = await res.json();
		// https://www.chartjs.org/docs/latest/charts/line.html
		dataLine = {
			// first 100 points only, change to view more
			labels: Array.from(Array(100).keys()),
			datasets: [
				{
					label: "Max",
					lineTension: 0.3,
					borderColor: "rgb(205, 130, 158)",
					data: array.map(({max}) => max)
				},
				{
					label: "Min",
					lineTension: 0.3,
					borderColor: "rgb(35, 26, 136)",
					data: array.map(({min}) => min),
				},
			],
		};
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
		<div class="mt-8 flex justify-center">
			<div class="inline-flex rounded-md shadow">
				<input
					class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
					type="submit"
				/>
			</div>
		</div>
	</form>
	{#if dataLine}
		<Line data={dataLine} options={{ responsive: true}} />
	{/if}
</div>
