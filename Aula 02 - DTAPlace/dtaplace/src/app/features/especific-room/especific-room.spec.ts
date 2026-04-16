import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecificRoom } from './especific-room';

describe('EspecificRoom', () => {
  let component: EspecificRoom;
  let fixture: ComponentFixture<EspecificRoom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspecificRoom],
    }).compileComponents();

    fixture = TestBed.createComponent(EspecificRoom);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
