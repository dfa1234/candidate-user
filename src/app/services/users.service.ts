import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable, of, zip} from 'rxjs';
import {User} from '../models/user.model';
import {concatMap, map, tap} from 'rxjs/operators';
import {Post} from '../models/post.model';

export const baseUrl = 'https://jsonplaceholder.typicode.com';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  /** GET heroes from the server */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}/users`).pipe(
      concatMap(users => {
        const callAlbumsForUsers = users.map(user =>
          zip(of(user), this.http.get(`${baseUrl}/users/${user.id}/albums`))
        );
        return forkJoin(...callAlbumsForUsers);
      }),
      map(resultForjoin => {
        return resultForjoin.map(resultZip => {
          const myUser = resultZip[0];
          const hisNumerOfAlbum = resultZip[1].length;
          myUser.numberOfAlbum = hisNumerOfAlbum;
          return myUser;
        });
      }),
      // TODO for quick debug only - to be removed
      tap(users => console.log(users))
    );
  }

  getPosts = (userId: string): Observable<Post[]> =>
    this.http.get<Post[]>(`${baseUrl}/posts?userId=${userId}`)
      .pipe(
        // TODO for quick debug only - to be removed
        tap(posts => console.log(posts))
      )
}
