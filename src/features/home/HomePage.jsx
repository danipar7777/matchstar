import React from 'react';

const HomePage = ({history}) => {

	return (
		<div className="ui inverted vertical masthead center aligned segment" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
	    <div className="ui text container" style={{padding: '15px'}} >
	     	<h1 className="ui inverted stackable header">
		      <img
		        className="ui image massive"
            src="/assets/logoStar.png"
		        alt="logo"
          />
		    	<div className="content">MatchStar</div>
      	</h1>
      	<div onClick={() => history.push('/partidos')} className="ui huge white inverted button">
        Empezar
        <i className="right arrow icon" />
      </div>
    </div>
	  </div>
	)

}

export default HomePage;