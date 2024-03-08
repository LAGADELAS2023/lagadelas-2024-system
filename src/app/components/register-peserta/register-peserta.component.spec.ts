import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPesertaComponent } from './register-peserta.component';

describe('RegisterPesertaComponent', () => {
  let component: RegisterPesertaComponent;
  let fixture: ComponentFixture<RegisterPesertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterPesertaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterPesertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
