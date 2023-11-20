import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Global } from './global';
import { Anime } from '../models/anime';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: "root",
})
export class AnimeService {
    public url: string;
    constructor(
        private _http: HttpClient,
    ) {
        this.url = Global.url;
    }

    saveAnime(anime: Anime): Observable<any> {
        let params = JSON.stringify(anime);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + 'saveAnime', params, { headers: headers });
    }
    getAnime(name: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url + 'getAnime/' + name, { headers: headers });
    }
    getAnimes(category: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url + 'getAnimes/' + category, { headers: headers });
    }
    getAllAnimes(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url + 'getAllAnimes', { headers: headers });
    }
    searchAnimesByName(searchTerm: Observable<string>): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        // Agrega el término de búsqueda como un parámetro en la URL
        return searchTerm.pipe(
            debounceTime(300), // Espera 300ms después de cada pulsación de tecla
            distinctUntilChanged(), // Solo realiza la solicitud si el término de búsqueda ha cambiado
            switchMap(term => this._http.get(`${this.url}searchAnimes?search=${term}`, { headers: headers }))
        );
    }
    searchAnimesByOptions(options: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        // Realiza una solicitud GET con los parámetros de búsqueda en la URL
        return this._http.get(this.url+'searchAnimesByOptions', { params: options, headers: headers });
    }
}
