import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaStar} from 'react-icons/fa'
import {FaEnvelope, FaMapMarkerAlt} from 'react-icons/fa'
import {RiShareBoxLine} from 'react-icons/ri'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'

class JobDetails extends Component {
  state = {
    jobDetail: {},
    isError: false,
    isLoading: false,
    similarJobs: [], // Initialize similarJobs as an empty array
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    this.setState({isLoading: true})

    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        this.setState({
          jobDetail: data.job_details,
          similarJobs: data.similar_jobs || [], // Fallback to an empty array if similar_jobs is not available
          isLoading: false,
        })
      } else {
        this.setState({isError: true, isLoading: false})
      }
    } catch (error) {
      // Handle fetch error
      this.setState({isError: true, isLoading: false})
    }
  }

  SkillsFun = eachItem => {
    const {name, image_url: imageUrl} = eachItem

    return (
      <li className="skill-item" key={name}>
        <img src={imageUrl} alt={name} className="skill-image" />
        <p className="skill-name">{name}</p>
      </li>
    )
  }

  render() {
    const {jobDetail, isLoading, isError, similarJobs} = this.state

    const {
      company_logo_url: companyLogoUrl = '',
      company_website_url: companyWebsiteUrl = '',
      employment_type: employmentType = '',
      job_description: jobDescription = '',
      location = '',
      life_at_company: lifeAtCompany = {},
      package_per_annum: packagePerAnnum = '',
      rating = '',
      skills = [],
      title = '',
    } = jobDetail

    const {description = '', image_url: imageUrl = ''} = lifeAtCompany

    if (isError) {
      return (
        <div className="pageNot">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="notfound"
          />
        </div>
      )
    }

    return isLoading ? (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    ) : (
      <div className="jobDetail-fg">
        <div className="header">
          <Header />
        </div>
        <div className="jobDetail-fb">
          <div className="full-card full-card11">
            <div className="inner-full-card">
              <img src={companyLogoUrl} alt={title} className="company-logo1" />
              <div className="card-in-1">
                <p className="para11">{title}</p>
                <div className="rating11">
                  <FaStar className="star1" />
                  <p className="rating">{rating}</p>
                </div>
              </div>
            </div>
            <div className="full-1">
              <div className="full-12">
                <div className="full-11">
                  <FaMapMarkerAlt className="logo-c" />
                  <p className="pp1">{location}</p>
                </div>
                <div className="full-11">
                  <FaEnvelope className="logo-c" />
                  <p className="pp1">{employmentType}</p>
                </div>
              </div>
              <p className="salary">{packagePerAnnum}</p>
            </div>
            <hr className="hr" />
            <div>
              <div className="dis">
                <p className="p122">Description</p>
                <a href={companyWebsiteUrl} className="link1">
                  <button className="visit-btn">
                    <p>Visit</p>
                    <RiShareBoxLine />
                  </button>
                </a>
              </div>
              <p className="p1234">{jobDescription}</p>
            </div>
            <p className="p122">Skills</p>
            <ul className="skills-list">{skills.map(this.SkillsFun)}</ul>
            <p className="p122">Life at Company</p>
            <div className="lac-fg">
              <div className="lac-t">
                <p className="p1234 p111">{description}</p>
              </div>
              <img src={imageUrl} alt={title} className="iimg1" />
            </div>
          </div>
        </div>

        <div className="ppp">
          <p className="parahead">Similar Jobs</p>

          <ul className="sim-ul">
            {similarJobs.map(eachItem => (
              <SimilarJobs eachItem={eachItem} key={eachItem.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default JobDetails
