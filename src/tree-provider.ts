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

const ACTIVE_LABELS = ['Nailing it', 'Nailing it [2]', 'Nailing it [3]', 'Nailing it [4]', 'Nailing it [5]'];
const BREAK_LABELS = ['Cooling down', 'Cooling down [2]', 'Cooling down [3]', 'Cooling down [4]', 'Cooling down [5]'];
const START_LABELS = ['Ready to work', 'Ready to work [2]', 'Ready to work [3]', 'Ready to work [4]', 'Ready to work [5]'];
const FINISHED_LABELS = ['Well done!', 'Well done! [2]', 'Well done! [3]', 'Well done! [4]', 'Well done! [5]'];

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
      return randLabel(ACTIVE_LABELS, completedSegments);
    }
    case FullState.Break: {
      return randLabel(BREAK_LABELS, completedSegments);
    }
    case FullState.HaveNotStarted: {
      return randLabel(START_LABELS, completedSegments);
    }
    case FullState.Finished: {
      return randLabel(FINISHED_LABELS, completedSegments);
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

  getRootItem(): TreeItem {
    const { completedSegments, config } = this.store.getState();

    const treeItem = new TreeItem(APP_NAME);
    treeItem.contextValue = 'liveshare.pomodoro.root';
    treeItem.label = `${APP_NAME} (${completedSegments}/${config.intervalCount})`;
    treeItem.collapsibleState = TreeItemCollapsibleState.Expanded;
    return treeItem;
  }
  
  private getControlsItem(): TreeItem {
    const appState = this.store.getState();
    const { remainingTime, state } = appState;
    const remainingTimeString = secondsToTimeString(remainingTime);

    const treeItem = new TreeItem(APP_NAME);
    treeItem.contextValue = 'liveshare.pomodoro.controlsitem';
    treeItem.label = `${this.stateToEmoji(appState)} ${this.stateToCaption(appState)}... - [${remainingTimeString}]`;
    treeItem.command = this.stateToCommand(state);
    treeItem.collapsibleState = TreeItemCollapsibleState.None;
    return treeItem;
  }

  private stateToEmoji(appState: IAppState) {
    const { state, completedSegments } = appState;
    const { isFinished, isBreak } = state;

    if (isBreak) {
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
