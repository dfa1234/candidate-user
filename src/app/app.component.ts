import {Component, OnInit} from '@angular/core';
import {UsersStore} from "./stores/users.store";
import {AlbumStore} from "./stores/album.store";
import {UserService} from "./sevices/user.service";

@Component({
    selector: 'app-root',
    template: `
        <app-user-table></app-user-table>
        <app-photo></app-photo>
    `,
    styles: [],
    providers: [UsersStore, AlbumStore, UserService]
})
export class AppComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }
}
