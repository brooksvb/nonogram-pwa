<script>
	export let completionTime;

	let date = new Date(null);
	date.setSeconds(completionTime);
	let minutes = String(date.getMinutes()).padStart(2, '0');
	let seconds = String(date.getSeconds()).padStart(2, '0');
	const completionTimeString = `${minutes}:${seconds}`;

</script>

<div class="w-screen h-screen fixed z-10 flex flex-col justify-center items-center bg-yellow-300 text-center">
	<h1 class="text-4xl mb-4">You completed this nonogram!</h1>
	<p class="text-2xl">Your completion time: <span class="text-green-500">{completionTimeString}</span></p>

	<a href="." on:click="{() => {location.reload(); return false;}}" class="text-xl border-green-500 bg-green-300 rounded-md">Play Again</a>
	<a href="/" class="text-xl border-blue-500 bg-blue-300 rounded-md">Return to Main Menu</a>
</div>


<style lang="postcss">
	a {
		@apply p-4 my-2 border-2;
	}
</style>