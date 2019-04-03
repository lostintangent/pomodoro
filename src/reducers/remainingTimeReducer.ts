
import { Action } from 'redux';
import { TICK, STOP_ACTION, COMPLETE_CURRENT_SEGMENT_ACTION, ICompleteCurrentSegmentAction, IStopAction, IStartAction, START_ACTION } from '../actions/actions';

import { config } from '../pomodoroConfig';

export const remainingTimeReducer = (currentRemainingTime: number = config.intervalDuration, action: Action<any>): number => {
    switch (action.type) {
      case START_ACTION: {
        return (action as IStartAction).remainingTime;
      }
      case TICK: {
        return Math.max(--currentRemainingTime, 0);
      }
      case COMPLETE_CURRENT_SEGMENT_ACTION: {
        return (action as ICompleteCurrentSegmentAction).nextSegmentTime;
      }
      case STOP_ACTION: {
        return (action as IStopAction).remainingTime;
      }
    }
    
    return currentRemainingTime;
  }
