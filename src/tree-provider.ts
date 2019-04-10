import { ProviderResult, TreeDataProvider, TreeItem, EventEmitter, TreeItemCollapsibleState } from "vscode";
import { getApi, View } from "vsls/vscode";
import { secondsToTimeString } from "./utils/secondsToTimeString";
import { APP_NAME, START_COMMAND, STOP_COMMAND } from "./constants";
import { Store, Action } from 'redux';
import { IAppState, IState } from "./IAppState";
import { config } from "./pomodoroConfig";

enum PomodoroTreeItem {
  root = 'root',
  controls = 'controls'
}

const randInt = (min: number, max: number) => {
  const delta = (max - min) + 1;
  
  return Math.floor((Math.random() * delta)) + min;
}


const inititalRand = randInt(0, 20);
const randLabel = (array: string[], index: number) => {
  if (!array || array.length === 0) {
    throw new Error('Array is empty of null.');
  }
  return array[(index + inititalRand) % array.length];
}

enum FullState {
  HaveNotStarted,
  Finished,
  Working,
  Break
}

const appStateToFullState = (appState: IAppState) => {
  if (appState.state.isFinished) {
    return FullState.Finished;
  }
  
  if (appState.state.isPaused && (appState.completedSegments === 0)) {
    return FullState.HaveNotStarted;
  }

  if (appState.state.isBreak) {
    return FullState.Break;
  } else {
    return FullState.Working;
  }
}

const appStateToLabel = (appState: IAppState) => {
  const { completedSegments } = appState;
  const fullState = appStateToFullState(appState);
  
  switch (fullState) {
    case FullState.Working: {
      return randLabel(config.workingLabel, completedSegments);
    }
    case FullState.Break: {
      return (completedSegments === config.intervalCount)
        ? randLabel(config.longBreakLabel, completedSegments)
        : randLabel(config.breakLabel, completedSegments);
    }
    case FullState.HaveNotStarted: {
      return randLabel(config.getStartedLabel, completedSegments);
    }
    case FullState.Finished: {
      return randLabel(config.finishedLabel, completedSegments);
    }
  }
}

class PomodoroTreeDataProvider implements TreeDataProvider<PomodoroTreeItem> {
  private changeEventEmitter = new EventEmitter<PomodoroTreeItem | undefined | null>();
  public readonly onDidChangeTreeData = this.changeEventEmitter.event;

  constructor(private store: Store<IAppState, Action>) {
    store.subscribe(() => {
      this.changeEventEmitter.fire();
    });
  }

  private stateToCommand(state: IState) {
      return (state.isPaused)
              ? START_COMMAND
              : STOP_COMMAND;
  }

  getChildren(element?: PomodoroTreeItem): ProviderResult<PomodoroTreeItem[]> {
    if (!element) {
      return [PomodoroTreeItem.root];
    }

    return [PomodoroTreeItem.controls];
  }

  getTreeItem(element: PomodoroTreeItem): TreeItem {
    switch (element) {
      case PomodoroTreeItem.root: {
        return this.getRootItem();
      }

      case PomodoroTreeItem.controls: {
        return this.getControlsItem();
      }
    }
  }

  stateToTicks(state: IAppState) {
    let ticks = '';
    for (let i = 0; i < config.intervalCount; i++) {
      if (i < state.completedSegments) {
        ticks += '✔';
      } else {
        break;
      }
    }

    return ticks;
  }

  getRootItem(): TreeItem {
    const { completedSegments, config } = this.store.getState();

    const treeItem = new TreeItem(APP_NAME);
    treeItem.contextValue = 'liveshare.pomodoro.root';
    
    treeItem.label = `${APP_NAME} (${completedSegments}/${config.intervalCount}) ${this.stateToTicks(this.store.getState())}`;
    treeItem.collapsibleState = TreeItemCollapsibleState.Expanded;
    return treeItem;
  }
  
  private getControlsItem(): TreeItem {
    const appState = this.store.getState();
    const { remainingTime, state } = appState;
    const remainingTimeString = secondsToTimeString(remainingTime);

    const treeItem = new TreeItem(APP_NAME);
    treeItem.contextValue = 'liveshare.pomodoro.controlsitem';
    const emoji = this.stateToEmoji(appState);
    const caption = this.stateToCaption(appState);
    treeItem.label = `${emoji} ${caption} (${remainingTimeString})`;
    treeItem.command = this.stateToCommand(state);
    treeItem.collapsibleState = TreeItemCollapsibleState.None;
    return treeItem;
  }

  private stateToEmoji(appState: IAppState) {
    const { state, completedSegments } = appState;
    const { isFinished, isBreak, isPaused } = state;

    if (isBreak) {
      const hasNotStarted = (completedSegments === 0) && isPaused && !isFinished;

      if (hasNotStarted) {
        return config.getStartedEmoji;
      }
      
      return (completedSegments === config.intervalCount)
        ? config.longBreakEmoji
        : config.breakEmoji;
    } else {
      return (isFinished)
        ? config.finishedEmoji
        : config.workingEmoji
    }
  }

  private stateToCaption(state: IAppState) {
    return appStateToLabel(state);
  }
}

export const registerLiveShareSessionProvider = async (store: Store<IAppState, Action>) => {
  const treeDataProvider = new PomodoroTreeDataProvider(store);

  const vslsApi = await getApi();
  if (vslsApi) {
    vslsApi.registerTreeDataProvider(View.Session, treeDataProvider);
    vslsApi.registerTreeDataProvider(View.ExplorerSession, treeDataProvider);
  }
};
