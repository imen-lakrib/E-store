import React from 'react'
import  ReactDOM  from 'react-dom'
function Loader() {
  return ReactDOM.createPortal(
    <div style={{zIndex:"10000000", backgroundColor:"transparent", width:"100%", minHeight:"100%",display:"flex", alignItems:"center", justifyContent:"center", position:"absolute"}}>
      <img  src='/assets/loader.gif' alt='loader'/>
    </div>,
    document.getElementById('loader')
  )
}

export default Loader