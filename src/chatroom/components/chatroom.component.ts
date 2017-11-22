import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { ChatRoomService } from "../services/chatroom.service";
import { ChatMessageModel } from "../models/chatmessage.model";

@Component({
    selector: 'chat-room',
    templateUrl: '../views/chatroom.component.html',
    styleUrls: ['../styles/chatroom.component.css'],
    providers: [ChatRoomService]
})

export class ChatRoomComponent  { //implements OnChanges

    // ngOnChanges(changes: SimpleChanges): void {
    //     console.log(changes);
    // }

    private socket;
    private previousMessage: string;
    private startedTyping: boolean;

    public name: string;
    public message: string;
    public messages: string;
    public chatMessages: Array<ChatMessageModel>;
    public peopleTyping: Array<string>;

    //@Input() whatever: string = '';

    constructor(private _chatRoomService:ChatRoomService) {
        this.name = '';
        this.message = '';
        this.messages = '';
        this.previousMessage = '';
        this.chatMessages = [];
        this.startedTyping = false;
        this.peopleTyping = [];
        this.socket = new WebSocket("ws://ilm.chatservice.com");
    };

    ngOnInit() {
        this.setupSocket();
    };

    handleFile(files: FileList) {
        var scope = this;
        this._chatRoomService.getBase64(files[0]).then(function (res) {
            scope.sendPicture(scope.name, res);
            console.log(files);
        }); 
    };

    onKeyPress(e) {
        if (this.previousMessage == '' && this.message != '') { // just entered text
            this.startedTyping = true;
            this.sendMessage(this.name, true, null);
        }

        this.previousMessage = this.message;

        if (this.startedTyping && this.message == '') { // cleared the text
            this.startedTyping = false;
            this.sendMessage(this.name, false, null);
        }

        var key = e.which || e.keyCode || 0;
        if (key == 13) { // Enter has been pressed
            e.preventDefault();
            this.sendMessage(this.name, false, this.message)
            this.message = '';
            this.previousMessage = '';
            this.startedTyping = false;
        }
     };

    private sendMessage(name: string, isTyping: boolean, message: string) {
        if (name == '') {
            return;
        }

        var chatMessage = new ChatMessageModel();
        chatMessage.name = name;
        chatMessage.isTyping = isTyping;
        if (message) {
            chatMessage.message = message;
        }
        var messageData = JSON.stringify(chatMessage);
        this.socket.send(messageData);       
    };

    private sendPicture(name: string, image: string) {
        if (name == '') {
            return;
        }

        var chatMessage = new ChatMessageModel();
        chatMessage.name = name;
        chatMessage.image = image;
        var messageData = JSON.stringify(chatMessage);
        this.socket.send(messageData);       
    };


    setupSocket() {
        /*         var protocol = location.protocol === "https:" ? "wss:" : "ws:";
        var wsUri = protocol + "//" + window.location.host;

        var url = "ws://ilm.chatservice.com"
        this.socket = new WebSocket(url); */

        var scope = this;

        this.socket.onopen = e => {
            console.log("socket opened", e);
        };
        this.socket.onclose = function (e) {
            console.log("socket closed", e);
        };
        this.socket.onmessage = function (e) {
            console.log(JSON.parse(e.data));
            var response = JSON.parse(e.data);

            if (response.isTyping) {
                if (scope.name != response.name) {
                    scope.peopleTyping.push(response.name);
                }
            } else {
                var index = scope.peopleTyping.indexOf(response.name);
                if (index > -1) {
                    scope.peopleTyping.splice(index, 1);
                }

                if (response.message || response.image) {
                    scope.chatMessages.push(response);
                }
            }
        };
        this.socket.onerror = function (e) {
            console.error(e.data);
        };
    };
}