// to use hooks
"use client";

import { useRef, useEffect, useState } from 'react';
import { Howl } from 'howler';
import { Pattern } from "./components/Pattern";

const bpm = 130;
// 16th notes
const stepsPerBeat = 4; 
const stepDuration = (60 / bpm) * 1000 / stepsPerBeat;
const steps = 32;

const kick = new Howl({
	src: ['./kick.wav'],
	html5: true,
	preload: true
});

const snare = new Howl({
	src: ['./snare.wav'],
	html5: true,
	preload: true
});

const clap = new Howl({
	src: ['./clap.wav'],
	html5: true,
	preload: true
});

const kickPattern = [
	1, 0, 0, 0, 
	1, 0, 0, 0, 
	1, 1, 1, 1,
	1, 1, 1, 1,
	1, 0, 0, 0, 
	1, 0, 0, 0, 
	1, 1, 1, 1,
	1, 1, 1, 1,
];

const snarePattern = [
	0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
	0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0
];

const clapPattern = [
	0, 0, 0, 0, 0, 0, 1, 0,
	0, 0, 0, 0, 0, 0, 1, 0,
	0, 0, 0, 0, 0, 0, 1, 0,
	0, 0, 0, 0, 0, 0, 1, 1
];

export default function Home() {
	// when we mount or finish loading page, play simple pattern
	// lookahead with requestAnimationBuffer
	const [playing, setPlaying] = useState("");
//	const currentStep = useRef(0);
//	const nextStep = useRef(performance.now());
//
//	useEffect(() => {
//		const scheduleAheadTime = 100; // ms
//			
//		const scheduler = () => {
//			const now = performance.now();
//
//			while (nextStep.current < now + scheduleAheadTime && currentStep.current < steps) {
//				const step = currentStep.current;
//
//				let nowPlaying = '';
//
//				if (kickPattern[step] === 1) { nowPlaying += 'kick'; kick.play(); }
//				if (snarePattern[step] === 1) { nowPlaying += ' snare'; snare.play(); }
//				if (clapPattern[step] === 1) { nowPlaying += ' clap'; clap.play(); }
//
//				if (nowPlaying) setPlaying(nowPlaying);
//
//				currentStep.current += 1;
//				nextStep.current += stepDuration;
//			}
//
//
//			if (currentStep.current < steps) {
//				requestAnimationFrame(scheduler);
//			}
//		};
//
//		requestAnimationFrame(scheduler);
//	}, [])



	return (
		// flex-col to stack elements
		// margin-5 for breathing room
		<div className="flex flex-col m-5 items-center justify-center">
		<h1 className="text-xl font-bold"> kick </h1>
		<h1 className="text-xl font-bold"> snare </h1>
		<h1 className="text-xl font-bold"> clap </h1>
		<h1 className="text-xl font-bold"> now playing: {playing} </h1>
		<Pattern />
		</div>
	);
	// add Pattern
}
