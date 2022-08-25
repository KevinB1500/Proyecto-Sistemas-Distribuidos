import { Component, OnInit } from '@angular/core';
import { Cancha } from 'app/interfaces/cancha';
import { CanchasService } from 'app/services/canchas/canchas.service';
import { LikeService } from 'app/services/like/like.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {
  private data: Cancha[];
  private svg;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 500 - (this.margin * 2);

  constructor(
    private canchaService: CanchasService,
    private likeService: LikeService
  ) { }

  ngOnInit(): void {
    this.startDraw();
  }

  private async startDraw(): Promise<void> {
    await this.fetchCanchas();
    this.createSvg();
    this.drawBars(this.data);
  }

  private async fetchCanchas(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.canchaService.list().subscribe(async data => {
        this.data = data;
        for (let cancha of this.data) {
          await this.fetchLikes(cancha);
        }
        resolve();
      });
    });
  }

  private fetchLikes(cancha: Cancha): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.likeService.list(cancha.id).subscribe(data => {
        cancha.likes = data.length;
        resolve();
      });
    });
  }

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
    .range([0, this.width])
    .domain(data.map(d => d.nombre))
    .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
    .domain([0, 20])
    .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
    .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", d => x(d.nombre))
    .attr("y", d => y(d.likes))
    .attr("width", x.bandwidth())
    .attr("height", (d) => this.height - y(d.likes))
    .attr("fill", "#d04a35");
  }

}
