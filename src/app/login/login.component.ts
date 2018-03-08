import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  uname : string;
  pass : string;
  constructor(private lservice : LoginServiceService) { }

  ngOnInit() {
  }

  Auth(): void {
    this.lservice.login(this.uname,this.pass);
  }

}
