import './index.css'

const NotFound = () => {
  return (
    <div className="pageNot">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="bad path"
        className="notfound"
      />
      <h1>Page Not Found</h1>
      <p>We are sorry,The page You requested could not be found</p>
    </div>
  )
}

export default NotFound
