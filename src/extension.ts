import * as vscode from "vscode";

import { registerLiveShareSessionProvider } from "./tree-provider";

import { COMMAND_IDS, State } from "./constants";
import { config } from "./pomodoroConfig";
import { createStore, Action, combineReducers } from 'redux';
import { startAction, pauseAction, resetAction } from "./actions/actions";
import { stateReducer } from "./reducers/stateReducer";
import { configReducer, remainingTimeReducer, completedSegmentsReducer } from "./reducers";
import { Clock } from "./clock";

const setExtensionContext = async (state: State) => {
  await vscode.commands.executeCommand(
    "setContext",
    "liveshare.pomodoro.state",
    state
  );
};

const reducer = combineReducers({
  completedSegments: completedSegmentsReducer,
  remainingTime: remainingTimeReducer,
  config: configReducer,
  state: stateReducer,
});

export async function activate(context: vscode.ExtensionContext) {
  const store = createStore(reducer);

  new Clock(store);

  registerLiveShareSessionProvider(store);

  store.subscribe(async () => {
    const { state } = store.getState();
    await setExtensionContext(state.isBreak ? State.paused : State.running)    
  });
  
  const startCommand = vscode.commands.registerCommand(
    COMMAND_IDS.start,
    async () => {
      store.dispatch(startAction());
    }
  );

  const pauseCommand = vscode.commands.registerCommand(
    COMMAND_IDS.pause,
    async () => {
      const { remainingTime } = store.getState();
      store.dispatch(pauseAction(remainingTime));
    }
  );

  const resetCommand = vscode.commands.registerCommand(
    COMMAND_IDS.reset,
    async () => {
      store.dispatch(resetAction());
    }
  );

  context.subscriptions.push(startCommand, pauseCommand, resetCommand);
}

export function deactivate() {}
