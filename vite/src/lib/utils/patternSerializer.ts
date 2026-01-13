import { SEQUENCER_CONSTANTS } from '../config/constants';

const SENTINEL = 'dm';

export interface SerializedPattern {
	[sampleName: string]: number[];
}

export interface SerializedData {
	bpm: number;
	patterns: SerializedPattern;
}

/**
 * Serializes patterns and BPM to a shareable base64 string format
 * Encodes: bpm:130|kick:1,0,0,0...|clap:0,0,1,0...|snare:...
 */
export function serializePatterns(patterns: { name: string; pattern: number[] }[], bpm: number): string {
	try {
		const patternStrings = [
			`bpm:${bpm}`,
			...patterns.map(
				({ name, pattern }) => `${name}:${pattern.join(',')}`
			)
		];
		const data = patternStrings.join('|');
		const encoded = btoa(data);
		return `${SENTINEL}${encoded}`;
	} catch {
		return '';
	}
}

/**
 * Deserializes base64 pattern string back to pattern objects and BPM
 * Returns null if format is invalid
 */
export function deserializePatterns(encoded: string): SerializedData | null {
	if (!encoded.startsWith(SENTINEL)) {
		return null;
	}

	try {
		const base64Content = encoded.slice(SENTINEL.length);
		const decoded = atob(base64Content);
		const patternPairs = decoded.split('|');
		const patterns: SerializedPattern = {};
		let bpm = SEQUENCER_CONSTANTS.DEFAULT_BPM;

		patternPairs.forEach(pair => {
			const [name, valueStr] = pair.split(':');
			if (!name || !valueStr) {
				throw new Error('Invalid pattern format');
			}

			if (name === 'bpm') {
				const bpmValue = parseInt(valueStr, 10);
				if (isNaN(bpmValue) || bpmValue < 1) {
					throw new Error('Invalid BPM value');
				}
				bpm = bpmValue;
			} else {
				const pattern = valueStr.split(',').map(s => {
					const num = parseInt(s, 10);
					if (isNaN(num) || (num !== 0 && num !== 1)) {
						throw new Error('Invalid pattern value');
					}
					return num;
				});

				patterns[name] = pattern;
			}
		});

		return { bpm, patterns };
	} catch {
		return null;
	}
}
