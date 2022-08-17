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
  public async balance(date:string, address:string)
  {
    this.resourcesLoaded=true;
    console.log(this.transactions);
    let bal=0;
    let timeStamp = (dates: string) => Date.parse(dates)/1000;
    var num=10000;
    console.log(timeStamp(date));
    var block='0';
    var i=0;
    while(num==10000){ 
    await new Promise<void>(async (resolve, reject) =>(await this.service.getTransactions(address, block)).subscribe((res)=>{
      this.transactions=res;
      if(this.transactions.status=='1'){
      this.transactions.result.forEach((element: { from: string; value: string; timeStamp:string; isError:string}) => {
        if(timeStamp(date)>parseInt(element.timeStamp) && element.isError=='0'){
        if(element.from.toLowerCase()==address.toLowerCase()){
          bal-=parseInt(element.value);
        }else{
          bal+=parseInt(element.value);
        }}
      });
      num=this.transactions.result.length;
      block=this.transactions.result[num-1].blockNumber;
      resolve();
      }else{
        num=0;
        this.resourcesLoaded=false;
        window.alert(this.transactions.result);
        reject();
      }
      
    }));  
  }
  //console.log(this.bal);
  block='0';
  num=10000;
  while(num==10000){  
    console.log(bal);
    await new Promise<void>(async (resolve, reject) =>(await this.service.getTransactionsInternal(address, block)).subscribe((res)=>{
      this.transactions=res;
      if(this.transactions.status=='1'){
      this.transactions.result.forEach((element: { from: string; value: string; timeStamp:string; isError:string}) => {
        if(timeStamp(date)>parseInt(element.timeStamp) && element.isError=='0'){
        if(element.from.toLowerCase()==address.toLowerCase()){
          bal-=parseInt(element.value);
        }else{
          bal+=parseInt(element.value);
        }}
      });
      num=this.transactions.result.length;
      block=this.transactions.result[num-1].blockNumber;
      resolve();
      }else{
        num=0;
        this.resourcesLoaded=false;
        window.alert(this.transactions.result);
        reject();
      }
      
    }));  
  }
    this.resourcesLoaded=false;
    window.alert("ETH Balance at date "+date+" is "+bal/1000000000000000000+" Ether.");
  } 
}
