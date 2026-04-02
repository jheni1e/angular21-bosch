import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonInfo } from './button-info';

describe('ButtonInfo', () => {
  let component: ButtonInfo;
  let fixture: ComponentFixture<ButtonInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
