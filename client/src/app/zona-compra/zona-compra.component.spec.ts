import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonaCompraComponent } from './zona-compra.component';

describe('ZonaCompraComponent', () => {
  let component: ZonaCompraComponent;
  let fixture: ComponentFixture<ZonaCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZonaCompraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZonaCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
