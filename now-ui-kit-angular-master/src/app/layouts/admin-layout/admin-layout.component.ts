import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.getElementById("sidebarCollapse").addEventListener("click", function() {
      document.getElementById("sidebar").classList.toggle("active");
    });
  }

  toggleSidebar() {
    
  }

}
