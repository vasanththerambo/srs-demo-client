import React, { Fragment, useState ,useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, Modal,Row, Card, Col, Alert,Badge, Media} from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";

import { ThemeContext } from "../../../../../context/ThemeContext";
import PageTitle from "../../../../layouts/PageTitle";

import Constants from "../../../../../config/constants";

import SingleProfileList from "./SingleProfileList";
import StarRating from './StarRating';
// images
import avatar1 from "../../../../..//images/avatar/1.jpg";
import product2 from "../../../../../images/product/2.jpg";
import product3 from "../../../../../images/product/3.jpg";
import product4 from "../../../../../images/product/4.jpg";
import product5 from "../../../../../images/product/5.jpg";
import product6 from "../../../../../images/product/6.jpg";
import product7 from "../../../../../images/product/7.jpg";

const ProfilesMatching = () => {

  const userProfile= useSelector(state=>state.userProfile.profile) ;
  console.log(userProfile);
  // const userDetails= JSON.parse( localStorage.getItem('userDetails'));
  // const token=userDetails.token;
  // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;


  const [profilesMatching, setprofilesMatching] = useState([]);
 

  useEffect(()=>{
    
    axios.get(Constants.url_getProfiles).then((response)=>{
      let tempProfilesMatching = response.data.data.filter((profile)=>(profile.gender!==userProfile.gender));

      

      setprofilesMatching(tempProfilesMatching);
    }).catch((error)=>{
      console.log(error);
    })

  },[])
  
  

  const { 
		changeBackground, changeNavigationHader,
		changeSideBarStyle, changeSideBarPostion,
		changePrimaryColor,changeSidebarColor,
		
	} = useContext(ThemeContext);
	useEffect(() => {
		changeBackground({ value: "light", label: "Light" });
		changeNavigationHader("color_5");
		changeSidebarColor("color_5");
		changeSideBarPostion({ value: "static", label: "Static" });
		changeSideBarStyle({ value: "modern", label: "Modern" });
		changePrimaryColor("color_5");
	},[]);

  const [reviewModal, setReviewModal] = useState(false);
  
  if (userProfile.gender) {
  
    return (
      <Fragment>
        <PageTitle activeMenu="Matching Profiles" motherMenu="Profiles" />

        <div className="row">
          {profilesMatching && profilesMatching.map((profile) => <SingleProfileList key={profile._id} profile={profile} />)}

          {/* review */}
        
        </div>
      </Fragment>
    );
  }
  else {
    return(
		<Fragment>
			<PageTitle activeMenu="Profile" motherMenu="App" />
			
			<Row>
			<Col xl={6} className="col-xxl-12">
			<Card>
			<Link to="/form-add-basic-profile">			
            <Card.Header className="d-block">
              <Card.Title>Profile Status</Card.Title>
              
            </Card.Header>
            <Card.Body>
              
                <Alert
                  variant='primary'
                  className="solid alert-square"
                >
                  <strong> You dont have a profile !!!</strong> Please Fill up Your Profile first.
                </Alert>
            
				</Card.Body>
			</Link>				
          </Card>
        </Col>
		<Col xl={6} className="col-xxl-12">
			<Card>
				<Card.Body>
					<Link to="/form-add-basic-profile"> Click Here to Fill up Profile </Link>
				</Card.Body>
			
			</Card>
			
		</Col>
			</Row>
		</Fragment>
	)
  }
};



export default  ProfilesMatching ;
