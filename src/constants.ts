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
