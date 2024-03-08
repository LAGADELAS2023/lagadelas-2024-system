import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopArtComponent } from './pop-art.component';

describe('PopArtComponent', () => {
  let component: PopArtComponent;
  let fixture: ComponentFixture<PopArtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopArtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
