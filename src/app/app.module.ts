// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

// Third party
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {
  FontAwesomeModule,
  FaIconLibrary,
  FaConfig,
} from '@fortawesome/angular-fontawesome';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ColorPickerModule } from 'ngx-color-picker';
import { WebcamModule } from 'ngx-webcam';

// App
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Controls
import {
  AlertComponent,
  CheckboxComponent,
  EditorComponent,
  FormComponent,
  FormGroupComponent,
  FormControlComponent,
  LoaderComponent,
  MenuComponent,
  NotificationsComponent,
  SelectComponent,
  TagComponent,
  TextareaComponent,
  TextboxComponent,
  ToggleComponent,
  ProgressBarComponent,
  TypeTagComponent,
  EmptyComponent,
  HeroComponent,
  DialogModule,
  ButtonComponent,
  FileUploadComponent,
} from './controls';

// Pages
import {
  SignInComponent,
  SignUpComponent,
  ForgotComponent,
  ResetComponent,
  CardsComponent,
  CardComponent,
  CardItemGridComponent,
  CardItemListComponent,
  HomeComponent,
  ScannerComponent,
  ScannerListsComponent,
  ScannerListComponent,
  ExpansionsComponent,
  ExpansionComponent,
  ExpansionItemGridComponent,
  ExpansionItemListComponent,
  PokemonsComponent,
  PokemonItemGridComponent,
  PokmeonItemListComponent,
  PokemonComponent,
  CollectionComponent,
  DashboardComponent,
  UserCardGroupComponent,
  UserCardsComponent,
  UserCardComponent,
  EditUserComponent,
  CardImageDialogComponent,
  UserCardNotesDialogComponent,
  ChangePasswordDialogComponent,
  ImportCardsComponent,
  WishlistComponent,
} from './pages';

// Page
import {
  FooterComponent,
  HeaderComponent,
  ProfileComponent,
  SearchComponent,
  ItemsComponent,
  ItemsHeaderComponent,
  ItemsFilterComponent,
  ItemsFooterComponent,
  ItemsGridComponent,
  ItemsListComponent,
  ItemsGroupsComponent,
} from './layout';

// Helpers
import {
  ErrorIntercept,
  JwtInterceptor,
  ClickOutsideDirective,
} from './helpers';

// Icons
import {
  faSearch,
  faList,
  faArchive,
  faBookSpells,
  faChartLine,
  faUser,
  faCrown,
  faLightSwitchOn,
  faCog,
  faBox,
  faFolders,
  faUsers,
  faEllipsisV,
  faArrowUp,
  faArrowDown,
  faHorizontalRule,
  faTrash,
  faPalette,
  faCrosshairs,
  faHistory,
  faExternalLink,
  faDollarSign,
  faAngleLeft,
  faAngleRight,
  faArrowLeft,
  faArrowRight,
  faCaretUp,
  faCaretRight,
  faCaretDown,
  faCaretLeft,
  faSignIn,
  faPlus,
  faSignOut,
  faUserPlus,
  faTh,
  faVideo,
  faCamera,
  faBringFront,
  faSync,
  faPlay,
  faStop,
  faPause,
  faDonate,
  faTachometer,
  faCheck,
  faInfo,
  faExclamationTriangle,
  faTimesOctagon,
  faTimes,
  faLayerGroup,
  faRectanglePortrait,
  faAlbumCollection,
  faShoppingCart,
  faGavel,
  faBalanceScale,
  faSave,
  faLineColumns,
  faShieldAlt,
  faSwords,
  faAlignLeft,
  faEye,
  faRepeat,
  faUndo,
  faArrowToTop,
  faArrowToBottom,
  faRandom,
  faHandHoldingMedical,
  faTombstoneAlt,
  faLevelUp,
  faLevelDown,
  faSortSizeUp,
  faSortSizeDownAlt,
  faSortAlt,
  faDiceThree,
  faDice,
  faExclamationCircle,
  faThumbsUp,
  faExclamation,
  faCoin,
  faForward,
  faHourglassStart,
  faHourglassEnd,
  faKeyboard,
  faDiceD4,
  faDiceD6,
  faDiceD10,
  faDiceD12,
  faDiceD20,
  faDiceD8,
  faClone,
  faFlaskPotion,
  faFolder,
  faEdit,
  faAngleUp,
  faAngleDown,
  faMinus,
  faCompress,
  faExpand,
  faLock,
  faLockOpen,
  faImage,
  faPawClaws,
  faTrophy,
  faBolt,
  faMagic,
  faMountains,
  faEclipse,
  faHoodCloak,
  faDragon,
  faTools,
  faToolbox,
  faHeart,
  faHeartbeat,
  faThunderstorm,
  faNewspaper,
  faSparkles,
  faQuestion,
  faBars,
  faHouse,
  faCopy,
  faExpandArrowsAlt,
  faOtter,
  faDotCircle,
  faInfoCircle,
  faBrush,
  faPaintBrush,
  faHashtag,
  faBookOpen,
  faInbox,
  faExchange,
  faStickyNote,
  faStar,
  faFileImport,
  faUpload,
  faDownload,
} from '@fortawesome/pro-duotone-svg-icons';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,

    // Controls
    // ====================
    MenuComponent,
    CheckboxComponent,
    LoaderComponent,
    SelectComponent,
    TextboxComponent,
    TextareaComponent,
    NotificationsComponent,
    FormComponent,
    FormGroupComponent,
    FormControlComponent,
    EditorComponent,
    ToggleComponent,
    TagComponent,
    AlertComponent,
    ProgressBarComponent,
    TypeTagComponent,
    EmptyComponent,
    HeroComponent,
    ButtonComponent,
    FileUploadComponent,

    // Page
    // ====================
    HeaderComponent,
    SearchComponent,
    ProfileComponent,
    FooterComponent,
    ItemsComponent,
    ItemsHeaderComponent,
    ItemsFilterComponent,
    ItemsFooterComponent,
    ItemsGridComponent,
    ItemsListComponent,
    ItemsGroupsComponent,
    UserCardGroupComponent,
    DashboardComponent,
    CardImageDialogComponent,
    UserCardNotesDialogComponent,
    ChangePasswordDialogComponent,

    // Pages
    // ====================
    HomeComponent,
    CardsComponent,
    CardItemGridComponent,
    CardItemListComponent,
    CardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotComponent,
    ResetComponent,
    EditUserComponent,
    ExpansionsComponent,
    ExpansionItemGridComponent,
    ExpansionItemListComponent,
    ExpansionComponent,
    PokemonsComponent,
    PokemonItemGridComponent,
    PokmeonItemListComponent,
    PokemonComponent,
    ProfileComponent,
    UserCardComponent,
    UserCardsComponent,
    CollectionComponent,
    ScannerComponent,
    ScannerListsComponent,
    ImportCardsComponent,
    WishlistComponent,

    // Helpers
    ClickOutsideDirective,
  ],
  imports: [
    BrowserModule,
    DialogModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    CKEditorModule,
    ColorPickerModule,
    WebcamModule,
    InlineSVGModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorIntercept,
      multi: true,
    },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private library: FaIconLibrary, private faConfig: FaConfig) {
    library.addIcons(
      faSearch,
      faList,
      faArchive,
      faBookSpells,
      faChartLine,
      faUser,
      faCrown,
      faLightSwitchOn,
      faCog,
      faBox,
      faFolders,
      faUsers,
      faEllipsisV,
      faArrowUp,
      faArrowDown,
      faHorizontalRule,
      faTrash,
      faPalette,
      faCrosshairs,
      faHistory,
      faExternalLink,
      faDollarSign,
      faCog,
      faAngleLeft,
      faAngleRight,
      faArrowLeft,
      faArrowRight,
      faCaretUp,
      faCaretRight,
      faCaretDown,
      faCaretLeft,
      faSignIn,
      faSignOut,
      faPlus,
      faUserPlus,
      faTh,
      faCamera,
      faVideo,
      faBringFront,
      faSync,
      faPlay,
      faPause,
      faStop,
      faDonate,
      faTachometer,
      faCheck,
      faInfo,
      faExclamationTriangle,
      faTimesOctagon,
      faTimes,
      faLayerGroup,
      faRectanglePortrait,
      faAlbumCollection,
      faShoppingCart,
      faGavel,
      faBalanceScale,
      faSave,
      faLineColumns,
      faShieldAlt,
      faPalette,
      faSwords,
      faAlignLeft,
      faEye,
      faRepeat,
      faUndo,
      faArrowToTop,
      faArrowToBottom,
      faRandom,
      faHandHoldingMedical,
      faTombstoneAlt,
      faLevelUp,
      faLevelDown,
      faSwords,
      faSortSizeUp,
      faSortSizeDownAlt,
      faSortAlt,
      faDiceThree,
      faDice,
      faDiceD4,
      faDiceD6,
      faDiceD8,
      faDiceD10,
      faDiceD12,
      faDiceD20,
      faExclamationCircle,
      faThumbsUp,
      faExclamation,
      faCoin,
      faForward,
      faHourglassStart,
      faHourglassEnd,
      faKeyboard,
      faClone,
      faFlaskPotion,
      faFolder,
      faEdit,
      faAngleUp,
      faAngleRight,
      faAngleDown,
      faAngleLeft,
      faMinus,
      faExpand,
      faCompress,
      faLock,
      faLockOpen,
      faImage,
      faPawClaws,
      faTrophy,
      faBolt,
      faMagic,
      faMountains,
      faEclipse,
      faHoodCloak,
      faDragon,
      faTools,
      faToolbox,
      faHeart,
      faHeartbeat,
      faThunderstorm,
      faNewspaper,
      faSparkles,
      faQuestion,
      faBars,
      faHouse,
      faCopy,
      faExpandArrowsAlt,
      faOtter,
      faDotCircle,
      faBox,
      faAlignLeft,
      faInfoCircle,
      faDollarSign,
      faBrush,
      faPaintBrush,
      faHashtag,
      faBookOpen,
      faInbox,
      faBalanceScale,
      faExchange,
      faStickyNote,
      faStar,
      faFileImport,
      faDownload,
      faUpload
    );
    faConfig.defaultPrefix = 'fad';
  }
}
