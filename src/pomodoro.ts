import { IPomodoroConfig } from "./pomodoroConfig";
import { minuteMs, secondMs } from "./constants";

const REFRESH_TICK_DELAY = secondMs;

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
  private onPauseCallbacks: Function[] = [];
  private onResetCallbacks: Function[] = [];

  // move to event emitters
  private emitEvent = async (callbacksArray: Function[], ...args: any[]) => {
    for (let callback of callbacksArray) {
      await callback(...args);
    }
  };

  public start = async (remainingTime?: number) => {
    this.isPaused = false;
    if (remainingTime) {
      this.remainingTime = remainingTime;
    }
    this.endTime = Date.now() + this.remainingTime;
    this.isRunning = true;
    await this.emitEvent(this.onStartCallbacks);
    this.loop();
    return this;
  }

  public pause = async (remainingTime?: number) => {
    if (remainingTime) {
      this.remainingTime = remainingTime;
    }
    this.isPaused = true;

    await this.emitEvent(this.onPauseCallbacks, this.remainingTime);
  }

  public reset = async () => {
    await this.emitEvent(this.onResetCallbacks);
  }

  // --------------

  public isRunning: boolean = false;
  public isPaused: boolean = false;

  private remainingTime: number = 0;
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

  public onPause = (callback: Function) => {
    this.onPauseCallbacks.push(callback);
  }

  public onReset = (callback: Function) => {
    this.onResetCallbacks.push(callback);
  }

  private loop = async () => {
    await sleepAsync();

    if (Date.now() >= this.endTime!) {
      delete this.remainingTime;
      delete this.endTime;

      this.isRunning = false;
      this.isPaused = false;

      await this.emitEvent(this.onEndCallbacks);

      return;
    }

    if (this.isPaused) {
      return;
    }
    this.remainingTime = this.endTime - Date.now();
    await this.emitEvent(this.onRefreshCallbacks, this.remainingTime);
    
    await this.loop();
  };
}

export class Pomodoro {
  private readonly timer: PomodoroTimer = new PomodoroTimer();
  // private isAutoPaused: boolean = false;
  // private isPaused: boolean = false;

  constructor(
    private config: IPomodoroConfig
  ) {
  }

  public onRefresh = (callback: Function) => {
    this.timer.onRefresh(callback);
  }

  public onStart = (callback: Function) => {
    this.timer.onStart(callback);
  }

  public onEnd = (callback: Function) => {
    this.timer.onEnd(callback);
  }

  public onPause = (callback: Function) => {
    this.timer.onPause(callback);
  }

  public onReset = (callback: Function) => {
    this.timer.onReset(callback);
  }

  public start() {
    this.timer.start(this.config.intervalDuration * minuteMs);
  }

  public pause(remainingTime?: number) {
    this.timer.pause(remainingTime);
  }

  public reset() {

  }

}

