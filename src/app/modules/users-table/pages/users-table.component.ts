import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../../services/users.service';
import {User} from '../../../models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {

  users: User[];
  // original response from the API to re-init the search locally
  usersFromApi: User[];
  sortKey: string | null = null;
  sortDirectionToggle: boolean | null = null;
  searchValue = '';

  constructor(private usersService: UsersService, private router: Router) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.usersService.getUsers()
      .subscribe(users => {
        this.users = [...users];
        this.usersFromApi = [...users];
      });
  }

  goToPosts(user: User): void {
    this.router.navigate([`/posts`], {queryParams: {name: user.name, id: user.id}});
  }

  sortUsers(key: string): void {
    this.sortKey = key;
    this.sortDirectionToggle = !this.sortDirectionToggle;
    this.users = this.users.sort((a, b) => {

      let str1 = '';
      let str2 = '';

      if (this.sortKey.includes('.')) {
        // convention: we can search to a deep of 1 only (like 'company.name')
        const my2Keys = this.sortKey.split('.');
        str1 = a[my2Keys[0]][my2Keys[1]];
        str2 = b[my2Keys[0]][my2Keys[1]];
      } else {
        str1 = a[this.sortKey];
        str2 = b[this.sortKey];
      }

      if (this.sortDirectionToggle) {
        if (str1 < str2) {
          return -1;
        }
        if (str1 > str2) {
          return 1;
        }
      } else {
        if (str1 > str2) {
          return -1;
        }
        if (str1 < str2) {
          return 1;
        }
      }
      return 0;
    });
  }


  filterUser(): void {
    console.warn('Searching', this.searchValue);
    if (this.searchValue === '') {
      this.users = [...this.usersFromApi];
    } else {
      this.users = this.usersFromApi.filter(user => {
        // TODO Currently only for name/username/email
        return user.name.toLocaleLowerCase().includes(this.searchValue.toLowerCase())
          || user.name.toLocaleLowerCase().includes(this.searchValue.toLowerCase())
          || user.email.toLocaleLowerCase().includes(this.searchValue.toLowerCase());
      });
    }
  }

}
