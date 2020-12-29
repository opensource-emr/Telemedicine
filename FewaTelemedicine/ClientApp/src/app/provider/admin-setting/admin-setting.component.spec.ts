import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSettingComponent } from './admin-setting.component';

describe('UserSettingComponent', () => {
  let component: AdminSettingComponent;
  let fixture: ComponentFixture<AdminSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
