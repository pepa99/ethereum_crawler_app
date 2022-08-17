import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BalanceDialogComponent } from '../balance-dialog/balance-dialog.component';
import { expand } from 'rxjs';
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
  public displayedColumns: string[]=["blockNumber","from","to","value"];
  public dataSource =new MatTableDataSource();
  pageIndex:number=0;
  pageSize:number=10;
  
  constructor(
    protected service:TransactionService,
    public dialog:MatDialog


  ) { }
 
  ngOnInit(): void {

  }
  public async getTransactions(address:string, block:string){
    this.all_transactions=[];
    this.length=0;
    this.resourcesLoaded=true;
    var num=10000;
    var suma=0;
    var i=0;
    while(num==10000){
      console.log(i);
    await new Promise<void>(async (resolve, reject) => (await this.service.getTransactions(address, block)).subscribe((res) => {
      this.transactions = res;
      try{
      if (this.transactions.status == '1') {
        this.all_transactions.push(...this.transactions.result);
        this.length += this.transactions.result.length;
        num=this.transactions.result.length;
        block=this.transactions.result[num-1].blockNumber;
        try{
        resolve();
        }catch(e){
          reject();
        }
      }
      else {
        window.alert(this.transactions.result);
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
  this.dataSource.data = this.all_transactions.slice(this.pageIndex, this.pageIndex + this.pageSize);
  }
  
  public updateTable(e:any){
    this.pageIndex=e.pageIndex;
    this.pageSize=e.pageSize;
    this.dataSource.data=this.all_transactions.slice(this.pageIndex*this.pageSize,(this.pageIndex+1)*this.pageSize);
    console.log(this.dataSource.data);
  }    

  public checkBalance(){
    const dialogRef = this.dialog.open(BalanceDialogComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe(result => {
    
    }); 
  }
}
