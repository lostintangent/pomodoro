import * as vscode from "vscode";

const configSection = vscode.workspace.getConfiguration("vsls-pomdoro");
function getConfigValue(settingName: string): number {
  return configSection.get<number>(settingName)!;
}

export const config = {
  get breakDuration() {
    return getConfigValue("breakDuration");
  },
  get intervalCount() {
    return getConfigValue("intervalCount");
  },
  get intervalDuration() {
    return getConfigValue("intervalDuration");
  },
  get longBreakDuration() {
    return getConfigValue("longBreakDuration");
  }
};
