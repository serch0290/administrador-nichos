import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaHomeComponent } from './nota-home.component';

describe('NotaHomeComponent', () => {
  let component: NotaHomeComponent;
  let fixture: ComponentFixture<NotaHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotaHomeComponent]
    });
    fixture = TestBed.createComponent(NotaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
