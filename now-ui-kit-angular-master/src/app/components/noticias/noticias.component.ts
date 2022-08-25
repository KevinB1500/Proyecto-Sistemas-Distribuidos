import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {
  data : Date = new Date();
  focus;
  focus1;

  constructor() { }

  ngOnInit() {
    // var rellaxHeader = new Rellax('.rellax-header');

    var body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');

    let proxy='https://damp-beach-17296.herokuapp.com/'
    let url='https://api.eluniverso.arcpublishing.com/feeds/rss/?website=el-universo&query=taxonomy.sections._id:%22/deportes/futbol%22&sort=first_publish_date:desc'
    fetch(proxy+url)
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, "application/xml");
      console.log(xml);
    
      let items=xml.getElementsByTagName("item")
    
      for(let item of items as any){
        let title=item.getElementsByTagName("title")[0].childNodes[0].nodeValue
        let description=item.getElementsByTagName("description")[0].childNodes[0].nodeValue
        let link=item.getElementsByTagName("link")[0].childNodes[0].nodeValue
        let plantilla=`
          <div class="col" style="padding-block-end: 20px;">
              <div class="card h-100">
                <div class="card-body">
                  <h5 class="card-title">${title}</h5>
                  <p class="card-text">${description}.</p>
                  <p class="card-text">
                    <a href="${link}" target="_blank">${link}</a>
                  </p>
                </div>
                <div class="card-footer">
                  <small class="text-muted">Last updated 3 mins ago</small>
                </div>
              </div>
            </div>
          `
        document.getElementById("rss-container").innerHTML+=plantilla
      }

      document.getElementById("search-button").addEventListener("click",buscar,false)
      function buscar(){
        let input=(<HTMLInputElement>document.getElementById("search-bar")).value
        console.log(input)
        let lista=document.getElementsByClassName("col")
        for(let element of lista as any){
          let titulo=element.getElementsByClassName("card-title")[0].textContent
          let descripcion=element.getElementsByClassName("card-text")[0].textContent
          console.log(titulo)
          console.log(!titulo.includes(input))
          if (!titulo.includes(input)){
            element.classList.add("d-none")
          }
          if (titulo.includes(input)){
            element.classList.remove("d-none")
          }
        }
      }

      document.getElementById("restart-button").addEventListener("click",restart,false)
      function restart(){
        let lista=document.getElementsByClassName("col")
        for(let element of lista as any){
          element.classList.remove("d-none")
        }
      }

    })
    .catch(console.error);
    

  }
  ngOnDestroy(){
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }
}