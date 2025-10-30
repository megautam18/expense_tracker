import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  user_id?: string;
  created_at?: string;
}

interface ExpenseContextType {
  expenses: Expense[];
  setExpenses: (expenses: Expense[]) => void;
  addExpense: (expense: Expense) => void;
  refreshExpenses: boolean;
  triggerRefresh: () => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [refreshExpenses, setRefreshExpenses] = useState(false);

  const addExpense = (expense: Expense) => {
    setExpenses((prev) => [expense, ...prev]);
  };

  const triggerRefresh = () => {
    setRefreshExpenses((prev) => !prev);
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        setExpenses,
        addExpense,
        refreshExpenses,
        triggerRefresh,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
}
