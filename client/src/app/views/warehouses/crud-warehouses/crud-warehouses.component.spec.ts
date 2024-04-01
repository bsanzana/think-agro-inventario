import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudWarehousesComponent } from './crud-warehouses.component';

describe('CrudWarehousesComponent', () => {
  let component: CrudWarehousesComponent;
  let fixture: ComponentFixture<CrudWarehousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudWarehousesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudWarehousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
