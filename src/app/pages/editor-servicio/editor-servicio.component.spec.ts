import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorServicioComponent } from './editor-servicio.component';

describe('EditorServicioComponent', () => {
  let component: EditorServicioComponent;
  let fixture: ComponentFixture<EditorServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
