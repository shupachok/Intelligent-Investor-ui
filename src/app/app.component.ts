import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {StockService} from './service/StockService';
import {StockDetail} from './model/StockDetail';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
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
                .getStockData({rowPerPage: this.rowPerPage,pageNumber:this.pageNumber,symbol:''})
                .subscribe(res => {
                  this.stockDatas = res.data;
                });

    this.destroyRef.onDestroy(()=>{
      subscription.unsubscribe();
    })
  }

  searchStockDetail(searchSymbol: string) {
    console.log("----------searchStockDetail-----------");
    this.stockService
      .getStockData({rowPerPage: this.rowPerPage,pageNumber:this.pageNumber,symbol:searchSymbol})
      .subscribe(res => {
        this.stockDatas = res.data;
      });
  }
}
