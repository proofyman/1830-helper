import { Injectable } from '@angular/core';
import {GameStateService} from './game-state.service';

@Injectable({
  providedIn: 'root'
})
export class GameStateSyncService {
  intervalId;

  constructor(
    private gameStateService: GameStateService
  ) { }

  startListen() {
    this.intervalId = setInterval(() => {
      this.storeData();
    }, 1000);
  }

  stopListen() {
    clearInterval(this.intervalId);
    localStorage.removeItem('gameState');
  }

  applyStoredData() {
    let data;
    try {
      data = JSON.parse(localStorage.getItem('gameState'));
    } catch {}
    if (!data) return false;

    this.gameStateService.applySerialized(data);
    return true;
  }

  storeData() {
    let data = this.gameStateService.serialize();
    localStorage.setItem('gameState', JSON.stringify(data));
  }

}
