import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  userName:string = localStorage.getItem('username') || ' '

  constructor(private router :  Router) { }

  ngOnInit(): void {
  }

  signout(){
    localStorage.clear()
    this.router.navigate(['sign-up'])
  }

}
