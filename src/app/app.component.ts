import {Component} from '@angular/core';
import {COMPANIES, GameStateService} from './game-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  result: any;
  calculateCompany: COMPANIES = COMPANIES.NEW_YORK;
  revenuePerShare: number = 0;
  isApplyReadyMode = false;
  title = '1830-helper';
  COMPANIES = COMPANIES;

  constructor(public gameStateService: GameStateService) {
    this.gameStateService.initPlayer(
      'solo',
      400
    );
    this.gameStateService.initPlayer(
      'vasya',
      400
    );
    this.gameStateService.initPlayer(
      'petya',
      400
    );
    this.gameStateService.initPlayer(
      'aishetu',
      400
    );
    this.gameStateService.setBankPool(12000);
  }

  calculateRevenues(company: COMPANIES, revenuePerShare: number, isNotDevident = false) {
    this.isApplyReadyMode = true;
    this.result = this.gameStateService.calculateRevenue(company, revenuePerShare, !isNotDevident);
  }

  applyRevenue() {
    this.gameStateService.addRevenue(this.result);
    this.result = null;
    this.revenuePerShare = 0;
    this.isApplyReadyMode = false;
  }
}
