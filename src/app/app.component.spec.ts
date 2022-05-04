import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { AppComponent } from './app.component';

let component: AppComponent;
let fixture: ComponentFixture<AppComponent>
let nativeElement: HTMLElement;

let eventsSub = new BehaviorSubject<any>(null);

const routerStub = {
  events: eventsSub
}

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({

      declarations: [
        AppComponent
      ],
      providers: [
        { provide: Router, useValue: routerStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  }));


  it('should create the app', () => {
    expect(component).toBeTruthy();
  });


  it('isOnHomeScreen should be true when navigating to "/blog" and "/"', () => {
    eventsSub.next(new NavigationEnd(1, '/blog', '/blog'));
    expect(component.isOnHomeScreen).toBeTruthy();

    eventsSub.next(new NavigationEnd(1, '/', '/'));
    expect(component.isOnHomeScreen).toBeTruthy();

    // Not sure how to include redirects here..
    eventsSub.next(new NavigationEnd(1, '/g', '/g'));
    expect(component.isOnHomeScreen).toBeFalsy();
  })
});
