import React from 'react'
import './loadingOverlay.css'

function LoadingOverlay() {
  return (
    <div className="loading_overlay">
        <div className="loading_content">
            <div className="loading_logo_container">
            <img src="/CHC_logo_V2.svg" alt="League Logo" />
            </div>
            {/* <h1>Loading...</h1> */}
        </div>
    </div>
  )
}

export default LoadingOverlay