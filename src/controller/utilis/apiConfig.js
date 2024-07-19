import AsyncStorage from '@react-native-async-storage/async-storage';

class ApiConfig {
  constructor() {
    this.baseIP = "http://192.168.58.1:4000"; 
    this.init(); 
  }

  async init() {
    try {
      const ipAddress = await AsyncStorage.getItem('ipAddress');
      if (ipAddress) {
        this.baseIP = `http://${ipAddress}:4000`;
      }
    } catch (error) {
      console.error("Error al obtener la IP desde AsyncStorage:", error);
    }
  }

  getBaseURL() {
    return `${this.baseIP}/api`;
  }

  getBaseURL2() {
    return `${this.baseIP}/`;
  }
}

const apiConfig = new ApiConfig();
export default apiConfig;
