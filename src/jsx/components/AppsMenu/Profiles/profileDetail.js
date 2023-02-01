import React, { useState ,useEffect,useContext } from "react";
import { Button, Modal, Nav, Tab,Row, Card, Col, Alert,Badge } from "react-bootstrap";

import { Link, useParams ,useHistory } from "react-router-dom";
import { useSelector} from "react-redux";
import classnames from 'classnames';
import axios from "axios";


import Constants from "../../../../config/constants";
import avater1 from "../../../../images/avatar/1.jpg"
import product1 from "../../../../images/product/1.jpg"
import product2 from "../../../../images/product/2.jpg";
import product3 from "../../../../images/product/3.jpg";
import product4 from "../../../../images/product/4.jpg";
import tab1 from "../../../../images/tab/1.jpg";
import tab2 from "../../../../images/tab/2.jpg";
import tab3 from "../../../../images/tab/3.jpg";
import tab4 from "../../../../images/tab/4.jpg";
import PageTitle from "../../../layouts/PageTitle";
import StarRating from "./ProfileList/StarRating";
import { ThemeContext } from "../../../../context/ThemeContext";

const ProfileDetail = () => {
	const history =useHistory();
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

	const [reviewToggle, setReviewToggle] = useState(false);
	const [activeTab, setActiveTab] = useState('0');
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    const {id} =useParams();

	const backendPathProfile = `${Constants.url_getProfiles}/${id}`;

	// const userDetails= JSON.parse( localStorage.getItem('userDetails'));
  	// const token=userDetails.token;
  	// axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

	const [selectedProfile, setselectedProfile] = useState({});
	
	useEffect(()=>{
		axios.get(backendPathProfile).then((response) => {
			setselectedProfile(response.data.data);
		}).catch((error)=>{
			console.log(error);
		})
		
	},[])
	

	const{image} =selectedProfile;
	const [activeToggle, setActiveToggle] = useState("basicProfile");
	
	const {firstName,lastName,dob,email,religion,caste,height,weight,complexion,bodytype,physicalStatus,bloodGroup,mothertongue,aboutMe,countryLiving,nativePlace,currentLocation,diet,smoking,drinking,occupation,annualIncome,family,education,residential,contact}=selectedProfile;
	
	const {languages}= selectedProfile;
	
	const dateOfBirth=new Date(dob);
	const dobDay =dateOfBirth.getDate();
	const dobMonth =dateOfBirth.getMonth()+1 ;
	const dobYear=dateOfBirth.getFullYear();
				
	const [isAdditionalInfo, setisAdditionalInfo] = useState(false);	
	useEffect (()=>{
		if(selectedProfile.advanceProfileStatus){
			
			setisAdditionalInfo(true)
	
		}
		else {
			setisAdditionalInfo(false)
		}
	
	  })	
	  
	const userProfile = useSelector(state=>state.userProfile.profile);

	const [isSent, setisSent] = useState(false);
	const [isReceived, setisReceived] = useState(false);
	const [isAccepted, setisAccepted] = useState(false);
	const [interestProfile, setinterestProfile] = useState({});
	const [messageInterest, setmessageInterest] = useState('');


	useEffect(()=>{
		axios.get(Constants.url_getInterests).then((response) => {
			const interestSent = response.data.data.find((profile) => (profile.sender === userProfile._id) && profile.receiver === id)
			if(interestSent){
				if(interestSent.status==="accept"){
					setmessageInterest("Your Request is Accepted");
					setisAccepted(true);
				}
				else{
					setmessageInterest("You Already sent Interest to this Profile");
					
				}
				setisSent(true);
				
				setinterestProfile(interestSent);
			}
			else{
				setmessageInterest("Send Interest to this Profile");
				setisSent(false);
			}
			const interestReceived=response.data.data.find((profile)=>(profile.receiver===userProfile._id)&&profile.sender=== id)
			if(interestReceived){
				if(interestReceived.status==="accept"){
					setmessageInterest("You Accepted this request");
					setisAccepted(true);
				}
				else{
					setmessageInterest("You Received an Interest from this Profile");
					

				}
				setisReceived(true);
				
				setinterestProfile(interestReceived);
			}
			else{
				setisReceived(false);
			}

		}).catch((error)=>{
			console.log(error);
		})

	},[isSent,isReceived]);

	useEffect(()=>{
		if(interestProfile.status==="accept"){
			setisAccepted(true);
		}

	})


	const handleSendInterest=()=>{
		const interest={sender:userProfile._id,receiver:selectedProfile._id,status:"active"};
		axios.post(Constants.url_getInterests,interest).then((response)=>{
			setisSent(true);
		}).catch((error)=>{
			console.log(error);
		})
	}

	const backendPathInterest = `${Constants.url_getInterests}/${interestProfile._id}`;
	console.log(interestProfile._id);
	const handleCancelInterest=()=>{
		axios.delete(backendPathInterest).then((response)=>{
			setisSent(false);

		}).catch((error)=>{
			console.log(error);
		})
	}
	const handleAcceptInterest=()=>{
		const interest ={...interestProfile,status:"accept"};

		axios.patch(backendPathInterest,interest).then((response)=>{
			setisAccepted(true);
			setmessageInterest("You Accepted this request");
		}).catch((error)=>{
			console.log(error);
		})
	}

	const handleRejectInterest=()=>{
		const interest ={...interestProfile,status:"reject"};
		axios.patch(backendPathInterest,interest).then((response)=>{
			setisAccepted(false);
			setmessageInterest("You Have Rejected This Request");
			history.push('/profiles-matching');
		}).catch((error)=>{
			console.log(error);
		})
	}


  return (
    <>
      <PageTitle motherMenu="Profile" activeMenu=" Details" />
      <div className="row">
				
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
				<div className="col-xl-3 col-lg-6  col-md-6 col-xxl-5 ">
						
				<div className="col-lg-10">
					<div className="card">
						<div className="card-body">
							<div className="profile-statistics">
								{ isReceived?
								<div className="text-center">
								<div className="row">
									<div className="col">
										<h4 className="m-b-0">{messageInterest}</h4>
									</div>
									
								</div>
								{ isAccepted ?
								<div className="mt-4">
									<Button variant="dark" onClick={handleRejectInterest}>Reject Interest</Button>
								</div>:
								<div className="mt-4">
									<Button className="me-2" variant="primary" onClick={handleAcceptInterest}>Accept Interest</Button>
									<Button className="me-2" variant="dark" onClick={handleRejectInterest}>Reject Interest</Button>
								</div>

								}
							</div> 
								:<div className="text-center">
									<div className="row">
										<div className="col">
											<h4 className="m-b-0">{messageInterest}</h4>
										</div>
										
									</div>
									{
										isSent?
									<div className="mt-4">
										<Button variant="dark" onClick={handleCancelInterest}>Cancel Interest</Button>
									</div>
									:
									<div className="mt-4">
										<Button variant="primary" onClick={handleSendInterest}>Send Interest</Button>
									</div>
									}
								</div> 
								}
							 
								
							</div>
						</div>
					</div>
				</div>
					  {/* Tab panes */}
						<Tab.Container defaultActiveKey="first">
							<Tab.Content>
								<Tab.Pane eventKey="first">
									<img className="img-fluid" src={image} alt="Profile Pic" style={{width:"400px",height:"500px" , objectFit:"cover"}} />
								</Tab.Pane>
								<Tab.Pane eventKey="second">
									<img className="img-fluid" src={image} alt="Profile Pic" style={{width:"400px",height:"500px" , objectFit:"cover"}} />
								</Tab.Pane>
								<Tab.Pane eventKey="third">
									<img className="img-fluid" src={image} alt="Profile Pic" style={{width:"400px",height:"500px" , objectFit:"cover"}} />
								</Tab.Pane>
								<Tab.Pane eventKey="four">
									<img className="img-fluid" src={image} alt="Profile Pic" style={{width:"400px",height:"500px" , objectFit:"cover"}} />
								</Tab.Pane>
							</Tab.Content>
							<div className="tab-slide-content new-arrival-product mb-4 mb-xl-0">
							  {/* Nav tabs */}
								<Nav as="ul" className="nav slide-item-list mt-3" role="tablist">
									<Nav.Item as="li">
										<Nav.Link as="a" eventKey="first" to="#first">
											<img className="img-fluid" src={image} alt=""width={50} height={25}/>
										</Nav.Link>
									</Nav.Item>
									<Nav.Item as="li">
										<Nav.Link as="a" eventKey="second" to="#second">
											<img className="img-fluid" src={image} alt=""width={50} height={25}/>
										</Nav.Link>
									</Nav.Item>
									<Nav.Item as="li">
										<Nav.Link as="a" eventKey="third" to="#third">
											<img className="img-fluid" src={image} alt=""width={50} height={25}/>
										</Nav.Link>
									</Nav.Item>
									
								</Nav>
							</div>
						</Tab.Container>
					</div>
                {/*Tab slider End*/}
				<div className="col-xl-6">
          <div className="card">
            <div className="card-body">
              <div className="profile-tab">
                <div className="custom-tab-1">
						<ul className="nav nav-tabs">
							
							<li className="nav-item" onClick={() => setActiveToggle("basicProfile")}>
								<Link to="#basic-profile"  data-toggle="tab" className={`nav-link ${ activeToggle === "basicProfile" ? "active show" : ""}`}>Basic Profile</Link>
							</li>
							<li className="nav-item" onClick={() => setActiveToggle("advancedInfo")}>
								<Link to="#advanced-info"  data-toggle="tab" className={`nav-link ${ activeToggle === "advancedInfo" ? "active show" : ""}`}>Advanced Info</Link>
							</li>
							
							
						</ul>
					<div className="tab-content">
					<div id="basicProfile" className={`tab-pane fade ${ activeToggle === "basicProfile" ? "active show" : ""}`}>
						<div className="profile-about-me">
							<div className="pt-4 border-bottom-1 pb-3">
								<h4 className="text-primary mb-4">
									Personal Information
								</h4>
								<div className="row mb-2">
									<div className="col-3">
										<h5 className="f-w-500"> Name<span className="pull-right">:</span></h5>
									</div>
									<div className="col-9">
										<span>{firstName} &nbsp; {lastName}</span>
									</div>
								</div>
								<div className="row mb-2">
									<div className="col-3">
										<h5 className="f-w-500">Email<span className="pull-right">:</span></h5>
									</div>
									<div className="col-9">
										<span>{email}</span>
									</div>
								</div>
								<div className="row mb-2">
									<div className="col-3">
										<h5 className="f-w-500">  Date of Birth <span className="pull-right">:</span></h5>
									</div>
									<div className="col-9">
										<span>{dobDay} - {dobMonth} - {dobYear}</span>
									</div>
								</div>
								<div className="row mb-2">
									<div className="col-3">
										<h5 className="f-w-500"> Religion <span className="pull-right">:</span></h5>
									</div>
									<div className="col-9">
										<span>{religion}</span>
									</div>
								</div>
								<div className="row mb-2">
									<div className="col-3">
										<h5 className="f-w-500">  Caste <span className="pull-right">:</span></h5>
									</div>
									<div className="col-9">
										<span>{caste}</span>
									</div>
								</div>
							</div>
							
							
							<div className="pt-4 border-bottom-1 pb-3">
								<h4 className="text-primary mb-4">
									Physical Info
								</h4>
								<div className="row mb-2">
									<div className="col-3">
										<h5 className="f-w-500"> Height<span className="pull-right">:</span></h5>
									</div>
									<div className="col-9">
										<span>{height} cm </span>
									</div>
								</div>
								<div className="row mb-2">
									<div className="col-3">
										<h5 className="f-w-500"> Weight <span className="pull-right">:</span></h5>
									</div>
									<div className="col-9">
										<span>{weight} kg</span>
									</div>
								</div>
								<div className="row mb-2">
									<div className="col-3">
										<h5 className="f-w-500">  Complexion <span className="pull-right">:</span></h5>
									</div>
									<div className="col-9">
										<span>{complexion}</span>
									</div>
								</div>
								<div className="row mb-2">
									<div className="col-3">
										<h5 className="f-w-500"> Body Type <span className="pull-right">:</span></h5>
									</div>
									<div className="col-9">
										<span>{bodytype}</span>
									</div>
								</div>
								<div className="row mb-2">
									<div className="col-3">
										<h5 className="f-w-500">  Physical Status <span className="pull-right">:</span></h5>
									</div>
									<div className="col-9">
										<span>{physicalStatus}</span>
									</div>
								</div>
								<div className="row mb-2">
									<div className="col-3">
										<h5 className="f-w-500">  Blood Group <span className="pull-right">:</span></h5>
									</div>
									<div className="col-9">
										<span>{bloodGroup}</span>
									</div>
								</div>
							</div>
							<div className="profile-lang  mb-5">
								<div className="pt-4 border-bottom-1 pb-3">
									<h4 className="text-primary mb-2">Language Details</h4>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">  Mothertongue  <span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{mothertongue}</span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500"> Languages Known <span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												{ languages && languages.map((language)=><span  key={language}> {language} , </span>)}
												
											</div>
											
										</div>
									</div>
								</div>
						</div>
						
					</div>
						
						
						<div id="advanced-info" className={`tab-pane fade ${ activeToggle === "advancedInfo" ? "active show" : ""}`}>
							{
							isAdditionalInfo ? 
							<div>
								
									<div className="profile-about-me">
										<div className="pt-4 border-bottom-1 pb-3">
											<h4 className="text-primary">About Me</h4>
											<p className="mb-2">
												{aboutMe}
											</p>
											
										</div>
									</div>
									
									
									<div className="profile-about-me">
									<div className="pt-4 border-bottom-1 pb-3">
										<h4 className="text-primary mb-4">
											More Info About Yourself
										</h4>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500"> Country Of Living<span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{countryLiving}</span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">Place Of Birth <span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{nativePlace}</span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">  Current Location <span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{currentLocation}</span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">Diet<span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{diet}</span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">  Smoking <span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{smoking ? 'Yes':'No'}</span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">Drinking<span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{drinking}</span>
											</div>
										</div>
										</div>
									</div>
									<div className="profile-about-me">
									<div className="pt-4 border-bottom-1 pb-3">
										<h4 className="text-primary mb-4">
										Occupation and Family Details
										</h4>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500"> Occupation <span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{occupation}</span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">Annual Income <span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>Rs. {annualIncome}/- </span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">  About My Family <span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{family[0].aboutMyFamily}</span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">Father's Occupation<span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{family[0].occupationFather}</span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">  Mother's Occupation <span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{family[0].occupationMother}</span>
											</div>
										</div>
										</div>
									</div>
									<div className="profile-about-me">
									<div className="pt-4 border-bottom-1 pb-3">
										<h4 className="text-primary mb-4">
										Educational Details
										</h4>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500"> Highest Education<span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{education[0].course}</span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">Corresponding Discipline<span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{education[0].discipline} </span>
											</div>
										</div>
										
										</div>
									</div>
									<div className="profile-about-me">
									<div className="pt-4 border-bottom-1 pb-3">
										<h4 className="text-primary mb-4">
										Contact Information
										</h4>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500"> Residential Address<span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{residential}</span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">Contact Number <span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{contact.contact1} </span>
											</div>
										</div>
										<div className="row mb-2">
											<div className="col-3">
												<h5 className="f-w-500">Additional Contact Number <span className="pull-right">:</span></h5>
											</div>
											<div className="col-9">
												<span>{contact.contact2} </span>
											</div>
										</div>
										
										</div>
									</div>
  									
							</div>
							: <div> 
								 <Row>
									<Col xl={6} className="col-xxl-12">
										<Card>
											<Card.Header className="d-block">
											<Card.Title>Profile Status</Card.Title>
											
											</Card.Header>
											<Card.Body>
											
												<Alert
												variant='primary'
												className="solid alert-square"
												>
												<strong> This User is Not Associated with Advance Info !!!</strong> 
												</Alert>
											
											</Card.Body>
										</Card>
									</Col>
										
								</Row>
							</div>
						}	
						</div>
						
					</div>
                </div>
              </div>
            </div>
          </div>
        </div>

                
              </div>
            </div>
          </div>
        </div>
        {/* review */}
        
      </div>
    </>
  );
};



export default ProfileDetail ;
