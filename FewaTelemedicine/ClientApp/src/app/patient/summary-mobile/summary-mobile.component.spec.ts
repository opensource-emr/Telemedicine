import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SummaryMobileComponent } from './summary-mobile.component';



describe('SummaryMobileComponent', () => {
  let component: SummaryMobileComponent;
  let fixture: ComponentFixture<SummaryMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
