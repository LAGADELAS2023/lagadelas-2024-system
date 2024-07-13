import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetaLapanganComponent } from './peta-lapangan.component';

describe('PetaLapanganComponent', () => {
  let component: PetaLapanganComponent;
  let fixture: ComponentFixture<PetaLapanganComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetaLapanganComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PetaLapanganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
