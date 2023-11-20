import { Component, EventEmitter, Output } from '@angular/core';
import { AnimeService } from 'src/app/services/anime.service';
import { Global } from 'src/app/services/global';
import { Anime } from 'src/app/models/anime';
import { Router, ActivatedRoute, Params } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { EpisodeService } from 'src/app/services/episode-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-view-capitule',
  templateUrl: './view-capitule.component.html',
  styleUrls: ['./view-capitule.component.css'],
  providers: [AnimeService]
})
export class ViewCapituleComponent {
  @Output() closeModal = new EventEmitter<void>();
  public animes: Anime[] = []; // Usa un array para almacenar todos los animes favoritos

  public urlVideo: any;
  public isModalVisible = false;
  public url: string;
  public decodedToken: any;
  public anime: Anime | any;
  public animeName: string | any;
  public scrollPosition = 0;
  public animeIds: string | any;
  public numeroEpisodio: number | any;
  public isAnimeInFavorites: boolean | any;

  public name:  any;
  constructor(
    private cdr: ChangeDetectorRef,
    private _userService : UserService,
    private _episodeService: EpisodeService,
    private _animeService: AnimeService,
    private _router: Router,
    private _route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    this.url = Global.url;
  }

  ngOnInit() {
    
    this._route.params.subscribe(params => {
      this.animeName = params['name'];
      this.animeIds = params['_id'];

      this.numeroEpisodio = +params['episode'];
      this.getAnime(this.animeName);
    });
    this.decodeTokenFromCookie();
    this.checkFavoriteAnime(this.decodedToken.id, this.animeIds );
  }

  checkFavoriteAnime(userId: string, animeId: string) {
    this._userService.checkFavoriteAnime(userId, animeId).subscribe(
      response => {
        if (response.message === 'Anime found in favorites') {
          this.isAnimeInFavorites = true;
        } else if (response.message === 'Anime not found in favorites') {
          this.isAnimeInFavorites = false;
          console.log('El anime no está en favoritos');
        }
      },
      error => {
        console.error('Error al verificar el estado del anime en favoritos:', error);
        // Lógica para manejar errores
      }
    )
  }  
  
  getAnime(name: string) {
    this._animeService.getAnime(name).subscribe(
      response => {
        this.loadVideoUrl(); // Llama a la función para cargar la URL del video después de obtener el anime

        this.anime = response.anime;
      },
      error => {
        console.log(<any>error);
      }
    )
  }
  loadVideoUrl() {
    // Obtén la URL del video usando EpisodeService
    const rawUrl = this._episodeService.getVideoUrl(this.animeName, this.numeroEpisodio);
    if (rawUrl !== null) {
      this.urlVideo = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
    } else {
    }
  }
 

  toggleModal(event: Event) {
    event.stopPropagation(); // Evita que el evento se propague hacia arriba en la jerarquía del DOM
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
  onAnimeClick(name: string, animeId: string) {
    this._router.navigate(['/anime', name, animeId]);
  }

  navigateToEpisode(name: string, episode: number) {
    // Redirige a la página del anime y pasa el ID como parámetro de la ruta
    this._router.navigate(['/verCapitulo', name, episode]);
  }
  decodeTokenFromCookie() {
    const tokenCookie = this.getCookie('token'); // Reemplaza 'token' con el nombre real de tu cookie
    if (tokenCookie) {

      const decodedToken = jwt_decode(tokenCookie) as { name: string, id: string };;
      console.log(decodedToken.name);
      this.decodedToken = decodedToken;

      // Ahora tienes acceso a los datos del token decodificado
    }
  }
  addFavoriteAnime(event: Event, animeId: string): void {
    event.stopPropagation();

    this._userService.addFavoriteAnime(this.decodedToken.id, animeId).subscribe(
      response => {
        this.isAnimeInFavorites = !this.isAnimeInFavorites;
        this.cdr.detectChanges(); // Forzar la detección de cambios
      },
      error => {
        console.error('Error al agregar el anime a favoritos', error);
      }
    );
  }
  
  removeFavoriteAnime(event: Event, animeId: string) {
    event.stopPropagation();
  
    this._userService.removeFavoriteAnime(this.decodedToken.id, animeId).subscribe(
      response => {
        // Realiza las acciones necesarias si es necesario
        this.animes = this.animes.filter(anime => anime._id !== animeId);
        this.isAnimeInFavorites = false; // Actualiza el estado según la eliminación
        this.cdr.detectChanges(); // Forzar la detección de cambios
      },
      error => {
        console.error('Error al eliminar el anime de favoritos', error);
      }
    );
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
  checkNextEpisodeAvailable(): boolean {
    const nextEpisodeNumber = this.numeroEpisodio + 1;
    return this.isEpisodeAvailable(nextEpisodeNumber);
  }

  checkPreviousEpisodeAvailable(): boolean {
    const previousEpisodeNumber = this.numeroEpisodio - 1;
    return this.isEpisodeAvailable(previousEpisodeNumber);
  }

  isEpisodeAvailable(episodeNumber: number): boolean {
    const animeEpisodes = this._episodeService.episodesDatabase[this.anime.name];
    return animeEpisodes && animeEpisodes[episodeNumber] !== undefined;
  }

}
