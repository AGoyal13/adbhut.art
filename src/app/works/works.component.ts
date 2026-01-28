// src/app/works/works.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { artworks } from '../data/artwork';
import { ArtWork } from '../art-work';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent implements OnInit {
  artworks: ArtWork[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // canonical data source
    this.artworks = artworks;
  }

  openArtwork(art: ArtWork): void {
    // navigate to detail route
    this.router.navigate(['/works', art.id]);
  }

  onCardKeydown(event: KeyboardEvent, art: ArtWork) {
    // support Enter and Space to open
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.openArtwork(art);
    }
  }
}
