import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newview',
  templateUrl: './newview.component.html',
  styleUrls: ['./newview.component.css']
})
export class NewviewComponent implements OnInit {
  state : string = "expanded";

  togglenav(){
    if (this.state == "expanded") {
        $('.sidebar').css('margin-left', '-180px');
        $('#main-wrapper').css('margin-left', '70px');
        this.state = "minimized";
    } else {
        if (this.state == "minimized") {
            $('.sidebar').css('margin-left', '0px');
            $('#main-wrapper').css('margin-left', '250px');

            this.state = "expanded";
        }
    }
  }
//Check if navbar is expanded or minimized and handle
  constructor() { }

  ngOnInit() {
  }

}
