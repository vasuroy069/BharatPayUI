import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  // ngOnInit()
  // {
  //  var ss=Observable.fromEvent(document,'mousemove');
  //  ss.subscribe(
  //    function(next)
  //    {  
  //      console.log(next);
  //    },
  //     function(err)
  //     {
  //       console.log(err);
  //     }
  //     ,
  //     function()
  //     {
  //       console.log("oncompleted");
  //     }
  //  )
  // }
}
