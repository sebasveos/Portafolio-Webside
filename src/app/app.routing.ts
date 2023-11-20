import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router"

import { HomePageComponent } from "./components/home-page/home-page.component";
import { AnimeDirectoryComponent } from "./components/anime-directory/anime-directory.component";
import { FavoriteComponent } from "./components/favorite/favorite.component";
import { LogInComponent } from "./components/log-in/log-in.component";
import { OneAnimeComponent } from "./components/one-anime/one-anime.component";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { SearchComponent } from "./components/search/search.component";
import { ViewCapituleComponent } from "./components/view-capitule/view-capitule.component";
import { AllAnimesComponent } from "./components/all-animes/all-animes.component";
import { AcountComponent } from "./components/acount/acount.component";
import { FooterComponentsComponent } from './components/footer-components/footer-components.component';


const appRoutes: Routes = [
    {path: '',component: HomePageComponent },
    {path: 'pagina-principal',component: HomePageComponent },
    {path: 'directorio-anime/:category',component: AnimeDirectoryComponent },
    {path: 'todos-los-animes',component: AllAnimesComponent },
    {path: 'favorito/:id', component: FavoriteComponent},
    {path: 'anime/:name/:animeId', component: OneAnimeComponent},   
    {path: 'iniciar-sesion', component: LogInComponent},
    {path: 'registrarse', component: SignInComponent},
    {path: 'buscar', component: SearchComponent},
    {path: 'verCapitulo/:name/:episode/:_id', component: ViewCapituleComponent},
    {path: 'cuenta', component: AcountComponent},
    {path: 'oli', component: FooterComponentsComponent},

];


export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
