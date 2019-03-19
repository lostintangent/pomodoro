import { Command, ProviderResult, TreeDataProvider, TreeItem, EventEmitter } from "vscode";
import { getApi, View } from "vsls/vscode";
import { msToTimeString } from "./utils/msToTimeString";
import { APP_NAME, START_COMMAND } from "./constants";
import { Store, Action } from 'redux';
import { IAppState, IState } from "./IAppState";

class PomodoroTreeDataProvider implements TreeDataProvider<Command> {
  private changeEventEmitter = new EventEmitter<Command | undefined | null>();
  public readonly onDidChangeTreeData = this.changeEventEmitter.event;
  
  private remainingTime = "";
  private currentCommand: Command = START_COMMAND;

  constructor(store: Store<IAppState, Action>) {
    store.subscribe(() => {
      const { remainingTime, state } = store.getState();
      this.remainingTime = msToTimeString(remainingTime);
      // this.currentCommand = stateToCommand(state); 
      this.changeEventEmitter.fire();
    })
  }

  private stateToCommand(state: IState) {
    return;
  }

  getChildren(element?: Command): ProviderResult<Command[]> {
    return Promise.resolve([this.currentCommand]);
  }

  getTreeItem(element: Command): TreeItem {
    const treeItem = new TreeItem(APP_NAME);
    treeItem.contextValue = APP_NAME;
    treeItem.command = element;
    treeItem.label = `${APP_NAME} - ${element.title} - ${this.remainingTime}`;
    return treeItem;
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
