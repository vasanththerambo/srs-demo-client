import React, { Fragment, useState , useEffect,useContext} from "react";
import { Link, useHistory } from "react-router-dom";
import {useDispatch ,useSelector} from 'react-redux';
import PageTitle from "../../../layouts/PageTitle";
import { Formik } from "formik";
import * as Yup from "yup";
import { Row, Card, Col, Alert } from "react-bootstrap";
import axios from 'axios';


import MeterialDate from '../Pickers/MetarialDate';
import { reldata } from "../../reldata";
import Constants from '../../../../config/constants'
// import {setUserProfile} from '../../../../store/actions/UserProfileActions'
import { ThemeContext } from "../../../../context/ThemeContext";


const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Your username must consist of at least 3 characters ")
    .max(50, "Your username must consist of at least 3 characters ")
    .required("Please enter a username"),
  password: Yup.string()
    .min(5, "Your password must be at least 5 characters long")
    .max(50, "Your password must be at least 5 characters long")
    .required("Please provide a password"),
});






const FormBasicProfileAdd = () => {
  const history=useHistory();
  const dispatch=useDispatch();


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


  const [isProfileExists, setisProfileExists] = useState(false);

  const userDetails = useSelector(state => state.auth.user);
 

  // const token =userDetails.idToken;
  // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(()=>{
    axios.get(Constants.url_getProfiles).then((response)=>{
			const tempProfile= response.data.data.find((profile)=>profile.email===userDetails.email);
			if(tempProfile){
				setisProfileExists(true)
			}
      else{
        setisProfileExists(false);
      }
		 	
		}).catch((error)=>{
			console.log(error)
		})

  },[])
  

  let errorsObj={firstName:'',lastName:'',email:'',gender:'',dob:'',religion:'',caste:'',height:'',weight:'',complexion:'',bodytype:'',physicalStatus:'',bloodGroup:'',mothertongue:'',languages:''};
  const [errors, seterrors] = useState({errorsObj});

  const [firstName, setfirstName] = useState('');
  const [lastName, setlasttName] = useState('');
  const [email, setemail] = useState(userDetails.email);
  const [gender, setgender] = useState('');
  const [dob, setdob] = useState(new Date());
  const [height, setheight] = useState('');
  const [weight, setweight] = useState('');
  const [complexion, setcomplexion] = useState('');
  const [bodytype, setbodytype] = useState('');
  const [physicalStatus, setphysicalStatus] = useState('');
  const [bloodGroup, setbloodGroup] = useState('');
  const [mothertongue, setmothertongue] = useState('');
  const [languages, setlanguages] = useState([]);


  
  const [{ religion, caste }, setData] = useState({religion:'',caste:''}); 
  const religions = reldata.map((religion) => {
    return (
      <option key={religion.name} value={religion.name}>
        {religion.name}
      </option> 
    )
  })
  const castes = reldata.find(item => item.name === religion)?.castes.map((caste) => {
    return (
      <option key={caste} value={caste}>
        {caste}
      </option>
    )
  })
  
  const handleReligionChange = (e) => {
    setData(data=>({caste:"",religion:e.target.value}))
  }

  const handleCastChange = (e) => {
    setData(data=>({...data, caste:e.target.value}))
  }

  const handleLanguages=(e)=>{
    const {value,checked} = e.target;

    // console.log(`${value} is ${checked}`);

    if(checked){
      setlanguages([...languages,value]);
    }
    else{
      setlanguages(languages.filter((e) => e !== value))
    }
    
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
          if (firstName === '') {
              errorObj.firstName = 'First Name is Required';
              error = true;
          }
          if (lastName === '') {
            errorObj.lastName = 'Last Name is Required';
            error = true;
          }
          if (email === '') {
            errorObj.email = 'email Id is Required';
            error = true;
          }
          if (gender === '') {
            errorObj.gender = 'Gender is Required';
            error = true;
          }
          if (dob === '') {
            errorObj.dob = 'Date of Birth is Required';
            error = true;
          }
          if (height === '') {
            errorObj.height = 'Height is Required';
            error = true;
          }
          if (weight === '') {
            errorObj.weight = 'Weight is Required';
            error = true;
          }
          if (complexion === '') {
            errorObj.complexion = 'Complexion is Required';
            error = true;
          }
          if (bodytype === '') {
            errorObj.bodytype = 'Body Type is Required';
            error = true;
          }
          if (physicalStatus === '') {
            errorObj.physicalStatus = 'Physical Status is Required';
            error = true;
          }
          if (bloodGroup === '') {
            errorObj.bloodGroup = 'Blood Group is Required';
            error = true;
          }
          if (mothertongue === '') {
            errorObj.mothertongue = 'Mothertongue is Required';
            error = true;
          }
          if (languages.length ===0) {
            errorObj.languages = 'At least enter one Language';
            error = true;
          }
          if (religion === '') {
            errorObj.religion = 'Religion is Required';
            error = true;
          }
          if (caste === '') {
            errorObj.caste = 'Caste is Required';
            error = true;
          }

          seterrors(errorObj);

          if(error){
            return
          }
          else{
            const profileData={firstName,lastName,email,gender,religion,caste,dob,height,weight,complexion,bodytype,physicalStatus,bloodGroup,mothertongue,languages}
            axios.post(Constants.url_postProfile ,profileData).then((response)=>{
              // dispatch(setUserProfile(profileData));
              history.push('/dashboard');
            }).catch((error)=>{
              console.log(error)
            })
            
          }
          
    
  }

  if(!isProfileExists){
  return (
    <Fragment>
      <PageTitle
        activeMenu="Basic"
        motherMenu="Profile"
        pageContent="Basic"
      />

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Please Enter Following Details</h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                <form
                  className="form-valide"
                  action="#"
                  method="post"
                  onSubmit={handleSubmit}
                >
                  <h4>Personal Information</h4>
                  <div className="row">
                    <div className="col-xl-6">
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-firstName"
                        >
                          First Name
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-firstName"
                            name="val-firstName"
                            placeholder="Enter your First Name.."
                            value={firstName}
                            onChange={(e)=> setfirstName(e.target.value) }
                          />
                          
                        </div>
                        {errors.firstName && <div className="text-danger fs-12">{errors.firstName}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-lastName"
                        >
                          Last Name <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-lastName"
                            name="val-lastName"
                            placeholder="Your Second Name.."
                            value={lastName}
                            onChange={(e)=>setlasttName(e.target.value)}
                          />
                        </div>
                        {errors.lastName && <div className="text-danger fs-12">{errors.lastName}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-emailId"
                        >
                          email Id
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="email"
                            className="form-control"
                            id="val-email"
                            name="val-email"
                            placeholder="Enter a Valid email Id.."
                            value={email}
                            onChange={(e)=>setemail(e.target.value)}
                          />
                        </div>
                        {errors.email && <div className="text-danger fs-12">{errors.email}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-gender"
                        >
                          Gender 
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                        <select
                            className="form-control"
                            id="val-gender"
                            name="val-gender"
                            value={gender}
                            onChange={(e)=>setgender(e.target.value)}
                          >
                            <option value="">Please select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                          
                        </div>
                        {errors.gender && <div className="text-danger fs-12">{errors.gender}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-confirm-password"
                        >
                          Date Of Birth
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <div className="form-control">
                            <MeterialDate dob={dob} setdob={setdob}/>
                          </div>
                          
                        </div>
                        {errors.dob && <div className="text-danger fs-12">{errors.dob}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-religion"
                        >
                          Religion
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <select
                            className="form-control"
                            id="val-religion"
                            name="val-religion"
                            value={religion}
                            onChange={handleReligionChange}
                          >
                            <option value="">Please select</option>
                            {religions}
                          </select>
                        </div>
                        {errors.religion && <div className="text-danger fs-12">{errors.religion}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-caste"
                        >
                          Caste
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <select
                            className="form-control"
                            id="val-caste"
                            name="val-caste"
                            value={caste}
                            onChange={handleCastChange}

                          >
                            <option value="">Please select</option>
                            {castes}
                          </select>
                        </div>
                        {errors.caste && <div className="text-danger fs-12">{errors.caste}</div>}
                      </div>

                      {/* <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-suggestions"
                        >
                          Suggestions <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <textarea
                            className="form-control"
                            id="val-suggestions"
                            name="val-suggestions"
                            rows="5"
                            placeholder="What would you like to see?"
                          ></textarea>
                        </div>
                      </div> */}
                    </div>
                    <div className="col-xl-6">
                      <h4>Physical Info</h4>
                      
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-height"
                        >
                          Height
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-height"
                            name="val-height"
                            placeholder="height in cm"
                            value={height}
                            onChange={(e)=>setheight(e.target.value)}
                          />
                        </div>
                        {errors.height && <div className="text-danger fs-12">{errors.height}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-weight"
                        >
                          Weight
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-weight"
                            name="val-weight"
                            placeholder="weight in kg"
                            value={weight}
                            onChange={(e)=>setweight(e.target.value)}
                          />
                        </div>
                        {errors.weight && <div className="text-danger fs-12">{errors.weight}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-complexion"
                        >
                          Complexion 
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                        <select
                            className="form-control"
                            id="val-complexion"
                            name="val-complexion"
                            value={complexion}
                            onChange={(e)=>setcomplexion(e.target.value)}
                          >
                            <option value="">Please select</option>
                            <option value="fair">Fair</option>
                            <option value="medium">Medium</option>
                            <option value="olive">Olive</option>
                            <option value="brown">Brown</option>
                            <option value="others">Others</option>

                          </select>
                          
                        </div>
                        {errors.complexion && <div className="text-danger fs-12">{errors.complexion}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-bodytype"
                        >
                          Body Type
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                        <select
                            className="form-control"
                            id="val-bodytype"
                            name="val-bodytype"
                            value={bodytype}
                            onChange={(e)=>setbodytype(e.target.value)}
                          >
                            <option value="">Please select</option>
                            <option value="athletic">Athletic</option>
                            <option value="average">Average</option>
                            <option value="heavy">Heavy</option>
                            <option value="slim">Slim</option>
                            <option value="others">Others</option>

                          </select>
                          
                        </div>
                        {errors.bodytype && <div className="text-danger fs-12">{errors.bodytype}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-physicalStatus"
                        >
                          Physical Status
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                        <select
                            className="form-control"
                            id="val-physicalStatus"
                            name="val-physicalStatus"
                            value={physicalStatus}
                            onChange={(e)=>setphysicalStatus(e.target.value)}
                          >
                            <option value="">Please select</option>
                            <option value="normal">Normal</option>
                            <option value="Physically Challenged">Physically Challenged</option>
                            <option value="others">Others</option>

                          </select>
                          
                        </div>
                        {errors.physicalStatus && <div className="text-danger fs-12">{errors.physicalStatus}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-bloodGroup"
                        >
                          Blood Group
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                        <select
                            className="form-control"
                            id="val-bloodGroup"
                            name="val-bloodGroup"
                            value={bloodGroup}
                            onChange={(e)=>setbloodGroup(e.target.value)}
                          >
                            <option value="">Please select</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>

                            <option value="others">Others</option>

                          </select>
                          
                        </div>
                        {errors.bloodGroup && <div className="text-danger fs-12">{errors.bloodGroup}</div>}
                      </div>
                      <h4>Language Details </h4> 
                      
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-bloodGroup"
                        >
                          Mothertongue
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                        <select
                            className="form-control"
                            id="val-mothertongue"
                            name="val-mothertongue"
                            value={mothertongue}
                            onChange={(e)=> setmothertongue(e.target.value)}
                          >
                            <option value="">Please select</option>
                            <option value="malayalam">Malayalam</option>
                            <option value="tamil">Tamil</option>
                            <option value="hindi">Hindi</option>
                            <option value="english">English</option>
                            <option value="others">Others</option>

                          </select>
                          
                        </div>
                        {errors.mothertongue && <div className="text-danger fs-12">{errors.mothertongue}</div>}
                      </div>
                      <div className="col-xl-6 col-lg-6">
                        <div className="card">
                          <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-bloodGroup"
                          >
            
                            Languages Known
                          </label>
            
                          <div className="card-body">
                            <div className="basic-form">
                              
                                <div className="form-group">
                                  <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        value="malayalam"
                                        onChange={handleLanguages}
                                      />
                                      Malayalam
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        value="tamil"
                                        onChange={handleLanguages}
                                      />
                                      Tamil
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        value="hindi"
                                        onChange={handleLanguages}
                                        
                                      />
                                      Hindi
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        value="english"
                                        onChange={handleLanguages}
                                        
                                      />
                                      English
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline">
                                    <label className="form-check-label">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        value="others"
                                        onChange={handleLanguages}
                                        
                                      />
                                      Others
                                    </label>
                                  </div>
                                </div>
                            </div>
                          </div>
                        </div>
                        {errors.languages && <div className="text-danger fs-12">{errors.languages}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <div className="col-lg-8 ms-auto">
                          <button type="submit" className="btn btn-primary">
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </Fragment>
  );
                    }
                    else{
                      return(
                        <Fragment>
                          <PageTitle activeMenu="Basic" motherMenu="Profile" />
                          
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
                                      <strong> Basic Profile already exists for this User !!!</strong> Please Edit your Profile if you like.
                                    </Alert>
                                
                                </Card.Body>
                              </Card>
                            </Col>
                            <Col xl={6} className="col-xxl-12">
                              <Card>
                                <Card.Body>
                                  <Link to="/form-edit-basic-profile"> Click Here to Edit your  Profile </Link>
                                </Card.Body>
                              
                              </Card>
                              
                            </Col>
                          </Row>
                        </Fragment>
                      )
                    }
};

export default FormBasicProfileAdd;
