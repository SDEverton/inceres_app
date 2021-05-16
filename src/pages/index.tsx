import React, { useCallback } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import axios from 'axios';
import { GoogleMap, useJsApiLoader, LoadScript, MarkerClusterer, Marker } from '@react-google-maps/api';


interface HomeProps {
  formated: [{
    lat: number;
    lng: number;
    name: string;
  }];
}

const containerStyle = {
  width: '100%',
  height: '850px'
};

const center = {
  lat: -23.784721661904463,
  lng: -46.00195680244929
};

export default function Home({ formated }: HomeProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.mapsKey
  })

  const options = {
    imagePath:
      'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
  }

  function createKey(location) {
    return location.lat + location.lng
  }
  
  return (
    isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={3}
      >
        <MarkerClusterer options={options}>
            {(clusterer) =>
              formated.map((location) => (
                <Marker key={createKey(location)} position={location} clusterer={clusterer} />
              ))
            }
          </MarkerClusterer>
        <></>
      </GoogleMap>
    ) : 
    <></>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await axios.get('http://images.contelege.com.br/poi.json');
 
  const formated = data.map((item) => {
    return {
      lat: item.latitude,
      lng: item.longitude,
      name: item.name
    }
  })

  return {
    props: {
      formated
    }
  }
}
