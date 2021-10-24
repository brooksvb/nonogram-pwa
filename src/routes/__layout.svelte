<script>
	import '../tailwind.postcss';
	import { base } from '$app/paths';
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
	<link rel="icon" href="{base}/favicon.png" />
	<link rel="manifest" crossorigin="use-credentials" href="{base}/manifest.json">
</svelte:head>

<slot />

<style>
	:global(body) {
		/* Disables pull-to-refresh but allows overscroll glow effects. */
		overscroll-behavior-y: contain;
		background-color: #fff7f0;
	}
</style>