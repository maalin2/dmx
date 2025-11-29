import { Sample } from "./Sample"
import {
	Card,
} from "@/components/ui/card"


export const Pattern = () => {
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

	return <div className="flex mt-20 items-center justify-center">
		<Card>
			<Sample
				name="kick"
				bpm={ 130 }
				sample={'./kick.wav'}
				pattern={ kickPattern }
			/>
			<Sample
				name="snare"
				bpm={ 130 }
				sample={'./snare.wav'}
				pattern={ snarePattern }
			/>
			<Sample
				name="clap"
				bpm={ 130 }
				sample={'./clap.wav'}
				pattern={ clapPattern }
			/>
		</Card>
	</div>;


}

