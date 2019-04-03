import { SET_CONFIG_ACTION } from '../actions/actions';
import { Action } from 'redux';
import { IPomodoroConfig } from '../IAppState';

import { config } from "../pomodoroConfig";

export const configReducer = (state: IPomodoroConfig = config, action: Action<any>): IPomodoroConfig => {
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