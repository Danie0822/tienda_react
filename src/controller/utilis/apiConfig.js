// apiConfig.js
class ApiConfig {
    constructor() {
      this.baseURL = "http://192.168.58.102:4000/api";
      this.baseURL2 = "http://192.168.58.102:4000/";
    }
  
    getBaseURL() {
      return this.baseURL;
    }

    getBaseURL2() {
      return this.baseURL2;
    }
  
    
  }
  
  const apiConfig = new ApiConfig();
  export default apiConfig;
  