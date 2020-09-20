let url;

if (process.env.NODE_ENV === 'production') {
  url = 'https://loopout-backend.herokuapp.com/'
} else {
  url = 'http://localhost:5000/'
}

export default url