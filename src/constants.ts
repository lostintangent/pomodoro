import { Command } from "vscode";

export const COMMAND_IDS = {
  start: "liveshare.pomodoro.start",
  stop: "liveshare.pomodoro.stop",
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

export const STOP_COMMAND: Command = {
  command: COMMAND_IDS.stop,
  title: "Stop"
};

export const RESET_COMMAND: Command = {
  command: COMMAND_IDS.reset,
  title: "Reset"
};
