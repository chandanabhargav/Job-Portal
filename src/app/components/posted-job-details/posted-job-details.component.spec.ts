import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostedJobDetailsComponent } from './posted-job-details.component';

describe('PostedJobDetailsComponent', () => {
  let component: PostedJobDetailsComponent;
  let fixture: ComponentFixture<PostedJobDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostedJobDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostedJobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
