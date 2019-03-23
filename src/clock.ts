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

        const { state } = this.store.getState();
        if (!state.isPaused) {
            this.timer = setTimeout(this.tick, 1000);
            this.store.dispatch(tick());
        }
    }

}