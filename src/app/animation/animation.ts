import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';
export let slide = trigger('slideAnimation',[
    transition(':enter',[
      query('.ani-slide', [
        style({opacity: 0, transform: 'translateY(-100px)'}),
        stagger(-30, [
          animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
        ])
      ], { optional: true })
    ])
  ])