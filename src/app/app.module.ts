import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ChatRoomComponent } from '../chatroom/components/chatroom.component';

import {FilterMessagePipe} from "../chatroom/pipes/chatroom-search.pipe";
import { FileUploadDirective } from '../upload/directives/fileupload.directive';

@NgModule({
  declarations: [
    AppComponent,
    ChatRoomComponent,
    FilterMessagePipe,
    FileUploadDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
