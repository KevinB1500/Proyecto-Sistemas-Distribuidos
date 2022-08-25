import { Component, OnInit } from '@angular/core';
import { MessageService } from 'app/services/message/message.service';
import * as Rellax from 'rellax';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  data : Date = new Date();
  focus;
  focus1;

  constructor(public _MessageService: MessageService) { }

  contactForm(form) {
    this._MessageService.sendMessage(form).subscribe(() => {
      console.log(form)
      location.reload();
    });
    }

  ngOnInit() {
    // var rellaxHeader = new Rellax('.rellax-header');
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');

    //Prueba
    const previousBtn=document.getElementById("previous");
    const nextBtn=document.getElementById("next");
    const finishBtn=document.getElementById("finish");
    const enviarBtn=document.getElementById("btnEnviar");
    const content=document.getElementById("content");
    const bullets=document.querySelectorAll(".bullet");
    const steps=document.getElementsByClassName("suggest")

    const max_steps=4;
    let currentsteps=1;
    let index=1;
    
    nextBtn.addEventListener('click',()=>{
      let variable = (<HTMLInputElement>(document.getElementsByClassName("cajaTexto")[index-1])).value;
      if(variable != ""){
      const currentBullet=bullets[currentsteps-1];
      currentBullet.classList.add('completed');
      currentsteps++;
      (previousBtn as any).disabled=false;
      if(currentsteps==max_steps){
        (nextBtn as any).disabled=true;
        (finishBtn as any).disabled=false;
      }

      if(index==0){
        steps[index].classList.remove("d-none");
      }else{
        steps[index].classList.remove("d-none");
        steps[index-1].classList.add("d-none");
      }
      index++;

      content.innerText=`Step Number ${currentsteps}`
      }
    });

    previousBtn.addEventListener('click',()=>{
      const previousBullet=bullets[currentsteps-2];
      previousBullet.classList.remove('completed');
      currentsteps--;
      (nextBtn as any).disabled=false;
      (finishBtn as any).disabled=true;
      if(currentsteps==1){
        (previousBtn as any).disabled=true;
      }

      if(index==0){
        steps[index].classList.remove("d-none");
        steps[index+1].classList.add("d-none");
      }else{
        index-=2;
        steps[index].classList.remove("d-none");
        steps[index+1].classList.add("d-none");
      }
      index++;
      
      content.innerText=`Step indice ${index}`
    
    });

    finishBtn.addEventListener('click',()=>{
      location.reload();
    });

    /*enviarBtn.addEventListener('click',()=>{
      location.reload();
    });*/

  }
  
  ngOnDestroy(){
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

}
