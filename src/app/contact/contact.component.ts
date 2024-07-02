import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  constructor(private FormBuilder:FormBuilder, private httpClient:HttpClient){}
  contactForm:FormGroup | any;
ngOnInit(): void {
  this.contactForm = this.FormBuilder.group({
    name: [''],
    email: [''],
    message: ['']
  })
}
submitForm(){
console.log("..."+JSON.stringify(this.contactForm.value))
}
downloadResume():void{
 const resumeUrl = './assets/J_DHARANI_RESUME.pdf'
 this.httpClient.get(resumeUrl,{responseType:'blob'}).subscribe((blob)=>{
  saveAs(blob, 'J_Dharani_Resume.pdf');
 })
}
}
