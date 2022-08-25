import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgbAccordionConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Cancha } from 'app/interfaces/cancha';
import { CanchasService } from 'app/services/canchas/canchas.service';
import { LikeService } from 'app/services/like/like.service';
import * as introJs from 'intro.js/intro.js';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  introJS = introJs();

  data : Date = new Date();

  establecimientos: any[] = [
      {
        tipo: "Parques",
        descripcion: "Buscar canchas para jugar en parques, áreas abiertas, etc"
      },
      {
        tipo: "Complejos Deportivos",
        descripcion: "Buscar canchas para jugar en complejos deportivos, establecimientos, etc"
      },
      {
        tipo: "Clubes",
        descripcion: "Buscar canchas en clubes privados, usualmente se necesita suscripción"
      }
  ]

  canchas: Cancha[] = [];
  canchasPopular: any[] = []
  canchasNorte: any[] = []
  canchasSur: any[] = []
  canchasCentro: any[] = []

  constructor(
    private renderer : Renderer2,
    config: NgbAccordionConfig,
    private canchaService: CanchasService,
    private likeService: LikeService
  ) {
      config.closeOthers = true;
      config.type = 'info';
      if(window.innerWidth>=992){
        this.introJS.setOptions({
          steps: [
            { 
              intro: "Bienvenido a FUTFINDER"
            },
            {
              element: "#nav1",
              intro: "Página de Inicio"
            },
            {
              element: "#nav2",
              intro: "Noticias sobre fútbol"
            },
            {
              element: "#nav3",
              intro: "This is a tooltip."
            },
            {
              element: "#nav4",
              intro: "This is a tooltip."
            },
            {
              element: "#popular",
              intro: "Navegar por las canchas"
            }
          ]
        });
      }   
  }

  isWeekend(date: NgbDateStruct) {
      const d = new Date(date.year, date.month - 1, date.day);
      return d.getDay() === 0 || d.getDay() === 6;
  }

  isDisabled(date: NgbDateStruct, current: {month: number}) {
      return date.month !== current.month;
  }

  ngOnInit() {
      var navbar = document.getElementsByTagName('nav')[0];
      navbar.classList.add('navbar-transparent');
      var body = document.getElementsByTagName('body')[0];
      body.classList.add('index-page');
      this.introJS.start();
      /*Agregando las canchas*/
      /*
      fetch("../../../assets/data/canchas.json")
      .then(response => response.json())
      .then(data => {
        
        let listaCanchas = data.canchas;
        for(let cancha of listaCanchas as any){
          let zona = cancha.zona;
          let datos = {nombre: cancha.nombre, url: cancha.img, id: cancha.id};
          if(cancha.likes > 10){
            this.canchasPopular.push(datos);
          }
          if(cancha.zona==="Norte"){
            this.canchasNorte.push(datos);
          }else if(cancha.zona==="Centro"){
            this.canchasCentro.push(datos);
          }else if(cancha.zona==="Sur"){
            this.canchasSur.push(datos);
          }
        }
      })
      .catch(console.error);
      */
      this.initData();
  }
  
  ngOnDestroy(){
      var navbar = document.getElementsByTagName('nav')[0];
      navbar.classList.remove('navbar-transparent');
      var body = document.getElementsByTagName('body')[0];
      body.classList.remove('index-page');
  }

  private async initData(): Promise<void> {
    await this.fetchCanchas();
  }

  private fetchCanchas(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.canchaService.list().subscribe(async canchas => {
        for (let cancha of canchas) {
          await this.fetchLikes(cancha);
          this.locateCancha(cancha);
        }
        this.canchas = canchas;
        resolve();
      });
    });
  }

  private fetchLikes(cancha: Cancha): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.likeService.list(cancha.id).subscribe(likes => {
        cancha.likes = likes.length;
        resolve();
      });
    });
  }

  private locateCancha(cancha: Cancha): void {
    let datos = {nombre: cancha.nombre, url: cancha.imgUrl, id: cancha.id};
    if(cancha.likes > 3){
      this.canchasPopular.push(datos);
    }
    if(cancha.zona.toLocaleLowerCase() === "norte"){
      this.canchasNorte.push(datos);
    }else if(cancha.zona.toLocaleLowerCase() === "centro"){
      this.canchasCentro.push(datos);
    }else if(cancha.zona.toLocaleLowerCase() === "sur"){
      this.canchasSur.push(datos);
    }
  }

}
