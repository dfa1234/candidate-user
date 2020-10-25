import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../../services/users.service';
import {Post} from '../../../models/post.model';
import {ActivatedRoute} from '@angular/router';
import {concatMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit {

  userName: string;
  userId: string;
  posts: Post[];

  constructor(private usersService: UsersService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        concatMap((params: any) => {
          this.userName = params.name;
          this.userId = params.id;
          if (this.userId) {
            return this.usersService.getPosts(this.userId);
          } else {
            return of([]);
          }
        }))
      .subscribe(posts => this.posts = posts);

  }

}
