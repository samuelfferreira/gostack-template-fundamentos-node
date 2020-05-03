import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDto {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, type, value}: RequestDto): Transaction {

    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();
      if (value > balance.total)
        throw new Error('Value not allowed');
    }

    const response = this.transactionsRepository.create({
      title: title,
      type: type,
      value: value
    });
    return response;
  }
}

export default CreateTransactionService;
