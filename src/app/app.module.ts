import { NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule } from '@ionic/angular';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { AnimeDirectoryComponent } from './components/anime-directory/anime-directory.component';
import { OneAnimeComponent } from './components/one-anime/one-anime.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { SearchPipe } from './pipes/search.pipe';
import { ViewCapituleComponent } from './components/view-capitule/view-capitule.component';
import { FooterComponent } from './components/footer/footer.component';
import { AllAnimesComponent } from './components/all-animes/all-animes.component';
import { AcountComponent } from './components/acount/acount.component';
import { FooterComponentsComponent } from './components/footer-components/footer-components.component';
  

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    FavoriteComponent,
    AnimeDirectoryComponent,
    OneAnimeComponent,
    HomePageComponent,
    SignInComponent,
    HeaderComponent,
    SearchComponent,
    SearchPipe,
    ViewCapituleComponent,
    FooterComponent,
    AllAnimesComponent,
    AcountComponent,
    FooterComponentsComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule,
    CarouselModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    IonicModule,
    IonicModule.forRoot(),
    ToastrModule.forRoot() 
  ],
  providers: [
    appRoutingProviders,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
