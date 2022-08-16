import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class TransactionService {
 
  constructor(protected http: HttpClient) { }

  public getTransactions(address:string,block:string){
    return this.http.get("https://api.etherscan.io/api?module=account&action=txlist&address="+address+"&startblock="+block+"&endblock=&sort=asc&apikey=YourApiKeyToken");
    
  }
}
