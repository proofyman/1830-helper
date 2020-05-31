import {Component} from '@angular/core';
import {COMPANIES, GameStateService} from './game-state.service';
import {MatDialog} from '@angular/material/dialog';
import {EditMoneyComponent} from './edit-money/edit-money.component';
import {GameStateSyncService} from './game-state-sync.service';
import {StartConfigurationComponent} from './start-configuration/start-configuration.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  result: any;
  calculateCompany: COMPANIES = COMPANIES.NEW_YORK_CENTRAL;
  revenuePerShare: number = 0;
  isApplyReadyMode = false;
  title = '1830-helper';
  COMPANIES = COMPANIES;

  constructor(
    public gameStateSyncService: GameStateSyncService,
    public gameStateService: GameStateService,
    public matDialog: MatDialog
  ) {
    this.initGame();
  }

  get selectedValueColor() {
    console.log(this.calculateCompany, COMPANIES.BALTIMOR);
    switch (this.calculateCompany) {
      case COMPANIES.NEW_YORK_CENTRAL:
        return 'bg-g-newYork';
      case COMPANIES.BALTIMOR:
        return 'bg-g-baltimor';
      case COMPANIES.CHESAPEAKE:
        return 'bg-g-blue';
      case COMPANIES.BOSTON:
        return 'bg-g-boston';
      case COMPANIES.CANADIAN:
        return 'bg-g-red';
      case COMPANIES.NEW_YORK_NEW_HAVEN:
        return 'bg-g-orange';
      case COMPANIES.ERIE:
        return 'bg-g-yellow';
      case COMPANIES.PENNSYLVANIA:
        return 'bg-g-green';
      default:
        return 'bg-white';
    }
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

  openEditMoney() {
    this.matDialog.open(EditMoneyComponent, {
      data: [
      ]
    });
  }

  resetGame() {
    this.gameStateSyncService.stopListen();
    this.initGame();
  }

  initGame() {
    if (this.gameStateSyncService.applyStoredData()) {
      this.gameStateSyncService.startListen();
    } else {
      this.openStartConfiguration().afterClosed().subscribe(() => {
        this.gameStateSyncService.startListen();
      });
    }

  }

  openStartConfiguration() {
    return this.matDialog.open(StartConfigurationComponent, {
      disableClose: true
    });
  }
}
