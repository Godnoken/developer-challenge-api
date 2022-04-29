import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isOnHomeScreen = true;
  
  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
    this.subscribeToRouterNavigation();
  }

  subscribeToRouterNavigation(): void {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.urlAfterRedirects === "/" || val.urlAfterRedirects === "/blog") this.isOnHomeScreen = true;
        else this.isOnHomeScreen = false;
      }
    });
  }
}
