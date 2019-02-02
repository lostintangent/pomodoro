import { Command, ProviderResult, TreeDataProvider, TreeItem, EventEmitter } from "vscode";
import { LiveShare, View } from "vsls/vscode";
import { msToTimeString } from "./utils/msToTimeString";
import { APP_NAME, START_COMMAND, PAUSE_COMMAND } from "./constants";

class PomodoroTreeDataProvider implements TreeDataProvider<Command> {

  private changeEventEmitter = new EventEmitter<Command | undefined | null>();
  public readonly onDidChangeTreeData = this.changeEventEmitter.event;
  
  private remainingTime = "";
  private currentCommand: Command = START_COMMAND;

  getChildren(element?: Command): ProviderResult<Command[]> {
    return Promise.resolve([this.currentCommand]);
  }

  updateRemainingTime = (remainingTime: number) => {
    this.currentCommand = PAUSE_COMMAND;
    this.remainingTime = msToTimeString(remainingTime);
    this.changeEventEmitter.fire();
  }

  onPause = (remainingTime: number) => {
    this.currentCommand = START_COMMAND;
    this.remainingTime = msToTimeString(remainingTime);
    this.changeEventEmitter.fire();
  }

  getTreeItem(element: Command): TreeItem {
    const treeItem = new TreeItem(APP_NAME);
    treeItem.contextValue = APP_NAME;
    treeItem.command = element;
    treeItem.label = `${APP_NAME} - ${element.title} - ${this.remainingTime}`;
    return treeItem;
  }
}

export const treeDataProvider = new PomodoroTreeDataProvider();
export const registerLiveShareSessionProvider = (vslsApi: LiveShare) => {
  vslsApi.registerTreeDataProvider(View.Session, treeDataProvider);
  vslsApi.registerTreeDataProvider(View.ExplorerSession, treeDataProvider);
};
