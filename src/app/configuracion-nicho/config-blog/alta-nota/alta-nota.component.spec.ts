import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaNotaComponent } from './alta-nota.component';

describe('AltaNotaComponent', () => {
  let component: AltaNotaComponent;
  let fixture: ComponentFixture<AltaNotaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AltaNotaComponent]
    });
    fixture = TestBed.createComponent(AltaNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
