import { Component, Output, EventEmitter  } from '@angular/core';
import { AnimeService } from 'src/app/services/anime.service';
import { Route } from '@angular/router';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from 'src/app/services/global';
import { Anime } from 'src/app/models/anime';
import { GlobalServiceService } from 'src/app/services/global-service.service';
import { UserService } from 'src/app/services/user.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-anime-directory',
  templateUrl: './anime-directory.component.html',
  styleUrls: ['./anime-directory.component.css'],
  providers: [AnimeService]
})
export class AnimeDirectoryComponent {
  public isAnimeInFavorites: boolean | any;
  @Output() closeModal = new EventEmitter<void>();
  public isModalVisible = false;
  public scrollPosition = 0;
  public animes: Anime[] = [];
  public anime: Anime | any;
  public url: any
  public animeCategory: string | any;
  public decodedToken: any;
  constructor(
    private cdr: ChangeDetectorRef,
    private _userService: UserService,
    private _globalService: GlobalServiceService,
    private _router : Router,
    private _route: ActivatedRoute,
    private _animeService: AnimeService) {

    this.url = Global.url;
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.animeCategory = params['category'].split(',');
      this.getProjects(this.animeCategory);
    });

    this.decodedToken = this._globalService.decodeTokenFromCookie();
  }

  addFavoriteAnime(event: Event, userId: string, animeId: string){
    event.stopPropagation();

    this._userService.addFavoriteAnime(userId, animeId).subscribe(
      response => {
        this.isAnimeInFavorites = !this.isAnimeInFavorites;
        this.cdr.detectChanges(); // Forzar la detección de cambios
      },
      error => {
        console.error('Error al agregar el anime a favoritos', error);
      }
    );
  }
  toggleModal(event: Event) {
    event.stopPropagation(); // Evita que el evento se propague hacia arriba en la jerarquía del DOM
    console.log('Clic en el ícono de favoritos');
    // Muestra la ventana emergente
    this.isModalVisible = !this.isModalVisible;
    if (this.isModalVisible) {
      this.scrollPosition = window.pageYOffset; // Almacena la posición de desplazamiento actual
      document.body.style.overflow = ''; // Deshabilita el desplazamiento del cuerpo
    } else {
      document.body.style.overflow = ''; // Permite el desplazamiento del cuerpo nuevamente
      window.scrollTo(0, this.scrollPosition); // Vuelve a la posición de desplazamiento almacenada
    }
  }
  close() {
    this.closeModal.emit();
  }

  getProjects(category: string) {
    this._animeService.getAnimes(category).subscribe(
      (response: any) => {
        console.log('Datos recibidos del servidor en el componente:', response);
        
        if (response.animes && Array.isArray(response.animes)) {
          this.animes = response.animes.map((anime: Anime) => {
            if (anime.image) {
              anime.image = anime.image.replace('uploads\\', '');
            }
            return anime;
          });
        } else {
          console.error('El formato de la lista de animes no es válido.');
        }
      },
      error => {
        console.error('Error al recibir datos del servidor:', error);
      }
    );
  }
  truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }
  
  onAnimeClick(name: string, animeId: string) {
    // Redirige a la página del anime y pasa el ID como parámetro de la ruta
    this._router.navigate(['/anime', name, animeId]);
  }
  onCapAnime(name: string, episode: number) {

    // Redirige a la página del anime y pasa el ID como parámetro de la ruta
    this._router.navigate(['/verCapitulo', name, episode]);
  }
}