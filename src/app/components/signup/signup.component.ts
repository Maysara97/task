import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { countries } from 'src/app/Interfaces/countries.interface';
import { MyApisService } from 'src/app/services/my-apis.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  statusError    :boolean = false;
  serverError    :boolean = false;

  allCountries   :countries[];
  defaultCountry :any = 'default';

  signUpForm = new FormGroup({
    'userName'        : new FormControl(""        ,[Validators.required ,Validators.pattern('[a-zA-Z ]*[0-9]*')]),
    'email'           : new FormControl(""        , Validators.required),
    'password'        : new FormControl(""        ,[Validators.required ,Validators.minLength(8),Validators.pattern('^[a-zA-Z0-9!@_#$%^&*()]+$')]),
    'confirmPassword' : new FormControl(""        , Validators.required),
    'ipAddress'       : new FormControl(""        , Validators.required),
    'nationality'     : new FormControl(this.defaultCountry , Validators.required),
   });

  constructor(
    private service : MyApisService,
    private router  : Router,
    private spinner : NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show()
    this.service.getAllCountries().subscribe((response:any)=>{
      this.allCountries = response;
      this.spinner.hide()
    },error=>{
      this.serverError = true;
    })

    this.service.mergeIpWithLocation().subscribe((response:any)=>{
      this.signUpForm.controls['nationality'].setValue(response.country_code)
      this.signUpForm.controls['ipAddress'].setValue(response.ip)
      this.spinner.hide()
    },error=>{
      this.serverError = true;
    })
  }

  goToWelcome(){
    this.statusError = false
    if(this.signUpForm.status == 'INVALID'){
      this.statusError = true;
      return;
    }
    localStorage.setItem('auth'     , 'authenticated')
    localStorage.setItem('username' , this.signUpForm.controls['userName'].value)
    this.router.navigate(['welcome'])
  }

}
