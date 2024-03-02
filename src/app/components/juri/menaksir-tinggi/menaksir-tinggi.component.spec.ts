import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenaksirTinggiComponent } from './menaksir-tinggi.component';

describe('MenaksirTinggiComponent', () => {
  let component: MenaksirTinggiComponent;
  let fixture: ComponentFixture<MenaksirTinggiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenaksirTinggiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenaksirTinggiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
