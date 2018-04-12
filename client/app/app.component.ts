import { Component } from '@angular/core';
import {GuyService} from './services/guy.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers:[GuyService]
})

export class AppComponent {}