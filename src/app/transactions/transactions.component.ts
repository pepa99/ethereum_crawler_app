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
  public getTransactions(address:string, block:string){
    this.resourcesLoaded=true;
    this.service.getTransactions(address,block).subscribe((res)=>{
      this.transactions=res;
      if(this.transactions.status=='1'){
      this.length=this.transactions.result.length;
      this.dataSource.data=this.transactions.result.slice(this.pageIndex,this.pageIndex+this.pageSize);
      console.log(this.transactions);
      }
      else{
        window.alert(this.transactions.result);
      }
      this.resourcesLoaded=false;
      });
  }
  public updateTable(e:any){
    this.pageIndex=e.pageIndex;
    this.pageSize=e.pageSize;
    this.dataSource.data=this.transactions.result.slice(this.pageIndex*this.pageSize,(this.pageIndex+1)*this.pageSize);
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
