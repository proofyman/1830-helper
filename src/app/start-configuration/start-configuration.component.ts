import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {GameStateService} from '../game-state.service';

@Component({
  selector: 'app-start-configuration',
  templateUrl: './start-configuration.component.html',
  styleUrls: ['./start-configuration.component.scss']
})
export class StartConfigurationComponent implements OnInit {
  @ViewChild('myForm') form;
  players: {name: string}[] = [
    {
      name: ''
    },
    {
      name: ''
    },
    {
      name: ''
    },
    {
      name: ''
    }
  ];

  constructor(
    private matDialogRef: MatDialogRef<StartConfigurationComponent>,
    private gameStateService: GameStateService
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    let [totalBankPool, playerStartMoney] = this.getStartInfoByCount(this.players.length);

    this.gameStateService.reset();
    this.gameStateService.setBankPool(totalBankPool);
    this.players.forEach(player => {
      this.gameStateService.initPlayer(
        player.name,
        playerStartMoney
      );
    });
    this.matDialogRef.close();
  }

  getStartInfoByCount(count: number): [number, number] {
    return [12000, 400];
  }

  deletePlayer(i) {
    this.players.splice(i, 1);
    this.players = [...this.players];
  }

  trackFn(index, i) {

  }
}
