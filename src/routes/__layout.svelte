<script>
	import '../tailwind.postcss';
</script>

<svelte:head>
  <meta name="robots" content="noindex" />
</svelte:head>

<slot />

<style>
	:global(body) {
		/* Disables pull-to-refresh but allows overscroll glow effects. */
		overscroll-behavior-y: contain;
		background-color: #fff7f0;
	}
</style>