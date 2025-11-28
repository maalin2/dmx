import { Button } from "@/components/ui/button"
import { useRef, useState, useEffect } from 'react';
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"


// TODO add props, generalize kick to a drum
export const Pattern = () => {
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

	const currentStep = useRef(0);
	const nextStep = useRef(performance.now());

	const [kickPattern, setKickPattern] = useState([
		1, 0, 0, 0, 
		1, 0, 0, 0, 
		1, 1, 1, 1,
		1, 1, 1, 1,
		1, 0, 0, 0, 
		1, 0, 0, 0, 
		1, 1, 1, 1,
		1, 1, 1, 1,
	]);

	const kickPatternRef = useRef(kickPattern);
	useEffect(() => {
		kickPatternRef.current = kickPattern;

	}, [kickPattern]);

	useEffect(() => {
		const scheduleAheadTime = 100; // ms

		const scheduler = () => {
			const now = performance.now();

			while (nextStep.current < now + scheduleAheadTime) {
				const step = currentStep.current;

				if (kickPatternRef.current[step] === 1) kick.play();

				currentStep.current = (currentStep.current + 1) % steps;
				nextStep.current += stepDuration;
			}

			requestAnimationFrame(scheduler);
		};

		requestAnimationFrame(scheduler);
	}, [])

	return <div className="flex mt-20 items-center justify-center">
	<Card>
	<div className="flex items-center justify-center items-col mx-10">
	<p className="mr-10">kick</p>
	{
		kickPattern.map((play, displayIdx) =>
				<Button 
				key={displayIdx} 
				size="icon-sm" 
				variant={play ? "default" : "outline"} 
				onClick={() => setKickPattern(prev =>
						      prev.map((cur, curIdx) => {
							      return curIdx === displayIdx ? !cur : cur;
						      }))
				}>
				</Button>
			       )
	}
	</div>
	</Card>
	</div>;


}

