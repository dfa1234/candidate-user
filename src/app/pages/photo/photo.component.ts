import {Component, OnInit} from '@angular/core';
import {Photo} from '../../models/photo.model';
import {AlbumService} from '../../sevices/album.service';
import {Observable} from 'rxjs';
import {MVContext} from '../../models/mv-context.model';

@Component({
    selector: 'app-photo',
    template: `
        <!--        <ng-container *ngIf="photoContext$ | async as photoContext">-->
        <!--            <div *ngIf="photoContext.loading">...loading</div>-->
        <!--            <div *ngIf="photoContext.errorResponse">{{photoContext.errorResponse.message}}</div>-->
        <!--            <ng-container *ngIf="photoContext.data as photo">-->
        <ng-container *ngIf="photoContext$ | async as photo">
            <h2 class="photo-title">{{photo.title}}</h2>
            <img [src]="photo.thumbnailUrl" alt="">
        </ng-container>
        <!--        </ng-container>-->
    `,
    styles: [`
        :host {
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
        }

        .photo-title {
            font-size: 30px;
        }
    `],
    providers: [AlbumService]
})
export class PhotoComponent implements OnInit {

    photoContext$ = this.albumService.select('album');

    constructor(private albumService: AlbumService) {
    }

    ngOnInit(): void {
    }

}
