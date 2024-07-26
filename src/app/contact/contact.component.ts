import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as saveAs from 'file-saver';
import { ServiceService } from '../service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  constructor(private FormBuilder:FormBuilder, private httpClient:HttpClient, private service:ServiceService){}
  contactForm:FormGroup | any;
ngOnInit(): void {
  this.contactForm = this.FormBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required]
  });
}
submitForm() {
  if (this.contactForm.valid) {
    const { name, email, message } = this.contactForm.value;
    this.service.sendEmail(name, email, message).then((response: any) => {
      this.contactForm.reset();
      Swal.fire("Message Sent Successfully!");
      },
      (error: any) => {
        console.error('Error sending email:', error);
      }
    );
  }
}

downloadResume():void{
 const resumeUrl = './assets/J_DHARANI_RESUME.pdf'
 this.httpClient.get(resumeUrl,{responseType:'blob'}).subscribe((blob)=>{
  saveAs(blob, 'J_Dharani_Resume.pdf');
 });
}
}
