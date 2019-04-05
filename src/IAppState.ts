export interface IAppState {
    remainingTime: number;
    state: IState;
    completedSegments: number;
    config: IPomodoroConfig;
}

export interface IState {
    isPaused: boolean;
    isBreak: boolean;
    isFinished: boolean;
}

export interface IPomodoroConfig {
    breakDuration: number;
    intervalCount: number;
    intervalDuration: number;
    longBreakDuration: number;
}

export const START_ACTION = 'start';
export const STOP_ACTION = 'stop';
export const RESET_ACTION = 'reset';
export const PAUSE_ACTION = 'pause';
export const UPDATE_REMAINING_TIME_ACTION = 'update.remaining.time';

export function startAction() {
    return {
        type: START_ACTION
    };
}

export function stopAction() {
    return {
        type: STOP_ACTION
    };
}

export function pauseAction(remainingTime: number) {
    return {
        type: PAUSE_ACTION,
        remainingTime
    };
}

export function resetAction() {
    return {
        type: RESET_ACTION
    };
}


/***
Stopped - You haven't started a timer, or you reset the timer
  Actions: Start, Reset
Paused - You paused the timer or re in a break
  Actions: Resume, Reset  
Running - Witin a current timer
  Which interval are you within
  How much timer is left

  Actions: Stop, Pause, Reset
*/