import { Component, OnInit } from '@angular/core';
import { SlideService } from 'src/app/service/slide.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalNewSlideComponent } from './ngb-modal-new-slide/ngb-modal-new-slide.component';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit {

  slides = [] as any;
  constructor(private slideService: SlideService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getAllSlide();
  }

  getAllSlide(){
    this.slideService.getSlide().subscribe(data =>{
      this.slides = data;
    })
  }
  delete(id){
    this.slideService.deleteSlide(id).subscribe(data => {
      this.getAllSlide();
    })
  }
  openNewSlide(){
    const modalRef = this.modalService.open(NgbModalNewSlideComponent);
    modalRef.componentInstance.returnStatus.subscribe(data => {
      if(data == 'success'){
        this.getAllSlide();
        modalRef.close();
      }
      
    })
  }
}
