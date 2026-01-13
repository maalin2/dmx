export interface SampleConfig {
	name: string;
	src: string;
	pattern: number[];
}

export const SAMPLES_CONFIG: SampleConfig[] = [
	{
		name: 'kick',
		src: '/kick.wav',
		pattern: [1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1]
	},
	{
		name: 'clap',
		src: '/clap.wav',
		pattern: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1]
	},
	{
		name: 'snare',
		src: '/snare.wav',
		pattern: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]
	}
];
