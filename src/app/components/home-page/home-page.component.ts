import { Component, OnInit, Output, EventEmitter, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Global } from 'src/app/services/global';
import { GlobalServiceService } from 'src/app/services/global-service.service';
import { ChangeDetectorRef } from '@angular/core';
import { AnimeService } from 'src/app/services/anime.service';

interface Anime {
  _id: string;
  name: string; // Asegúrate de tener esta propiedad en la interfaz Anime
  description: string;
  category: string[],
  // ... otras propiedades del anime
  isInFavorites?: boolean;
}
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})

export class HomePageComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  public showDeleteMessage: boolean = false;
  public isModalVisible = false;
  public url: string;
  public animes: Anime[] = [];
  public user: User;
  public token: string | null = null;
  public decodedToken: any;
  public anime: any;
  public isMenuVisible = false;
  public scrollPosition = 0;
  public animeIds: any;

  constructor(
    private _animeService: AnimeService,
    private cdr: ChangeDetectorRef,
    private _globalService: GlobalServiceService,
    private renderer: Renderer2,
    private _router: Router,
    private _userService: UserService,
  ) {
    this.url = Global.url;
    this.user = new User('', '', '', []);
  }

  ngOnInit(): void {
    this.renderer.setProperty(document.body, 'scrollTop', 0);
    const script = document.createElement('script');
    script.src = 'assets/script.js'; // Ruta a tu archivo script.js
    document.body.appendChild(script);

    this.decodedToken = this._globalService.decodeTokenFromCookie();

    this._animeService.getAllAnimes().subscribe(
      response => {
        if (response.animes) {
          this.animes = response.animes;
          this.animes.forEach(anime => {
            this.checkFavoriteAnime(this.decodedToken.id, anime._id, anime);
          });
        }
      },
      error => {
        console.log('Error al obtener animes:', error);
      }
    );
  }

  checkFavoriteAnime(userId: string, animeId: string,  anime: Anime) {
    this._userService.checkFavoriteAnime(userId, animeId).subscribe(
      response => {
        if (response.message === 'Anime found in favorites') {
          anime.isInFavorites = true;
        } else if (response.message === 'Anime not found in favorites') {
          anime.isInFavorites = false;

          console.log('El anime no está en favoritos');
        }
      },
    )
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
  

  addFavoriteAnime(event: Event, animeId: string): void {
    event.stopPropagation();
    const animeToAdd = this.animes.find(anime => anime._id === animeId);
    if (animeToAdd) {
    this._userService.addFavoriteAnime(this.decodedToken.id, animeId).subscribe(
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
  truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

  onAnimeClick(name: string) {
    if (name == 'Naruto Shippuden') {
      this.animeIds = '6529964df66187c759fe1460';
    } else if (name == 'Haikyuu') {
      this.animeIds = '652995a5f66187c759fe145c';
    } else if (name == 'Sword Art Online') {
      this.animeIds = '65298c83f66187c759fe144e';
    } else if (name == 'Dragon Ball Z') {
      this.animeIds = '652995e9f66187c759fe145e';
    } else if (name == 'Inazuma Eleven') {
      this.animeIds = '652994eaf66187c759fe1454';
    } else if (name == 'Your Name') {
      this.animeIds = '65299540f66187c759fe1458';
    } else if (name == 'One Piece') {
      this.animeIds = '65298cdcf66187c759fe1450';
    } else if (name == 'Kimetsu no Yaiba') {
      this.animeIds = '652994a7f66187c759fe1452';
    } else if (name == 'Captain Tsubasa') {
      this.animeIds = '65299574f66187c759fe145a';
    } else if (name == 'Kimetsu no Yaiba') {
      this.animeIds = '65298cdcf66187c759fe1450';
    } else if (name == 'Shigatsu wa Kimi no Uso') {
      this.animeIds = '65299512f66187c759fe1456';
    }
    this._router.navigate(['/anime', name, this.animeIds]);
  }
  removeFavoriteAnime(event: Event, animeId: string) {
    event.stopPropagation();
    const animeToRemove = this.animes.find(anime => anime._id === animeId);
  
    if (animeToRemove) {
      this._userService.removeFavoriteAnime(this.decodedToken.id, animeId).subscribe(
        response => {
          // Actualiza el estado de isInFavorites en el objeto anime correspondiente
          animeToRemove.isInFavorites = false;
          this.cdr.detectChanges(); // Forzar la detección de cambios
        },
        error => {
          console.error('Error al eliminar el anime de favoritos', error);
        }
      );
    } else {
      console.error('Anime no encontrado en la lista.');
    }
  }
  
  onCapAnime(name: string, episode: number, _id: string) {

    // Redirige a la página del anime y pasa el ID como parámetro de la ruta
    this._router.navigate(['/verCapitulo', name, episode, _id]);
  }
  onAnimeClickCategory(animeCategories: string) {

    this._router.navigate(['/directorio-anime', animeCategories]);
  }
}