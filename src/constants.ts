import { Command } from "vscode";

export const COMMAND_IDS = {
  start: "liveshare.pomodoro.start",
  pause: "liveshare.pomodoro.pause",
  reset: "liveshare.pomodoro.reset"
};

export enum State {
  stopped = "stopped",
  running = "running",
  paused = "paused"
}

export const secondMs = 1000;
export const minuteMs = 60 * secondMs;

export const APP_NAME = 'Pomodoro';

export const START_COMMAND: Command = {
  command: COMMAND_IDS.start,
  title: "Start"
};

export const PAUSE_COMMAND: Command = {
  command: COMMAND_IDS.pause,
  title: "Pause"
};

export const RESET_COMMAND: Command = {
  command: COMMAND_IDS.pause,
  title: "Reset"
};
