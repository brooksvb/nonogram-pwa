<script>
	import { page } from "$app/stores";
	import NonoGame from "/src/components/NonoGame.svelte";

	let rows = parseInt($page.query.get('rows'));
	let cols = parseInt($page.query.get('cols'));
	if (!(rows >= 5 && rows <= 15)) rows = 5;
	if (!(cols >= 5 && cols <= 15)) cols = 5;
</script>
	
<NonoGame {rows} {cols} />