import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileLiveVideoComponent } from './mobilelive-video.component';

describe('LiveVideoComponent', () => {
  let component: MobileLiveVideoComponent;
  let fixture: ComponentFixture<MobileLiveVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileLiveVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileLiveVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
