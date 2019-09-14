import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { PacienteComponent } from './paciente/paciente.component';
import { FichaComponent } from './ficha/ficha.component';




export const PagesRoutes: Routes = [

    
        {
            path: '',
            component:PagesComponent,
            
            children: [
                { path: '', component:DashboardComponent },
                { path:'paciente', component:PacienteComponent},
                { path: 'ficha', component: FichaComponent }
                
                
            ]
        },
    
];
