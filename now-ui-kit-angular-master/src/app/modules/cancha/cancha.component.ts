import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cancha } from 'app/interfaces/cancha';
import { CanchasService } from 'app/services/canchas/canchas.service';
import { LikeService } from 'app/services/like/like.service';

@Component({
    selector: 'app-cancha',
    templateUrl: './cancha.component.html',
    styles: [`
    ngb-progressbar {
        margin-top: 5rem;
    }
    `], //Eliminar
    styleUrls: ['./cancha.component.css']
})

export class CanchaComponent implements OnInit, OnDestroy {

    cancha: Cancha;

    constructor(
        private route: ActivatedRoute,
        private canchaService: CanchasService,
        private likeService: LikeService
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.initData(id);
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('landing-page');
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
    }

    ngOnDestroy(): void {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('landing-page');
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }

    private async initData(canchaId: string): Promise<void> {
        await this.fetchCancha(canchaId);
    }

    private fetchCancha(canchaId: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.canchaService.get(canchaId).subscribe(async cancha => {
                await this.fetchLikes(cancha);
                this.cancha = cancha;
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
        })
    }
}
