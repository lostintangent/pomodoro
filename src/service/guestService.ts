
import * as vsls from "vsls/vscode";
import { APP_NAME } from "../constants";
import { Pomodoro } from "../pomodoro";
import { BaseService } from "./baseService";

export class GuestService extends BaseService {
    constructor(store: any, pomodoro: Pomodoro, liveShare: vsls.LiveShare) {
        super(store, pomodoro, liveShare);
    }

    // TODO: Could this be turned into a class/method decorator?
    private isNotificationFromSelf(args: any): boolean {
        return args.peerNumber === this.liveShare.session.peerNumber;
    }

    protected  async initialize(): Promise<vsls.SharedService | vsls.SharedServiceProxy | undefined> {
        const service = await this.liveShare.getSharedService(APP_NAME);
        if (!service) {
            return;
        }

        service.onNotify("start", (args: any) => {
            if (this.isNotificationFromSelf(args)) {
                return;
            }

            this.pomodoro.start();
        });

        service.onNotify("pause", (args: any) => {
            if (this.isNotificationFromSelf(args)) {
                return;
            }

            this.pomodoro.pause(args.remainingTime);
        });

        service.onNotify("reset", (args: any) => {
            if (this.isNotificationFromSelf(args)) {
                return;
            }

            this.pomodoro.reset();
        });
    }
}