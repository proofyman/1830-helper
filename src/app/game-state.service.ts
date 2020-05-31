import { Injectable } from '@angular/core';

interface SerializedState {
  bankPool: number;
  bankShares: any;
  userInfo: {name: string, money: number, shares: any}[];
}

export enum COMPANIES {
  BOSTON,
  BALTIMOR,
  CANADIAN,
  ERIE,
  CHESAPEAKE,
  PENNSYLVANIA,
  NEW_YORK_CENTRAL,
  NEW_YORK_NEW_HAVEN
}

const defaultShares = {
  [COMPANIES.BOSTON]: 0,
  [COMPANIES.BALTIMOR]: 0,
  [COMPANIES.CANADIAN]: 0,
  [COMPANIES.ERIE]: 0,
  [COMPANIES.CHESAPEAKE]: 0,
  [COMPANIES.PENNSYLVANIA]: 0,
  [COMPANIES.NEW_YORK_CENTRAL]: 0,
  [COMPANIES.NEW_YORK_NEW_HAVEN]: 0
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
  bankPoolTotal = 12000;
  bankPoolShares = {...defaultShares};
  bankPool = 0;
  players: PlayerState[] = [];

  constructor() {
  }

  reset() {
    this.players = [];
    this.bankPool = 0;
    this.bankPoolShares = {...defaultShares};
  }

  initPlayer(name, startMoney = 0, shares?: any) {
    this.players.push(
      new PlayerState(name, startMoney, shares)
    );

    this.bankPool -= startMoney;
  }

  setBankPool(amount) {
    this.bankPoolTotal = amount;
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

  serialize(): SerializedState {
    let bankShares = this.bankPoolShares;
    let bankPool = this.bankPool;
    let userInfo = this.players.map(p => ({
      money: p.money,
      name: p.name,
      shares: p.shares
    }));

    return {
      bankShares,
      bankPool,
      userInfo
    };
  }

  applySerialized(data: SerializedState) {
    data.userInfo.forEach(info => {
      this.initPlayer(
        info.name,
        info.money,
        info.shares
      );
    });
    // порядок важен, т.к. инит игрока забирает деньги из пула
    this.setBankPool(data.bankPool);
    this.bankPoolShares = data.bankShares;
  }
}
