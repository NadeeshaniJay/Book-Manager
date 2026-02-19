import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bookform } from './bookform';

describe('Bookform', () => {
  let component: Bookform;
  let fixture: ComponentFixture<Bookform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bookform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bookform);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
