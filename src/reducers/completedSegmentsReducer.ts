import { COMPLETE_CURRENT_SEGMENT_ACTION, ICompleteCurrentSegmentAction } from '../actions/actions';
import { Action } from 'redux';

const DEFAULT_COMPLETED_SEGMENTS = 0;

export const completedSegmentsReducer = (state: number = DEFAULT_COMPLETED_SEGMENTS, action: Action<any>): number => {
    switch (action.type) {
      case COMPLETE_CURRENT_SEGMENT_ACTION: {
        const { shouldPause } = action as ICompleteCurrentSegmentAction;

        return state + ((shouldPause) ? 0 : 1);
      }
    }
    
    return state;
  }