import { Injectable, EventEmitter  } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { UserService } from './user.service';
import { User } from '../models/user';
import { Anime } from '../models/anime';
@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {
  public isAnimeInFavorites: boolean | any;
  public showDeleteMessage: boolean = false;
  public decodedToken:any;
  public isModalVisible = false;
  private scrollPosition = 0;
  public animes: Anime[] = []; 
  public closeModal: EventEmitter<void> = new EventEmitter<void>();
  constructor(
    private _userService : UserService
  ) { }

  decodeTokenFromCookie() {
    const tokenCookie = this.getCookie('token'); // Reemplaza 'token' con el nombre real de tu cookie
    if (tokenCookie) {
      const decodedToken = jwt_decode(tokenCookie) as { name: string, id: string};;
      this.decodedToken = decodedToken;
    }
    return this.decodedToken;
  }
  // Función para obtener el valor de una cookie por su nombre
  getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  }

}
