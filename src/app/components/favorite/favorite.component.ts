import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Anime } from 'src/app/models/anime';
import { AnimeService } from 'src/app/services/anime.service';
import { Global } from 'src/app/services/global';
@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
  providers: [UserService]
})
export class FavoriteComponent {
  public animes: Anime[] = []; // Usa un array para almacenar todos los animes favoritos
  public user: User | any;
  public decodedToken: any;
  public userId: string | any;
  public anime: any;
  public url: string;
  public showDeleteMessage: boolean = false;

  constructor(   
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService) {
      this.url = Global.url;
  }
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.userId = params['id'];
      this.getAnimesFavoritesUser(this.userId);
    });
    }
  getAnimesFavoritesUser(id: string) {
    this._userService.getAnimesFavoritesUser(id).subscribe(
      (response: any) => {
        this.animes = response;
        this.animes.forEach((anime: { image: string; }) => {
          anime.image = anime.image.replace('uploads\\', '');
        });
        // Aquí puedes realizar cualquier otra acción necesaria con this.animes
      },
      (error) => {
        console.error(error);
        // Manejar el error, mostrar un mensaje al usuario, etc.
      }
    );
  }
  removeFavoriteAnime(event: Event, animeId: string) {
    event.stopPropagation();
  
    this._userService.removeFavoriteAnime(this.userId, animeId).subscribe(
      response => {
        this.showDeleteMessage = true; 
        setTimeout(() => {
          this.showDeleteMessage = false; 
        }, 3000); 
        this.animes = this.animes.filter(anime => anime._id !== animeId);
      },
      error => {
        console.error('Error al eliminar el anime de favoritos', error);
      }
    );
  }
  onAnimeClick(name: string, animeId: string) {
    this._router.navigate(['/anime', name, animeId]);
}
}
function jwt_decode(tokenCookie: string): { name: string; id: string; } {
  throw new Error('Function not implemented.');
}

