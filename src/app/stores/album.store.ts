import {Store, StoreConfig} from '@datorama/akita';
import {Photo} from "../models/photo.model";

export interface AlbumState {
    album: Photo;
}

export function createInitialState(): AlbumState {
    return {
        album: {
            title: null,
            thumbnailUrl: null,
            url: null
        }
    };
}

@StoreConfig({name: 'album'})
export class AlbumStore extends Store<AlbumState> {
    constructor() {
        super(createInitialState());
    }
}
