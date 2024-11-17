import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'articulo-por-familia',
    loadComponent: () => import('./pages/articulo-por-familia/articulo-por-familia.page').then(m => m.ArticuloPorFamiliaPage)
  },
  {
    path: 'categoria-detalle/:nombre',
    loadComponent: () => import('./pages/categoria-detalle/categoria-detalle.page').then(m => m.CategoriaDetallePage)
  },
  {
    path: 'producto-detalle',
    loadComponent: () => import('./pages/producto-detalle/producto-detalle.page').then(m => m.ProductoDetallePage)
  },
];
