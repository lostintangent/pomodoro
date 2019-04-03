import { Store, Action } from "redux";
import { IAppState } from "./IAppState";
import { tick, completeCurrentSegmentAction } from "./actions/actions";

export class Clock {

    private timer: NodeJS.Timer | undefined;

    constructor(private store: Store<IAppState, Action>) {
        store.subscribe(() => {
            const { state } = store.getState();

            if (!this.timer && !state.isPaused) {
                this.tick();
            }
        });
    }

    private tick = () => {
        clearTimeout(this.timer!);
        this.timer = undefined;

        const { state, remainingTime, config } = this.store.getState();

        if (remainingTime < 1) {
            const nextAction = (!state.isBreak)
                ? completeCurrentSegmentAction(config.breakDuration, false)
                : completeCurrentSegmentAction(0, true);
            
            process.stdout.write('\x07');

            return this.store.dispatch(nextAction)
        }

        if (!state.isPaused) {
            this.timer = setTimeout(this.tick, 1000);
            this.store.dispatch(tick());
        }
    }

}