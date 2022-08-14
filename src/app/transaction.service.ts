import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  public getTransactions(address:string){
    return this.http.get("https://api.etherscan.io/api?module=account&action=txlist&address="+address+"&startblock=9000000&endblock=9999999&sort=asc&apikey=YourApiKeyToken")
  }
}
