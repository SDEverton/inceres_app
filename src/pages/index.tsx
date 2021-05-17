import React from 'react'
import { GetStaticProps } from 'next'
import axios from 'axios'
import { GoogleMap, useJsApiLoader, MarkerClusterer, Marker } from '@react-google-maps/api'

import styles from './home.module.scss'

interface HomeProps {
  formated: [
    {
      lat: number
      lng: number
      name: string
    }
  ]
}

const containerStyle = {
  width: '100%',
  height: '400px',
}

const center = {
  lat: -23.784721661904463,
  lng: -46.00195680244929,
}

export default function Home({ formated }: HomeProps) {
  const googleMapsApiKey: any = process.env.mapsKey
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey,
  })

  const options = {
    imagePath:
      'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
  }

  function createKey(location: { lat: number; lng: number; name?: string }) {
    return location.lat + location.lng
  }

  return isLoaded ? (
    <div className={styles.contentContainer}>
      <>
        {formated.length ? (
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={3}>
            <MarkerClusterer options={options}>
              {(clusterer) =>
                formated.map((location) => (
                  <Marker key={createKey(location)} position={location} clusterer={clusterer} />
                ))
              }
            </MarkerClusterer>
          </GoogleMap>
        ) : (
          <div>
            <h1>carregando...</h1>
          </div>
        )}
      </>
    </div>
  ) : (
    <></>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await axios.get('http://images.contelege.com.br/poi.json')

  if (data) {
    const formated = data.map((item: { latitude: number; longitude: number; name: string }) => {
      return {
        lat: item.latitude,
        lng: item.longitude,
        name: item.name,
      }
    })

    return {
      props: {
        formated,
      },
    }
  } else {
    return {
      props: {
        formated: [],
      },
    }
  }
}
