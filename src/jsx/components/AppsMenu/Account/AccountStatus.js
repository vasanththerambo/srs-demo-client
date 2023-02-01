import React, { Fragment, useState, useEffect, useContext } from "react";
import { Row, Card, Col, Alert ,Button } from "react-bootstrap";
import { Link ,useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";

import { ThemeContext } from "../../../../context/ThemeContext";
import PageTitle from "../../../layouts/PageTitle";

import Constants from "../../../../config/constants";
import { monthData } from "../../monthData";


const AccountStatus = () => {
  const history = useHistory();

  const userProfile = useSelector(state => state.userProfile.profile);
  const userDetails = useSelector(state => state.auth.user);
  
  const [paymentDetails, setpaymentDetails] = useState({});
  const [payDay, setpayDay] = useState("");
  const [payMonth, setpayMonth] = useState("");
  const [payYear, setpayYear] = useState("");

  
  // const userDetails= JSON.parse( localStorage.getItem('userDetails'));
  // const token=userDetails.token;
  // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;



  useEffect(()=>{
    
    axios.get(`${Constants.url_accountStatus}/${userDetails._id}`).then((response)=>{
        setpaymentDetails(response.data.data);

    }).catch((error)=>{
      console.log(error);
    })

    

  },[])
    
  useEffect(() => {
    if (paymentDetails) {
      const payDate = new Date(paymentDetails.paymentDate);
      setpayDay( payDate.getDate());
      setpayMonth(payDate.getMonth());
      setpayYear (payDate.getFullYear());
  }
  },[paymentDetails])
  
    
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
 
  
    if (userProfile.accountStatus ) {
        
    
        return (
            <Fragment>
                <PageTitle activeMenu="Account Status" motherMenu="Account" />

                <Row>
                    <Card>
                        <Card.Header className="d-block">
                                  <Card.Title> Your Account Status</Card.Title>
                                  
                        </Card.Header>
                        <Card.Body>
                            <div className="profile-about-me">
                                <div className="pt-4 border-bottom-1 pb-3">
                                    <h4 className="text-info mb-4">
                                        Payment Information
                                        
                                    </h4>
                                    <div className="row mb-2">
                                        <div className="col-3">
                                            <h5 className="f-w-500"> Amount<span className="pull-right">:</span></h5>
                                        </div>
                                        <div className="col-9">
                                            <span> Rs 500 </span>
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-3">
										    <h5 className="f-w-500"> Order Id<span className="pull-right">:</span></h5>
                                        </div>
                                        <div className="col-9">
                                            <span> {paymentDetails.orderId} </span>
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-3">
										    <h5 className="f-w-500"> Payment Id<span className="pull-right">:</span></h5>
                                        </div>
                                        <div className="col-9">
                                            <span> {paymentDetails.paymentId} </span>
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-3">
										    <h5 className="f-w-500"> Payment Date <span className="pull-right">:</span></h5>
                                        </div>
                                        <div className="col-9">
                                            <span>{payDay} - {monthData[payMonth]} - {payYear}</span>
                                        </div>
                                    </div>
                                    
                                </div>

                            </div>

                        </Card.Body>
                        <Card.Body>
                           
                </Card.Body>
                        
                    </Card>
                </Row>
                    
                        
                
                    

                    {/* review */}
        
            </Fragment>
        );
    }
    else {
        return(
                        <Fragment>
                          <PageTitle activeMenu="Activate Account" motherMenu="Account" />
                          
                          <Row>
                          <Col xl={6} className="col-xxl-12">
                              <Card>
                                <Card.Header className="d-block">
                                  <Card.Title>Account Status</Card.Title>
                                  
                                </Card.Header>
                                <Card.Body>
                                  
                                    <Alert
                                      variant='danger'
                                      className="solid alert-square"
                                    >
                                      <strong> Account is not activated for this User !!!</strong> please activate now using given link.
                                    </Alert>
                                
                                </Card.Body>
                              </Card>
                            </Col>
                            <Col xl={6} className="col-xxl-12">
                              <Card>
                                <Card.Body>
                                  <Link to="/activate-account"> Click here to activate </Link>
                                </Card.Body>
                              
                              </Card>
                              
                            </Col>
                          </Row>
                        </Fragment>
                      )
    }
};



export default  AccountStatus ;
