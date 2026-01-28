import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { artworks } from '../data/artwork';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ArtWork } from '../art-work';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-artwork-detail',
  templateUrl: './artwork-detail.component.html',
  styleUrls: ['./artwork-detail.component.css']
})
export class ArtworkDetailComponent implements OnInit {
  artwork?: ArtWork;
  index = -1;
  routeSub?: Subscription;
  artworks = artworks;

  // Magnifier state & view refs
  @ViewChild('detailImg', { static: false }) detailImgRef!: ElementRef<HTMLImageElement>;
  magnifierEnabled = false;
  zoomStyle: { [k: string]: any } = { display: 'none' };
  private lensW = 180;          // lens width in px (adjustable)
  private lensH = 180;          // lens height in px
  private zoomFactor = 2.5;     // magnification factor
  private imgRect: DOMRect | null = null;
  private imgLoaded = false;
  private pointerActive = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe((pm: ParamMap) => {
      const id = pm.get('id');
      this.loadArtwork(id);
      window.scrollTo({ top: 0, behavior: 'auto' });
      this.disableMagnifierState();
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  loadArtwork(id: string | null) {
    if (!id) {
      this.router.navigate(['/works']);
      return;
    }
    const idx = artworks.findIndex(a => a.id === id);
    if (idx === -1) {
      this.router.navigate(['/works']);
      return;
    }
    this.index = idx;
    this.artwork = artworks[idx];
  }

  goBack(event?: any) {
    if (event) event.preventDefault();
    this.router.navigate(['/works']);
  }

  openArtworkByIndex(idx: number) {
    const n = artworks.length;
    const next = ((idx % n) + n) % n;
    this.router.navigate(['/works', artworks[next].id]);
  }

  prev() { this.openArtworkByIndex(this.index - 1); }
  next() { this.openArtworkByIndex(this.index + 1); }

  @HostListener('document:keydown', ['$event'])
  onKeydown(ev: KeyboardEvent) {
    if (ev.key === 'ArrowLeft') this.prev();
    if (ev.key === 'ArrowRight') this.next();
    if (ev.key === 'Escape') this.goBack();
  }

  // ------------------- Magnifier controls -------------------

  toggleMagnifier(ev?: Event) {
    if (ev) ev.preventDefault();
    this.magnifierEnabled = !this.magnifierEnabled;
    if (!this.magnifierEnabled) {
      this.disableZoom();
    } else {
      // recalc bounds when enabling (if image already loaded)
      if (this.detailImgRef && this.imgLoaded) {
        this.imgRect = this.detailImgRef.nativeElement.getBoundingClientRect();
      }
    }
  }

  disableMagnifierState() {
    this.magnifierEnabled = false;
    this.disableZoom();
  }

  onImageLoad() {
    this.imgLoaded = true;
    if (this.detailImgRef) {
      // update rect for lens calculations
      this.imgRect = this.detailImgRef.nativeElement.getBoundingClientRect();
    }
  }

  onZoom(ev: MouseEvent) {
    if (!this.detailImgRef || !this.imgLoaded || !this.magnifierEnabled) return;
    const img = this.detailImgRef.nativeElement;
    this.imgRect = img.getBoundingClientRect();

    const cursorX = ev.clientX - this.imgRect.left;
    const cursorY = ev.clientY - this.imgRect.top;

    // clamp
    const x = Math.max(0, Math.min(cursorX, this.imgRect.width));
    const y = Math.max(0, Math.min(cursorY, this.imgRect.height));

    const bgW = this.imgRect.width * this.zoomFactor;
    const bgH = this.imgRect.height * this.zoomFactor;

    const bgPosX = -(x * this.zoomFactor - this.lensW / 2);
    const bgPosY = -(y * this.zoomFactor - this.lensH / 2);

    // convert to container coords (zoom-wrap parent)
    const containerRect = (this.detailImgRef.nativeElement.parentElement as HTMLElement).getBoundingClientRect();
    const left = this.imgRect.left + x - containerRect.left;
    const top = this.imgRect.top + y - containerRect.top;

    this.zoomStyle = {
      display: 'block',
      width: `${this.lensW}px`,
      height: `${this.lensH}px`,
      left: `${left}px`,
      top: `${top}px`,
      backgroundImage: `url("${img.currentSrc || img.src}")`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: `${bgW}px ${bgH}px`,
      backgroundPosition: `${bgPosX}px ${bgPosY}px`,
      borderRadius: '50%',
      boxShadow: '0 6px 18px rgba(0,0,0,0.45)',
      pointerEvents: 'none',
      transform: 'translate(-50%, -50%)'
    };
  }

  enablePointerZoom(ev: PointerEvent) {
    if (!this.magnifierEnabled) return;
    this.pointerActive = true;
  
    // capture pointer so drag works smoothly on touch
    (ev.target as HTMLElement).setPointerCapture(ev.pointerId);
  
    this.onZoom(ev as any);
  }
  
  disableZoom() {
    this.pointerActive = false;
    this.zoomStyle = { display: 'none' };
  }
}
