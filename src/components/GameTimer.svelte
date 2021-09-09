<script>
	import { timerStore } from "/src/stores";


	let time = '00:00';
	$: {
		let date = new Date(null);
		date.setSeconds($timerStore);
		time = date.toISOString().substr(14, 5);
	}
</script>

<span class="mr-6">{time}</span>
