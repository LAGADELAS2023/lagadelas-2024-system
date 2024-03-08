import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BivakComponent } from './bivak.component';

describe('BivakComponent', () => {
  let component: BivakComponent;
  let fixture: ComponentFixture<BivakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BivakComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BivakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
