import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { CategoriaComponent } from './categoria/categoria.component';




export const PagesRoutes: Routes = [

    
        {
            path: '',
            component:PagesComponent,
            
            children: [
                { path: '', component:DashboardComponent },
                { path: 'categorias', component:CategoriaComponent },
                
                
            ]
        },
    
];
