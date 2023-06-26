import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePersonComponent } from './delete-person.component';

describe('DeletePersonComponent', () => {
  let component: DeletePersonComponent;
  let fixture: ComponentFixture<DeletePersonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletePersonComponent]
    });
    fixture = TestBed.createComponent(DeletePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
