import React from 'react'
import './style.css'
import facebook from './facebook.png'
import twitter from './twitter.png'
import youtube from './youtube.png'
import instagram from './instagram.png'

export default function TeamTemplate(props){
	console.log({props})
	const useFanArts = [...[
			props.strTeamFanart1,
			props.strTeamFanart2,
			props.strTeamFanart3,
			props.strTeamFanart4,
		].filter(Boolean)
	]
	const useSocialMedia = [...[
		props.strTwitter ? <a href={`https://${props.strTwitter}`}><img src={twitter} /></a>  : null,
		props.strYoutube ? <a href={`https://${props.strYoutube}`}><img src={youtube} /></a> : null,
		props.strFacebook ? <a href={`https://${props.strFacebook}`}><img src={facebook} /></a> : null,
		props.strInstagram ? <a href={`https://${props.strInstagram}`}><img src={instagram} /></a> : null
	].filter(Boolean)]
	console.log(useFanArts)

	return (
	<div className="TeamContent">
		<div className="TeamIdentity">
			<h2 className="TeamName">{props.strTeam}</h2>
			<div className="TeamLogo"><img src={props.strTeamBadge} alt="{props.strTeam}" /></div>
		</div>
		<p>Welcome to the fan site for the <b>{props.strTeam}</b>! Here you will find relevant information about the team that you may find interesting!</p>
		<h3>About the {props.strTeam}</h3>
		<div className="TeamInfo">
			{props.strStadiumThumb ? (
				<>
					<div className="TeamStadium">
						<img src={props.strStadiumThumb} />
						<p>The {props.strStadium} where the {props.strTeam} plays as their home.</p>
					</div>
					
				</>
			) : (null)}
			<p className="TeamDescription">{props.strDescriptionEN || 'Our apologies, content under construction'}</p>
		</div>
		
		
		
			{useFanArts.length
			? (
				<>
				<h3>Fanatics artwork</h3>
				<div className="FanaticsArtwork">
					{useFanArts.map((item, index) => <img src={item} alt={`Fan art ${index}`} key={`fanArt-${index}`} />)}
				</div>
				</>
			)
			: (null)
			}
		
		<p>Additional Information</p>
		<ul>
		<li><b>Alternate Name:</b> {props.strAlternate || "No Alterate name"} </li>
		<li><b>Website</b>: <a href={`http://${props.strWebsite}`} target="_blank"></a>{props.strWebsite}</li>
		</ul>

		{
		useSocialMedia.length 
		? (
			<>
		<h3>Team's Social media</h3>
		<div className="SocialMediaTeam">
			{useSocialMedia}
		</div>
		</>)
		: (null)
		}

	
	</div>
)}