import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {jsonPlaceHolderUrl, UserService} from './user.service';
import {AlbumState, AlbumStore} from "../stores/album.store";
import {Photo} from "../models/photo.model";
import {Query} from "@datorama/akita";

export const photosUrl = 'photos';

@Injectable()
export class AlbumService extends Query<AlbumState> {

    constructor(protected http: HttpClient, private albumStore: AlbumStore, private userService: UserService) {
        super(albumStore);
        this.userService.select('activeUserId').subscribe(userId => {
            this.http.get<Photo>(`${jsonPlaceHolderUrl}/${photosUrl}/${userId}`)
                .subscribe((album) => {
                    this.albumStore.update({album})
                })
        })
    }

}
