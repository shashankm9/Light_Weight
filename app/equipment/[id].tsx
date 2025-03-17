import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function EquipmentDetailScreen() {
  const { id } = useLocalSearchParams(); // ✅ Get ID from URL params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Equipment Details</Text>
      <Text style={styles.idText}>Equipment ID: {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  idText: {
    fontSize: 16,
    color: 'gray',
  },
});
