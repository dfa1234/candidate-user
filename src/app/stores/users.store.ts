import {Store, StoreConfig} from '@datorama/akita';
import {User} from "../models/user.model";

export interface UsersState {
    users: User[];
    activeUserId: number;
}

export function createInitialState(): UsersState {
    return {
        users: [],
        activeUserId: null
    };
}

@StoreConfig({name: 'users'})
export class UsersStore extends Store<UsersState> {
    constructor() {
        super(createInitialState());
    }
}
