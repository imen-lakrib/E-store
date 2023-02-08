import React from 'react'
import  ReactDOM  from 'react-dom'
function Loader() {
  return ReactDOM.createPortal(
    <div style={{zIndex:"10", backgroundColor:"gray", width:"100%", minHeight:"100%",display:"flex", alignItems:"center", justifyContent:"center", opacity:".2", position:"absolute"}}>
      <img style={{opacity:"1"}} src='/assets/loader.gif' alt='loader'/>
    </div>,
    document.getElementById('loader')
  )
}

export default Loader