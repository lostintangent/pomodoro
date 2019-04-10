import * as vscode from "vscode";

import { registerLiveShareSessionProvider } from "./tree-provider";

import { COMMAND_IDS, State } from "./constants";
import { createStore, combineReducers, Action } from 'redux';
import { startAction, resetAction, TICK, stopAction, COMPLETE_CURRENT_SEGMENT_ACTION, RESET_SEGMENTS_ACTION } from "./actions/actions";
import { stateReducer } from "./reducers/stateReducer";
import { configReducer, remainingTimeReducer, completedSegmentsReducer } from "./reducers";
import { Clock } from "./clock";
import { shareState, vslsStoreEnhancer} from 'vsls-redux';
import { IAppState } from "./IAppState";

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

function actionFilter(action: Action): boolean {
  return [TICK, COMPLETE_CURRENT_SEGMENT_ACTION, RESET_SEGMENTS_ACTION].indexOf(action.type) === -1;
}

export async function activate(context: vscode.ExtensionContext) {
  const store = createStore(shareState(reducer), undefined, vslsStoreEnhancer(actionFilter) as any);

  new Clock(store);

  registerLiveShareSessionProvider(store);

  store.subscribe(async () => {
    const { state } = store.getState();
    await setExtensionContext(state.isPaused ? State.stopped : State.running)    
  });

  setExtensionContext(State.stopped);
  
  const startCommand = vscode.commands.registerCommand(
    COMMAND_IDS.start,
    async () => {
      const { config } = store.getState() as IAppState;
      store.dispatch(startAction(config.intervalDuration));
    }
  );

  const stopCommand = vscode.commands.registerCommand(
    COMMAND_IDS.stop,
    async () => {
      const { config } = <IAppState>store.getState();
      store.dispatch(stopAction(config.intervalDuration));
    }
  );

  const resetCommand = vscode.commands.registerCommand(
    COMMAND_IDS.reset,
    async () => {
      store.dispatch(resetAction());
    }
  );

  context.subscriptions.push(startCommand, stopCommand, resetCommand);
}

export function deactivate() {}
