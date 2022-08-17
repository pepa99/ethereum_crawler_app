import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class TransactionService {
 
  constructor(protected http: HttpClient) { }

  public async getTransactions(address:string,block:string){
    //console.log("1");
    return this.http.get("https://api.etherscan.io/api?module=account&action=txlist&address=" + address + "&startblock=" + block + "&endblock=&sort=asc&apikey=99G2CUFHFD8IIY3M5ER7VBT1BEI8J79RKB");
    
  }
  public async getTransactionsInternal(address:string,block:string){
    //console.log("1");
    return this.http.get("https://api.etherscan.io/api?module=account&action=txlistinternal&address=" + address + "&startblock=" + block + "&endblock=&sort=asc&apikey=99G2CUFHFD8IIY3M5ER7VBT1BEI8J79RKB");
    
  }
}
