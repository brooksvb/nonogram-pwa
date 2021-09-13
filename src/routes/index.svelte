<script>
	let rows = 5;
	let cols = 5;
</script>

<main class="text-center mt-32">
	<h1 class="text-4xl">NonoGame</h1>
	<p class="mb-4">Welcome to NonoGame</p>

	<div class="inline-block bg-gray-300 p-8">
		<h4>Set size of grid and click Play</h4>

		<div class="flex justify-center items-center mt-4">
			<div class="inline-flex flex-col items-end mr-4">
				<div class="mb-2">
					<label for="rows">Rows</label>
					<input name="rows" type="number" min="5" max="15" bind:value={rows}>
				</div>
				<div>
					<label for="cols">Columns</label>
					<input name="cols" type="number" min="5" max="15" bind:value={cols}>
				</div>
			</div>
	
			<a sveltekit:prefetch href="game?rows={rows}&cols={cols}"
			class="inline-block p-8 bg-yellow-500 text-2xl rounded-md active:filter active:brightness-[.85]"
			>Play Game</a>
		</div>
	</div>
</main>
