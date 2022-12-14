import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {SqliteComponent} from "./sqlite/sqlite.component";
import {CameraComponent} from "./camera/camera.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'nfc',
    loadChildren: () => import('./nfc/nfc.page').then(m => m.NFCComponentModule)
  },
  {
    path: 'sqlite',
    component: SqliteComponent
  },
  {
    path: 'camera',
    component: CameraComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
