import { Component, OnInit, OnDestroy } from '@angular/core';
import { artworks } from '../data/artwork';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, OnDestroy {
  // Replace with your real preview images (relative to /assets or absolute)
  previewImages: any;


  current = 0;
  autoplay = true;
  autoplayMs = 4500;
  private autoplayHandle: any = null;

  // swipe state
  private pointerStartX = 0;
  private pointerDeltaX = 0;
  private isPointerDown = false;

  ngOnInit(): void {
    this.previewImages = artworks.map(a => a.thumb);
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
    this.clearPointerState();
  }

  // Navigation
  prev(): void {
    this.current = (this.current - 1 + this.previewImages.length) % this.previewImages.length;
  }

  next(): void {
    this.current = (this.current + 1) % this.previewImages.length;
  }

  goTo(index: number): void {
    if (index < 0 || index >= this.previewImages.length) return;
    this.current = index;
    this.restartAutoplay();
  }

  // Autoplay control
  startAutoplay(): void {
    if (!this.autoplay || this.autoplayHandle) return;
    this.autoplayHandle = setInterval(() => this.next(), this.autoplayMs);
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

  // Pointer / swipe handlers for touch
  onPointerDown(ev: PointerEvent): void {
    this.isPointerDown = true;
    this.pointerStartX = ev.clientX;
    this.pointerDeltaX = 0;
    (ev.target as Element).setPointerCapture(ev.pointerId);
    this.stopAutoplay();
  }

  onPointerMove(ev: PointerEvent): void {
    if (!this.isPointerDown) return;
    this.pointerDeltaX = ev.clientX - this.pointerStartX;
    // optional: could update visual translate for dragging feedback
  }

  onPointerUp(ev: PointerEvent): void {
    if (!this.isPointerDown) return;
    this.isPointerDown = false;
    const threshold = 56; // px
    if (this.pointerDeltaX > threshold) {
      this.prev();
    } else if (this.pointerDeltaX < -threshold) {
      this.next();
    }
    this.clearPointerState();
    this.restartAutoplay();
  }

  onPointerCancel(): void {
    this.isPointerDown = false;
    this.clearPointerState();
    this.restartAutoplay();
  }

  private clearPointerState() {
    this.pointerStartX = 0;
    this.pointerDeltaX = 0;
    this.isPointerDown = false;
  }

  // Keyboard support for arrows
  onKeydown(evt: KeyboardEvent): void {
    if (evt.key === 'ArrowLeft') this.prev();
    if (evt.key === 'ArrowRight') this.next();
  }
}
