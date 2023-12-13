import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { ReactiveFormsModule } from "@angular/forms";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { AuthGuardFn } from "./pages/guards/auth.guard";
import { RegisterComponent } from "./pages/register/register.component";
import { CategoriesComponent } from "./pages/category/list/categories.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/system-admin/dashboard",
    pathMatch: "full",
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "system-admin",
        loadChildren: () =>
          import("src/app/layouts/admin-layout/admin-layout.module").then(
            (m) => m.AdminLayoutModule
          ),
      },
    ],
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/layouts/auth-layout/auth-layout.module").then(
            (m) => m.AuthLayoutModule
          ),
      },
    ],
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  exports: [],
})
export class AppRoutingModule {}
