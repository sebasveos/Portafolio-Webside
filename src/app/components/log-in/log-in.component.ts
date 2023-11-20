import { UserService } from '../../services/user.service';
import { UploadService } from '../../services/upload.service';
import { Component, Renderer2,OnInit  } from '@angular/core';
import { User } from '../../models/user'
import { Global } from '../../services/global';
import { Router, NavigationEnd } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ViewportScroller } from '@angular/common';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  providers: [UserService, UploadService]

})
export class LogInComponent implements OnInit {
  public user: User;
  public url: string;
  constructor(
    private viewportScroller: ViewportScroller,
    private router: Router,
    private _userService: UserService,
  ) {

    this.url = Global.url;
    this.user = new User('','', '',[]);
  }
  ngOnInit(): void {
    // Desplázate a la parte superior de la página cuando se carga el componente
    this.viewportScroller.scrollToPosition([0, 0]);
  }
  onSubmit(form: any) {
    this._userService.authenticationUser(this.user).subscribe(
      response => {
        this._userService.setToken(response.token);
        const authToken = response.token;
        const decodedToken = jwt_decode(authToken) as { name: string, id: string}; // Ajusta la estructura según tus necesidades

        console.log('Nombre del usuario:', decodedToken.name, decodedToken.id);

        this.router.navigate(['pagina-principal'], { queryParams: { token: response.token } }); // Redirige al usuario a la página principal
      },
      error => {
        console.log(<any>error);
        form.reset();
      }
    );

  }
}


