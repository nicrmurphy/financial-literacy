import React from 'react'

function Footer() {
  return (
    <p
      style={{
        color: 'lightgrey',
        paddingBottom: '5px'
      }}>
      This app is developed and hosted by{' '}
      <a
        style={{ color: 'lightgrey' }}
        href="https://kapu-kawhe.com/"
        target="_blank"
        rel="noopener noreferrer">
        Kapu-Kawhe
      </a>
      .
    </p>
  )
}

export default Footer
