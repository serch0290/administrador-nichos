import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionNichoComponent } from './configuracion-nicho.component';

describe('ConfiguracionNichoComponent', () => {
  let component: ConfiguracionNichoComponent;
  let fixture: ComponentFixture<ConfiguracionNichoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfiguracionNichoComponent]
    });
    fixture = TestBed.createComponent(ConfiguracionNichoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
