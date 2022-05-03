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
    this.readColorThemeOnLoad();
  }

  readColorThemeOnLoad(): void {
    if (localStorage["theme"] === 'darkMode' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('darkMode')

    } else {
      document.documentElement.classList.remove('darkMode')
    }
  }

  handleColorTheme(): void {
    const html = document.documentElement;

    if (html.classList.contains("darkMode")) {
        html.classList.toggle("darkMode");
        window.localStorage.setItem("theme", "lightMode");
    }
    else {
        html.classList.toggle("darkMode");
        window.localStorage.setItem("theme", "darkMode");
    }
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
