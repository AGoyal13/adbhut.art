import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { WorksComponent } from './works/works.component';
import { ArtistComponent } from './artist/artist.component';
import { InquiriesComponent } from './inquiries/inquiries.component';
import { ArtworkDetailComponent } from './artwork-detail/artwork-detail.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'works', component: WorksComponent },
  { path: 'works/:id', component: ArtworkDetailComponent },
  { path: 'artist', component: ArtistComponent },
  { path: 'inquiries', component: InquiriesComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', useHash: true })],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
