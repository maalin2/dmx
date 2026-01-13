import { writable } from 'svelte/store';
import { Howl } from 'howler';
import { SAMPLES_CONFIG } from '../config/samples';
import { SEQUENCER_CONSTANTS } from '../config/constants';

export { SEQUENCER_CONSTANTS };

export interface Sample {
	name: string;
	src: string;
	howl: Howl | null;
	pattern: number[];
}

export const sequencer = writable<{
	samples: Sample[];
	currentStep: number;
	isPlaying: boolean;
	bpm: number;
}>({
	samples: SAMPLES_CONFIG.map(config => ({
		...config,
		howl: null
	})),
	currentStep: 0,
	isPlaying: false,
	bpm: SEQUENCER_CONSTANTS.DEFAULT_BPM
});

export function togglePlayStop() {
	sequencer.update(s => ({ ...s, isPlaying: !s.isPlaying }));
}

export function toggleStep(sampleIndex: number, stepIndex: number) {
	sequencer.update(s => {
		const samples = [...s.samples];
		samples[sampleIndex] = { ...samples[sampleIndex], pattern: [...samples[sampleIndex].pattern] };
		samples[sampleIndex].pattern[stepIndex] = samples[sampleIndex].pattern[stepIndex] ? 0 : 1;
		return { ...s, samples };
	});
}

export function setBpm(bpm: number) {
	sequencer.update(s => ({ ...s, bpm }));
}

export function setSamples(samples: Sample[]) {
	sequencer.update(s => ({ ...s, samples }));
}

export function initializeAudio(samples: Sample[]) {
	return samples.map(sample => ({
		...sample,
		howl: new Howl({ src: [sample.src] })
	}));
}

export function playStep(samples: Sample[], currentStep: number) {
	samples.forEach(sample => {
		if (sample.howl && sample.pattern[currentStep] === 1) {
			sample.howl.play();
		}
	});
}

export function nextStep() {
	sequencer.update(s => ({
		...s,
		currentStep: (s.currentStep + 1) % SEQUENCER_CONSTANTS.STEPS_PER_PATTERN
	}));
}
