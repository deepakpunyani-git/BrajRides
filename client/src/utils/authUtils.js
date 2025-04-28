
export const isAdminAuthenticated = () => {
    const token = localStorage.getItem('adminToken');
    const userType = localStorage.getItem('userType'); 
  
    if (!token || (userType !== 'admin' && userType !== 'staff')) {
      return false;
    }
  
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      return false;
    }
  
    try {
      const payload = JSON.parse(atob(tokenParts[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch (error) {
      return false;
    }
  };
  

  export const isUserAuthenticated = () => {
    const token = localStorage.getItem('userToken');
    const userType = localStorage.getItem('userType'); 
  
    if (!token || userType !== 'user') {
      return false;
    }
  
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      return false;
    }
  
    try {
      const payload = JSON.parse(atob(tokenParts[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch (error) {
      return false;
    }
  };