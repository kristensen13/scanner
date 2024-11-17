import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticuloPorFamiliaPage } from './articulo-por-familia.page';

describe('ArticuloPorFamiliaPage', () => {
  let component: ArticuloPorFamiliaPage;
  let fixture: ComponentFixture<ArticuloPorFamiliaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloPorFamiliaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
