import { Store, Action } from 'redux';
import { IAppState } from './IAppState';
import { tick, completeCurrentSegmentAction, resetSegmentsAction } from './actions/actions';
import * as vscode from 'vscode';

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

        const {
            state,
            remainingTime,
            config,
            completedSegments
        } = this.store.getState();

        if (remainingTime < 1) {
            if (!state.isBreak) {
                const breakDuration = (completedSegments === (config.intervalCount - 1))
                                      ? config.longBreakDuration
                                      : config.breakDuration;
                showNotification();
                this.store.dispatch(completeCurrentSegmentAction(breakDuration, false));
            } else {
                this.store.dispatch(completeCurrentSegmentAction(0, true));
                if (completedSegments === config.intervalCount) {
                    this.store.dispatch(resetSegmentsAction());
                }
            }
        }

        const { state: newState } = this.store.getState();
        if (!newState.isPaused) {5
            this.timer = setTimeout(this.tick, 1000);
            this.store.dispatch(tick());
        }
    }

}

async function showNotification() {
    const configNamespace = 'vsls-pomodoro';
    const notificationSettingName = 'notification';
    const showNotification = vscode.workspace.getConfiguration(configNamespace).get<boolean>(notificationSettingName)!;
    if (showNotification) {
        const dontShowButton = 'Don\'t show notifications';
        const questionResult = await vscode.window.showInformationMessage('Interval completed!', dontShowButton);
        if (questionResult === dontShowButton) {
            await vscode.workspace.getConfiguration(configNamespace).update(notificationSettingName, 0, true);
        }
    }
}
