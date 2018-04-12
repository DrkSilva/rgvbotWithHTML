import { Component } from '@angular/core';
import {PaintService} from './services/paint.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers:[PaintService]
})

export class AppComponent {}