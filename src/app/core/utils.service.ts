import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

  constructor() { }

  tabIs(currentTab: string, tab: string): boolean {
    // Check if current tab is tab name
    return currentTab === tab;
  }

}
