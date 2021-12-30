import { RouterModule, Routes } from '@angular/router';
import { CountrieslistComponent } from './components/countrieslist/countrieslist.component';
import { CountriedetailComponent } from './components/countriedetail/countriedetail.component';

const appRoutes: Routes = [  
  { 
    path: '', 
    children:[
      {path: 'paises', component : CountrieslistComponent},
      {path: 'detallepais/:idpais', component : CountriedetailComponent},
      {path: '', redirectTo: 'paises', pathMatch: 'full'}
    ]
  },
  {path: 'paises', component : CountrieslistComponent},
  { path: '**', redirectTo: 'paises', pathMatch: 'full'}
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true ,onSameUrlNavigation: 'reload' } );
