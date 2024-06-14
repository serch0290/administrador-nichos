import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaNichoComponent } from './alta-nicho.component';

describe('AltaNichoComponent', () => {
  let component: AltaNichoComponent;
  let fixture: ComponentFixture<AltaNichoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AltaNichoComponent]
    });
    fixture = TestBed.createComponent(AltaNichoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
