import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { PacienteComponent } from './paciente/paciente.component';
import { PersonaPorDiaComponent } from './personapordia/personapordia.component';
import { ExcepcionesComponent } from './excepciones/excepciones.component';
import { CategoriaComponent } from './categoria/categoria.component';




export const PagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: '', component: DashboardComponent },
            { path: 'paciente', component: PacienteComponent },
            { path: 'horarios', component: PersonaPorDiaComponent },
            { path: 'excepciones', component: ExcepcionesComponent },
            { path: 'categorias', component: CategoriaComponent },
        ]
    },
];
