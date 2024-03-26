import { NgModule } from "@angular/core";
import {
  HashLocationStrategy,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";
import { BrowserModule, Title } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";

import { NgScrollbarModule } from "ngx-scrollbar";

// Import routing module
import { AppRoutingModule } from "./app-routing.module";

// Import app component
import { AppComponent } from "./app.component";

// Import containers
import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
} from "./containers";

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
} from "@coreui/angular";

import { IconModule, IconSetService } from "@coreui/icons-angular";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ToasterModule, ToasterService } from "angular-toaster";
import { authInterceptor } from "../app/interceptors/auth.interceptor";
import { provideHttpClient, withInterceptors } from "@angular/common/http";

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];

@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    NgScrollbarModule,
  ],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    IconSetService,
    Title,
    ToasterService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
