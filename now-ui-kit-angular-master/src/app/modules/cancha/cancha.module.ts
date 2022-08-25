import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryComponent } from './components/gallery/gallery.component';
import { HeaderComponent } from './components/header/header.component';
import { MapComponent } from './components/map/map.component';
import { CanchaComponent } from './cancha.component';


@NgModule({
  declarations: [
    GalleryComponent,
    HeaderComponent,
    MapComponent,
    CanchaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CanchaModule { }
