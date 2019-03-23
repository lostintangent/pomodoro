export const START_ACTION = 'start';
export const STOP_ACTION = 'stop';
export const RESET_ACTION = 'reset';
export const PAUSE_ACTION = 'pause';
export const TICK = 'tick';
export const COMPLETE_CURRENT_SEGMENT_ACTION = 'complete_current_segment';
export const SET_CONFIG_ACTION = 'set_config';

export function tick() {
    return {
        type: TICK
    };
}

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

export function completeCurrentSegmentAction() {
    return {
        type: COMPLETE_CURRENT_SEGMENT_ACTION
    };
}

export function setConfigAction() {
    return {
        type: SET_CONFIG_ACTION
    };
}
