import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import {LayoutService} from "~core/layout-service/layout.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnDestroy, OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  public isShowSidebar: boolean;
  public mobileQuery: MediaQueryList;
  private readonly mobileQueryListener: () => void;
  public displayHeader = false;
  public displayFooter = false;

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private _layoutService: LayoutService) {
    this.mobileQuery = media.matchMedia('(max-width: 1024px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener("change", () => this.mobileQueryListener());

    this.isShowSidebar = !this.mobileQuery.matches;
  }

  public ngOnDestroy(): void {
    this.mobileQuery.removeEventListener("change", () => this.mobileQueryListener());

    this.sidenav.close();
  }

  ngOnInit(): void {
    this._layoutService.subscribeToHeader(displayHeader => {
      this.displayHeader = displayHeader;
      if (!displayHeader) {
        this.sidenav.close();
      } else {
        this.sidenav.open();
      }
      this.isShowSidebar = displayHeader;
    });
    this._layoutService.subscribeToFooter(displayFooter => this.displayFooter = displayFooter);
  }
}
