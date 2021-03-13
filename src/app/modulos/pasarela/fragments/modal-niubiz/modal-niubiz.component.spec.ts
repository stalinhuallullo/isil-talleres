import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNiubizComponent } from './modal-niubiz.component';

describe('ModalNiubizComponent', () => {
  let component: ModalNiubizComponent;
  let fixture: ComponentFixture<ModalNiubizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNiubizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNiubizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
