import {Observable, Observer, Subscription} from "rxjs";
import {share} from "rxjs/operators";

export class EventBus<T> {
    private readonly observable: Observable<T>;
    private observer: Observer<T>;

    constructor() {
        this.observable = new Observable<T>(obs => this.observer = obs).pipe(share());

        const subTemp: Subscription = this.subscribe(() => {
        });
        subTemp.unsubscribe();
    }

    public publish(value: T) {
        this.observer.next(value);
    }

    public subscribe(callback: (T: any) => void): Subscription {
        return this.observable.subscribe(callback);
    }
}
