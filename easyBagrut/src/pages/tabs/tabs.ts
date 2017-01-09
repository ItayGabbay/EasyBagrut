import { Component } from '@angular/core';

import { GradesPage } from '../home/home';
import { FuturePage } from '../future/future';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = GradesPage;
  tab2Root: any = FuturePage;

  constructor() {

  }
}
