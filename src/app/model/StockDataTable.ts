import {DataTable} from './DataTable';
import {StockDetail} from './StockDetail';

export interface StockDataTable extends DataTable{
  data:StockDetail[];
}
