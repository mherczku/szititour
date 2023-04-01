import {Component, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {ActiveGameService} from "../../../services/ActiveGameService";
import {Observable} from "rxjs";
import {ActiveGame} from "../../../types/game";

@Component({
  selector: "app-active-game",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./active-game.component.html",
  styleUrls: ["./active-game.component.scss"]
})
export class ActiveGameComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private activeGameService: ActiveGameService) {
  }

  activeGame$?: Observable<ActiveGame>;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params["id"];
      if (id) {
        this.activeGameService.getActiveGameData(id).subscribe(res => {
          console.log(res)
        })
      }
    });
  }

}
