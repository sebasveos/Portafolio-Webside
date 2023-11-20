import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private routesWithoutHeader: string[] = ['iniciar-sesion', 'registrarse']; // Agrega más rutas aquí si es necesario

  showHeader: boolean = true;
  title = 'anime-asiacomics-website';
  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Verifica la ruta actual y decide si mostrar el encabezado
        this.showHeader = !this.routesWithoutHeader.includes(this.route.snapshot.firstChild?.routeConfig?.path || '');
      }
    });
  }
}
