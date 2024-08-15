import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <div>
    <Header />
    <div className="Home-full-bg">
      <h1 className="home-h1">
        Find The Job That <br />
        Fits Your Life
      </h1>
      <p className="home-p1">
        Millions of people are searching for jobs,salary <br />
        information,compeny reviews.Find the job that fits <br />
        abilities and potentials
      </p>
      <Link to="/jobs" className="link1">
        <button type="button" className="findjob-btn">
          Find Job
        </button>
      </Link>
    </div>
  </div>
)

export default Home
