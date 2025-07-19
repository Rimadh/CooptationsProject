import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { 
  MsalModule, 
  MsalInterceptor, 
  MSAL_INSTANCE, 
  MSAL_INTERCEPTOR_CONFIG, 
  MsalService, 
  MsalBroadcastService,
  MsalGuard,
  MsalInterceptorConfiguration
} from '@azure/msal-angular';
import { InteractionType, PublicClientApplication, LogLevel } from '@azure/msal-browser';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
// Import all components
import { MatDialogModule } from '@angular/material/dialog';
import { CooptationFormComponent } from './cooptation-form/cooptation-form.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NavbarComponent } from './navbar/navbar.component';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from "@angular/material/select";
import { CooptationListComponent } from './cooptation-list/cooptation-list.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { DetailsDialogComponent } from './list/dialogs/details-dialog/details-dialog.component';
import { StatusUpdateDialogComponent } from './list/dialogs/status-update-dialog/status-update-dialog.component';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { LoginComponent } from './login/login.component';
import { UpdatecooptationComponent } from './updatecooptation/updatecooptation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { NotifyManagerComponent } from './notify-manager/notify-manager.component';
import { ConsultantComponent } from './consultant/consultant.component';

// MSAL Configuration
const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

export function MSALInstanceFactory(): PublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: 'aef4d824-d894-46cb-b4de-500479dda4bb',
      authority: 'https://login.microsoftonline.com/7f7664ba-b764-47b8-887a-c7b8481fa676',
      redirectUri: 'http://localhost:4200',
      postLogoutRedirectUri: 'http://localhost:4200'
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: isIE, // Set to true for Internet Explorer
    },
    system: {
      loggerOptions: {
        loggerCallback: (level, message, containsPii) => {
          if (containsPii) return;
          console.log(message);
        },
        logLevel: LogLevel.Info
      }
    }
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('http://localhost:9191', ['api://aef4d824-d894-46cb-b4de-500479dda4bb/access_as_user']);
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

export function initializerFactory(msalService: MsalService): () => Promise<void> {
  return async () => {
    await msalService.instance.initialize();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    CooptationFormComponent,
    NavbarComponent,
    CooptationListComponent,
    DetailsDialogComponent,
    StatusUpdateDialogComponent,
    ConfirmationDialogComponent,
    LoginComponent,
    UpdatecooptationComponent,
    DashboardComponent,
    NotifyManagerComponent,
    ConsultantComponent,
  
  


  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    MsalModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
     MatInputModule,
     MatCheckboxModule,
      MatCardModule,
      MatDialogModule,
      MatProgressBarModule,
      MatChipsModule,
      NgChartsModule

],
  providers: [
     DatePipe,
    { 
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializerFactory,
      deps: [MsalService],
      multi: true
    },
    MsalService,
    MsalBroadcastService,
    MsalGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }