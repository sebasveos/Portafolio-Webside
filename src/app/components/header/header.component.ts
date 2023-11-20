import { Component, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';  // Importa el servicio Router
import { GlobalServiceService } from 'src/app/services/global-service.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],

})
export class HeaderComponent {
  public user: User;
  public token: string | null = null;
  public decodedToken: any;
  @ViewChild('menuItem') menuItem!: ElementRef;
  isSubMenuOpen: boolean = false;

  constructor(
    private _userService : UserService,
    private _globalService: GlobalServiceService,
    private _router: Router,
  ) {

    this.user = new User('', '', '', []);
    this._userService.userNameUpdated$.subscribe(newUserName => {
      this.decodedToken.name = newUserName; // Actualizar el nombre de usuario en el header
  });
  }
  public isMenuVisible = false;

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
  ngOnInit() {
    this.decodedToken = this._globalService.decodeTokenFromCookie();
  }
  logout(): void {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    this.decodedToken = null; // Clear the decoded token
    
    this.toggleMenu();
    
    this._router.navigate(['/pagina-principal']);
  }
  onLoginClick(): void {
    // Redirige a la página de inicio de sesión y agrega el fragmento 'top'
    this._router.navigate(['/iniciar-sesion'], { fragment: 'top' });
  }
  onFavoriteClick1(id: string) {
    this._router.navigate(['/favorito', id]);
    this.toggleMenu();
  }
  onFavoriteClick(id: string) {
    this._router.navigate(['/favorito', id]);
  }
  onAcountClick() {
    this.toggleMenu();
    this._router.navigate(['/cuenta']);
  }
}



