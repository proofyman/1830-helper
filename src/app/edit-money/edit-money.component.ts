import { Component, OnInit } from '@angular/core';
import {GameStateService} from '../game-state.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-money',
  templateUrl: './edit-money.component.html',
  styleUrls: ['./edit-money.component.scss']
})
export class EditMoneyComponent implements OnInit {
  state: any;
  bankMoney: number;

  constructor(
    public matDialogRef: MatDialogRef<EditMoneyComponent>,
    public gameStateService: GameStateService
  ) {
    this.state = gameStateService.players.map(p => ({
      name: p.name,
      money: p.money
    }));
    this.bankMoney = gameStateService.bankPool;
  }

  ngOnInit(): void {
  }

  submit() {
    this.state.forEach((p, i) => {
      this.gameStateService.players[i].money = p.money;
    });
    this.gameStateService.bankPool = this.bankMoney;
    this.matDialogRef.close();
  }

}
