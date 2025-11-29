import { supabase } from '../context/AuthContext';

export interface Expense {
  id?: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  user_id?: string;
  created_at?: string;
}

export async function addExpense(expense: {
  amount: number;
  description: string;
  category: string;
  date: string;
}): Promise<any> {
  try {
    const session = await supabase.auth.getSession();
    const userId = session.data.session?.user?.id;

    if (!userId) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('expenses')
      .insert([
        {
          amount: expense.amount,
          description: expense.description,
          category: expense.category,
          date: expense.date,
          user_id: userId,
        },
      ])
      .select();

    if (error) throw error;
    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to add expense');
  }
}

export async function getAllExpenses(): Promise<Expense[]> {
  try {
    const session = await supabase.auth.getSession();
    const userId = session.data.session?.user?.id;

    if (!userId) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch expenses');
  }
}

export async function getMonthlyExpenses(): Promise<Expense[]> {
  try {
    const session = await supabase.auth.getSession();
    const userId = session.data.session?.user?.id;

    if (!userId) throw new Error('Not authenticated');

    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString();

    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('user_id', userId)
      .gte('date', start)
      .lt('date', end)
      .order('date', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch monthly expenses');
  }
}
