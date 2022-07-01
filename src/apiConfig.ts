type ApiUrl = '' | 'http://localhost:8000'

let apiUrl: ApiUrl

if (window.location.hostname === 'localhost') {
  apiUrl = ''
} else {
  apiUrl = 'http://localhost:8000'
}

export default apiUrl 