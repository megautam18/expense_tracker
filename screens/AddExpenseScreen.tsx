import React from 'react';
import { View, StyleSheet } from 'react-native';
import ExpenseForm from '../components/ExpenseForm';
import { useTheme } from '../context/ThemeContext';
import { useExpenses } from '../context/ExpenseContext';
import { addExpense } from '../utils/api';

export default function AddExpenseScreen() {
  const { colors } = useTheme();
  const { triggerRefresh } = useExpenses();

  const handleSubmit = async (expense: {
    amount: string;
    description: string;
    category: string;
    date: string;
  }) => {
    await addExpense(expense);
    triggerRefresh();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
  });

  return (
    <View style={styles.container}>
      <ExpenseForm onSubmit={handleSubmit} />
    </View>
  );
}
