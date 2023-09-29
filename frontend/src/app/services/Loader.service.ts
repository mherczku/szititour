import { Injectable, signal } from "@angular/core";


@Injectable({ providedIn: "root" })
export class LoaderService {

  private _$loading = signal(false);

  counter = 0;

  $loading = this._$loading.asReadonly();

  setLoading(value: boolean) {

    const previous = this.counter;

    if (value) {
      this.counter++;
    } else {
      this.counter--;
    }

    if (this.counter > 0 && previous === 0) {
      if (!this._$loading()) {
        this._$loading.set(true);
      }
    }
    else if (this.counter <= 0 && previous === 1) {
      if (this._$loading()) {
        this._$loading.set(false);
      }
    }
  }

  toggle() {
    this._$loading.set(this._$loading());
  }

  start() {
    this.setLoading(true);
  }

  stop() {
    this.setLoading(false);
  }

}
