export interface User {
  id: string;
  name: string;
  lastname: string;
  profit: number[];
  loss: number[];
  totalProfit?: number;
  totalLoss?: number;
  balance?: number;
}
