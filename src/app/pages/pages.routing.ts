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
            { path: '', component: DashboardComponent },
            { path: 'categorias', component: CategoriaComponent },
            { path: 'subcategorias', component: SubcategoriaComponent },
                { path: 'presentacion', component:PresentacionComponent },
            { path: 'paciente', component: PacienteComponent },
            { path: 'horarios', component: PersonaPorDiaComponent, canActivate: [AuthGuard] },
            { path: 'excepciones', component: ExcepcionesComponent, canActivate: [AuthGuard] },
            { path: 'reservas', component: ReservaComponent },
            { path: 'crear-reserva', component: CrearReservaComponent },
            { path: 'servicios', component: ServicioComponent },
            { path: 'editor-servicio', component: EditorServicioComponent },
            { path: 'editor-servicio/:id', component: EditorServicioComponent },
            { path: 'ficha', component: FichaComponent },
            { path: 'detalleservicio/:id', component: DetallesServicioComponent }
                { path: 'reportes', component:ReportesComponent}
        ]
    },
];
