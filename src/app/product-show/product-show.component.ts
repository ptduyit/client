import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-show',
  templateUrl: './product-show.component.html',
  styleUrls: ['./product-show.component.css'],
  providers: [NgbModalConfig, NgbModal,NgbCarouselConfig]
})
export class ProductShowComponent implements OnInit {
  images = [1, 2, 3, 4].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  constructor(config: NgbModalConfig, private modalService: NgbModal,config1: NgbCarouselConfig) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
    //ảnh
    config1.interval = 5000;
    config1.wrap = false;
    config1.keyboard = false;
    config1.pauseOnHover = false;
  }

  open(content) {
    this.modalService.open(content);
  }
  ngOnInit() {
  }
  id=1;
  link_img:string="https://scontent.fsgn5-1.fna.fbcdn.net/v/t1.0-9/42221593_1130153407160629_7769704690115149824_n.jpg?_nc_cat=101&_nc_ht=scontent.fsgn5-1.fna&oh=597e6713b89201f4f4c41db85e805c10&oe=5C7BB15B";
  

}
