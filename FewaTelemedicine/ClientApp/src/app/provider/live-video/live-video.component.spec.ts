import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveVideoComponent } from './live-video.component';

describe('LiveVideoComponent', () => {
  let component: LiveVideoComponent;
  let fixture: ComponentFixture<LiveVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
