import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {InboxService, LocationSuggestion, Report, ProviderReport} from '../services/inbox/inbox.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {

  public reports: Observable<Report[]>;
  public locationSuggestions: Observable<LocationSuggestion[]>;
  public providerReports: Observable<ProviderReport[]>;
  public problemsView;
  public locationView;
  public reportView;

  constructor(public inboxService: InboxService, public router: Router, public storage: Storage) {
  }

  ngOnInit() {

    this.storage.get('authenticated').then((val) => {
      if (val === 'false') {
        this.router.navigate(['/login/']);

      } else {
        this.storage.get('type').then((value) => {
          if (value !== 'admin') {
            this.router.navigate(['/login/']);
          }
        });
      }
    });
    this.reports = this.inboxService.getReports();
    this.locationSuggestions = this.inboxService.getLocationSuggestions();
    this.providerReports = this.inboxService.getProviderReports();

    this.problemsView = true;
    this.locationView = false;
    this.reportView = false;
  }

  updateToViewed(id, type) {
    this.inboxService.updateNotifAsSeen(id, type);
  }

}
