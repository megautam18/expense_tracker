import { supabase } from '../context/AuthContext';

export async function addExpense(expense: {
  amount: string;
  description: string;
  category: string;
  date: string;
}) {
  // include the authenticated user's id so RLS policies allow the insert
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
}

export async function getAllExpenses() {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .order('date', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getMonthlyExpenses() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString();

  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .gte('date', start)
    .lt('date', end)
    .order('date', { ascending: false });

  if (error) throw error;
  return data;
}
