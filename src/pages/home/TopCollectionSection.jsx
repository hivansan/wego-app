import React, {useState, useEffect} from 'react'
import TopCollectionsCard from '../../molecules/TopCollectionsCard';

import topCollections from '../../db.json'

const TopCollectionSection = () => {
const [collections, setCollections] = useState([])

useEffect(() => {
	setCollections(topCollections.collections)
},[])


	return(	
		<section className='top-collections-section'>
			<h1 className='text-center mb-5'>Top Collections</h1>
		<div className='top-collections-section-container'>
			<TopCollectionsCard topCollections={topCollections.collections} title='By Total volume'/>
			<TopCollectionsCard topCollections={topCollections.collections} title='By 7 Day Average Price'/>
			<TopCollectionsCard topCollections={topCollections.collections} title='By Owner Count'/>
		</div>
		</section>
	)	
}



export default TopCollectionSection