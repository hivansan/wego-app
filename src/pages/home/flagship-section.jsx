import React from 'react'
import DarkPrimaryButton from '../../atoms/darkPrimaryButton'
import LightPrimaryButton from '../../atoms/lightPrimaryButton'
import FlagshipCard from '../../molecules/flagshipCard'

const FlagShipSection = () => {
	return (
		<div
		className="flagship-section"
	      >
		<div className="section-left">
		  <h1>Discover, collect, and sell extraordinary NFTs</h1>
		  <p>on the world's first {"&"} largest NFT marketplace</p>
	
		  <div className='buttons'>
		    <DarkPrimaryButton className='btn'>
		      Explore
		    </DarkPrimaryButton>
		    <LightPrimaryButton>
		      Create
		    </LightPrimaryButton>
		  </div>
		</div>
		<FlagshipCard className='section-card flagship-card'/>
	      </div>
	)
}




export default FlagShipSection