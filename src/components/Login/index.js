import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMessage: '', isLoading: false}

  onSuccessSubmit = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  getLoginDetails = async () => {
    const url = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }
    this.setState({isLoading: true})
    const response = await fetch(url, options)

    const data = await response.json()
    if (response.ok) {
      this.onSuccessSubmit(data.jwt_token)
    } else {
      this.setState({errorMessage: data.error_msg})
    }
    this.setState({isLoading: false})
  }

  setUsername = event => {
    this.setState({username: event.target.value})
  }

  setPassword = event => {
    this.setState({password: event.target.value})
  }

  submitForm = event => {
    event.preventDefault()
    this.getLoginDetails()
  }

  render() {
    const {isLoading, errorMessage} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div>
        {isLoading ? (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        ) : (
          <div className="login-full-bg">
            <form className="login-card" onSubmit={this.submitForm}>
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
                className="login-website-logo"
              />
              <div className="input-bar">
                <label htmlFor="username" className="label1">
                  USERNAME
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  className="input1"
                  onChange={this.setUsername}
                />
              </div>
              <div className="input-bar">
                <label htmlFor="password" className="label1">
                  PASSWORD
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  className="input1"
                  onChange={this.setPassword}
                />
              </div>
              <div>
                <button type="submit" className="login-btn">
                  Login
                </button>
                {errorMessage !== '' && (
                  <p className="login-error">{errorMessage}</p>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    )
  }
}

export default Login
