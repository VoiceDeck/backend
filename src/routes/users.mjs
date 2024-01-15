import * as userControl from '../controllers/users.mjs' 
export default ({ app }) => {
    app.post('/signup', (req, res) => {
      userControl.signup(req, res)
    })
    app.post('/login', (req, res) => {
      userControl.login(req, res)
    })
    // protect this route, login is required to see profile
    app.get('/profile', (req, res) => {
      userControl.profile(req, res)
    })
  }