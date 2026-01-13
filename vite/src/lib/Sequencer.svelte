<script lang="ts">
	import { onMount } from 'svelte';
	import { sequencer, SEQUENCER_CONSTANTS, initializeAudio, playStep, nextStep, toggleStep } from './stores/sequencerStore';
	import ControlBar from './components/ControlBar.svelte';

	let stepDuration: number;
	let intervalId: number | null = null;

	$: stepDuration = (60 / $sequencer.bpm) * 1000 / SEQUENCER_CONSTANTS.QUARTERS_PER_STEP;

	function getStepButtonClass(isActive: number): string {
		return `w-6 h-6 flex-shrink-0 rounded ${isActive ? 'bg-black' : 'bg-gray-200'}`;
	}

	function scheduler() {
		if ($sequencer.isPlaying) {
			playStep($sequencer.samples, $sequencer.currentStep);
			nextStep();
		}
	}

	onMount(() => {
		sequencer.update(s => ({
			...s,
			samples: initializeAudio(s.samples)
		}));
		
		intervalId = setInterval(scheduler, stepDuration) as unknown as number;

		return () => {
			if (intervalId) clearInterval(intervalId);
		};
	});

	$: if (intervalId && stepDuration) {
		clearInterval(intervalId);
		intervalId = setInterval(scheduler, stepDuration) as unknown as number;
	}
</script>

<div class="flex flex-col m-5 items-center justify-center">
	<h1 class="text-2xl font-bold mb-4">drum machine</h1>
	
	<ControlBar />

	<div class="bg-white shadow-md rounded-lg p-6 w-full">
		{#each $sequencer.samples as sample, sampleIndex}
			<div class="flex items-center space-x-2 mb-4">
				<span class="w-16 text-right mr-4 flex-shrink-0">{sample.name}</span>
				<div class="flex justify-center space-x-1 flex-wrap">
					{#each sample.pattern as step, stepIndex}
						<button 
							class={getStepButtonClass(step)}
							aria-label="Step {stepIndex + 1} for {sample.name}"
							on:click={() => toggleStep(sampleIndex, stepIndex)}
						></button>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>