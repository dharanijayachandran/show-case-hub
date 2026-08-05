import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { ServiceService } from '../service.service';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let element: HTMLElement;
  let sendEmail: jasmine.Spy;
  let dialog: jasmine.Spy;

  const validValues = {
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    message: 'I would like to talk about a role on my team.',
  };

  beforeEach(async () => {
    sendEmail = jasmine.createSpy('sendEmail').and.resolveTo({ status: 200 });
    // Stubbed so the suite never sends real mail, and never opens a real dialog.
    dialog = spyOn(Swal, 'fire').and.resolveTo({ isConfirmed: true } as never);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ContactComponent],
      providers: [{ provide: ServiceService, useValue: { sendEmail } }],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('starts empty and invalid', () => {
    expect(component.contactForm.invalid).toBeTrue();
    expect(component.contactForm.getRawValue()).toEqual({ name: '', email: '', message: '' });
  });

  it('rejects a malformed email address', () => {
    component.emailField.setValue('not-an-email');
    expect(component.emailField.errors?.['email']).toBeTruthy();
  });

  it('labels every input for assistive tech', () => {
    const inputs = Array.from(
      element.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('.form-control')
    );
    expect(inputs.length).toBe(3);

    for (const input of inputs) {
      expect(element.querySelector(`label[for="${input.id}"]`))
        .withContext(`label for #${input.id}`)
        .toBeTruthy();
    }
  });

  it('surfaces validation errors instead of silently ignoring the submit', async () => {
    await component.submitForm();
    fixture.detectChanges();

    expect(sendEmail).not.toHaveBeenCalled();
    expect(component.name.touched).toBeTrue();
    expect(element.querySelectorAll('.field-error').length).toBeGreaterThan(0);
  });

  it('sends a valid message, resets the form and confirms', async () => {
    component.contactForm.setValue(validValues);

    await component.submitForm();

    expect(sendEmail).toHaveBeenCalledWith(
      validValues.name,
      validValues.email,
      validValues.message
    );
    expect(component.contactForm.getRawValue()).toEqual({ name: '', email: '', message: '' });
    expect(component.sending).toBeFalse();
    expect(dialog).toHaveBeenCalledWith(jasmine.objectContaining({ icon: 'success' }));
  });

  it('tells the user when sending fails, and keeps what they typed', async () => {
    spyOn(console, 'error');
    sendEmail.and.rejectWith(new Error('network down'));
    component.contactForm.setValue(validValues);

    await component.submitForm();

    expect(dialog).toHaveBeenCalledWith(jasmine.objectContaining({ icon: 'error' }));
    // Losing the message on a failed send would be worse than the failure.
    expect(component.contactForm.getRawValue()).toEqual(validValues);
    expect(component.sending).toBeFalse();
  });
});
