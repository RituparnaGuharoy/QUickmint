import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-routing-check',
  templateUrl: './routing-check.component.html',
  styleUrls: ['./routing-check.component.css']
})
export class RoutingCheckComponent implements OnInit {
  userType = localStorage.getItem('userType')

  constructor(
    public router: Router

  ) { }

  ngOnInit(): void {
console.log(this.userType)
this.route()

}

route() {
  console.log("route called")
  if (this.userType == '1') {
  //console.log("if this.userType == 1 result: ", this.userType == "1")
    this.router.navigate(['provider-dashboard'])     }
  else if (this.userType != '1') {
   // console.log("else this.userType == 1 result: ", this.userType == "1")

       this.router.navigate(['home'])
     }
}


}
