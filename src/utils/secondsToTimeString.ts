export const secondsToTimeString = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    let remainingSeconds = `${seconds % 60}`;

    if (remainingSeconds.length === 1) {
        remainingSeconds = `0${remainingSeconds}`;
    }

    return `${minutes}:${remainingSeconds}`;
};
