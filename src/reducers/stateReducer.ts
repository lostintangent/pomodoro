import { START_ACTION, PAUSE_ACTION, RESET_ACTION, STOP_ACTION, COMPLETE_CURRENT_SEGMENT_ACTION, RESET_SEGMENTS_ACTION, ICompleteCurrentSegmentAction } from '../actions/actions';
import { Action } from 'redux';
import { IState } from '../IAppState';

const DEFAULT_STATE_STATE = {
  isPaused: true,
  isBreak: true,
  isFinished: false
};

export const stateReducer = (state: IState = DEFAULT_STATE_STATE, action: Action<any>): IState => {
    switch (action.type) {
      case START_ACTION:
        return {
            ...state,
            isBreak: false,
            isPaused: false,
            isFinished: false
        }
  
        case PAUSE_ACTION:
          return {
              ...state,
              isPaused: true
            }
          break;
  
        case RESET_ACTION:
          break;
        case STOP_ACTION:
          return {
            ...state,
            isPaused: true
          }
        case COMPLETE_CURRENT_SEGMENT_ACTION:
          const { shouldPause } = (action as ICompleteCurrentSegmentAction);

          return {
            ...state,
            isBreak: true,
            isPaused: shouldPause
          }

        case RESET_SEGMENTS_ACTION:
          return {
            ...state,
            isBreak: false,
            isPaused: true,
            isFinished: true
          }
        break;
    }
    
    return state;
  }