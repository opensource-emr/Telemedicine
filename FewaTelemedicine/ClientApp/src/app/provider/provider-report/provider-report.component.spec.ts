import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderReportComponent } from './provider-report.component';

describe('ProviderReportComponent', () => {
  let component: ProviderReportComponent;
  let fixture: ComponentFixture<ProviderReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
