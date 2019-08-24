import { Component, OnInit, AfterViewInit } from '@angular/core';




declare const $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, AfterViewInit {
 
  public ngOnInit() {
     
   
console.log('Dashboard mounted')
      
      

      

      
   }
   ngAfterViewInit() {
       
   }
}
