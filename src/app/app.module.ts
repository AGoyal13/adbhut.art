import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { WorksComponent } from './works/works.component';
import { ArtistComponent } from './artist/artist.component';
import { InquiriesComponent } from './inquiries/inquiries.component';
import { WorksCarrouselComponent } from './works-carrousel/works-carrousel.component';
import { ArtworkDetailComponent } from './artwork-detail/artwork-detail.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    WorksComponent,
    ArtistComponent,
    InquiriesComponent,
    WorksCarrouselComponent,
    ArtworkDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
