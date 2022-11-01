// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';

// Third party
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {
  FontAwesomeModule,
  FaIconLibrary,
  FaConfig,
} from '@fortawesome/angular-fontawesome';
import { ColorPickerModule } from 'ngx-color-picker';
import { WebcamModule } from 'ngx-webcam';
import { NgxCaptureModule } from 'ngx-capture';

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
  TabsComponent,
  TabComponent,
  RadioComponent,
} from './controls';

// Pages
import {
  SignInComponent,
  SignUpComponent,
  ForgotComponent,
  ResetComponent,
  VerifyComponent,
  CardsComponent,
  CardComponent,
  CardDetailsComponent,
  CardItemGridComponent,
  CardItemListComponent,
  HomeComponent,
  ScannerComponent,
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
  AddUserCardGroupComponent,
  CardUserCardsComponent,
  CardUserCardComponent,
  EditUserComponent,
  EditProfileComponent,
  EditSubscriptionComponent,
  CardImageDialogComponent,
  CardUserCardNotesDialogComponent,
  ChangePasswordDialogComponent,
  ImportCardsComponent,
  WishlistComponent,
  FavoritesComponent,
  UserCardsComponent,
  UserCardGroupComponent,
  ScanDialogComponent,
  AddToCollectionDialogComponent,
  CustomResultDialogComponent,
  SubscriptionsTableComponent,
  SubscriptionTierComponent,
} from './pages';

// Page
import {
  FooterComponent,
  HeaderComponent,
  UserMenuComponent,
  SearchComponent,
  ItemsComponent,
  ItemsHeaderComponent,
  ItemsFilterComponent,
  ItemsFooterComponent,
  ItemsGridComponent,
  ItemsListComponent,
  ItemsGroupsComponent,
  ReportIssueDialogComponent,
  UnverifiedComponent,
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
  faClipboardCheck,
  faStars,
  faBadgePercent,
  faAward,
} from '@fortawesome/pro-duotone-svg-icons';
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
    TabsComponent,
    TabComponent,
    RadioComponent,

    // Page
    // ====================
    HeaderComponent,
    SearchComponent,
    UserMenuComponent,
    FooterComponent,
    ItemsComponent,
    ItemsHeaderComponent,
    ItemsFilterComponent,
    ItemsFooterComponent,
    ItemsGridComponent,
    ItemsListComponent,
    ItemsGroupsComponent,
    AddUserCardGroupComponent,
    DashboardComponent,
    CardImageDialogComponent,
    CardUserCardNotesDialogComponent,
    ChangePasswordDialogComponent,
    ReportIssueDialogComponent,
    UnverifiedComponent,

    // Pages
    // ====================
    HomeComponent,
    CardsComponent,
    CardItemGridComponent,
    CardItemListComponent,
    CardComponent,
    CardDetailsComponent,
    SignInComponent,
    SignUpComponent,
    ForgotComponent,
    ResetComponent,
    VerifyComponent,
    EditUserComponent,
    EditProfileComponent,
    EditSubscriptionComponent,
    ExpansionsComponent,
    ExpansionItemGridComponent,
    ExpansionItemListComponent,
    ExpansionComponent,
    PokemonsComponent,
    PokemonItemGridComponent,
    PokmeonItemListComponent,
    PokemonComponent,
    UserMenuComponent,
    CardUserCardComponent,
    CardUserCardsComponent,
    CollectionComponent,
    ScannerComponent,
    ScannerListComponent,
    ImportCardsComponent,
    WishlistComponent,
    FavoritesComponent,
    UserCardsComponent,
    UserCardGroupComponent,
    ScanDialogComponent,
    AddToCollectionDialogComponent,
    CustomResultDialogComponent,
    SubscriptionsTableComponent,
    SubscriptionTierComponent,

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
    ReactiveFormsModule,
    CKEditorModule,
    ColorPickerModule,
    WebcamModule,
    FontAwesomeModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    NgxCaptureModule,
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
      faUpload,
      faClipboardCheck,
      faStars,
      faBadgePercent,
      faAward
    );
    faConfig.defaultPrefix = 'fad';
  }
}
