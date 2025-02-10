import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasTabsComponent } from './ventas-tabs.component';

describe('VentasTabsComponent', () => {
  let component: VentasTabsComponent;
  let fixture: ComponentFixture<VentasTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentasTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentasTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
