import React, { Component } from 'react';
import QrReader from 'react-qr-reader';
import moment from 'moment';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
      now: null,
      location: ''
    };
    this.handleScan = this.handleScan.bind(this);
    this.handleError = this.handleError.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
  }
  componentDidMount() {
    setInterval(() => {
      const now = moment().format('MMMM Do YYYY, h:mm:ss a');
      this.setState({ now });
    }, 1000)
  }

  handleScan(data) {
    if (data) {
    this.setState({ result: data })
    }
  }
  handleError(err) {
    console.error(err)
  }

  changeLocation(e) {
    this.setState({ location: e.target.value })
  }
  render() {
    const { result, now, location } = this.state;
    let employeeName = '';
    let presenceTime = '';
    if (result) {
      const { name, time } = JSON.parse(result);
      employeeName = name;
      presenceTime = moment.unix(time).format('MMMM Do YYYY, h:mm:ss a');
    }
    return (
      <div className='container-fluid'>
        <div className='row justify-content-center align-items-center vh-100 vw-100'>
          <div className='card text-center'>
            <div className='card-header'>
              <QrReader
                delay={300}
                onError={this.handleError}
                onScan={this.handleScan}
                style={{ width: '50vh' }}
              />
            </div>
            <div className='card-body'>
              <div className='input-group mb-3'>
                <div className='input-group-prepend'>
                  <span className='input-group-text' id='basic-addon1'>Location ID</span>
                </div>
                <input type='text' className='form-control' placeholder='Put any location id you like' aria-label='locationId' aria-describedby='basic-addon1' onChange={this.changeLocation}/>
              </div>
              {
                result ? 
                <blockquote className='blockquote mb-0'>
                  <p>Name : { employeeName }</p>
                  <p>Time : { presenceTime }</p>
                  <p>Location : { location || '-'}</p>
                </blockquote> : ''
              }
            </div>
            <div className='card-footer text-muted'>
              {now}
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default App;