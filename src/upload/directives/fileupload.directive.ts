import { Directive, HostListener, EventEmitter, Output, ElementRef } from "@angular/core";

@Directive({ 
    selector: '[fileUpload]'
})

export class FileUploadDirective {
    

    constructor(private element:ElementRef) {

    }

    @Output() fileEvent: EventEmitter<FileList> = new EventEmitter<FileList>();

    @HostListener('dragover', ['$event']) ondragover(event:any){
        this.element.nativeElement.style.backgroundColor = '#ddd';
        event.preventDefault();
    }

    @HostListener('dragleave', ['$event']) ondragleave(event:any){
        this.element.nativeElement.style.backgroundColor = '#fff';
        event.preventDefault();
    }

    @HostListener('drop', ['$event']) ondrop(event:any){
        this.fileEvent.emit(event.dataTransfer.files);
        event.preventDefault();
    }
}