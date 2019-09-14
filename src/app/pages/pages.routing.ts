import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { PacienteComponent } from './paciente/paciente.component';
import { PersonaPorDiaComponent } from './personapordia/personapordia.component';
import { ExcepcionesComponent } from './excepciones/excepciones.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/auth.guard';



export const PagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
            { path: 'paciente', component: PacienteComponent },
            { path: 'horarios', component: PersonaPorDiaComponent },
            { path: 'excepciones', component: ExcepcionesComponent },
            { path: 'categorias', component: CategoriaComponent },
            { path: 'login', component: LoginComponent }
        ]
    },
];
