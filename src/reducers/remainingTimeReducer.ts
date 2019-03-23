
import { Action } from 'redux';
import { TICK, STOP_ACTION } from '../actions/actions';

const DEFAULT_REMAINING_TIME = 25 * 60; // 25 minutes in seconds

export const remainingTimeReducer = (currentRemainingTime: number = DEFAULT_REMAINING_TIME, action: Action<any>): number => {
    switch (action.type) {
      case TICK: {
        return Math.max(--currentRemainingTime, 0);
      }
      case STOP_ACTION: {
        return DEFAULT_REMAINING_TIME;
      }
    }
    
    return currentRemainingTime;
  }
