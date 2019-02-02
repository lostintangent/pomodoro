import * as vsls from "vsls/vscode";
import { Pomodoro } from "../pomodoro";

export abstract class BaseService {
    constructor(protected store: any, protected pomodoro: Pomodoro, protected liveShare: vsls.LiveShare) {
        this.initializeInternal();
    }

    private createArguments(extraArguments?: any): any {
        return { 
            peerNumber: this.liveShare.session.peerNumber,
            ...extraArguments
        };
    }

    protected abstract async initialize(): Promise<vsls.SharedService | vsls.SharedServiceProxy | undefined>;

    private async initializeInternal() {
        const service = await this.initialize();

        if (!service) {
            // TODO: Do something smarter here
            return;
        }

        this.pomodoro.onStart(() => {
            service.notify("start", this.createArguments());
        });
    
        this.pomodoro.onPause((args: any) => {
            service.notify("pause", this.createArguments(args));
        });
    
        this.pomodoro.onReset(() => {
            service.notify("reset", this.createArguments());
        });
    }
}