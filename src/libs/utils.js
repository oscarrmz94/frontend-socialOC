export default {
  getUserData() {
    return JSON.parse(localStorage.getItem('user_data'))
  }
} 
