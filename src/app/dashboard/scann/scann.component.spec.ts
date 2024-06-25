import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannComponent } from './scann.component';

describe('ScannComponent', () => {
  let component: ScannComponent;
  let fixture: ComponentFixture<ScannComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScannComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScannComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
