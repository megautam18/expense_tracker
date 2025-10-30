import { Tabs } from 'expo-router';
import { PlusCircle, PieChart, List, Moon, Sun } from 'lucide-react-native';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function TabLayout() {
  const { colors, toggleTheme, theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.text,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Add Expense',
          tabBarIcon: ({ size, color }) => <PlusCircle size={size} color={color} />,
          headerRight: () => (
            <TouchableOpacity onPress={toggleTheme} style={styles.headerButton}>
              {theme === 'light' ? (
                <Moon size={24} color={colors.text} />
              ) : (
                <Sun size={24} color={colors.text} />
              )}
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="monthly"
        options={{
          title: 'Monthly Overview',
          tabBarIcon: ({ size, color }) => <PieChart size={size} color={color} />,
          headerRight: () => (
            <TouchableOpacity onPress={toggleTheme} style={styles.headerButton}>
              {theme === 'light' ? (
                <Moon size={24} color={colors.text} />
              ) : (
                <Sun size={24} color={colors.text} />
              )}
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="all"
        options={{
          title: 'All Expenses',
          tabBarIcon: ({ size, color }) => <List size={size} color={color} />,
          headerRight: () => (
            <TouchableOpacity onPress={toggleTheme} style={styles.headerButton}>
              {theme === 'light' ? (
                <Moon size={24} color={colors.text} />
              ) : (
                <Sun size={24} color={colors.text} />
              )}
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    marginRight: 16,
  },
});
