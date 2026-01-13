<script lang="ts">
	import { sequencer, togglePlayStop, setBpm, setSamples, SEQUENCER_CONSTANTS } from '../stores/sequencerStore';
	import { serializePatterns, deserializePatterns } from '../utils/patternSerializer';

	function exportPattern() {
		const encoded = serializePatterns($sequencer.samples, $sequencer.bpm);
		navigator.clipboard.writeText(encoded);
		alert('Pattern copied to clipboard!');
	}

	function importPattern() {
		const encoded = prompt('Paste the pattern code:');
		if (!encoded) return;

		const deserialized = deserializePatterns(encoded);
		if (!deserialized) {
			alert('Invalid pattern code');
			return;
		}

		setBpm(deserialized.bpm);
		const updatedSamples = $sequencer.samples.map(sample => ({
			...sample,
			pattern: deserialized.patterns[sample.name] || sample.pattern
		}));
		setSamples(updatedSamples);
		alert('Pattern imported!');
	}
</script>

<div class="flex items-center gap-6 mb-6">
	<button 
		class="px-6 py-2 rounded font-bold border border-gray-300 {$sequencer.isPlaying ? 'bg-black text-white' : 'bg-white text-black'}"
		on:click={togglePlayStop}
	>
		{$sequencer.isPlaying ? 'stop' : 'play'}
	</button>
	
	<div class="flex items-center gap-3">
		<label for="bpm-slider" class="text-sm font-medium">bpm</label>
		<input 
			id="bpm-slider"
			type="range" 
			min={SEQUENCER_CONSTANTS.MIN_BPM}
			max={SEQUENCER_CONSTANTS.MAX_BPM}
			value={$sequencer.bpm}
			on:input={(e) => setBpm(Number(e.currentTarget.value))}
			class="w-32"
		/>
		<span class="text-sm font-medium w-8">{$sequencer.bpm}</span>
	</div>

	<button 
		class="px-4 py-2 rounded font-bold border border-gray-300 bg-white text-black text-sm"
		on:click={exportPattern}
	>
		export
	</button>

	<button 
		class="px-4 py-2 rounded font-bold border border-gray-300 bg-white text-black text-sm"
		on:click={importPattern}
	>
		import
	</button>
</div>
