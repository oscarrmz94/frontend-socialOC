export default {
  getUserData() {
    if (localStorage.getItem('user_data')) {
      return JSON.parse(localStorage.getItem('user_data'))
    } else {
      return ''
    }
  },
  isVideo(src) {
    if (src.split('.')[3] === 'mp4')
      return true
  }
} 
