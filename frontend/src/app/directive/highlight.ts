import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class Highlight {

  constructor(private ele: ElementRef) {

    this.ele.nativeElement.style.transition = 'all 0.3s ease';
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    const card = this.ele.nativeElement.querySelector('.card');
    this.ele.nativeElement.style.transform = 'translateY(-10px)';
    card.style.transition = 'background-color 0.3s ease, box-shadow 0.3s ease';
    card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
    card.style.backgroundColor = '#eaeaea';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    const card = this.ele.nativeElement.querySelector('.card');
    this.ele.nativeElement.style.transform = 'translateY(0)';
    card.style.boxShadow = 'none';
    card.style.backgroundColor = '';
  }
}