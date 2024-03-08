import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KesenianComponent } from './kesenian.component';

describe('KesenianComponent', () => {
  let component: KesenianComponent;
  let fixture: ComponentFixture<KesenianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KesenianComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KesenianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
