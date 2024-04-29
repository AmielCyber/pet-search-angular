import {Component, OnDestroy} from '@angular/core';
import {Subscription, tap} from "rxjs";
import {RouteConfigLoadEnd, RouteConfigLoadStart, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent implements OnDestroy {
  isLazyLoading: boolean = false;
  private routerSub: Subscription;

  constructor(private router: Router) {
    this.routerSub = this.router.events.pipe(
      tap(event => {
        if (event instanceof RouteConfigLoadStart) {
          this.isLazyLoading = true;
        } else if (event instanceof RouteConfigLoadEnd) {
          this.isLazyLoading = false;
        }
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }
}
