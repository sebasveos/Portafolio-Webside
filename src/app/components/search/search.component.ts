import { Component, EventEmitter, Output } from '@angular/core';
import { AnimeService } from 'src/app/services/anime.service';
import { Global } from 'src/app/services/global';
import { Subject, catchError, switchMap, throwError } from 'rxjs';
import { Anime } from 'src/app/models/anime';
import { of } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GlobalServiceService } from 'src/app/services/global-service.service';
import { UserService } from 'src/app/services/user.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [AnimeService]
})
export class SearchComponent {
  @Output() closeModal = new EventEmitter<void>();
  public isModalVisible = false;
  public scrollPosition = 0;
  public decodedToken: any
  public isAnimeInFavorites: boolean | any;

  public url: string;
  searchTerm: string = '';
  searchResults: any[] = [];
  public animes: Anime[] = [];
  public anime: Anime | any;
  private searchTermSubject = new Subject<string>();

  constructor(
    private cdr: ChangeDetectorRef,
    private _userService: UserService,
    private _globalService: GlobalServiceService,
    private _animeService: AnimeService,
    private _router: Router,) {
    this.url = Global.url;
  }

  ngOnInit() {
    this.decodedToken = this._globalService.decodeTokenFromCookie();

    this.searchTermSubject.pipe(
      // Utiliza el operador switchMap para cambiar a nuevas observables de búsqueda
      // basado en los términos de búsqueda proporcionados por searchTermSubject
      switchMap(term => this._animeService.searchAnimesByName(of(term)).pipe(
        catchError(error => {
          return of([]);
        })
      ))
    ).subscribe(response => {
      // Procesa los resultados de búsqueda aquí
      this.animes = response.animes ? response.animes.map((anime: Anime) => {
        if (anime.image) {
          anime.image = anime.image.replace('uploads\\', '');
        }
        return anime;
      }) : [];
    });

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
  // Este método se activará cada vez que el usuario escriba en el campo de búsqueda
  onSearchTermChange(term: string): void {
    // Limita la búsqueda a al menos 3 letras
    if (term.length >= 1) {
      // Envía el término de búsqueda al observable searchTermSubject
      this.searchTermSubject.next(term);
    } else {
      // Limpiar los resultados si el término de búsqueda es menos de 3 letras
      this.animes = [];
    }
  }
  onAnimeClick(name: string) {
    this._router.navigate(['/anime', name]);
  }
}