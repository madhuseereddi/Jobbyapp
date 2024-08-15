import {FaStar} from 'react-icons/fa'
import './index.css'

const SimilarJobs = props => {
  const {eachItem} = props
  const {
    company_logo_url: companyLogoUrl,
    employment_type: employmentType,
    id: jobId,
    job_description: jobDescription,
    location,
    rating,
    title,
  } = eachItem

  return (
    <li className="sim-bg">
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
      <p className="p12">Description</p>
      <p className="p1234">{jobDescription}</p>
    </li>
  )
}

export default SimilarJobs
