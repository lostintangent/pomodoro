import * as vsls from "vsls/vscode";
import { APP_NAME } from "../constants";
import { Pomodoro } from "../pomodoro";

import { BaseService } from "./baseService";

export class HostService extends BaseService {
    constructor(store: any, pomodoro: Pomodoro, liveShare: vsls.LiveShare) {
        super(store, pomodoro, liveShare);
    }

    protected async initialize(): Promise<vsls.SharedService | vsls.SharedServiceProxy | undefined> {
        const service = await this.liveShare.shareService(APP_NAME);
        if (!service) {
            return;
        }

        service.onRequest("getStore", () => {
            return this.store;
        });

        service.onNotify("start", (args: any) => {
            this.pomodoro.start();
            service.notify("start", args);
        });

        service.onNotify("pause", (args: any) => {
            this.pomodoro.pause();
            service.notify("pause", args);
        });

        service.onNotify("reset", (args) => {
            this.pomodoro.reset();
            service.notify("reset", args);
        });

        return service;
    }
}