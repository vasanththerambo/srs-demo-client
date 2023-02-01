import React, { Fragment, useState, useEffect, useContext } from "react";
import { Row, Card, Col, Alert ,Button } from "react-bootstrap";
import { Link ,useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";

import { ThemeContext } from "../../../../context/ThemeContext";
import PageTitle from "../../../layouts/PageTitle";

import Constants from "../../../../config/constants";
import logo from '../../../../images/logo.jpg';

const ActivateAccount = () => {
  const history = useHistory();

  const userProfile = useSelector(state => state.userProfile.profile);
  const userDetails = useSelector(state => state.auth.user);
  
  
  // const userDetails= JSON.parse( localStorage.getItem('userDetails'));
  // const token=userDetails.token;
  // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;


  const [paymentOptions, setpaymentOptions] = useState({});
  const [paymentId, setpaymentId] = useState("");
  const [orderId, setorderId] = useState("");
  const [isPaymentSuccess, setisPaymentSuccess] = useState(false);


  useEffect(()=>{
    
    axios.get(Constants.url_activateAccount).then((response)=>{
        setpaymentOptions(response.data.paymentOptions);

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
  const handleScript=(src)=>{
    return new Promise(resolve => {
      const script= document.createElement('script');
      script.src=src;
      
      
      script.onload =()=>{
        resolve(true);
      }
      script.onerror=()=>{
        resolve(false);
      }
      document.body.appendChild(script);
    })
    
  }
  const handleRazorpay = async () => {
    const res = await handleScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('razorpay failed to load');
      return;
    }

    const options = {
      "key": "rzp_test_EcAdh67KBaMQHm", // Enter the Key ID generated from the Dashboard
      "amount": paymentOptions.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": paymentOptions.currency,
      "name": "SRS Matrimony.",
      "description": "Test Transaction",
      "image": logo,
      "order_id": paymentOptions.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": function (response) {
        setpaymentId(response.razorpay_payment_id);
        setorderId(response.razorpay_order_id);
        setisPaymentSuccess(true)
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature)
      },
      "prefill": {
        "name": "Your name",
        "email": "your mail id",
        "contact": "9999999999"
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }
    };
    const paymentObject = new window.Razorpay(options);

    paymentObject.open();
    
  }
  console.log(paymentId, orderId, isPaymentSuccess);

  useEffect(() => {
    if (isPaymentSuccess) {
      const payment = { userId: userDetails._id, paymentId, orderId, paymentDate: new Date() };
      axios.post(Constants.url_activateAccount, payment).then(response => {
       
      }).catch(error => {
        console.log(error);
      })
      
      const profile = { accountStatus: true };
      axios.patch(`${Constants.url_postProfile}/${userProfile._id}`, profile).then(response => {
        history.push('/dashboard');
      }).catch(error=>console.log(error))
      
    }
  }, [isPaymentSuccess]);

  

    if (!userProfile.accountStatus) {
        
    
        return (
            <Fragment>
                <PageTitle activeMenu="Activate Account" motherMenu="Account" />

                <Row>
                    <Card>
                        <Card.Header className="d-block">
                                  <Card.Title>Activate Your Account</Card.Title>
                                  
                        </Card.Header>
                        <Card.Body>
                            In order to activate your account , you need to pay rs 50

                        </Card.Body>
                        <Card.Body>
                            <Button className="me-2" variant="primary" onClick={handleRazorpay}>
                                Pay
                            </Button>
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
                                      variant='success'
                                      className="solid alert-square"
                                    >
                                      <strong> Account is already activated for this User !!!</strong> no need to activate now.
                                    </Alert>
                                
                                </Card.Body>
                              </Card>
                            </Col>
                            <Col xl={6} className="col-xxl-12">
                              <Card>
                                <Card.Body>
                                  <Link to="/"> Click here to go to dash board </Link>
                                </Card.Body>
                              
                              </Card>
                              
                            </Col>
                          </Row>
                        </Fragment>
                      )
    }
};



export default  ActivateAccount ;
