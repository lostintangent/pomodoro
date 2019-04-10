import { COMPLETE_CURRENT_SEGMENT_ACTION, ICompleteCurrentSegmentAction, RESET_SEGMENTS_ACTION, RESET_ACTION } from '../actions/actions';
import { Action } from 'redux';

const DEFAULT_COMPLETED_SEGMENTS = 0;

export const completedSegmentsReducer = (state: number = DEFAULT_COMPLETED_SEGMENTS, action: Action<any>): number => {
    switch (action.type) {
      case COMPLETE_CURRENT_SEGMENT_ACTION: {
        const { shouldPause } = action as ICompleteCurrentSegmentAction;

        return state + ((shouldPause) ? 0 : 1);
      }
      case RESET_ACTION:
      case RESET_SEGMENTS_ACTION: {
        return DEFAULT_COMPLETED_SEGMENTS;
      }
    }
    
    return state;
  }