import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigRepositorioComponent } from './config-repositorio.component';

describe('ConfigRepositorioComponent', () => {
  let component: ConfigRepositorioComponent;
  let fixture: ComponentFixture<ConfigRepositorioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigRepositorioComponent]
    });
    fixture = TestBed.createComponent(ConfigRepositorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
