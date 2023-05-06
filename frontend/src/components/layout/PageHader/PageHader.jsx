import React from 'react'
import './PageHader.css';
const PageHader = () => {
  return (

        <section id='page-header' style={{backgroundImage: `url(/assets/doodlebg.png)` }}>
          <div className='cartBoxText'>
            <h2><b>#Cart</b></h2>
            <p><b>Save up to 70% off!</b></p>
          </div>
        </section>
  )
}

export default PageHader