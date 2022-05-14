import {Injectable} from '@angular/core';
import {EventBus} from "~core/event-bus/event-bus.model";
import {Subscription} from "rxjs";

@Injectable()
export class LayoutService {
    private _displayHeader: EventBus<boolean> = new EventBus<boolean>();
    private _displayFooter: EventBus<boolean> = new EventBus<boolean>();

    constructor() {
    }

    public notifySwitchDisplayHeader(header: boolean) {
        this._displayHeader.publish(header);
    }

    public subscribeToHeader(callback: (header: boolean) => void): Subscription {
        return this._displayHeader.subscribe(callback);
    }

    public notifySwitchDisplayFooter(footer: boolean) {
        this._displayFooter.publish(footer);
    }

    public subscribeToFooter(callback: (footer: boolean) => void): Subscription {
        return this._displayFooter.subscribe(callback);
    }

    public setLayoutAuth() {
        this.notifySwitchDisplayFooter(false);
        this.notifySwitchDisplayHeader(false);
    }

    public setLayoutLogged() {
        this.notifySwitchDisplayFooter(true);
        this.notifySwitchDisplayHeader(true);
    }
}
