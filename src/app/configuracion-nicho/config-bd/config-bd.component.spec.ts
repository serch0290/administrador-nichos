import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigBdComponent } from './config-bd.component';

describe('ConfigBdComponent', () => {
  let component: ConfigBdComponent;
  let fixture: ComponentFixture<ConfigBdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigBdComponent]
    });
    fixture = TestBed.createComponent(ConfigBdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
