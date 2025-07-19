import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecooptationComponent } from './updatecooptation.component';

describe('UpdatecooptationComponent', () => {
  let component: UpdatecooptationComponent;
  let fixture: ComponentFixture<UpdatecooptationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatecooptationComponent]
    });
    fixture = TestBed.createComponent(UpdatecooptationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
