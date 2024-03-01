import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifikasiReguComponent } from './verifikasi-regu.component';

describe('VerifikasiReguComponent', () => {
  let component: VerifikasiReguComponent;
  let fixture: ComponentFixture<VerifikasiReguComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerifikasiReguComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerifikasiReguComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
