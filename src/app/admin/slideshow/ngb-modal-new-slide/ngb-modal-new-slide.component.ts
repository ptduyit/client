import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { SlideService } from 'src/app/service/slide.service';

@Component({
  selector: 'app-ngb-modal-new-slide',
  templateUrl: './ngb-modal-new-slide.component.html',
  styleUrls: ['./ngb-modal-new-slide.component.css']
})
export class NgbModalNewSlideComponent implements OnInit {
  @Output() returnStatus: EventEmitter<any> = new EventEmitter();
  image = "";
  temp = "";
  link = "";
  file: File;
  constructor(public activeModal: NgbActiveModal, public sanitizer: DomSanitizer, private slideService: SlideService) { }

  ngOnInit() {
  }
  onSubmit(){
    let formData : FormData = new FormData();
    formData.append('file',this.file);
    formData.append('link',this.link);
    this.slideService.createSlide(formData).subscribe(_ => {
      this.returnStatus.emit('success');
    })
  }
  myUploader(event,fileUpload){
    this.temp = event.files[0].name;
    this.image = event.files[0].objectURL.changingThisBreaksApplicationSecurity;
    this.file = event.files[0];
    console.log(event);
    fileUpload.clear();
  }
}
