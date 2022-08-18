import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TransactionService } from '../transaction.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';



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
    protected service:TransactionService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  ngOnInit(): void {
  }
  public async balance(date:string, address:string)
  {
    console.log(this.data.dataKey);
    if(this.data.dataKey=='ETH'){
    this.resourcesLoaded=true;
    console.log(this.transactions);
    let bal=0;
    let timeStamp = (dates: string) => Date.parse(dates)/1000;
    var num=10000;
    console.log(timeStamp(date));
    var block='0';
    var i=0;
    while(num==10000){ 
    await new Promise<void>(async (resolve, reject) =>(await this.service.getTransactions('txlist',address, block)).subscribe((res)=>{
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
    await new Promise<void>(async (resolve, reject) =>(await this.service.getTransactions('txlistinternal',address, block)).subscribe((res)=>{
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
  else{
    let tokens=new Map<string,number>();
    this.resourcesLoaded=true;
    let bal=0;
    let timeStamp = (dates: string) => Date.parse(dates)/1000;
    var num=10000;
    console.log(timeStamp(date));
    var block='0';
    var i=0;
    while(num==10000){ 
    await new Promise<void>(async (resolve, reject) =>(await this.service.getTransactions(this.data.dataKey,address, block)).subscribe((res)=>{
      this.transactions=res;
      console.log(res);
      if(this.transactions.status=='1'){
      this.transactions.result.forEach((element: {tokenName: string; from: string; value: string; timeStamp:string; isError:string}) => {
        if(timeStamp(date)>parseInt(element.timeStamp)){

        if(element.from.toLowerCase()==address.toLowerCase()){
          console.log(element.tokenName);
          if(tokens.has(element.tokenName)){
          var ime=element.tokenName || "";  
          var broj=tokens.get(ime) || 0;
          tokens.set(element.tokenName,broj-parseInt(element.value)/1000000000000000000);
          }
          else{
            tokens.set(element.tokenName,-parseInt(element.value)/1000000000000000000);
          }
        }else{
          if(tokens.has(element.tokenName)){
            var ime=element.tokenName || "";  
            var broj=tokens.get(ime) || 0;
            tokens.set(element.tokenName,broj+parseInt(element.value)/1000000000000000000);
            }
            else{
              tokens.set(element.tokenName,parseInt(element.value)/1000000000000000000);
            }
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
  
  console.log(tokens);
  this.resourcesLoaded=false;
  var tokeni="";
  const iterator1 = tokens.keys();
  let token=iterator1.next().value;
  while(token!=null){
     
    tokeni+=token+" : "+tokens.get(token)+"\n";
    token=iterator1.next().value;
  }
  //var elem=document.getElementById("tokeni");
  //if(elem!=null){elem.innerHTML=tokeni;}  
  window.alert("Tokens and values are: \n"+tokeni);
  }
}


}
