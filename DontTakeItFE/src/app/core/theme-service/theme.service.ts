import {Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {EventBus} from "~core/event-bus/event-bus.model";
import {Subscription} from "rxjs";
import {OverlayContainer} from "@angular/cdk/overlay";

@Injectable()
export class ThemeService {
  private _addDarkMode: EventBus<boolean> = new EventBus<boolean>();
  private _renderer: Renderer2;

  constructor(private _overlayContainer: OverlayContainer, private _rendererFactory: RendererFactory2) {
    this._renderer = _rendererFactory.createRenderer(null, null);
  }

  public notifySwitchDarkMode(isDark: boolean) {
    this._addDarkMode.publish(isDark);
  }

  public subscribeDarkMode(callback: (isDark: boolean) => void): Subscription {
    return this._addDarkMode.subscribe(callback);
  }

  public setDarkMode(isDark: boolean) {
    this.notifySwitchDarkMode(isDark);

    if (isDark) {
      this._overlayContainer.getContainerElement().classList.add("dark-theme");
      this._renderer.addClass(document.body, 'dark-theme');
    } else {
      if (this._overlayContainer.getContainerElement().classList.contains("dark-theme")) {
        this._overlayContainer.getContainerElement().classList.remove("dark-theme");
      }
      this._renderer.removeClass(document.body, 'dark-theme');
    }
  }
}
