import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PupukComponent } from './pupuk.component';

describe('PupukComponent', () => {
  let component: PupukComponent;
  let fixture: ComponentFixture<PupukComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PupukComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PupukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
