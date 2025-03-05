import React, { createContext, useContext, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define Equipment Type
export interface Equipment {
  id: string;
  name: string;
  imageUri?: string;
}

interface EquipmentContextType {
  equipmentList: Equipment[];
  addEquipment: (item: Equipment) => void;
}

// Create Context
const EquipmentContext = createContext<EquipmentContextType | undefined>(undefined);

// Provider Component
export const EquipmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);

  useEffect(() => {
    // Load saved equipment from AsyncStorage
    (async () => {
      const storedEquipment = await AsyncStorage.getItem('equipmentList');
      if (storedEquipment) setEquipmentList(JSON.parse(storedEquipment));
    })();
  }, []);

  const addEquipment = async (item: Equipment) => {
    const newList = [...equipmentList, item];
    setEquipmentList(newList);
    await AsyncStorage.setItem('equipmentList', JSON.stringify(newList));
  };

  return (
    <EquipmentContext.Provider value={{ equipmentList, addEquipment }}>
      <View style={{ flex: 1 }}>
        {typeof children === 'string' ? <Text>{children}</Text> : children} {/* ✅ Wraps text safely */}
      </View>
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
