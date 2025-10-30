import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useTheme } from '../context/ThemeContext';

interface CategoryTotal {
  name: string;
  total: number;
  color: string;
}

interface PieChartViewProps {
  categoryTotals: CategoryTotal[];
  totalAmount: number;
}

export default function PieChartView({ categoryTotals, totalAmount }: PieChartViewProps) {
  const { colors, theme } = useTheme();

  const chartData = categoryTotals.map((cat) => ({
    name: cat.name,
    population: cat.total,
    color: cat.color,
    legendFontColor: colors.text,
    legendFontSize: 14,
  }));

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      marginVertical: 20,
    },
    totalContainer: {
      alignItems: 'center',
      marginBottom: 24,
    },
    totalLabel: {
      fontSize: 16,
      color: colors.textSecondary,
      marginBottom: 4,
    },
    totalAmount: {
      fontSize: 36,
      fontWeight: '700',
      color: colors.text,
    },
    emptyText: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: 40,
    },
  });

  if (categoryTotals.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No expenses for this month</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total Spent This Month</Text>
        <Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>
      </View>
      <PieChart
        data={chartData}
        width={Dimensions.get('window').width - 40}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          backgroundColor: colors.background,
          backgroundGradientFrom: colors.background,
          backgroundGradientTo: colors.background,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
}
