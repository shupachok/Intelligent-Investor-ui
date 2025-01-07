import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {StockService} from './service/StockService';
import {StockDetail} from './model/StockDetail';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Intelligent-Investor-ui';
  destroyRef = inject(DestroyRef);
  rowPerPage:number = 20;
  pageNumber:number = 1;
  stockDatas:StockDetail[] = [];

  constructor(private stockService: StockService) { }

  ngOnInit() {
    const subscription: Subscription = this.stockService
                .getStockData({rowPerPage: this.rowPerPage,pageNumber:this.pageNumber})
                .subscribe(res => {
                  console.log(res);
                  this.stockDatas = res.data;
                  console.log(this.stockDatas);
                });

    this.destroyRef.onDestroy(()=>{
      subscription.unsubscribe();
    })
  }
}
