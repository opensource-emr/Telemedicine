import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IntroMobileComponent } from './intro-mobile.component';


describe('IntroMobileComponent', () => {
  let component: IntroMobileComponent;
  let fixture: ComponentFixture<IntroMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
