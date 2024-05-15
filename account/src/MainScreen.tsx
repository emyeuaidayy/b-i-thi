import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const JobInfoBox = ({ navigation }) => {

  
  const [jobList, setJobList] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const fetchData = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        console.error('Token is empty or null');
        return;
      }

      const response = await fetch('http://demo-api.stecom.vn:8888/api/student/get-all', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch job info');
      }

      const responseData = await response.json();
      console.log(responseData);

      if (responseData.items && Array.isArray(responseData.items)) {
        setJobList(responseData.items);
      } else {
        console.error('Received invalid job data:', responseData);
      }
    } catch (error) {
      console.error('Error fetching job info:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        console.error('Token is empty or null');
        return;
      }

      const [id, studentCode] = searchInput.split(',');

      const response = await fetch(`http://demo-api.stecom.vn:8888/api/student/get-student-by-id/${id}?id=${studentCode}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch job info');
      }

      const responseData = await response.json();
      console.log(responseData);

      const updatedJobList = Array.isArray(responseData) ? responseData : [responseData];

      setJobList(updatedJobList);
    } catch (error) {
      console.error('Error fetching job info:', error);
    }
  
  };

  const showStudentInfo = (id, studentCode) => {
    navigation.navigate('StudentInfo', { studentId: id, studentCode: studentCode });
  };

  const handleAddSV = () => {
    navigation.navigate('AddStudent');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => showStudentInfo(item.id, item.studentCode)}>
      <View style={styles.jobContainer}>
        <Text style={styles.jobName}>{item.name}</Text>
        <Text style={styles.studentCode}>MSSV: {item.studentCode}</Text>
        <Text style={styles.email}>Email: {item.email}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Danh sách sinh viên</Text>
        <View style={styles.addSV}>
        <TouchableOpacity onPress={handleAddSV}>
         
            <Text style={styles.addSVfont}> + </Text>
          
        </TouchableOpacity>
        </View>

      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchInput}
          onChangeText={(text) => setSearchInput(text)}
          placeholder="Nhập ID và Student Code (cách nhau bởi dấu phẩy)"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Tìm kiếm</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={jobList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  addSV: {
    left: 80,
  },
  addSVfont: {
    fontSize: 25,
  },
  header: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchButton: {
    marginLeft: 8,
    backgroundColor: '#007bff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  searchButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  jobContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  jobName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  studentCode: {
    fontSize: 16,
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    marginBottom: 8,
  },
  flatList: {
    flex: 1,
  },
});

export default JobInfoBox;
