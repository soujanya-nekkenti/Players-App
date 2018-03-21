import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { ManagePlayerComponent } from './manage-player/manage-player.component';


@NgModule({
  declarations: [
    AppComponent,
    PlayerListComponent,
    ManagePlayerComponent
  ],
  imports: [
    BrowserModule,HttpModule,FormsModule,ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path : '',
        component : PlayerListComponent
      },
      {
        path : 'update-player/:player_id',
        component : ManagePlayerComponent
      },
      {
        path : 'add-player',
        component : ManagePlayerComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
