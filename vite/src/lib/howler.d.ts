declare module 'howler' {
    export interface HowlOptions {
        src: string | string[];
        html5?: boolean;
        preload?: boolean;
        volume?: number;
    }

    export class Howl {
        constructor(options: HowlOptions);
        play(): number;
        stop(): this;
        volume(vol?: number): number | this;
    }

    export const Howler: {
        volume(vol?: number): number | void;
    };
}