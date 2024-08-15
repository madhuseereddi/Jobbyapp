import {FaStar} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {FaEnvelope, FaMapMarkerAlt} from 'react-icons/fa'
import './index.css'

const JobItem = props => {
  const {eachItem} = props
  const {
    company_logo_url: companyLogoUrl,
    employment_type: employmentType,
    id,
    job_description: jobDescription,
    location,
    package_per_annum: packagePerAnnum,
    rating,
    title,
  } = eachItem

  return (
    <Link to={`/jobs/${id}`} className="link1">
      <li className="full-card">
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
          <p className="p12">Description</p>
          <p className="p123">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
