import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CardComponent,
  CardsComponent,
  CollectionComponent,
  DashboardComponent,
  EditUserComponent,
  ExpansionComponent,
  ExpansionsComponent,
  ForgotComponent,
  HomeComponent,
  ImportCardsComponent,
  PokemonComponent,
  PokemonsComponent,
  ResetComponent,
  ScannerComponent,
  ScannerListComponent,
  SignInComponent,
  SignUpComponent,
  VerifyComponent,
  WishlistComponent,
  UserCardsComponent,
  AddUserCardGroupComponent,
  UserCardGroupComponent,
} from '@app/pages';

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
    path: 'collection',
    component: CollectionComponent,
    children: [
      {
        path: '',
        component: UserCardsComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'wishlist',
        component: WishlistComponent,
      },
      {
        path: 'add',
        component: AddUserCardGroupComponent,
      },
      {
        path: 'group/:id',
        component: UserCardGroupComponent,
      },
      {
        path: 'import',
        component: ImportCardsComponent,
      },
    ],
  },

  // Scanner
  {
    path: 'scanner',
    component: ScannerComponent,
  },
  {
    path: 'scanner/list',
    component: ScannerListComponent,
  },

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
  {
    path: 'verify',
    component: VerifyComponent,
  },
  {
    path: 'verify/:token',
    component: VerifyComponent,
  },

  // Edit profile
  // {
  //   path: 'profile/:name',
  //   component: ProfileComponent,
  // },
  {
    path: 'profile/edit',
    component: EditUserComponent,
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
