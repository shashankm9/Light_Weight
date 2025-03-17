import React, { createContext, useContext, useState, useEffect } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchExercises, Exercise } from '../api/exerciseApi';

// Define Equipment Type
export interface Equipment {
  id: string;
  name: string;
  imageUri?: string;
}

interface EquipmentContextType {
  equipmentList: Equipment[];
  addEquipment: (item: Equipment) => void;
  removeEquipment: (id: string) => void; 
  exercises: Record<string, Exercise[]>;
}

// Create Context
const EquipmentContext = createContext<EquipmentContextType | undefined>(undefined);

// Provider Component
export const EquipmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [exercises, setExercises] = useState<Record<string, Exercise[]>>({});

  useEffect(() => {
    async function loadEquipment() {
      const storedEquipment = await AsyncStorage.getItem('equipmentList');
      if (storedEquipment) {
        setEquipmentList(JSON.parse(storedEquipment));
      }
    }
    loadEquipment();
  }, []);

  // Fetch exercises when equipment list changes
  useEffect(() => {
    async function loadExercises() {
      let exercisesData: Record<string, Exercise[]> = {};
      for (const equipment of equipmentList) {
        exercisesData[equipment.name] = await fetchExercises(equipment.name);
      }
      setExercises(exercisesData);
    }

    if (equipmentList.length > 0) {
      loadExercises();
    }
  }, [equipmentList]);

  const addEquipment = async (item: Equipment) => {
    const newList = [...equipmentList, item];
    setEquipmentList(newList);
    await AsyncStorage.setItem('equipmentList', JSON.stringify(newList));
  };

  const removeEquipment = async (id: string) => {
    const newList = equipmentList.filter((item) => item.id !== id);
    setEquipmentList(newList);
    await AsyncStorage.setItem('equipmentList', JSON.stringify(newList));
  };

  return (
    <EquipmentContext.Provider value={{ equipmentList, addEquipment, removeEquipment, exercises }}>
      <View style={{ flex: 1 }}>{children}</View>
    </EquipmentContext.Provider>
  );
};

// Custom Hook
export const useEquipmentContext = () => {
  const context = useContext(EquipmentContext);
  if (!context) {
    throw new Error('useEquipmentContext must be used within an EquipmentProvider');
  }
  return context;
};

export default EquipmentProvider; // ✅ Ensure default export is present