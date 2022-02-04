import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
@Component({
  selector: 'app-about-new',
  templateUrl: './about-new.component.html',
  styleUrls: ['./about-new.component.css']
})
export class AboutNewComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0)
  }

  openRegisterDialog(){
    const dialogRef = this.dialog.open(RegisterComponent, { width: '950px' });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result`);
    });
  }

}
