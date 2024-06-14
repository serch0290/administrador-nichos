import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigBlogComponent } from './config-blog.component';

describe('ConfigBlogComponent', () => {
  let component: ConfigBlogComponent;
  let fixture: ComponentFixture<ConfigBlogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigBlogComponent]
    });
    fixture = TestBed.createComponent(ConfigBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
