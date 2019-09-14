import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { SubcategoriaComponent } from './subcategoria/subcategoria.component';
import { PresentacionComponent } from './presentacion/presentacion.component';
import { ReportesComponent } from './reportes/reportes.component';




export const PagesRoutes: Routes = [

    
        {
            path: '',
            component:PagesComponent,
            
            children: [
                { path: '', component:DashboardComponent },
                { path: 'categorias', component:CategoriaComponent },
                { path: 'subcategorias', component:SubcategoriaComponent },
                { path: 'presentacion', component:PresentacionComponent },
                
                { path: 'reportes', component:ReportesComponent}
            ]
        },
    
];
