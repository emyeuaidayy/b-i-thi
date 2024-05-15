import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StudentInfoScreen = ({ route, navigation }) => {
  const { studentId, studentCode } = route.params;
  const [studentInfo, setStudentInfo] = useState(null);

  useEffect(() => {
    fetchStudentInfo();
  }, []);

  const fetchStudentInfo = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
  
      if (!token) {
        console.error('Token is empty or null');
        return;
      }
  
      const response = await fetch(`http://demo-api.stecom.vn:8888/api/student/get-student-by-id/${studentCode}?id=${studentId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch student info');
      }
  
      const responseData = await response.text();
  
      // Kiểm tra nếu dữ liệu trả về không rỗng
      if (!responseData) {
        throw new Error('Empty response data');
      }
  
      // Parse JSON từ dữ liệu trả về
      const studentInfo = JSON.parse(responseData);
      setStudentInfo(studentInfo);
    } catch (error) {
      console.error('Error fetching student info:', error);
    }
  };
  

  const handleDeleteStudent = async () => {
    Alert.alert(
      'Xóa sinh viên',
      'Bạn có chắc chắn muốn xóa sinh viên này?',
      [
        { text: 'Hủy', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Xóa', onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('token');

            if (!token) {
              console.error('Token is empty or null');
              return;
            }

            const response = await fetch(`http://demo-api.stecom.vn:8888/api/student/delete/${studentId}`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });

            if (!response.ok) {
              throw new Error('Failed to delete student');
            }

            // Quay lại màn hình danh sách sinh viên sau khi xóa thành công
            navigation.goBack();
          } catch (error) {
            console.error('Error deleting student:', error);
          }
        }},
      ],
      { cancelable: false }
    );
  };

  if (!studentInfo) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin sinh viên</Text>
      <Text>Name: {studentInfo.name}</Text>
      <Text>Student Code: {studentInfo.studentCode}</Text>
      <Text>Email: {studentInfo.email}</Text>
      {/* Thêm các thông tin sinh viên khác nếu cần */}
      <TouchableOpacity onPress={handleDeleteStudent}>
        <Text style={styles.deleteText}>Xóa sinh viên</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  deleteText: {
    color: 'red',
    fontSize: 18,
    marginTop: 16,
  },
});

export default StudentInfoScreen;
