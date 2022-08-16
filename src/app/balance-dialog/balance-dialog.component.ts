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
  resourcesLoaded:boolean=false;

  constructor(
    public dialogRef: MatDialogRef<BalanceDialogComponent>,
    public dialog: MatDialog,
    protected service:TransactionService

  ) { }

  ngOnInit(): void {
  }
  public balance(date:string, address:string)
  {
    this.resourcesLoaded=true;
    let bal=0;
    let timeStamp = (date: string) => Date.parse(date);
    console.log(timeStamp(date));
    this.service.getTransactions(address,'9000000').subscribe((res)=>{
      console.log("here");
      this.transactions=res;
      if(this.transactions.result=='1'){
      this.transactions.result.forEach((element: { from: string; value: string; timeStamp:string; isError:string}) => {
        if(timeStamp(date)>parseInt(element.timeStamp) && element.isError=='0'){
        if(element.from==address){
          bal-=parseInt(element.value);
        }else{
          bal+=parseInt(element.value);
        }}
      });
      window.alert(bal);
      }else{
        window.alert(this.transactions.result);
      }
      this.resourcesLoaded=false;
    });  
    
  } 
}
