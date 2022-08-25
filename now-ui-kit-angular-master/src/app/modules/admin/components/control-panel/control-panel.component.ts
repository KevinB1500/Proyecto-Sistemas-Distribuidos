import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cancha } from 'app/interfaces/cancha';
import { CanchasService } from 'app/services/canchas/canchas.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {
  
  canchas: Cancha[];

  constructor(
    private canchasService: CanchasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchCanchas();
  }

  private fetchCanchas(): void {
    this.canchasService.list().subscribe(data => {
      this.canchas = data;
    });
  }

  deleteCancha(id: string): void {
    this.canchasService.delete(id).subscribe(data => {
      if (data != null || data != undefined) {
        this.fetchCanchas();
      }
    });
  }

  openEditCancha(cancha: Cancha): void {
    if (cancha === undefined || cancha === null) {
      this.router.navigate(['admin', 'control-panel', 'edit']);
    } else {
      this.router.navigate(['admin', 'control-panel', 'edit', `${cancha.id}`]);
    }
  }

}
