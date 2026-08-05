import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import Swal, { SweetAlertOptions } from 'sweetalert2';

import { ServiceService } from '../service.service';
import { EMAIL, RESUME_PATH, SOCIAL_LINKS } from '../site-data';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly service = inject(ServiceService);

  readonly email = EMAIL;
  readonly resumePath = RESUME_PATH;
  readonly socialLinks = SOCIAL_LINKS;

  /** Disables the submit button and swaps in a spinner while sending. */
  sending = false;

  /** nonNullable so the control values are `string`, never `string | null`. */
  readonly contactForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  get name(): AbstractControl {
    return this.contactForm.controls.name;
  }

  get emailField(): AbstractControl {
    return this.contactForm.controls.email;
  }

  get message(): AbstractControl {
    return this.contactForm.controls.message;
  }

  /** Only show an error once the user has actually engaged with the field. */
  isInvalid(control: AbstractControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  async submitForm(): Promise<void> {
    if (this.contactForm.invalid) {
      // Surfaces every error at once instead of silently doing nothing.
      this.contactForm.markAllAsTouched();
      return;
    }

    const { name, email, message } = this.contactForm.getRawValue();
    this.sending = true;
    let sent = false;

    try {
      await this.service.sendEmail(name, email, message);
      sent = true;
      this.contactForm.reset();
    } catch (error) {
      // The previous version swallowed this — the user saw nothing at all.
      console.error('Contact form: sending the message failed', error);
    } finally {
      this.sending = false;
    }

    await Swal.fire(
      sent
        ? {
            icon: 'success',
            title: 'Message sent',
            text: "Thanks for reaching out — I'll get back to you soon.",
            ...this.dialogTheme(),
          }
        : {
            icon: 'error',
            title: "Message couldn't be sent",
            text: `Something went wrong on the way out. You can email me directly at ${this.email}.`,
            ...this.dialogTheme(),
          }
    );
  }

  /** Keeps SweetAlert dialogs in step with the active theme. */
  private dialogTheme(): SweetAlertOptions {
    const styles = getComputedStyle(document.documentElement);
    const token = (name: string) => styles.getPropertyValue(name).trim();

    return {
      background: token('--surface'),
      color: token('--text'),
      confirmButtonColor: token('--accent'),
    };
  }
}
