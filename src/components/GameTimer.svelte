<script>
	import { timerStore } from "/src/stores";


	let time = '00:00';
	$: {
		let date = new Date(null);
		date.setSeconds($timerStore);
		let minutes = String(date.getMinutes()).padStart(2, '0');
		let seconds = String(date.getSeconds()).padStart(2, '0');
		time = `${minutes}:${seconds}`;
	}
</script>

<span class="mr-6">{time}</span>
