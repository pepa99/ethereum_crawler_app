import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-balance-dialog',
  templateUrl: './balance-dialog.component.html',
  styleUrls: ['./balance-dialog.component.scss']
})
export class BalanceDialogComponent implements OnInit {
  public transactions: any=[];
  constructor(
    public dialogRef: MatDialogRef<BalanceDialogComponent>,
    public dialog: MatDialog,
    protected service:TransactionService

  ) { }

  ngOnInit(): void {
  }
  public balance(date:string, address:string)
  {
    let bal=0;
    let timeStamp = (date: string) => Date.parse(date);
    console.log(timeStamp(date));
    this.service.getTransactions(address,'9000000').subscribe((res)=>{
      console.log("here");
      this.transactions=res;
      this.transactions.result.forEach((element: { from: string; value: string; timeStamp:string; isError:string}) => {
        if(timeStamp(date)>parseInt(element.timeStamp) && element.isError=='0'){
        if(element.from==address){
          bal-=parseInt(element.value);
        }else{
          bal+=parseInt(element.value);
        }}
      });
      window.alert(bal);
    });  
    
  } 
}
