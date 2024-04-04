import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineControlsComponent } from './machine-controls.component';

describe('MachineControlsComponent', () => {
  let component: MachineControlsComponent;
  let fixture: ComponentFixture<MachineControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MachineControlsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MachineControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
