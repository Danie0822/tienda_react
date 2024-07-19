// apiConfig.js
class ApiConfig {
  constructor() {
    this.baseIP = "http://192.168.137.1:4000";
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
