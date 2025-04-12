export class TimerFetch {
  private _start: number = 0;

  start() {
    this._start = performance.now();
  }

  async stop() {
    const elapsed = performance.now() - this._start;
    const remaining = 1200 - elapsed;
    if (remaining > 0) {
      await this.delay(remaining);
    }
  }

  private delay(time: number) {
    return new Promise<void>(resolve =>
      setTimeout(() => {
        resolve();
      }, time),
    );
  }
}
