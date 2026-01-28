import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  portrait = 'assets/artist.jpg';

  // example HTML writeup (safe to bind with [innerHTML] if sanitized upstream)
  writeupHtml = `
    <h1>Priti Jain</h1>
    <p>
    I have always been drawn to the quiet beauty of Indian traditions and the stories they
    carry. My artwork originates from observation - of people, of rituals, of folktales, of the
    subtle human emotions which people carry. Through my paintings, I give form to these
    inner and outer worlds, blending my memories and Indian culture with my imagination.
    Through my palette, I strive to capture different hues of human emotions.
    </p>
    <p>
    As a self-taught artist with over three decades of experience, I rely on intuition shaped
    by years of practice. Each artwork begins with a visual idea that slowly unfolds into a
    complete narrative.
    </p>
    <p>
    Acrylic colours on canvas are my chosen mediums, offering softness, richness,
vividness and visual depth. Expressing myself through my paintings brings me calm,
clarity and peace. I hope my work carries this sense of peace to the viewer, allowing
them to experience serenity, connection, emotional depth and cultural layers within
each work.
    </p>
  `;

  constructor() { }

  ngOnInit(): void {
  }

}
