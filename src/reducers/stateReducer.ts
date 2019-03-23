import { START_ACTION, PAUSE_ACTION, RESET_ACTION, STOP_ACTION } from '../actions/actions';
import { Action } from 'redux';
import { IState } from '../IAppState';

const DEFAULT_STATE_STATE = {
  isPaused: true,
  isBreak: true
};

export const stateReducer = (state: IState = DEFAULT_STATE_STATE, action: Action<any>): IState => {
    switch (action.type) {
      case START_ACTION:
        return {
            ...state,
            isPaused: false
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
        break;
    }
    
    return state;
  }