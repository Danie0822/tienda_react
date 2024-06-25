// apiConfig.js
class ApiConfig {
    constructor() {
      this.baseURL = "http://192.168.58.100:4000/api";
    }
  
    getBaseURL() {
      return this.baseURL;
    }
  
    
  }
  
  const apiConfig = new ApiConfig();
  export default apiConfig;
  