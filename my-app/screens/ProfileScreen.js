import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, Modal, Pressable, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
  { label: 'Prefer not to say', value: 'none' },
];

export default function ProfileScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const stored = await AsyncStorage.getItem('profile');
      if (stored) {
        const profile = JSON.parse(stored);
        setUsername(profile.username);
        setEmail(profile.email);
        setGender(profile.gender || '');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load profile');
    }
  };

  const saveProfile = async () => {
    if (!username || !email) {
      Alert.alert('Required fields', 'Please fill in both username and email');
      return;
    }

    try {
      const profile = { username, email, gender };
      await AsyncStorage.setItem('profile', JSON.stringify(profile));
      Alert.alert('Success', 'Profile saved successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile');
    }
  };

  const getGenderLabel = () => {
    const selected = genderOptions.find(opt => opt.value === gender);
    return selected ? selected.label : 'Select gender';
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your username"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Gender</Text>
        <TouchableOpacity 
          style={styles.genderSelector}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.genderText}>{getGenderLabel()}</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Gender</Text>
            {genderOptions.map((option) => (
              <Pressable
                key={option.value}
                style={({ pressed }) => [
                  styles.option,
                  pressed && styles.optionPressed,
                  gender === option.value && styles.optionSelected
                ]}
                onPress={() => {
                  setGender(option.value);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.optionText}>{option.label}</Text>
              </Pressable>
            ))}
            <Pressable
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.buttonContainer}>
        <Button
          title="Save Profile"
          onPress={saveProfile}
          color="#007AFF"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  genderSelector: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  genderText: {
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  option: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionPressed: {
    backgroundColor: '#f0f0f0',
  },
  optionSelected: {
    backgroundColor: '#e6f2ff',
  },
  optionText: {
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
});