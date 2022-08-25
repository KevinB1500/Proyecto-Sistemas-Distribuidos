import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }
  

  ngOnInit(): void {
    const enviarBtn=document.getElementById("btnEnviar");

    enviarBtn.addEventListener('click',()=>{
      let valorUser = (<HTMLInputElement>(document.getElementById("usuario"))).value;
      let valorClave = (<HTMLInputElement>(document.getElementById("clave"))).value

      this.loginService.authenticate(valorUser, valorClave).subscribe(data => {
        this.router.navigate([data["redirect"]]);
      });
    });
  }



}
