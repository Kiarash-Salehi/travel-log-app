import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { listEntryLogs } from './API';
import MapPin from './MapPin';
import LogEntryForm from './LogEntryForm';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.6,
    longitude: -95.665,
    zoom: 3,
  });
  const getEntries = async () => {
    const logEntries = await listEntryLogs();
    setLogEntries(logEntries);
  };
  // eslint-disable-next-line
  useEffect(() => {
    getEntries();
  }, []);
  const showAddMarkerPopup = event => {
    const [longitude, latitude] = event.lngLat;
    setShowPopup({});
    setAddEntryLocation({
      latitude,
      longitude
    });
  };
  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/ksdeveloper82/ckdujcveq185w19prbl4e16tu"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
      onDblClick={showAddMarkerPopup}
      doubleClickZoom={false}
    >
      {logEntries.map(entry => (
        <React.Fragment key={entry._id}>
          <Marker
            latitude={entry.latitude}
            longitude={entry.longitude}
          >
            <MapPin
              color="yellow"
              viewport={viewport}
              clicked={() => {
                setShowPopup({ [entry._id]: true });
                setAddEntryLocation(null);
              }}
            />
          </Marker>
          {
            showPopup[entry._id] && (
              <Popup
                latitude={entry.latitude}
                longitude={entry.longitude}
                closeButton={true}
                closeOnClick={false}
                dynamicPosition={true}
                onClose={() => {
                  setShowPopup({});
                }}
                anchor="top"
                style={{ zIndex: '1000' }}
              >
                <div style={{ width: '40vw' }}>
                  <h3>{entry.title}</h3>
                  {entry.description && <p>{entry.description}</p>}
                  <p>{entry.comments}</p>
                  <small>Visited at: {new Date(entry.visitDate).toLocaleDateString()}</small>
                  {entry.image && <img
                    src={entry.image}
                    alt={entry.tilte}
                    style={{
                      width: '100%',
                      maxHeight: "200px",
                      objectFit: 'contain',
                      margin: '.2rem auto',
                      textAlign: 'center'
                    }}
                  />}
                </div>
              </Popup>
            )
          }
          {addEntryLocation && (
            <>
              <Marker
                latitude={addEntryLocation.latitude}
                longitude={addEntryLocation.longitude}
              >
                <MapPin
                  color="red"
                  viewport={viewport}
                />
              </Marker>
              <Popup
                latitude={addEntryLocation.latitude}
                longitude={addEntryLocation.longitude}
                closeButton={true}
                closeOnClick={false}
                dynamicPosition={true}
                onClose={() => {
                  setAddEntryLocation(null);
                }}
                anchor="top"
              >
                <div style={{ width: '40vw' }}>
                  <LogEntryForm onClose={() => {
                    setAddEntryLocation(null);
                    getEntries();
                  }} location={addEntryLocation} />
                </div>
              </Popup>
            </>
          )}
        </React.Fragment>
      ))
      }
    </ReactMapGL>
  );
}

export default App;
