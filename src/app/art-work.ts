export interface ArtWork {
  id: string;              // unique id used for routing (e.g. 'a1')
  title: string;           
  alt?: string;            // alt text for images
  thumb: string;           // thumbnail path (small)
  image?: string;          // full-size image
  year?: string | number;
  medium?: string;         // e.g. "Oil on canvas"
  dimensions?: string;     // e.g. "30 x 40 in"
  description?: string;    // long writeup / story
  video?: string;          // optional video url or asset path
  tags?: string[];         // categories, collections, etc.
  price?: string | null;          // optional (or null) — use for inquiries
}
