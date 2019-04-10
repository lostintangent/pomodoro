import * as vscode from 'vscode';

function getConfigValue(settingName: string): any {
  return vscode.workspace.getConfiguration('vsls-pomodoro').get<number>(settingName)!;
}

export interface IPomodoroConfig {
  breakDuration: number;
  intervalCount: number;
  intervalDuration: number;
  longBreakDuration: number;
  getStartedEmoji: string;
  workingEmoji: string;
  breakEmoji: string;
  longBreakEmoji: string;
  finishedEmoji: string;
  getStartedLabel: string[];
  workingLabel: string[];
  breakLabel: string[];
  longBreakLabel: string[];
  finishedLabel: string[];
}

const getLabelValue = (settingName: string, defaultLabel: string) => {
  const labelSplitChar = '||';

  const value = getConfigValue(settingName) || defaultLabel;
    return value.split(labelSplitChar);
}

export const config: IPomodoroConfig = {
  get breakDuration() {
    return getConfigValue('breakDuration') * 60;
  },
  get intervalCount() {
    return getConfigValue('intervalCount');
  },
  get intervalDuration() {
    return getConfigValue('intervalDuration') * 60;
  },
  get longBreakDuration() {
    return getConfigValue('longBreakDuration') * 60;
  },
  get getStartedEmoji() {
    return getConfigValue('getStartedEmoji');
  },
  get workingEmoji() {
    return getConfigValue('workingEmoji');
  },
  get breakEmoji() {
    return getConfigValue('breakEmoji');
  },
  get longBreakEmoji() {
    return getConfigValue('longBreakEmoji');
  },
  get finishedEmoji() {
    return getConfigValue('finishedEmoji');
  },
  get getStartedLabel() {
    return getLabelValue('getStartedLabel', 'Ready to work...');
  },
  get workingLabel() {
    return getLabelValue('workingLabel', 'Working...');
  },
  get breakLabel() {
    return getLabelValue('breakLabel', 'Taking a break...');
  },
  get longBreakLabel() {
    return getLabelValue('longBreakLabel', 'Taking a long break...');
  },
  get finishedLabel() {
    return getLabelValue('finishedLabel', 'Well done!');
  },
};
