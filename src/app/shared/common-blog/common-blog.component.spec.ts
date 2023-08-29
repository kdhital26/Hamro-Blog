import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonBlogComponent } from './common-blog.component';

describe('CommonBlogComponent', () => {
  let component: CommonBlogComponent;
  let fixture: ComponentFixture<CommonBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonBlogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
