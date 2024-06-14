import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigFtpComponent } from './config-ftp.component';

describe('ConfigFtpComponent', () => {
  let component: ConfigFtpComponent;
  let fixture: ComponentFixture<ConfigFtpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigFtpComponent]
    });
    fixture = TestBed.createComponent(ConfigFtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
