import {Component} from '@angular/core';


@Component({
  selector: 'app-fatrider',
  template: `
    <router-outlet></router-outlet>`
})

export class AppComponent {

  constructor() {

  }

}

export interface AppConfig {
  domain: string;
  api: string;
  local: string;
}
