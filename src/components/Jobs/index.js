import { Component } from 'react';
import Cookies from 'js-cookie';
import JobProfile from '../JobProfile';
import JobItem from '../JobItem';
import { BsSearch } from 'react-icons/bs';
import Loader from 'react-loader-spinner';
import Header from '../Header';
import './index.css';

class Jobs extends Component {
  state = {
    jobsList: [],
    isLoading: false,
    searchItem: '',
    checkboxList: [],
    radioVal: '',
    isError: false,
  };

  componentDidMount() {
    this.getDetails();
  }

  getDetails = async () => {
    const { searchItem, checkboxList, radioVal } = this.state;
    const employmentTypes = checkboxList.join(',');
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypes}&minimum_package=${radioVal}&search=${searchItem}`;
    const jwtToken = Cookies.get('jwt_token');
    const options = {
      method: 'GET',
      headers: { Authorization: `Bearer ${jwtToken}` },
    };

    this.setState({ isLoading: true });

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        this.setState({
          jobsList: data.jobs,
          isLoading: false,
          isError: false,
        });
      } else {
        console.error('Failed to fetch jobs');
        this.setState({
          isLoading: false,
          isError: true,
        });
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      this.setState({
        isLoading: false,
        isError: true,
      });
    }
  };

  searchBar = (event) => {
    this.setState({ searchItem: event.target.value });
  };

  searchSubmit = (event) => {
    event.preventDefault();
    this.getDetails();
  };

  updateCheckboxList = (checkboxList) => {
    this.setState({ checkboxList }, this.getDetails);
  };

  radioValFun = (radioVal) => {
    this.setState({ radioVal }, this.getDetails);
  };

  render() {
    const { salaryRangesList, employmentTypesList } = this.props;
    const { jobsList, isLoading, isError } = this.state;

    return (
      <div className="job-full-bg">
        <Header />
        <div className="job-inner">
          <div className="job-inner-bg">
            <JobProfile
              salaryRangesList={salaryRangesList}
              employmentTypesList={employmentTypesList}
              updateCheckboxList={this.updateCheckboxList}
              radioValFun={this.radioValFun}
            />
          </div>
          <div className="part2">
            <div className="search-bar">
              <input
                type="search"
                placeholder="Search"
                className="search1"
                onBlur={this.searchBar}
              />
              <button
                type="button"
                className="btn-search"
                data-testid="searchButton"
                onClick={this.searchSubmit}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {isLoading ? (
              <div className="loader-container s1" data-testid="loader">
                <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
              </div>
            ) : isError ? (
              <div className="error-state">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/failure-img.png" // Replace with actual failure image URL
                  alt="failure view"
                  className="failure-image"
                />
                <h1>Oops! Something Went Wrong</h1>
                <p>We are sorry, but we couldn't fetch the jobs. Please try again later.</p>
                <button type="button" className="retry-btn" onClick={this.getDetails}>
                  Retry
                </button>
              </div>
            ) : jobsList.length === 0 ? (
              <div className="no-jobs-state">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png" // Replace with actual no jobs image URL
                  alt="no jobs"
                  className="no-jobs-image"
                />
                <h1>No Jobs Found</h1>
                <p>We could not find any jobs. Try other filters.</p>
              </div>
            ) : (
              <ul className="jobs-ul">
                {jobsList.map(eachItem => (
                  <JobItem eachItem={eachItem} key={eachItem.id} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Jobs;
