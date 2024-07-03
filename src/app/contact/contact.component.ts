import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as saveAs from 'file-saver';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  constructor(private FormBuilder:FormBuilder, private httpClient:HttpClient){}
  contactForm:FormGroup | any;
  private scriptUrl = '/api'; 
ngOnInit(): void {
  this.contactForm = this.FormBuilder.group({
    name: [''],
    email: ['',[Validators.required,Validators.email]],
    message: ['']
  })
}
submitForm(){
if(this.contactForm.valid){
  this.contactForm.reset();
  Swal.fire("Message Sent Successfully!");
  this.httpClient.post(this.scriptUrl, this.contactForm.value).subscribe((response:any)=>{
    
  })

}
}

downloadResume():void{
 const resumeUrl = './assets/J_DHARANI_RESUME.pdf'
 this.httpClient.get(resumeUrl,{responseType:'blob'}).subscribe((blob)=>{
  saveAs(blob, 'J_Dharani_Resume.pdf');
 });
}
}
