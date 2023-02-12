// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const apiStatusCall = {
  initial: 'INITIAL',
  inProgress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {
    vaccineStatus: {},
    apiStatus: apiStatusCall.INITIAL,
  }

  componentDidMount() {
    this.getAplCallData()
  }

  getAplCallData = async () => {
    this.setState({apiStatus: apiStatusCall.InProgress})
    const url = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updateData = {
        last7DaysVaccination: data.last_7_days_vaccination.map(days => ({
          dose1: days.dose_1,
          dose2: days.dose_2,
          vaccineDate: days.vaccine_date,
        })),
        vaccinationByAge: data.vaccination_by_age.map(each => ({
          count: each.count,
          age: each.age,
        })),
        vaccinationByGender: data.vaccination_by_gender.map(typeGender => ({
          count: typeGender.count,
          gender: typeGender.gender,
        })),
      }
      this.setState({
        vaccineStatus: updateData,
        apiStatus: apiStatusCall.success,
      })
    } else {
      this.setState({apiStatus: apiStatusCall.failure})
    }
  }

  renderSuccessView = () => {
    const {vaccineStatus} = this.state

    return (
      <>
        <VaccinationCoverage
          VaccinationDetails={vaccineStatus.last7DaysVaccination}
        />
        <VaccinationByGender
          vaccinationGender={vaccineStatus.vaccinationByGender}
        />
        <VaccinationByAge vaccinationAge={vaccineStatus.vaccinationByGender} />
      </>
    )
  }

  renderLoaderView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-title">Something went wrong</h1>
    </div>
  )

  renderAplSuccessFul = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusCall.success:
        return this.renderSuccessView()
      case apiStatusCall.failure:
        return this.renderFailureView
      case apiStatusCall.inProgress:
        return this.renderLoaderView
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="title-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="log-image"
          />
          <p className="co-win">Co-WIN</p>
        </div>
        <h1 className="title">CoWIN Vaccination in India</h1>
        {this.renderAplSuccessFul()}
      </div>
    )
  }
}

export default CowinDashboard
