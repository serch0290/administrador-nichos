import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigGeneralComponent } from './config-general.component';

describe('ConfigGeneralComponent', () => {
  let component: ConfigGeneralComponent;
  let fixture: ComponentFixture<ConfigGeneralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigGeneralComponent]
    });
    fixture = TestBed.createComponent(ConfigGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
