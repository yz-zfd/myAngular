import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OprateTipsModalComponent } from './oprate-tips-modal.component';

describe('OprateTipsModalComponent', () => {
  let component: OprateTipsModalComponent;
  let fixture: ComponentFixture<OprateTipsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OprateTipsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OprateTipsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
