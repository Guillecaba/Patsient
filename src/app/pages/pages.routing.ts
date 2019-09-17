import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { PacienteComponent } from './paciente/paciente.component';
import { PersonaPorDiaComponent } from './personapordia/personapordia.component';
import { ExcepcionesComponent } from './excepciones/excepciones.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ReservaComponent } from './reserva/reserva.component';
import { SubcategoriaComponent } from './subcategoria/subcategoria.component';
import { PresentacionComponent } from './presentacion/presentacion.component';
import { ReportesComponent } from './reportes/reportes.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/auth.guard';
import { CrearReservaComponent } from './crear-reserva/crear-reserva.component';
import { ServicioComponent } from './servicio/servicio.component';
import { EditorServicioComponent } from './editor-servicio/editor-servicio.component';
import { FichaComponent } from './ficha/ficha.component';
import { DetallesServicioComponent } from './detalles-servicio/detalles-servicio.component';



export const PagesRoutes: Routes = [


    {
        path: '',
        component: PagesComponent,

        children: [
            { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
            { path: 'categorias', component: CategoriaComponent, canActivate: [AuthGuard] },
            { path: 'subcategorias', component: SubcategoriaComponent, canActivate: [AuthGuard] },
            { path: 'presentacion', component: PresentacionComponent, canActivate: [AuthGuard] },
            { path: 'paciente', component: PacienteComponent, canActivate: [AuthGuard] },
            { path: 'horarios', component: PersonaPorDiaComponent, canActivate: [AuthGuard] },
            { path: 'excepciones', component: ExcepcionesComponent, canActivate: [AuthGuard] },
            { path: 'reservas', component: ReservaComponent, canActivate: [AuthGuard] },
            { path: 'crear-reserva', component: CrearReservaComponent, canActivate: [AuthGuard] },
            { path: 'servicios', component: ServicioComponent, canActivate: [AuthGuard] },
            { path: 'editor-servicio', component: EditorServicioComponent, canActivate: [AuthGuard] },
            { path: 'editor-servicio/:id', component: EditorServicioComponent, canActivate: [AuthGuard] },
            { path: 'ficha', component: FichaComponent, canActivate: [AuthGuard] },
            { path: 'detalleservicio/:id', component: DetallesServicioComponent, canActivate: [AuthGuard] },
            { path: 'reportes', component: ReportesComponent, canActivate: [AuthGuard] },
            { path: 'login', component: LoginComponent }
        ]
    },
];
