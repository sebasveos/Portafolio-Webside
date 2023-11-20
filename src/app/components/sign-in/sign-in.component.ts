import { Component } from '@angular/core';
import { User } from '../../models/user'
import { UserService } from '../../services/user.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { Router } from '@angular/router';
import { Renderer2, ElementRef, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';


@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.css'],
	providers: [UserService, UploadService]
})
export class SignInComponent {
	public url: string;
	public user: User;
	public nombre: string = '';
	public mostrarHeader = false;

	constructor(
		private viewportScroller: ViewportScroller,
		private renderer: Renderer2, 
		private el: ElementRef,
		private router: Router,
		private _userService: UserService,
	) {
		this.url = Global.url;
		this.user = new User('', '', '', []);
	}
	ngOnInit() {
		this.viewportScroller.scrollToPosition([0, 0]);

		const headerElement = this.el.nativeElement.querySelector('app-header');
		this.renderer.setStyle(headerElement, 'display', 'none');
	}

	onSubmit(form: any) {
		//this.nombre = form.name; 
		this._userService.saveUser(this.user).subscribe(
			response => {
				this._userService.setToken(response.token);

				this.router.navigate(['pagina-principal'], { queryParams: { token: response.token } }); // Redirige al usuario a la página principal
			},
			error => {
				console.log(<any>error);
				form.reset();
			}
		)
	}
}
