import { Command, ProviderResult, TreeDataProvider, TreeItem } from "vscode";
import { LiveShare, View } from "vsls/vscode";

const DATA_PROVIDER: TreeDataProvider<Command> = {
  getChildren(element?: Command): ProviderResult<Command[]> {
    return Promise.resolve([
      {
        command: "liveshare.pomodoro.start",
        title: "Pomodoro"
      }
    ]);
  },
  getTreeItem(element: Command): TreeItem {
    const treeItem = new TreeItem("Pomodoro");
    treeItem.contextValue = "Pomodoro";
    treeItem.command = element;
    return treeItem;
  }
};

export const registerLiveShareSessionProvider = (vslsApi: LiveShare) => {
  vslsApi.registerTreeDataProvider(View.Session, DATA_PROVIDER);
  vslsApi.registerTreeDataProvider(View.ExplorerSession, DATA_PROVIDER);
};
