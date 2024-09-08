import { LoadingService} from "../../services/loading.service";
import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
  public loading$;

  constructor(private loader: LoadingService) {
    this.loading$ = this.loader.loading$;
  }
}
