import { useEffect, useState } from 'react';
import {  } from '@/api/hr';
import toast from 'react-hot-toast';
import { TOAST_DURATION } from '@/config/toast';
import { duration } from '@mui/material';


export function useSettings(getSettings, updateSettings) {
  const [userData, setUserData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [updateUser, setUpdateUser] = useState({});
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [loading, setLoading] = useState(true);

  const madeChanges = JSON.stringify(userData) !== JSON.stringify(originalData);

  const startEditing = (field, value) => {
    setEditingField(field);
    setTempValue(value);
  };

  const cancelEditing = () => {
    setEditingField(null);
    setTempValue('');
  };

  const saveEditing = () => {
  let valueToSave = tempValue;

  if (editingField === 'date_of_birth') {
    valueToSave = tempValue ? dayjs(tempValue).format('YYYY-MM-DD') : '';
  }

  setUserData((prev) => ({ ...prev, [editingField]: valueToSave }));
  setUpdateUser((prev) => ({ ...prev, [editingField]: valueToSave }));
  cancelEditing();
};


  const updateField = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
    setUpdateUser((prev) => ({ ...prev, [field]: value }));
  };

  const cancelAll = () => {
    setUserData(originalData);
    setUpdateUser({});
    cancelEditing();
  };

  const confirmChanges = async () => {
    try {
      const filteredUpdate = Object.fromEntries(
        Object.entries(updateUser).filter(([_, value]) => value !== '')
      );
      await updateSettings(filteredUpdate);
      setOriginalData({ ...userData });
      setUpdateUser({});
      window.location.reload()
      toast.success('Settings updated successfully!', { autoClose: TOAST_DURATION.SHORT });
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSettings();
        setUserData(data.data);
        setOriginalData(data.data);
      } catch (error) {
        console.error('Failed to fetch user settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return {
    userData,
    editingField,
    tempValue,
    madeChanges,
    loading,
    startEditing,
    setUserData,
    cancelEditing,
    saveEditing,
    setTempValue,
    updateField,
    cancelAll,
    confirmChanges,
  };
}
