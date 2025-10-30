import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Text } from 'react-native';
import PieChartView from '../components/PieChartView';
import { useTheme } from '../context/ThemeContext';
import { useExpenses } from '../context/ExpenseContext';
import { getMonthlyExpenses } from '../utils/api';
import { Expense } from '../context/ExpenseContext';

const categoryColors: { [key: string]: string } = {
  Food: '#FF6B6B',
  Transport: '#4ECDC4',
  Entertainment: '#95E1D3',
  Shopping: '#F38181',
  Bills: '#AA96DA',
  Health: '#FCBAD3',
  Other: '#A8E6CF',
};

export default function MonthlyOverviewScreen() {
  const { colors } = useTheme();
  const { refreshExpenses } = useExpenses();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMonthlyExpenses();
  }, [refreshExpenses]);

  const fetchMonthlyExpenses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMonthlyExpenses();
      setExpenses(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  const calculateCategoryTotals = () => {
    const totals: { [key: string]: number } = {};

    expenses.forEach((expense) => {
      if (!totals[expense.category]) {
        totals[expense.category] = 0;
      }
      totals[expense.category] += expense.amount;
    });

    return Object.entries(totals).map(([name, total]) => ({
      name,
      total,
      color: categoryColors[name] || '#A8E6CF',
    }));
  };

  const calculateTotalAmount = () => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
      padding: 20,
    },
    errorText: {
      fontSize: 16,
      color: colors.error,
      textAlign: 'center',
    },
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <PieChartView
        categoryTotals={calculateCategoryTotals()}
        totalAmount={calculateTotalAmount()}
      />
    </ScrollView>
  );
}
