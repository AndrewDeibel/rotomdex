import { EditProfileComponent } from '../pages/edit-profile/edit-profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

// Pages
import {
  CardComponent,
  CardsComponent,
  HomeComponent,
  ExpansionsComponent,
  ExpansionComponent,
  ScannerComponent,
  ScannerListsComponent,
  ScannerListComponent,
  PokemonsComponent,
  PokemonComponent,
  CollectionComponent,
  SignInComponent,
  SignUpComponent,
  ForgotComponent,
  ResetComponent,
  CollectionCardGroupComponent,
} from '../pages';

const routes: Routes = [
  // Home
  {
    path: '',
    component: HomeComponent,
    data: {
      transparentHeader: true,
    },
  },

  // Cards
  {
    path: 'cards',
    //canActivate: [AuthGuard],
    component: CardsComponent,
  },
  {
    path: 'cards/:slug',
    component: CardComponent,
  },
  {
    path: 'cards/types/:type',
    component: CardsComponent,
  },
  {
    path: 'cards/rarity/:rarity',
    component: CardsComponent,
  },
  {
    path: 'cards/artists/:artist',
    component: CardsComponent,
  },
  {
    path: 'cards/supertype/:supertype',
    component: CardsComponent,
  },
  {
    path: 'cards/subtype/:subtype',
    component: CardsComponent,
  },

  // Collection
  {
    path: 'collection/dashboard',
    component: CollectionComponent,
  },
  {
    path: 'collection',
    component: CollectionComponent,
  },
  {
    path: 'collection/add',
    component: CollectionComponent,
  },

  // Scanner
  // {
  // 	path: 'scanner',
  // 	component: ScannerComponent,
  // },
  // {
  // 	path: 'scanner/lists',
  // 	component: ScannerListsComponent,
  // },
  // {
  // 	path: 'scanner/lists/:id',
  // 	component: ScannerListComponent,
  // },

  // Auth
  {
    path: 'signin',
    component: SignInComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'forgot',
    component: ForgotComponent,
  },
  {
    path: 'reset/:token',
    component: ResetComponent,
  },

  // Edit profile
  {
    path: 'profile',
    component: EditProfileComponent,
  },
  {
    path: 'profile/edit',
    component: EditProfileComponent,
  },

  // Expansions
  {
    path: 'expansions',
    component: ExpansionsComponent,
  },
  {
    path: 'expansions/:code',
    component: ExpansionComponent,
  },

  // Pokemon
  {
    path: 'pokemon',
    component: PokemonsComponent,
  },
  {
    path: 'pokemon/:slug',
    component: PokemonComponent,
  },
  {
    path: 'pokemon/type/:type',
    component: PokemonsComponent,
  },

  // otherwise redirect to home
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
