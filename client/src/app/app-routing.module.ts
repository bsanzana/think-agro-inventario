import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DefaultLayoutComponent } from "./containers";
import { Page404Component } from "./views/pages/page404/page404.component";
import { Page500Component } from "./views/pages/page500/page500.component";
import { LoginComponent } from "./views/pages/login/login.component";
import { RegisterComponent } from "./views/pages/register/register.component";
import { UsersComponent } from "./views/users/users.component";
import { WarehousesComponent } from "./views/warehouses/warehouses.component";
import { CrudWarehousesComponent } from "./views/warehouses/crud-warehouses/crud-warehouses.component";

import { checkToken } from "./guard/checkToken.guard";
const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "warehouses",
    component: WarehousesComponent,
    data: {
      title: "Bodegas",
    },
    canActivate: [checkToken],
  },
  {
    path: "",
    component: DefaultLayoutComponent,
    canActivate: [checkToken],
    data: {
      title: "Inicio",
    },
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("./views/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "pages",
        loadChildren: () =>
          import("./views/pages/pages.module").then((m) => m.PagesModule),
      },
      {
        path: "users",
        component: UsersComponent,
        canActivate: [checkToken],
      },

      {
        path: "warehouses/crud",
        component: CrudWarehousesComponent,
        canActivate: [checkToken],
      },
    ],
  },
  {
    path: "404",
    component: Page404Component,
    data: {
      title: "Page 404",
    },
  },
  {
    path: "500",
    component: Page500Component,
    data: {
      title: "Page 500",
    },
  },
  {
    path: "login",
    component: LoginComponent,
    data: {
      title: "Login Page",
    },
  },
  {
    path: "register",
    component: RegisterComponent,
    data: {
      title: "Register Page",
    },
  },
  { path: "**", redirectTo: "login" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "top",
      anchorScrolling: "enabled",
      initialNavigation: "enabledBlocking",
      // relativeLinkResolution: 'legacy'
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
