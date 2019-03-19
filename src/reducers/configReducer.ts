import { SET_CONFIG_ACTION } from '../actions/actions';
import { Action } from 'redux';
import { IPomodoroConfig } from '../IAppState';

const DEFAULT_POMODORO_CONFIG = {
  breakDuration: 0,
  intervalCount: 0,
  intervalDuration: 0,
  longBreakDuration: 0,
};

export const configReducer = (state: IPomodoroConfig = DEFAULT_POMODORO_CONFIG, action: Action<any>): IPomodoroConfig => {
    switch (action.type) {
      case SET_CONFIG_ACTION:
        return {
            ...state,
            ...(action as any).config
          }
        break;
    }
    
    return state;
  }