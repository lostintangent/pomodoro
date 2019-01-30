import { Command, ProviderResult, TreeDataProvider, TreeItem, EventEmitter } from "vscode";
import { LiveShare, View } from "vsls/vscode";

class PomodoroTreeDataProvider implements TreeDataProvider<Command> {

  private changeEventEmitter = new EventEmitter<Command>();
  public readonly onDidChangeTreeData = this.changeEventEmitter.event;
  
  private pomodoroCommand: Command;
  private static readonly baseTitle = "Pomodoro";

  constructor() {
    this.pomodoroCommand = {
      command: "liveshare.pomodoro.start",
      title: PomodoroTreeDataProvider.baseTitle
    };
  }

  getChildren(element?: Command): ProviderResult<Command[]> {
    return Promise.resolve([this.pomodoroCommand]);
  }

  updateRemainingTime = (remainingTime: number) => {
    this.pomodoroCommand.title = `${PomodoroTreeDataProvider.baseTitle} ${remainingTime}`;
    this.changeEventEmitter.fire(this.pomodoroCommand);
  }

  getTreeItem(element: Command): TreeItem {
    const treeItem = new TreeItem("Pomodoro");
    treeItem.contextValue = "Pomodoro";
    treeItem.command = element;
    treeItem.label = element.title;
    return treeItem;
  }
}

export const treeDataProvider = new PomodoroTreeDataProvider();
export const registerLiveShareSessionProvider = (vslsApi: LiveShare) => {
  vslsApi.registerTreeDataProvider(View.Session, treeDataProvider);
  vslsApi.registerTreeDataProvider(View.ExplorerSession, treeDataProvider);
};
