import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StockDataTable} from '../model/StockDataTable';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiDataStockUrl = 'http://localhost:8080/api/v1/data/stock';

  constructor(private http: HttpClient) { }

  getStockData(filter: {rowPerPage: number, pageNumber: number,symbol: string}): Observable<StockDataTable> {

    return this.http.get<StockDataTable>(this.apiDataStockUrl, { params: filter });
  }
}
