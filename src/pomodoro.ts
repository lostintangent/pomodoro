const REFRESH_TICK_DELAY = 1000;

const sleepAsync = (delay: number = 1000) => {
  return new Promise(res => {
    // TODO: move to rAF
    setTimeout(res, delay);
  });
};

class Pomodoro {
  constructor() {}

  // TODO: move to event emitters
  private onRefreshCallbacks: Function[] = [];
  private onEndCallbacks: Function[] = [];
  private onStartCallbacks: Function[] = [];

  public async start(period: number) {
    this.startTime = Date.now();
    this.endTime = this.startTime + period;

    this.isRunning = true;

    await this.emitEvent(this.onStartCallbacks);

    this.loop();

    return this;
  }

  private emitEvent = async (callbacksArray: Function[]) => {
    for (let callback of callbacksArray) {
      await callback();
    }
  };

  public pause() {}

  public reset() {}

  // --------------

  private isRunning: boolean = false;
  private isPaused: boolean = false;

  private startTime: number | undefined;

  private endTime: number | undefined;

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

    await this.emitEvent(this.onRefreshCallbacks);

    this.loop();
  };
}

export const pomodoro = new Pomodoro();
