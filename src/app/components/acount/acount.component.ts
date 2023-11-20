import { Component } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { GlobalServiceService } from 'src/app/services/global-service.service';
import { UserService } from 'src/app/services/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-acount',
  templateUrl: './acount.component.html',
  styleUrls: ['./acount.component.css']
})
export class AcountComponent {
  public isGood: boolean | any;
  public decodedToken: any;
  public userId: string = '';
  public newUserName: string = '';
  public password: string = '';
  public currentPassword: string = '';
  public newPassword: string = '';
  public confirmPassword: string = '';
  public nuevaContraseña: string = '';
  public confirmarNuevaContraseña: string = '';
  constructor(
    private _cookieService: CookieService,
    private _userService: UserService,
    private _globalService: GlobalServiceService,
  ) {

  }
  ngOnInit() {
    this.decodedToken = this._globalService.decodeTokenFromCookie();
  }
  updateUserName() {
    this._userService.updateUserName(this.decodedToken.id, this.newUserName, this.password).subscribe(
      response => {
        console.log('El nombre se cambió', response);
        this.isGood = true;
        this.newUserName = '';
        this.password = '';
  
        // Actualiza el token almacenado en las cookies con el nuevo token del servidor
        if (response.token) {
          this._cookieService.set('token', response.token);
          
          // También puedes decodificar el nuevo token y actualizar la propiedad decodedToken
          // de tu componente si es necesario
          const decodedToken = jwt_decode(response.token);
          // Actualiza la propiedad decodedToken con el nuevo valor decodificado
          this.decodedToken = decodedToken;
        }
  
        // También puedes actualizar otros datos del usuario si es necesario
      },
      error => {
        console.error('Error al cambiar el nombre:', error);
      }
    );
  }
  updatePassword() {
    this._userService.updatePassword(this.decodedToken.id, this.currentPassword, this.newPassword, this.confirmPassword).subscribe(
      response => {
        console.log('La contraseña cambio');
        this.isGood = true;
        this.password = '';
        this.newPassword = '';
        this.confirmPassword = '';
      }
    )
  }

}
