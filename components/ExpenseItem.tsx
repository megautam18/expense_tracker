import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Expense } from '../context/ExpenseContext';

interface ExpenseItemProps {
  expense: Expense;
}

export default function ExpenseItem({ expense }: ExpenseItemProps) {
  const { colors } = useTheme();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatAmount = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Food: '#FF6B6B',
      Transport: '#4ECDC4',
      Entertainment: '#95E1D3',
      Shopping: '#F38181',
      Bills: '#AA96DA',
      Health: '#FCBAD3',
      Other: '#A8E6CF',
    };
    return colors[category] || '#A8E6CF';
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    amount: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
    },
    categoryBadge: {
      paddingVertical: 4,
      paddingHorizontal: 12,
      borderRadius: 12,
    },
    categoryText: {
      fontSize: 12,
      fontWeight: '600',
      color: '#ffffff',
    },
    description: {
      fontSize: 16,
      color: colors.text,
      marginBottom: 4,
    },
    date: {
      fontSize: 14,
      color: colors.textSecondary,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.amount}>{formatAmount(expense.amount)}</Text>
        <View
          style={[
            styles.categoryBadge,
            { backgroundColor: getCategoryColor(expense.category) },
          ]}
        >
          <Text style={styles.categoryText}>{expense.category}</Text>
        </View>
      </View>
      <Text style={styles.description}>{expense.description}</Text>
      <Text style={styles.date}>{formatDate(expense.date)}</Text>
    </View>
  );
}
