import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { PacienteComponent } from './paciente/paciente.component';
import { PersonaPorDiaComponent } from './personapordia/personapordia.component';
import { ExcepcionesComponent } from './excepciones/excepciones.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { SubcategoriaComponent } from './subcategoria/subcategoria.component';
import { PresentacionComponent } from './presentacion/presentacion.component';
import { ReportesComponent } from './reportes/reportes.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/auth.guard';



export const PagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
            { path: 'paciente', component: PacienteComponent, canActivate: [AuthGuard] },
            { path: 'horarios', component: PersonaPorDiaComponent, canActivate: [AuthGuard] },
            { path: 'excepciones', component: ExcepcionesComponent, canActivate: [AuthGuard] },
            { path: 'categorias', component: CategoriaComponent, canActivate: [AuthGuard] },
                { path: 'subcategorias', component:SubcategoriaComponent },
                { path: 'presentacion', component:PresentacionComponent },
            { path: 'login', component: LoginComponent }
                
                { path: 'reportes', component:ReportesComponent}
        ]
    },
];
