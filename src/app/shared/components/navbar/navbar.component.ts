import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InstructionsComponent } from 'src/app/components/instructions/instructions.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(InstructionsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
