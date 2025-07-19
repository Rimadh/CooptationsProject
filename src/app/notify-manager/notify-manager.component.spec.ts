import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyManagerComponent } from './notify-manager.component';

describe('NotifyManagerComponent', () => {
  let component: NotifyManagerComponent;
  let fixture: ComponentFixture<NotifyManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotifyManagerComponent]
    });
    fixture = TestBed.createComponent(NotifyManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
