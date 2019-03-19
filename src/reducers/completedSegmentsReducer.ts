import { COMPLETE_CURRENT_SEGMENT_ACTION } from '../actions/actions';
import { Action } from 'redux';

const DEFAULT_COMPLETED_SEGMENTS = 0;

export const completedSegmentsReducer = (state: number = DEFAULT_COMPLETED_SEGMENTS, action: Action<any>): number => {
    switch (action.type) {
      case COMPLETE_CURRENT_SEGMENT_ACTION:
        return state + 1
        break;
    }
    
    return state;
  }