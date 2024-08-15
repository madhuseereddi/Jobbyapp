import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Header extends Component {
  logOut = () => {
    const {history} = this.props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }

  render() {
    return (
      <nav className="navbar">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
        <div className="menu-navbar">
          <Link to="/" className="link1">
            <p className="home">Home</p>
          </Link>
          <Link to="/jobs" className="link1">
            <p className="jobs">Jobs</p>
          </Link>
        </div>

        <button type="button" className="logout-btn" onClick={this.logOut}>
          Logout
        </button>
      </nav>
    )
  }
}

export default withRouter(Header)
