import { Pipe, PipeTransform } from '@angular/core';
import { ChatMessageModel } from '../models/chatmessage.model';

@Pipe({name: 'filterMessage', pure: false})
export class FilterMessagePipe implements PipeTransform {
  transform(value: Array<ChatMessageModel>, filter: string): Array<ChatMessageModel> {

    if (!filter) {
      return value;
    }      

    var filteredMessages = [];

    value.forEach((value, index) => {
      if (value.message && value.message.toLowerCase().search(filter.toLowerCase()) !== -1) {
        filteredMessages.push(value);
      }
    });  

    return filteredMessages;
  }
}