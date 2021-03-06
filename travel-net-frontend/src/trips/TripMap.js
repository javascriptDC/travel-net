

import React from 'react'
import {connect} from 'react-redux'
import { Marker, Polyline } from "react-google-maps";
import GoogleMapsWrapper from "../maps/GoogleMapsWrapper.js";

class TripMap extends React.Component {
  state = {
    isOpen: false,
    openInfoWindowMarkerId: ''
  }

  handleToggleOpen = (markerId, lat, lng) => {
    this.setState({
        openInfoWindowMarkerId: markerId,
    })
  }

  handleToggleClose = (id) => {
    this.setState({
      isOpen: false,
      openInfoWindowMarkerId: ''
    })
  }

  componentWillUpdate(nextProps, nextState){
    console.log(nextProps, nextState)
  }
  //
  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps)
  // }
  componentDidCatch(error, info) {
    console.log(error, info)
}


  render(){
    console.log(this.props.locations)
      let lat = parseFloat(this.props.locations[this.props.locations.length - 1].lat.replace('"','').replace('"',''));
      let lng = parseFloat(this.props.locations[this.props.locations.length - 1].lng.replace('"','').replace('"',''));
      let array = []
    return(
      <GoogleMapsWrapper
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDTnFckTcPidqCa5F9dWom4H_0hbJu9Nh0&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `60vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        defaultZoom={5}
        defaultCenter={{ lat: lat, lng: lng }}
      >

        {this.props.locations.map((location, i) => {
          let lat = parseFloat(location.lat.replace('"','').replace('"',''));
          let lng = parseFloat(location.lng.replace('"','').replace('"',''));
          array.push({lat: lat, lng: lng})
          return (
          <React.Fragment key={i}>
            <Marker
            key={i}
            label={(i + 1).toString()}
            position={{ lat: lat, lng: lng }}
            onClick={() => this.handleToggleOpen(i)}
            />
            <Polyline
              path={array}
              key={`poly${i}`}
              options={{
              strokeColor: '#ff0000',
              strokeOpacity: 1,
              strokeWeight: 3,
              icons: [{
                icon: "safe",
                offset: '0',
                repeat: '10px'
              }],
              }}
              />
          </React.Fragment>
        )
      })}

      </GoogleMapsWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {isLoading: state.trips.isLoading}
}

export default connect(mapStateToProps)(TripMap)
