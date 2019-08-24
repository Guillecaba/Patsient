import { Routes } from '@angular/router';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';




export const AppRoutes: Routes = [
     {
     path:'**', component:NopagefoundComponent
      
    
  }, 
];
