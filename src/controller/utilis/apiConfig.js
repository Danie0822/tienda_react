// apiConfig.js
class ApiConfig {
  constructor() {
    this.baseIP = "https://api-production-567e.up.railway.app";
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
