const REFRESH_TICK_DELAY = 1000;

import { IPomodoroConfig } from "./pomodoroConfig";

const sleepAsync = (delay: number = REFRESH_TICK_DELAY) => {
  return new Promise(res => {
    // TODO: move to rAF
    setTimeout(res, delay);
  });
};

class PomodoroTimer {
  constructor() {}

  // TODO: move to event emitters
  private onRefreshCallbacks: Function[] = [];
  private onEndCallbacks: Function[] = [];
  private onStartCallbacks: Function[] = [];

  public start = async (period: number) => {
    this.startTime = Date.now();
    this.endTime = this.startTime + period;

    this.isRunning = true;

    await this.emitEvent(this.onStartCallbacks);

    this.loop();

    return this;
  }

  // move to event emitters
  private emitEvent = async (callbacksArray: Function[], ...args: any[]) => {
    for (let callback of callbacksArray) {
      await callback(...args);
    }
  };

  public pause() {}

  public reset() {}

  // --------------

  public isRunning: boolean = false;
  public isPaused: boolean = false;

  private startTime: number = 0;
  
  private endTime: number = 0;

  public onStart = (callback: Function) => {
    this.onStartCallbacks.push(callback);
  }

  public onRefresh = (callback: Function) => {
    this.onRefreshCallbacks.push(callback);
  }

  public onEnd = (callback: Function) => {
    this.onEndCallbacks.push(callback);
  }

  private loop = async () => {
    await sleepAsync();

    if (Date.now() >= this.endTime!) {
      delete this.startTime;
      delete this.endTime;

      this.isRunning = false;
      this.isPaused = false;

      await this.emitEvent(this.onEndCallbacks);

      return;
    }

    await this.emitEvent(this.onRefreshCallbacks, this.endTime - Date.now());
    
    await this.loop();
  };
}

export class Pomodoro {
  private readonly timer: PomodoroTimer = new PomodoroTimer();
  private intervalIndex: number = 0;
  // private isAutoPaused: boolean = false;
  // private isPaused: boolean = false;

  constructor(
    private config: IPomodoroConfig
  ) {
  }

  public onRefresh = (callback: Function) => {
    this.timer.onRefresh(callback);
    this.intervalIndex;
  }

  public start() {
    this.timer.start(this.config.intervalDuration * 60 * 1000);
  }

  public pause() {
    this.timer.pause();
  }

  public reset() {
    this.intervalIndex = 0;
  }
}

