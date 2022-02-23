import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.model';
import {UsersState, UsersStore} from "../stores/users.store";
import {Query} from "@datorama/akita";

export const jsonPlaceHolderUrl = 'https://jsonplaceholder.typicode.com';
export const userUrl = 'users';

@Injectable()
export class UserService extends Query<UsersState> {

    constructor(protected http: HttpClient, private usersStore: UsersStore) {
        super(usersStore)
        this.http.get<User[]>(`${jsonPlaceHolderUrl}/${userUrl}`)
            .subscribe((users) => {
                this.usersStore.update({users});
            })
    }

}
