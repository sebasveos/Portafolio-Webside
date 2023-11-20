import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { User } from '../models/user';
import { Global } from './global';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';


@Injectable({
    providedIn: "root",
})
export class UserService {
    public url: string;
    public currentUser: User;
    private _userNameUpdated = new Subject<string>();

    constructor(
        private _http: HttpClient,
        private _cookies: CookieService
    ) {
        this.currentUser = new User('', '', '', []);
        this.url = Global.url;
    }
    saveUser(user: User): Observable<any> {
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + 'saveUser', params, { headers: headers });
    }
    authenticationUser(user: User): Observable<any> {

        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + 'authenticationUser', params, { headers: headers });
    }

    setToken(token: string) {
        this._cookies.set("token", token);
    }
    getToken() {
        return this._cookies.get("token");
    }
    getAnimesFavoritesUser(id: string){
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url + 'getAnimesFavoritesUser/' + id, { headers: headers });
    }
    removeFavoriteAnime(userId: string, animeId: string): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
      
        return this._http.post(this.url + 'removeFavoriteAnime/',{userId, animeId}, { headers: headers });
      }
      
    getUserLogged() {
        const token = this.getToken();

        // Aquí iría el endpoint para devolver el usuario para un token
    }
    addFavoriteAnime(userId: string, animeId: string): Observable<any> {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${this.getToken()}`); // Agrega el token de autorización al encabezado

        return this._http.post(this.url + 'addFavoriteAnime', { userId, animeId }, { headers: headers });
    }
    getUsersFavorites(): Observable<any> {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${this.getToken()}`); // Agrega el token de autorización al encabezado

        return this._http.get(this.url + 'getUsersFavorites', { headers: headers });
    }
    checkFavoriteAnime(userId: string, animeId: string): Observable<any> {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${this.getToken()}`);
    
        return this._http.get(this.url +'checkFavoriteAnime/'+userId+'/'+animeId, { headers: headers });
    }

    get userNameUpdated$(): Observable<string> {
        return this._userNameUpdated.asObservable();
    }

    updateUserName(userId: string, newUserName: string, password:string): Observable<any> {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${this.getToken()}`);
    
            return this._http.post(this.url + 'updateUserName', { userId, newUserName, password }, { headers: headers })
            .pipe(
                tap(response => {
                    this._userNameUpdated.next(newUserName); // Emitir el nuevo nombre de usuario
                })
            ); 
    }
    updatePassword(userId: string,currentPassword: string, newPassword: string, confirmPassword: string): Observable<any> {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${this.getToken()}`);
    
        return this._http.post(this.url +'updateUserName',{userId,currentPassword, newPassword,confirmPassword}, { headers: headers });
    }
    
    

}
