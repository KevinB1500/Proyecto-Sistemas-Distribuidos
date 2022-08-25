import { NumberSymbol } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Cancha } from 'app/interfaces/cancha';
import { CanchasService } from 'app/services/canchas/canchas.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {

  private data: Cancha[];
  private svg;
  private margin = 50;
  private width = 750;
  private height = 600;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;

  constructor(
    private canchaService: CanchasService
  ) { }

  ngOnInit(): void {
    this.fetchCanchas();
  }

  private fetchCanchas(): void {
    this.canchaService.list().subscribe(data => {
      this.data = data;
      this.createSvg();
      this.createColors();
      this.drawChart();
    });
  }

  private createSvg(): void {
    this.svg = d3.select("figure#pie")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );
  }

  private createColors(): void {
    const datos = this.getDatos()
    this.colors = d3.scaleOrdinal()
    .domain(datos.map(d => d.zona))
    .range(["#c7d3ec", "#a5b8db", "#879cc4"]);
  }

  private drawChart(): void {
    const datos = this.getDatos()
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => d.cantidad);

    // Build the pie chart
    this.svg
    .selectAll('pieces')
    .data(pie(datos))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(this.radius)
    )
    .attr('fill', (d, i) => (this.colors(i)))
    .attr("stroke", "#121926")
    .style("stroke-width", "1px");

    // Add labels
    const labelLocation = d3.arc()
    .innerRadius(100)
    .outerRadius(this.radius);

    this.svg
    .selectAll('pieces')
    .data(pie(datos))
    .enter()
    .append('text')
    .text(d => `${d.data.zona}: ${d.data.cantidad}`)
    .attr("transform", d => "translate(" + labelLocation.centroid(d) + ")")
    .style("text-anchor", "middle")
    .style("font-size", 15);
  }

  private getDatos(): any[] {
    let norte = 0;
    let sur = 0;
    let centro = 0;
    for (let cancha of this.data) {
      switch (cancha.zona.toLocaleLowerCase()) {
        case "norte":
          norte = norte + 1;
          break;
        case "sur":
          sur = sur + 1;
          break;
        case "centro":
          centro = centro + 1;
          break;
        default:
          break;
      }
    }
    return [
      {"zona": "Norte", "cantidad": norte},
      {"zona": "Sur", "cantidad": sur},
      {"zona": "Centro", "cantidad": centro}
    ];
  }

}
