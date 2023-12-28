import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratepupukComponent } from './generatepupuk.component';

describe('GeneratepupukComponent', () => {
  let component: GeneratepupukComponent;
  let fixture: ComponentFixture<GeneratepupukComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneratepupukComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneratepupukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
