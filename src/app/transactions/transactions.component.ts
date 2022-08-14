import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements  OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  public transactions: any=[];
   length:number=0;
  public displayedColumns: string[]=["blockNumber","from","to","value"];
  public dataSource =new MatTableDataSource();
  pageIndex:number=0;
  pageSize:number=10;

  constructor(
    protected service:TransactionService,


  ) { }
  

  ngOnInit(): void {

  }
  public getTransactions(address:string){
    this.service.getTransactions(address).subscribe((res)=>{
      this.transactions=res;
      this.length=this.transactions.result.length;
      this.dataSource.data=this.transactions.result.slice(this.pageIndex,this.pageIndex+this.pageSize);
      console.log(this.transactions);
      });
  }
  public updateTable(e:any){
    this.pageIndex=e.pageIndex;
    this.pageSize=e.pageSize;
    this.dataSource.data=this.transactions.result.slice(this.pageIndex*this.pageSize,(this.pageIndex+1)*this.pageSize);
    console.log(this.dataSource.data);
  }

}
