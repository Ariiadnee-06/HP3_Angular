import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFestivosComponent } from './lista-festivos.component';

describe('ListaFestivosComponent', () => {
  let component: ListaFestivosComponent;
  let fixture: ComponentFixture<ListaFestivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaFestivosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaFestivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
