import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PbbComponent } from './pbb.component';

describe('PbbComponent', () => {
  let component: PbbComponent;
  let fixture: ComponentFixture<PbbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PbbComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PbbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
