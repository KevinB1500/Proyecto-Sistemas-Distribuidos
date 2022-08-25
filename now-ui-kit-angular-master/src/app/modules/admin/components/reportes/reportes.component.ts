import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  grafico: string;

  constructor() { }

  ngOnInit(): void {
  }

  toggleGraphic(type: string) {
    this.grafico = type;
  }

}
