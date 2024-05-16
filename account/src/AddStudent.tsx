import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const AddStudentScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [studentCode, setStudentCode] = useState('');

  const handleSave = async () => {
    // Kiểm tra điều kiện cho dữ liệu nhập vào
    if (!name || !dateOfBirth || !studentCode) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin.');
      return;
    }
  
    // Chuyển đổi định dạng ngày sinh từ chuỗi sang đối tượng Date
    const dob = new Date(dateOfBirth);
  
    // Kiểm tra xem ngày sinh có hợp lệ không
    if (isNaN(dob.getTime())) {
      Alert.alert('Lỗi', 'Ngày sinh không hợp lệ.');
      return;
    }
  
    // Gọi API để lưu thông tin sinh viên
    try {
      const response = await fetch('http://demo-api.stecom.vn:8888/api/student/create-student', {
        method: 'POST', // Sử dụng method POST thay vì GET
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          dateOfBirth: dob.toISOString(), // Chuyển đổi ngày sinh thành chuỗi ISO
          studentCode: studentCode,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create student');
      }
  
      navigation.goBack();
    } catch (error) {
      console.error('Lỗi khi lưu thông tin sinh viên:', error);
      Alert.alert('Lỗi', 'Đã có lỗi xảy ra khi lưu thông tin sinh viên.');
    }

  
  };
  

  const handleCancel = () => {
    // Hiển thị cửa sổ xác nhận khi người dùng nhấn "Hủy bỏ"
    Alert.alert(
      'Xác nhận',
      'Bạn có muốn hủy thêm mới sinh viên?',
      [
        {
          text: 'Không',
          style: 'cancel',
        },
        {
          text: 'Có',
          onPress: () => navigation.goBack(),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên sinh viên:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Ngày sinh:</Text>
      <TextInput style={styles.input} value={dateOfBirth} onChangeText={setDateOfBirth} />

      <Text style={styles.label}>MSSV:</Text>
      <TextInput style={styles.input} value={studentCode} onChangeText={setStudentCode} />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Lưu lại</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
        <Text style={styles.buttonText}>Hủy bỏ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#dc3545',
  },
});

export default AddStudentScreen;
