import { Component } from 'react';
import Cookies from 'js-cookie';
import './index.css';

class JobProfile extends Component {
  state = { userDetails: {}, checkboxList: [], radioVal: '' };
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    this.getDetails();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getDetails = async () => {
    const url = 'https://apis.ccbp.in/profile';
    const jwtToken = Cookies.get('jwt_token');
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        if (this._isMounted) {
          this.setState({ userDetails: data.profile_details });
        }
      } else {
        console.error('Failed to fetch profile details');
      }
    } catch (error) {
      console.error('Error fetching profile details:', error);
    }
  };

  clickCheckbox = (event) => {
    const { checkboxList } = this.state;
    const value = event.target.id;

    let updatedList = [];
    if (event.target.checked) {
      updatedList = [...checkboxList, value];
    } else {
      updatedList = checkboxList.filter(item => item !== value);
    }

    this.setState({ checkboxList: updatedList }, () => {
      const { updateCheckboxList } = this.props;
      updateCheckboxList(this.state.checkboxList);
    });
  };

  changeRadio = (event) => {
    const radioVal = event.target.value;
    this.setState({ radioVal }, () => {
      const { radioValFun } = this.props;
      radioValFun(this.state.radioVal);
    });
  };

  render() {
    const { userDetails, checkboxList } = this.state;
    const { salaryRangesList, employmentTypesList } = this.props;
    const { name, profile_image_url: profileImageUrl, short_bio: shortBio } = userDetails;

    return (
      <div className="job-prof">
        <div className="profile-bg">
          <img src={profileImageUrl} alt="profile" className="profileimg" />
          <h1 className="profile-h1">Madhu</h1>
          <p className="profile-p1">{shortBio}</p>
        </div>
        <hr className="hr" />
        <p className="prof-p1">Type of Employment</p>
        <ul className="prof-ul1">
          {employmentTypesList.map(eachItem => (
            <li key={eachItem.label}>
              <input
                type="checkbox"
                id={`${eachItem.employmentTypeId}`}
                onClick={this.clickCheckbox}
              />
              <label htmlFor={`${eachItem.employmentTypeId}`} className="label2">
                {eachItem.label}
              </label>
            </li>
          ))}
        </ul>
        <hr className="hr" />
        <p className="prof-p1">Salary Range</p>
        <ul className="prof-ul1">
          {salaryRangesList.map(eachItem => (
            <li key={eachItem.label}>
              <input
                type="radio"
                id={`${eachItem.salaryRangeId}`}
                value={eachItem.salaryRangeId}
                name="salaryrange"
                className="inpu2"
                onChange={this.changeRadio}
              />
              <label htmlFor={`${eachItem.salaryRangeId}`} className="label2">
                {eachItem.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default JobProfile;
