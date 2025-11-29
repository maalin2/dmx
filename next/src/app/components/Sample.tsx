"use client";

import { useRef, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"

export const Sample = ( props ) => {
	const bpm = props.bpm;
	// 16th notes
	const stepsPerBeat = 4; 
	const stepDuration = (60 / bpm) / stepsPerBeat;
	const steps = 32;

	const sample = props.sample;
	const audioCtxRef = useRef<AudioContext | null>(null);
	const bufferRef = useRef<AudioBuffer | null>(null);


	const currentStepRef = useRef(0);
	const nextNoteRef = useRef(0);

	const passedPattern = props.pattern;
	const [pattern, setPattern] = useState(passedPattern);

	const patternRef = useRef(pattern);

	useEffect(() => {
		patternRef.current = pattern;
	}, [pattern]);

	// load a sample
	async function loadSample(url) {
		const res = await fetch(url);
		const buf = await res.arrayBuffer();
		return await audioCtxRef.current.decodeAudioData(buf);
	};

	// schedule a note
	async function playSample(time) {
		const src = audioCtxRef.current.createBufferSource();
		src.buffer = bufferRef.current;
		src.connect(audioCtxRef.current.destination);
		src.start(time);
	};

	const scheduler = () => {
		const lookAhead = 0.1;

		while (nextNoteRef.current < audioCtxRef.current.currentTime + lookAhead) {
			const step = currentStepRef.current;

			if (patternRef.current[step] === 1) {
				playSample(nextNoteRef.current);
			}

			currentStepRef.current = (currentStepRef.current + 1) % steps;
			nextNoteRef.current += stepDuration;
		}
	}

	useEffect(() => {
		audioCtxRef.current = new AudioContext();

		loadSample(sample).then(buf => {
			bufferRef.current = buf;

			nextNoteRef.current = audioCtxRef.current.currentTime;

			setInterval(() => {
				scheduler();
			}, 1);
		});

	}, []);

	return (
		<div className="flex items-center justify-center items-col mx-10">
		<p className="mr-10">{ props.name }</p>
		{
			pattern.map((play, displayIdx) =>
				    <Button 
				    key={displayIdx} 
				    size="icon-sm" 
				    variant={play ? "default" : "outline"} 
				    onClick={() => setPattern(prev =>
							      prev.map((cur, curIdx) => {
								      return curIdx === displayIdx ? !cur : cur;
							      }))
				    }>
				    </Button>
				   )
		}
		</div>
	);
}
