import { Injectable } from "@angular/core";

@Injectable()
export class ChatRoomService {
    public getBase64(file) : any {

        let promise = new Promise((resolve, reject) => {

            var result = '';
            
                var reader = new FileReader();
                reader.readAsDataURL(file);
        
                reader.onload = function (event: Event) {
                    var target = event.target as any;
                    result = target.result;
        
                    var image = new Image();
                    image.src = result;
                    image.width = 250; // a fake resize

                    resolve(result);
                };
        
                reader.onerror = function (error) {
                    reject(error);
                };
          });

          return promise;
     }
}