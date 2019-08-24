import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';




export const PagesRoutes: Routes = [

    
        {
            path: '',
            component:PagesComponent,
            
            children: [
                { path: '', component:DashboardComponent },
                
                
            ]
        },
    
];
