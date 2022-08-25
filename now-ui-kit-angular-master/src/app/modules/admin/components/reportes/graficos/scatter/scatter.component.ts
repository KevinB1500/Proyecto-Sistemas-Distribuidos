import { Component, OnInit } from '@angular/core';
import { Cancha } from 'app/interfaces/cancha';
import { CanchasService } from 'app/services/canchas/canchas.service';
import { LikeService } from 'app/services/like/like.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.css']
})
export class ScatterComponent implements OnInit {

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
    this.drawPlot();
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
    this.svg = d3.select("figure#scatter")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawPlot(): void {
    // Add X axis
    const x = d3.scaleLinear()
    .domain([0, 50])
    .range([ 0, this.width ]);
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    // Add Y axis
    const y = d3.scaleLinear()
    .domain([0, 20])
    .range([ this.height, 0]);
    this.svg.append("g")
    .call(d3.axisLeft(y));

    // Add dots
    const dots = this.svg.append('g');
    dots.selectAll("dot")
    .data(this.data)
    .enter()
    .append("circle")
    .attr("cx", d => x(d.precio))
    .attr("cy", d => y(d.likes))
    .attr("r", 7)
    .style("opacity", .5)
    .style("fill", "#69b3a2");

    // Add labels
    dots.selectAll("text")
    .data(this.data)
    .enter()
    .append("text")
    .attr("x", d => x(d.precio))
    .attr("y", d => y(d.likes))

    this.svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", this.width)
    .attr("y", this.height + 32)
    .text("Precio");

    this.svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", "-1.2em")
    .attr("dx", "-1em")
    .text("Likes");
  }

}
