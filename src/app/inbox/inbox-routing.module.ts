import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InboxPage } from './inbox.page';

const routes: Routes = [
  {
    path: '',
    component: InboxPage
  },
  {
    path: 'submission/:id',
    loadChildren: () => import('./submission/submission.module').then( m => m.SubmissionPageModule)
  },
  {
    path: 'suggestion/:id',
    loadChildren: () => import('./suggestion/suggestion.module').then( m => m.SuggestionPageModule)
  },
  {
    path: 'provider-report/:id',
    loadChildren: () => import('./provider-report/provider-report.module').then( m => m.ProviderReportPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InboxPageRoutingModule {}
