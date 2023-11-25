import { Component, OnInit, Output, EventEmitter, Renderer2, ViewEncapsulation } from '@angular/core';
import { AnimeService } from 'src/app/services/anime.service';
import { Global } from 'src/app/services/global';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { EpisodeService } from 'src/app/services/episode-service.service';
import { ChangeDetectorRef } from '@angular/core';
import { GlobalServiceService } from 'src/app/services/global-service.service';

interface Anime {
  _id: string;
  name: string; // Asegúrate de tener esta propiedad en la interfaz Anime
  description: string;
  category: string[],
  // ... otras propiedades del anime
  isInFavorites?: boolean;
}

@Component({
  selector: 'app-one-anime',
  templateUrl: './one-anime.component.html',
  styleUrls: ['./one-anime.component.css'],
  providers: [AnimeService],
})
export class OneAnimeComponent {
  @Output() closeModal = new EventEmitter<void>();
  public animes: Anime[] = []; // Usa un array para almacenar todos los animes favoritos
  public isModalVisible = false;
  public url: string;
  public anime: any;
  public decodedToken: any;
  public isMenuVisible = false;
  public scrollPosition = 0;
  public animeName: string | any;
  public isAnimeFavorited: boolean = false; // Puedes establecer un valor inicial según tu lógica
  public isAnimeInFavorites: boolean | any;
  public userId: any;
  public animeId: any;
  public showDeleteMessage: boolean = false;
  constructor(
    private _globalService: GlobalServiceService,
    private cdr: ChangeDetectorRef,
    private _episodeService: EpisodeService,
    private _userService: UserService,
    private _animeService: AnimeService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    this.url = Global.url;
  }
  ngOnInit() {
    this._route.params.subscribe(params => {
      this.animeName = params['name'];
      this.getAnime(this.animeName);
      this.animeId = params['animeId'];
    });
    this.decodedToken = this._globalService.decodeTokenFromCookie();

  }
  animeClassMap: { [key: string]: string } = {
    'Sword Art Online': 'sao',
    'One Piece': 'onePiece',
    'Kimetsu no Yaiba': 'kimetsu',
    'Inazuma Eleven': 'inazumaEleven',
    'Shigatsu wa Kimi no Uso': 'shigatsu',
    'Your Name': 'yourName',
    'Captain Tsubasa': 'captainTsubasa',
    'Haikyuu': 'haikyu',
    'Dragon Ball Z': 'dragonBallZ',
    'Naruto Shippuden': 'narutoShippuden',
  };

  checkFavoriteAnime(userId: string, animeId: string, anime:Anime) {
    this._userService.checkFavoriteAnime(userId, animeId).subscribe(
      response => {
        if (response.message === 'Anime found in favorites') {
          anime.isInFavorites = true;
        } else if (response.message === 'Anime not found in favorites') {
          anime.isInFavorites = false;
          console.log('El anime no está en favoritos');
        }
      },
      error => {
        console.error('Error al verificar el estado del anime en favoritos:', error);
        // Lógica para manejar errores
      }
    )
  }
  removeFavoriteAnime(event: Event, animeId: string) {
    event.stopPropagation();
    const animeToRemove = this.animes.find(anime => anime._id === animeId);
  
    if (animeToRemove) {
    this._userService.removeFavoriteAnime(this.decodedToken.id, animeId).subscribe(
      response => {
        // Realiza las acciones necesarias si es necesario
        animeToRemove.isInFavorites = false;
        this.cdr.detectChanges(); // Forzar la detección de cambios
      },
      error => {
        console.error('Error al eliminar el anime de favoritos', error);
      }
    );
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

  getAnime(name: any) {
    this._animeService.getAnime(name).subscribe(
      response => {
        response.anime.image = response.anime.image.replace('uploads\\', '');

        this.anime = response.anime;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  getAllEpisodes(nameAnime: string): number[] {
    const allEpisodes = this._episodeService.episodesDatabase[nameAnime];
    if (allEpisodes) {
      return Object.keys(allEpisodes).map(Number);
    }
    return [];
  }

  addFavoriteAnime(event: Event, userId: string, animeId: string): void {
    event.stopPropagation();
    const animeToAdd = this.animes.find(anime => anime._id === animeId);
    if (animeToAdd) {
    this._userService.addFavoriteAnime(userId, animeId).subscribe(
      response => {
        animeToAdd.isInFavorites = !animeToAdd.isInFavorites;
        this.cdr.detectChanges(); // Forzar la detección de cambios
      },
      error => {
        console.error('Error al agregar el anime a favoritos', error);
      }
    );
  }
  }

  onAnimeClick(animeCategories: string) {

    this._router.navigate(['/directorio-anime', animeCategories]);
  }
  onCapAnime(name: string, episode: number, _id: string) {

    // Redirige a la página del anime y pasa el ID como parámetro de la ruta
    this._router.navigate(['/verCapitulo', name, episode, _id]);
  }
  imagePath = '../../../assets/css/img/Haikyu.png';
}
