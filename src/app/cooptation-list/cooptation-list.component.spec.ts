import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CooptationListComponent } from './cooptation-list.component';

describe('CooptationListComponent', () => {
  let component: CooptationListComponent;
  let fixture: ComponentFixture<CooptationListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CooptationListComponent]
    });
    fixture = TestBed.createComponent(CooptationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
