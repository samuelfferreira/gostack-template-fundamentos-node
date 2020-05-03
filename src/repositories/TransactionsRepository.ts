import Transaction from '../models/Transaction';
import {EnumScope} from "@typescript-eslint/parser/dist/scope/scopes";

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDto {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {

    let income = 0;
    let outcome = 0;

    for (let i = 0; i < this.transactions.length; i++) {
      if (this.transactions[i].type === 'income') {
        income += this.transactions[i].value;
      } else {
        outcome += this.transactions[i].value;
      }
    }


    return {income, outcome, total: (income - outcome)};
  }

  public create({title, type, value}: CreateTransactionDto): Transaction {
    const transaction = new Transaction({value: value, type: type, title: title});
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
