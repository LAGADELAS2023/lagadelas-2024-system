import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePinSessionComponent } from './create-pin-session.component';

describe('CreatePinSessionComponent', () => {
  let component: CreatePinSessionComponent;
  let fixture: ComponentFixture<CreatePinSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePinSessionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatePinSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
