import { minuteMs, secondMs } from "../constants";

export const msToTimeString = (ms: number): string => {
    const minutes = Math.floor(ms / minuteMs);
    const msLeft = ms - (minutes * minuteMs);
    const seconds = Math.round(msLeft / secondMs);

    return `${minutes}:${seconds}`;
};
