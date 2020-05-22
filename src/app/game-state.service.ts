import { Injectable } from '@angular/core';

export enum COMPANIES {
  BOSTON,
  BALTIMOR,
  RED,
  YELLOW,
  BLUE,
  GREEN,
  NEW_YORK,
  ORANGE
}

const defaultShares = {
  [COMPANIES.BOSTON]: 0,
  [COMPANIES.BALTIMOR]: 0,
  [COMPANIES.RED]: 0,
  [COMPANIES.YELLOW]: 0,
  [COMPANIES.BLUE]: 0,
  [COMPANIES.GREEN]: 0,
  [COMPANIES.NEW_YORK]: 0,
  [COMPANIES.ORANGE]: 0
};

class PlayerState {
  shares;

  constructor(
    public name: string,
    public money = 0,
    sharesKV = defaultShares
  ) {
    this.shares = {...sharesKV};
  }

  addMoney(addSum) {
    this.money += addSum;
  }
}

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  bankPoolShares = {...defaultShares};
  bankPool = 0;
  players: PlayerState[] = [];

  constructor() {
  }

  initPlayer(name, startMoney = 0, shares?: any) {
    this.players.push(
      new PlayerState(name, startMoney, shares)
    );
  }

  setBankPool(amount) {
    this.bankPool = amount;
  }

  addRevenue(reveniewInfo) {
    let totalSumm = reveniewInfo.companyRevenue;

    reveniewInfo.playersRevenue.forEach(([player, revenue]) => {
      totalSumm += revenue;
      player.addMoney(revenue);
    });

    this.bankPool = this.bankPool - totalSumm;
  }

  calculateRevenue(company: COMPANIES, revenuePerShare, isDivident: boolean) {
    const playersRevenue = isDivident ? this.players.map(player => {
      return [player, player.shares[company] * revenuePerShare];
    }) : [];

    const ownCompanySharedForRevenue = !isDivident ? 10 : this.bankPoolShares[company];

    const companyRevenue = ownCompanySharedForRevenue * revenuePerShare;

    return {
      playersRevenue,
      companyRevenue
    };
  }
}
