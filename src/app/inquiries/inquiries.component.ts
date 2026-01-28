// src/app/inquiries/inquiries.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inquiries',
  templateUrl: './inquiries.component.html',
  styleUrls: ['./inquiries.component.css']
})
export class InquiriesComponent implements OnInit {
  contactEmail = 'artist@example.com';
  contactPhone = '+919871415760';
  waNumber = '919871415760';

  form!: FormGroup;
  sending = false;
  reasons = [
    { value: 'purchase', label: 'Purchase' },
    { value: 'partner', label: 'Partnership / Collaboration' },
    { value: 'other', label: 'Other' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      contact: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]{6,20}$/)]],
      reason: ['purchase', Validators.required],
      message: ['']
    });
  }

  // convenience getter for template
  get f() { return this.form.controls; }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.value;
    const lines = [
      `Inquiry from website:`,
      `Name: ${v.name}`,
      `City: ${v.city}`,
      `Contact: ${v.contact}`,
      `Reason: ${this.reasons.find(r => r.value === v.reason)?.label || v.reason}`,
    ];
    if (v.message && v.message.trim()) {
      lines.push(`Message: ${v.message.trim()}`);
    }
    lines.push(`---`);
    lines.push(`Sent from the Artist site.`);

    const text = encodeURIComponent(lines.join('\n'));
    // Use wa.me link — requires number without '+' and no spaces
    const waUrl = `https://wa.me/${this.waNumber}?text=${text}`;

    this.sending = true;

    // open in new tab/window - the browser or device will route to WhatsApp app if installed
    const opened = window.open(waUrl, '_blank');
    if (!opened) {
      // fallback: try direct location change (may be blocked by popup blockers)
      const win = window.open(waUrl, '_blank', 'noopener,noreferrer');
      if (!win) {
        // optional fallback message if popup blocked
        alert('Please allow pop-ups to open WhatsApp.');
      }
    }

    // optionally reset sending state after a short delay
    setTimeout(() => {
      this.sending = false;
      // do not automatically reset form (user might want to review); comment out if you want reset:
      // this.form.reset({ reason: 'purchase' });
    }, 1200);
  }
}
