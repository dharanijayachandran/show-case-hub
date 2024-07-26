import { Injectable } from '@angular/core';
import emailjs from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private userId = 'qSK5MU3Wu5vawz-LH'; 
  private serviceId = 'service_cgcrq4x';
  private templateId = 'template_l8t1b8n';
  constructor() { }
  sendEmail(name: string, email: string, message: string) {
    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
      to_email: 'dharani18it@gmail.com' 
    };
    return emailjs.send(this.serviceId, this.templateId, templateParams, this.userId);
  }
}
