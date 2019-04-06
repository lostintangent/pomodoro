import * as vscode from "vscode";

const configSection = vscode.workspace.getConfiguration("vsls-pomdoro");
function getConfigValue(settingName: string): any {
  return configSection.get<number>(settingName)!;
}

export interface IPomodoroConfig {
  breakDuration: number;
  intervalCount: number;
  intervalDuration: number;
  longBreakDuration: number;
  workingEmoji: string;
  breakEmoji: string;
  longBreakEmoji: string;
  finishedEmoji: string;
}

export const config: IPomodoroConfig = {
  get breakDuration() {
    return (getConfigValue("breakDuration") || .1) * 60;
  },
  get intervalCount() {
    return getConfigValue("intervalCount") || 2;
  },
  get intervalDuration() {
    return (getConfigValue("intervalDuration") || .1) * 60;
  },
  get longBreakDuration() {
    return (getConfigValue("longBreakDuration") || .2) * 60;
  },
  get workingEmoji() {
    return getConfigValue("workingEmoji") || '🔨';
  },
  get breakEmoji() {
    return getConfigValue("breakEmoji") || '🌴';
  },
  get longBreakEmoji() {
    return getConfigValue("longBreakEmoji") || '🏖️';
  },
  get finishedEmoji() {
    return getConfigValue("finishedEmoji") || '💪';
  },
};


