import * as vscode from "vscode";

const configSection = vscode.workspace.getConfiguration("vsls-pomdoro");
function getConfigValue(settingName: string): number {
  return configSection.get<number>(settingName)!;
}

export interface IPomodoroConfig {
  breakDuration: number;
  intervalCount: number;
  intervalDuration: number;
  longBreakDuration: number;
}

export const config: IPomodoroConfig = {
  get breakDuration() {
    return getConfigValue("breakDuration") || 25;
  },
  get intervalCount() {
    return getConfigValue("intervalCount") || 25;
  },
  get intervalDuration() {
    return getConfigValue("intervalDuration") || 25;
  },
  get longBreakDuration() {
    return getConfigValue("longBreakDuration") || 100;
  }
};


