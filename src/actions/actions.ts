import { Action } from "redux";

export const START_ACTION = 'start';
export const STOP_ACTION = 'stop';
export const RESET_ACTION = 'reset';
export const TICK = 'tick';
export const COMPLETE_CURRENT_SEGMENT_ACTION = 'complete_current_segment';
export const SET_CONFIG_ACTION = 'set_config';
export const RESET_SEGMENTS_ACTION = 'reset_segment';

export function tick() {
    return {
        type: TICK
    };
}

export function startAction(remainingTime: number): IStartAction {
    return {
        type: START_ACTION,
        remainingTime
    };
}

export interface IStopAction extends Action {
    remainingTime: number;
}

export interface IStartAction extends Action {
    remainingTime: number;
}

export function resetSegmentsAction(): Action {
    return {
        type: RESET_SEGMENTS_ACTION
    };
}

export function stopAction(remainingTime: number): IStopAction {
    return {
        type: STOP_ACTION,
        remainingTime
    };
}

export function resetAction() {
    return {
        type: RESET_ACTION
    };
}

export interface ICompleteCurrentSegmentAction extends Action {
    nextSegmentTime: number;
    shouldPause: boolean;
}

export function completeCurrentSegmentAction(nextSegmentTime: number, shouldPause: boolean): ICompleteCurrentSegmentAction {
    return {
        type: COMPLETE_CURRENT_SEGMENT_ACTION,
        nextSegmentTime,
        shouldPause
    };
}

export function setConfigAction() {
    return {
        type: SET_CONFIG_ACTION
    };
}
