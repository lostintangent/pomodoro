import { ProviderResult, TreeDataProvider, TreeItem, EventEmitter, TreeItemCollapsibleState } from "vscode";
import { getApi, View } from "vsls/vscode";
import { secondsToTimeString } from "./utils/secondsToTimeString";
import { APP_NAME, START_COMMAND, STOP_COMMAND } from "./constants";
import { Store, Action } from 'redux';
import { IAppState, IState } from "./IAppState";

enum PomodoroTreeItem {
  root = 'root',
  controls = 'controls'
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
    const { remainingTime, state} = this.store.getState();
    const remainingTimeString = secondsToTimeString(remainingTime);

    const treeItem = new TreeItem(APP_NAME);
    treeItem.contextValue = 'liveshare.pomodoro.controlsitem';
    treeItem.label = `${this.stateToEmoji(state)} ${this.stateToCaption(state)}... - [${remainingTimeString}]`;
    treeItem.command = this.stateToCommand(state);
    treeItem.collapsibleState = TreeItemCollapsibleState.None;
    return treeItem;
  }

  private stateToEmoji(state: IState) {
    return (state.isBreak)
              ? '🌴'
              : '🔨';
  }

  private stateToCaption(state: IState) {
    return (state.isBreak)
              ? 'Cooling down'
              : 'Nailing it';
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
