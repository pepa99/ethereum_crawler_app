import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BalanceDialogComponent } from '../balance-dialog/balance-dialog.component';
import { expand } from 'rxjs';
import { DOCUMENT } from '@angular/common'; 

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements  OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  public transactions: any=[];
  public all_transactions:any=[];
  resourcesLoaded:boolean=false;
   length:number=0;
  public displayedColumns: string[]=["blockNumber","from","to","value","tokenName"];
  public dataSource =new MatTableDataSource();
  pageIndex:number=0;
  pageSize:number=10;
  
  constructor(
    protected service:TransactionService,
    public dialog:MatDialog


  ) { }
 
  ngOnInit(): void {

  }
  public async getTransactions(heading:string,action:string,address:string, block:string){
    var elem=document.getElementById("kind");
    if(elem!=null){elem.innerHTML=heading;}
    this.all_transactions=[];
    this.length=0;
    this.resourcesLoaded=true;
    var num=10000;
    var suma=0;
    var i=0;
    while(num==10000){
      console.log(i);
    await new Promise<void>(async (resolve, reject) => (await this.service.getTransactions(action,address, block)).subscribe((res) => {
      this.transactions = res;
      console.log(res);
      try{
      if (this.transactions.status == '1') {
        this.all_transactions.push(...this.transactions.result);
        this.length += this.transactions.result.length;
        num=this.transactions.result.length;
        block=this.transactions.result[num-1].blockNumber;
        this.transactions.result.forEach((element: { value: string; }) => {
          var eth=parseInt(element.value)/1000000000000000000;
          element.value=eth.toString();
        });
        if(i==0){
          this.dataSource.data = this.all_transactions.slice(this.pageIndex, this.pageIndex + this.pageSize);
        }
        try{
        resolve();
        }catch(e){
          reject();
        }
      }
      else {
        if(this.transactions.result==null || this.transactions.result.length==0){
        window.alert(this.transactions.message);
        this.dataSource.data=this.all_transactions.slice(this.pageIndex, this.pageIndex + this.pageSize);
        }
        else
        {
          window.alert(this.transactions.result);
        }
        console.log(this.transactions);
        this.resourcesLoaded = false;
        num=0;
        reject();
      }
    }catch(e){
      reject();
    }
      
    }));
    i+=1
  }
  this.resourcesLoaded = false;
  console.log(this.all_transactions);
  
  }
  
  public updateTable(e:any){
    this.pageIndex=e.pageIndex;
    this.pageSize=e.pageSize;
    this.dataSource.data=this.all_transactions.slice(this.pageIndex*this.pageSize,(this.pageIndex+1)*this.pageSize);
    console.log(this.dataSource.data);
  }    

  public checkBalance(yourData:string){
    const dialogRef = this.dialog.open(BalanceDialogComponent, {
      width: '450px',
      data: {
        dataKey: yourData
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    
    }); 
  }
}
