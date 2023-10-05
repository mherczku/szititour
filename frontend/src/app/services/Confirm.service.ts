import { Injectable, signal } from "@angular/core";

interface ConfirmData {
  question?: string,
  confirmText?: string,
  rejectText?: string
}

@Injectable({ providedIn: "root" })
export class ConfirmService {

  private _$active = signal(false);

  $active = this._$active.asReadonly();

  private onConfirm?: () => void;
  private onReject?: () => void;

  $data = signal<ConfirmData>({
    question: "Megerősíted ezt a műveletet?",
    confirmText: "Megerősítem",
    rejectText: "Vissza"
  });

  public confirm(confirmData: ConfirmData, onConfirm?: () => void, onReject?: () => void) {
    this.$data.set({
      question: confirmData.question ?? "Megerősíted ezt a műveletet?",
      confirmText: confirmData.confirmText ?? "Megerősítem",
      rejectText: confirmData.rejectText ?? "Vissza"
    });
    this.onConfirm = onConfirm;
    this.onReject = onReject;
    this._$active.set(true);
  }

  toConfirm() {
    this.onConfirm?.();
    this.reset();
  }

  toReject() {
    this.onReject?.();
    this.reset();
  }

  toClickOutside() {
    this.reset();
  }

  private reset() {
    this._$active.set(false);
    this.$data.set({});
    this.onConfirm = undefined;
    this.onReject = undefined;
  }

}
