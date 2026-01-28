import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ElementRef,
  HostListener,
  Renderer2,
  ViewChild
} from '@angular/core';
import { artworks } from '../data/artwork';
import { ArtWork } from '../art-work';
import { Router } from '@angular/router';

@Component({
  selector: 'app-works-carrousel',
  templateUrl: './works-carrousel.component.html',
  styleUrls: ['./works-carrousel.component.css']
})
export class WorksCarrouselComponent implements OnInit {

  artworks: ArtWork[] = artworks;

  // carousel state
  currentIndex = 0;
  rotation = 0; // current Y rotation in degrees
  autoPlay = true;
  autoMs = 4500;
  private autoplayHandle: any = null;

  // geometry
  private sideCount = 0;
  private angleStep = 0;
  private radius = 0;
  @ViewChildren('slideEl') slideEls!: QueryList<ElementRef<HTMLDivElement>>;
  @ViewChild('carouselStage') carouselStage!: ElementRef<HTMLDivElement>;

  // swipe
  private pointerDown = false;
  private startX = 0;
  private deltaX = 0;

  constructor(private router: Router, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.sideCount = this.artworks.length || 4;
    this.angleStep = 360 / this.sideCount;
  }

  ngAfterViewInit(): void {
    // initial layout
    setTimeout(() => this.layoutCarousel(), 0);
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  // layout: compute radius based on stage width and card width
  layoutCarousel(): void {
    const stage = this.carouselStage?.nativeElement;
    if (!stage || !this.slideEls) return;

    const card = stage.querySelector<HTMLElement>('.card');
    if (!card) return;

    const cardWidth = card.offsetWidth;
    // radius formula approximated: radius = cardWidth / (2 * tan(pi / n))
    const n = Math.max(3, this.sideCount);
    const rad = cardWidth / (2 * Math.tan(Math.PI / n));
    // keep a minimum/maximum radius to control depth
    this.radius = Math.min(Math.max(rad, cardWidth * 0.8), Math.max(stage.offsetWidth * 0.8, 260));
    // set transform for each slide
    this.slideEls.forEach((elRef: ElementRef, i: number) => {
      const el = elRef.nativeElement;
      const angle = i * this.angleStep;
      const transform = `rotateY(${angle}deg) translateZ(${this.radius}px)`;
      this.renderer.setStyle(el, 'transform', transform);
      // ensure backface hidden and preserve3d already set in CSS
    });
    // set initial rotation
    this.updateRotation();
  }

  updateRotation(): void {
    this.rotation = -this.currentIndex * this.angleStep;
    const stage = this.carouselStage?.nativeElement;
    if (stage) {
      this.renderer.setStyle(stage, 'transform', `translateZ(-${this.radius}px) rotateY(${this.rotation}deg)`);
    }
  }

  goto(index: number): void {
    this.currentIndex = ((index % this.sideCount) + this.sideCount) % this.sideCount;
    this.updateRotation();
    this.restartAutoplay();
  }

  prev(): void {
    this.goto(this.currentIndex - 1);
  }

  next(): void {
    this.goto(this.currentIndex + 1);
  }

  // autoplay
  startAutoplay(): void {
    if (!this.autoPlay || this.autoplayHandle) return;
    this.autoplayHandle = setInterval(() => this.next(), this.autoMs);
  }
  stopAutoplay(): void {
    if (!this.autoplayHandle) return;
    clearInterval(this.autoplayHandle);
    this.autoplayHandle = null;
  }
  restartAutoplay(): void {
    this.stopAutoplay();
    this.startAutoplay();
  }

  // keyboard support
  @HostListener('document:keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft') this.prev();
    if (e.key === 'ArrowRight') this.next();
  }

  // resize observer fallback
  @HostListener('window:resize')
  onResize() {
    // re-layout (debounce lightly)
    clearTimeout((this as any).__resizeTimer);
    (this as any).__resizeTimer = setTimeout(() => this.layoutCarousel(), 120);
  }

  // pointer (swipe) handlers on stage
  onPointerDown(ev: PointerEvent) {
    this.pointerDown = true;
    this.startX = ev.clientX;
    this.deltaX = 0;
    this.stopAutoplay();
    (ev.target as Element).setPointerCapture(ev.pointerId);
  }
  onPointerMove(ev: PointerEvent) {
    if (!this.pointerDown) return;
    this.deltaX = ev.clientX - this.startX;
    // visual feedback: rotate slightly with drag
    const stage = this.carouselStage?.nativeElement;
    if (stage) {
      const dragRotate = this.rotation + (this.deltaX / 8);
      this.renderer.setStyle(stage, 'transform', `translateZ(-${this.radius}px) rotateY(${dragRotate}deg)`);
    }
  }
  onPointerUp(ev: PointerEvent) {
    if (!this.pointerDown) return;
    this.pointerDown = false;
    const threshold = 40;
    if (this.deltaX > threshold) this.prev();
    else if (this.deltaX < -threshold) this.next();
    else this.updateRotation(); // snap back
    try { (ev.target as Element).releasePointerCapture(ev.pointerId); } catch {}
    this.restartAutoplay();
  }
  onPointerCancel() {
    this.pointerDown = false;
    this.updateRotation();
    this.restartAutoplay();
  }

  // open artwork detail route - emit event or navigate externally
  openArtwork(art: ArtWork) {
    // For this component we just navigate by using location or emit an event.
    // Prefer using router navigation at parent if needed. For simplicity:
    this.router.navigate(['/works', art.id]);
  }

  // helper for ARIA / dots
  isActive(i: number) {
    return i === this.currentIndex;
  }
}
