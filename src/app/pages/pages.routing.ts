import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { PacienteComponent } from './paciente/paciente.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ReservaComponent } from './reserva/reserva.component';




export const PagesRoutes: Routes = [


    {
        path: '',
        component: PagesComponent,

        children: [
            { path: '', component: DashboardComponent },
            { path: 'paciente', component: PacienteComponent },
            { path: 'categorias', component: CategoriaComponent },
            { path: 'reservas', component: ReservaComponent },

        ]
    },

];
