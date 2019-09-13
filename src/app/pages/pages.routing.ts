import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { PacienteComponent } from './paciente/paciente.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ReservaComponent } from './reserva/reserva.component';
import { SubcategoriaComponent } from './subcategoria/subcategoria.component';
import { CrearReservaComponent } from './crear-reserva/crear-reserva.component';




export const PagesRoutes: Routes = [


    {
        path: '',
        component: PagesComponent,

        children: [
            { path: '', component: DashboardComponent },
            { path: 'paciente', component: PacienteComponent },
            { path: 'categorias', component: CategoriaComponent },
            { path: 'subcategorias', component: SubcategoriaComponent },
            { path: 'reservas', component: ReservaComponent },
            { path: 'crear-reserva', component: CrearReservaComponent },

        ]
    },

];
