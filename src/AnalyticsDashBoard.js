import React, { PureComponent } from 'react'
import { GoogleProvider, GoogleDataChart } from 'react-analytics-widget'
import './AnalyticsDashBoard.css'

const CLIENT_ID = '574595178187-ve5kir08t09l555fl348l2jut73i5kqp.apps.googleusercontent.com'

const viewsHistory = {
  reportType: "ga",
  query: {
    dimensions: "ga:date",
    metrics: "ga:uniquePageviews",
    "start-date": "2017-08-14",
    "end-date": "today"
  },
  chart: {
    type: "LINE",
    options: {
      title: "Pageviews History"
    }
  }
}

const viewsIsrael = {
  reportType: "ga",
  query: {
    dimensions: "ga:city",
    metrics: "ga:uniquePageviews",
    "start-date": "2017-08-14",
    "end-date": "today",
    filters: 'ga:country==Israel',
  },
  chart: {
    type: 'GEO',
    container: 'timeline',
    options: {
      title: "Pageviews per City",
      region: 'IL', // Western Europe
      displayMode: 'markers'
    }
  }
}

const viewsWorld = {
  reportType: "ga",
  query: {
    dimensions: "ga:country",
    metrics: "ga:uniquePageviews",
    "start-date": "2017-08-14",
    "end-date": "today"
  },
  chart: {
    type: 'GEO',
    container: 'timeline',
    options: {
      displayMode: 'markers'
    }
  }
}

// analytics views ID
const views = {
  query: {
    ids: "ga:158198624"
  }
}

export class AnalyticsDashBoard extends PureComponent {

  componentWillMount () {
    (function(w, d, s, g, js, fjs) {
      g = w.gapi || (w.gapi = {})
      g.analytics = {
        q: [],
        ready: function(cb) {
          this.q.push(cb)
        }
      }
      js = d.createElement(s)
      fjs = d.getElementsByTagName(s)[0]
      js.src = "https://apis.google.com/js/platform.js"
      fjs.parentNode.insertBefore(js, fjs)
      js.onload = function() {
        g.load("analytics")
      }
    })(window, document, "script")
  }

  render() {
    return (
      <div className="button">
        <GoogleProvider clientId={CLIENT_ID} >
          <div className="container">
            <GoogleDataChart views={views} config={viewsHistory} className="chart" />
            <GoogleDataChart views={views} config={viewsIsrael} className="chart" />
            <GoogleDataChart views={views} config={viewsWorld} className="chart" />
          </div>
        </GoogleProvider>
      </div>
    )
  }
}

export default AnalyticsDashBoard
