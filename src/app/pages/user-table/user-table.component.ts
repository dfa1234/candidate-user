import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {UserService} from '../../sevices/user.service';
import {UsersStore} from "../../stores/users.store";

@Component({
    selector: 'app-user-table',
    template: `
        <!--        <ng-container *ngIf="usersContext$ | async as userContext">-->
        <!--            <div *ngIf="userContext.loading">...loading</div>-->
        <!--            <div *ngIf="userContext.errorResponse">{{userContext.errorResponse.message}}</div>-->
        <!--            <table class="table" *ngIf="userContext.data as users">-->
        <ng-container *ngIf="usersContext$ | async as users">
            <table class="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Website</th>
                    <th>Company</th>
                    <th>Number of albums</th>
                </tr>
                </thead>
                <tbody>
                <tr *ngFor="let user of users" (click)="userClick(user.id)"
                    [class.selected]="(selectedUserId$ | async) === user.id">
                    <td>{{user.name}}</td>
                    <td>{{user.username}}</td>
                    <td>{{user.email}}</td>
                    <td>{{user.address.city }}/{{user.address.street}}/{{user.address.suite}}</td>
                    <td>{{ user.phone }}</td>
                    <td>
                        <a href="http://{{ user.website }}" target="_blank">
                            {{user.website}}
                        </a>
                    </td>
                    <td>{{user.company.name}}</td>
                    <td>{{user.id}}</td>
                </tr>
                </tbody>
            </table>
        </ng-container>
    `,
    styles: [`
        table {
            width: 100%;
            border-collapse: collapse;
        }

        th {
            text-align: start;
        }

        tr {
            height: 50px;
        }

        tr.selected {
            background-color: #f0f0f5;

        }

        tbody tr:hover {
            cursor: pointer;
            background-color: gray;
            color: white;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: []
})
export class UserTableComponent implements OnInit {

    usersContext$ = this.userService.select('users')
    selectedUserId$ = this.userService.select('activeUserId')

    constructor(private userService: UserService, private usersStore: UsersStore) {
    }

    ngOnInit(): void {
    }

    userClick(userId: number) {
        this.usersStore.update({activeUserId: userId})
    }
}
