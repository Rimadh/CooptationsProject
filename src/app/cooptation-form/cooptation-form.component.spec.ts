import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CooptationFormComponent } from './cooptation-form.component';

describe('CooptationFormComponent', () => {
  let component: CooptationFormComponent;
  let fixture: ComponentFixture<CooptationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CooptationFormComponent]
    });
    fixture = TestBed.createComponent(CooptationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
