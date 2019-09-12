import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoriaComponent } from './subcategoria.component';

describe('SubcategoriaComponent', () => {
  let component: SubcategoriaComponent;
  let fixture: ComponentFixture<SubcategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
