import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useEquipmentContext } from '../context/EquipmentContext';

export default function AddEquipmentScreen() {
  const [equipmentName, setEquipmentName] = useState('');
  const router = useRouter();
  const { addEquipment } = useEquipmentContext();

  const handleAdd = () => {
    if (equipmentName.trim() !== '') {
      addEquipment({ id: Date.now().toString(), name: equipmentName });
      router.push('/equipment/list'); // ✅ Redirects back to list
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Equipment</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter equipment name"
        value={equipmentName}
        onChangeText={setEquipmentName}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Add Equipment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#1D3D47',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
