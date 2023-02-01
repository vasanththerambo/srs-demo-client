import React, { Fragment, useState ,useEffect,useContext } from "react";
import { Row, Card, Col, Alert} from "react-bootstrap";
import { Link ,useHistory} from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import PageTitle from "../../../layouts/PageTitle";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from 'axios';

import { ThemeContext } from "../../../../context/ThemeContext";
import { educationdata } from "../../educationdata";
import Constants from "../../../../config/constants";

// import { setUserProfile } from "../../../../store/actions/UserProfileActions";

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

const FormAdvanceProfileEdit = (props) => {

  const history=useHistory();
  const dispatch=useDispatch();

  const userProfile =useSelector(state=>state.userProfile.profile);
  
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

 
  const [showPassword, setShowPassword] = useState(false);

  const userDetails = useSelector(state => state.auth.user);
  const backendPath=`${Constants.url_postProfile}/${userProfile._id}`;

  // const token =userDetails.idToken;
  // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;


  let errorsObj= {aboutMe:'',countryLiving:'',currentLocation:'',nativePlace:'',diet:'' ,smoking1:'',drinking:'',
      occupation:'',annualIncome:'' ,aboutMyFamily:'', occupationFather:'' ,occupationMother:'' , course:'', discipline:'', residential:'',contact1:'',contact2:''  };
  const [errors, seterrors] = useState({errorsObj});
  
  const [aboutMe, setaboutMe] = useState(userProfile.aboutMe);
  const [countryLiving, setcountryLiving] = useState(userProfile.countryLiving);
  const [currentLocation, setcurrentLocation] = useState(userProfile.currentLocation);
  const [nativePlace, setnativePlace] = useState(userProfile.nativePlace);
  const [diet, setdiet] = useState(userProfile.diet);
  const [smoking, setsmoking] = useState(userProfile.smoking);
  const [drinking, setdrinking] = useState(userProfile.drinking);

  const [occupation, setoccupation] = useState(userProfile.occupation);
  const [annualIncome, setannualIncome] = useState(userProfile.annualIncome);
  const [aboutMyFamily, setaboutMyFamily] = useState(userProfile.family[0].aboutMyFamily);
  const [occupationFather, setoccupationFather] = useState(userProfile.family[0].occupationFather);
  const [occupationMother, setoccupationMother] = useState(userProfile.family[0].occupationMother);
  const [residential, setresidential] = useState(userProfile.residential)
  const [contact1, setcontact1] = useState(userProfile.contact.contact1);
  const [contact2, setcontact2] = useState(userProfile.contact.contact2);
  
  const [{ course, discipline }, setData] = useState({course:userProfile.education[0].course,discipline:userProfile.education[0].discipline});
  const courses = educationdata.map((course) => {
    return (
      <option key={course.name} value={course.name}>
        {course.name}
      </option> 
    )
  })

    const disciplines = educationdata.find(item => item.name === course)?.disciplines.map((discipline) => {
    return (
      <option key={discipline} value={discipline}>
        {discipline}
      </option>
    )
  })
    const handleCourseChange = (e) => {
    setData(data=>({discipline:"",course:e.target.value}))
  }

    const handleDisciplineChange = (e) => {
        setData(data => ({ ...data, discipline: e.target.value }))
    }

  const handleSubmit=(e)=>{
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
          if (aboutMe === '') {
              errorObj.aboutMe = 'You need to fill about Yourself';
              error = true;
          }
          if (countryLiving === '') {
            errorObj.countryLiving = 'Country of Living is Required';
            error = true;
          }
          if (currentLocation === '') {
            errorObj.currentLocation = 'Current Location is Required';
            error = true;
          }
          if (nativePlace === '') {
            errorObj.nativePlace = 'Native Place is Required';
            error = true;
          }
          if (diet === '') {
            errorObj.diet = 'Diet is Required';
            error = true;
          }
          if (smoking === '') {
            errorObj.smoking = 'Do you Smoke or Not';
            error = true;
          }
          if (drinking === '') {
            errorObj.drinking = 'Do You Drink Alcholol or Not';
            error = true;
          }
          if (occupation === '') {
            errorObj.occupation = 'Your Occupation is Required';
            error = true;
          }
          if (annualIncome === '') {
            errorObj.annualIncome = 'Annual Income is Required';
            error = true;
          }
          if (aboutMyFamily === '') {
            errorObj.aboutMyFamily = 'Please Tell something about Your Family';
            error = true;
          }
          if (occupationFather === '') {
            errorObj.occupationFather = "Your Father's Occupation is Required";
            error = true;
          }
          if (occupationMother === '') {
            errorObj.occupationMother = "Your Mother's Occupation is Required";
            error = true;
          }
          if (course === '') {
            errorObj.course = "Please Specify Your Education";
            error = true;
          }
          if (discipline === '') {
            errorObj.discipline = "Also Specify the Discipline of Your Course";
            error = true;
          }
          if (residential === '') {
            errorObj.residential = 'Your Residential Address is Required';
            error = true;
          }
          if (contact1 === '') {
            errorObj.contact1 = 'Please Provide a Contact Number';
            error = true;
          }
          if (contact2 === '') {
            errorObj.contact2 = 'Please Provide Another Contact Number';
            error = true;
          }
          else if(contact1===contact2){
            errorObj.contact2 = 'Please Provide a Different Contact Number';
            error = true;
          }
    
        seterrors(errorObj);

        if(error){
          return;
        }
        else{
         
             
          const family=[{aboutMyFamily,occupationFather,occupationMother}];
          const education=[{course,discipline}];
          const contact={contact1,contact2};
          
          const profileData={aboutMe,countryLiving,currentLocation,nativePlace,diet,smoking,drinking,occupation , annualIncome , residential,contact,family,education };
          
          axios.patch(backendPath,profileData).then ((response)=>{
              history.push('/dashboard');
          }).catch((error)=>{
            console.log(error);
          })

          // axios.get(backendPath).then((response)=>{
          //   // dispatch(setUserProfile(response.data));
            
          // }).catch((error)=>{
          //   console.log(error);
          // })

        }
  }

  if(userProfile.advanceProfileStatus){

 
  return (
    <Fragment>
      <PageTitle
        activeMenu="Advance"
        motherMenu="Profile"
        pageContent="Advance"
      />

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Edit Your Additional Details</h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                <form
                  className="form-valide"
                  action="#"
                  method="post"
                  onSubmit={handleSubmit}
                >
                    <h4> Info About Yourself</h4>
                  <div className="row">
                    <div className="col-xl-6">
                        <div className="form-group mb-3 row">
                            <label
                            className="col-lg-4 col-form-label"
                            htmlFor="val-about-me"
                            >
                            About Me <span className="text-danger">*</span>
                            </label>
                            <div className="col-lg-6">
                                <textarea
                                    className="form-control"
                                    id="val-about-me"
                                    name="val-about-me"
                                    rows="5"
                                    placeholder="Tell us something about yourself"
                                    value={aboutMe}
                                    onChange={(e)=>setaboutMe(e.target.value)}
                                ></textarea>
                            </div>
                            {errors.aboutMe && <div className="text-danger fs-12">{errors.aboutMe}</div>}
                        </div>
                        <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-country-living"
                        >
                          Country Of Living
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <select
                            className="form-control"
                            id="val-country-living"
                            name="val-country-living"
                            value={countryLiving}
                            onChange={(e)=>setcountryLiving(e.target.value)}
                          >
                            <option value="">Please select</option>
                            <option value="India">India</option>
                            <option value="UAE">UAE</option>
                            <option value="USA">USA</option>
                            <option value="UK">UK</option>
                            <option value="Afghanistan">Afghanistan</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Australia">Australia</option>
                            <option value="Bahrain">Bahrain</option>
                            <option value="Bangladesh"> Bangladesh</option>
                            <option value="Belgium">Belgium</option>
                            <option value="Brazil">Brazil</option>
                            <option value="Canada">Canada</option>
                            <option value="Chile">Chile</option>
                            <option value="China">China</option>
                            <option value="Cuba">Cuba</option>
                            <option value="Denmark">Denmark</option>
                            <option value="Egypt">Egypt </option>
                            <option value="France">France</option>
                            <option value="Germany">Germany</option>
                            <option value="Greece">Greece</option>
                            <option value="Italy">Italy</option>
                            <option value="Ireland">Ireland</option>
                            <option value="Japan">Japan</option>
                            <option value="Kenya">Kenya</option>
                            <option value="Korea">Korea</option>
                            <option value="Kuwait">Kuwait</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Nepal">Nepal</option>
                            <option value="New Zealand">New Zealand</option>
                            <option value="Portugal">Portugal</option>
                            <option value="Russia">Russia</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Spain">Spain</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Others">Others</option>
                            
                          </select>
                        </div>
                        {errors.countryLiving && <div className="text-danger fs-12">{errors.countryLiving}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-native-place"
                        >
                          Place Of Birth
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <select
                            className="form-control"
                            id="val-native-place"
                            name="val-native-place"
                            value={nativePlace}
                            onChange={(e)=>setnativePlace(e.target.value)}
                          >
                            <option value="">Please select</option>
                            <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                            <option value="Kollam">Kollam</option>
                            <option value="Pathanamthitta">Pathanamthitta</option>
                            <option value="Alappuzha">Alappuzha</option>
                            <option value="Kottayam">Kottayam</option>
                            <option value="Idukki">Idukki</option>
                            <option value="Eranakulam">Eranakulam</option>
                            <option value="Thrissur">Thrissur</option>
                            <option value="Palakkadu">Palakkadu</option>
                            <option value="Kozhikkodu">Kozhikkodu</option>
                            <option value="Malappuram">Malappuram</option>
                            <option value="Wayanadu">Wayanadu</option>
                            <option value="Kannur">Kannur</option>
                            <option value="Kasarkodu">Kasarkodu</option>
                            <option value="Others">Others</option>
                          </select>
                        </div>
                        {errors.nativePlace && <div className="text-danger fs-12">{errors.nativePlace}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-current-location"
                        >
                          Current Location
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <select
                            className="form-control"
                            id="val-current-location"
                            name="val-current-location"
                            value={currentLocation}
                            onChange={(e)=>setcurrentLocation(e.target.value)}
                          >
                            <option value="">Please select</option>
                            <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                            <option value="Kollam">Kollam</option>
                            <option value="Pathanamthitta">Pathanamthitta</option>
                            <option value="Alappuzha">Alappuzha</option>
                            <option value="Kottayam">Kottayam</option>
                            <option value="Idukki">Idukki</option>
                            <option value="Eranakulam">Eranakulam</option>
                            <option value="Thrissur">Thrissur</option>
                            <option value="Palakkadu">Palakkadu</option>
                            <option value="Kozhikkodu">Kozhikkodu</option>
                            <option value="Malappuram">Malappuram</option>
                            <option value="Wayanadu">Wayanadu</option>
                            <option value="Kannur">Kannur</option>
                            <option value="Kasarkodu">Kasarkodu</option>
                            <option value="Others">Others</option>
                          </select>
                        </div>
                        {errors.currentLocation && <div className="text-danger fs-12">{errors.currentLocation}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-diet"
                        >
                          Diet
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <select
                            className="form-control"
                            id="val-diet"
                            name="val-diet"
                            value={diet}
                            onChange={(e)=> setdiet(e.target.value)}
                          >
                            <option value="">Please select</option>
                            <option value="Vegetarian">Vegetarian </option>
                            <option value="Non Vegetarian">Non Vegetarian </option>
                            <option value="Others">Others</option>
                          </select>
                        </div>
                        {errors.diet && <div className="text-danger fs-12">{errors.diet}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-smoking"
                        >
                          Smoking
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <select
                            className="form-control"
                            id="val-smoking"
                            name="val-smoking"
                            value={smoking}
                            onChange={(e)=> setsmoking(e.target.value)}
                          >
                            <option value="">Please select</option>
                            <option value= "No">No </option>
                            <option value="Yes">Yes </option>
                          </select>
                        </div>
                        {errors.smoking && <div className="text-danger fs-12">{errors.smoking}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-drinking"
                        >
                          Drinking
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <select
                            className="form-control"
                            id="val-drinking"
                            name="val-drinking"
                            value={drinking}
                            onChange={(e)=> setdrinking(e.target.value)}
                          >
                            <option value="">Please select</option>
                            <option value= "No">No </option>
                            <option value="Yes">Yes </option>
                          </select>
                        </div>
                        {errors.drinking && <div className="text-danger fs-12">{errors.drinking}</div>}
                      </div>

                      
                                     
                    </div>
                    <div className="col-xl-6">
                      <h4>Occupation and Family Details</h4>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-your-occupation"
                        >
                          Your Occupation
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <select
                            className="form-control"
                            id="val-your-occupation"
                            name="val-your-occupation"
                            value={occupation}
                            onChange={(e)=>setoccupation(e.target.value)}
                          >
                            <option value="">Please select</option>
                            <option value="Administrative and Support Services">Administrative and Support Services</option>
                            <option value="Advertising">Advertising</option>
                            <option value="Aerospace">Aerospace</option>
                            <option value="Agriculture">Agriculture</option>
                            <option value="Banking and Financial Services">Banking and Financial Services</option>
                            <option value="Civil Services">Civil Services</option>
                            <option value="Company Secretary">Company Secretary</option>
                            <option value="Consultancy Services">Consultancy Services</option>
                            <option value="Defence">Defence</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Govt Employee">Govt Employee</option>
                            <option value="Home Maker">Home Maker</option>
                            <option value="IT-Hardware">IT-Hardware</option>
                            <option value="IT-Software">IT-Software</option>
                            <option value="Journalism /Publishing">Journalism /Publishing</option>
                            <option value="Legal Profession">Legal Profession</option>
                            <option value="Management">Management</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Medical Profession">Medical Profession</option>
                            <option value="Real Estate Services">Real Estate Services</option>
                            <option value="Research and Development Scholar">Research and Development Scholar</option>
                            <option value="Self Employed /Business">Self Employed /Business</option>
                            <option value="Student">Student</option>
                            <option value="Teaching Professional">Teaching Professional</option>
                            <option value="Technician">Technician</option>
                            <option value="Others">Others</option>
                            <option value="Not Working Currently">Not Working Currently</option>
                            
                          </select>
                        </div>
                        {errors.occupation && <div className="text-danger fs-12">{errors.occupation}</div>}
                      </div>
                      
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-annual-income"
                        >
                          Annual Income
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-annual-income"
                            name="val-annual-income"
                            placeholder="Enter Your Annual Income in Digits"
                            value={ annualIncome}
                            onChange={(e)=>setannualIncome( e.target.value)}

                          />
                        </div>
                        {errors.annualIncome && <div className="text-danger fs-12">{errors.annualIncome}</div>}
                      </div>
                      
                      <div className="form-group mb-3 row">
                            <label
                            className="col-lg-4 col-form-label"
                            htmlFor="val-about-me"
                            >
                            About My Family <span className="text-danger">*</span>
                            </label>
                            <div className="col-lg-6">
                                <textarea
                                    className="form-control"
                                    id="val-about-me"
                                    name="val-about-me"
                                    rows="5"
                                    placeholder="Tell us something about your Family"
                                    value={aboutMyFamily}
                                    onChange={(e)=>setaboutMyFamily(e.target.value)}
                                ></textarea>
                            </div>
                            {errors.aboutMyFamily && <div className="text-danger fs-12">{errors.aboutMyFamily}</div>}
                        </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-father-occupation"
                        >
                          Father's Occupation
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <select
                            className="form-control"
                            id="val-father-occupation"
                            name="val-father-occupation"
                            value={occupationFather}
                            onChange={(e)=>setoccupationFather(e.target.value)}
                          >
                            <option value="">Please select</option>
                            <option value="Administrative and Support Services">Administrative and Support Services</option>
                            <option value="Advertising">Advertising</option>
                            <option value="Aerospace">Aerospace</option>
                            <option value="Agriculture">Agriculture</option>
                            <option value="Banking and Financial Services">Banking and Financial Services</option>
                            <option value="Civil Services">Civil Services</option>
                            <option value="Company Secretary">Company Secretary</option>
                            <option value="Consultancy Services">Consultancy Services</option>
                            <option value="Defence">Defence</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Govt Employee">Govt Employee</option>
                            <option value="Home Maker">Home Maker</option>
                            <option value="IT-Hardware">IT-Hardware</option>
                            <option value="IT-Software">IT-Software</option>
                            <option value="Journalism /Publishing">Journalism /Publishing</option>
                            <option value="Legal Profession">Legal Profession</option>
                            <option value="Management">Management</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Medical Profession">Medical Profession</option>
                            <option value="Real Estate Services">Real Estate Services</option>
                            <option value="Research and Development Scholar">Research and Development Scholar</option>
                            <option value="Retired from Govt. Service">Retired from Govt. Service</option>
                            <option value="Self Employed /Business">Self Employed /Business</option>
                            <option value="Student">Student</option>
                            <option value="Teaching Professional">Teaching Professional</option>
                            <option value="Technician">Technician</option>
                            <option value="Others">Others</option>
                            <option value="Not Working Currently">Not Working Currently</option>
                            <option value="Not Applicable">Not Applicable</option>
                            
                          </select>
                        </div>
                        {errors.occupationFather && <div className="text-danger fs-12">{errors.occupationFather}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-mother-occupation"
                        >
                          Mothers's Occupation
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <select
                            className="form-control"
                            id="val-mother-occupation"
                            name="val-mother-occupation"
                            value={occupationMother}
                            onChange={(e)=>setoccupationMother(e.target.value)}
                          >
                            <option value="">Please select</option>
                            <option value="Administrative and Support Services">Administrative and Support Services</option>
                            <option value="Advertising">Advertising</option>
                            <option value="Aerospace">Aerospace</option>
                            <option value="Agriculture">Agriculture</option>
                            <option value="Banking and Financial Services">Banking and Financial Services</option>
                            <option value="Civil Services">Civil Services</option>
                            <option value="Company Secretary">Company Secretary</option>
                            <option value="Consultancy Services">Consultancy Services</option>
                            <option value="Defence">Defence</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Govt Employee">Govt Employee</option>
                            <option value="Home Maker">Home Maker</option>
                            <option value="IT-Hardware">IT-Hardware</option>
                            <option value="IT-Software">IT-Software</option>
                            <option value="Journalism /Publishing">Journalism /Publishing</option>
                            <option value="Legal Profession">Legal Profession</option>
                            <option value="Management">Management</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Medical Profession">Medical Profession</option>
                            <option value="Real Estate Services">Real Estate Services</option>
                            <option value="Research and Development Scholar">Research and Development Scholar</option>
                            <option value="Retired from Govt. Service">Retired from Govt. Service</option>
                            <option value="Self Employed /Business">Self Employed /Business</option>
                            <option value="Student">Student</option>
                            <option value="Teaching Professional">Teaching Professional</option>
                            <option value="Technician">Technician</option>
                            <option value="Others">Others</option>
                            <option value="Not Working Currently">Not Working Currently</option>
                            <option value="Not Applicable">Not Applicable</option>
                            
                          </select>
                        </div>
                        {errors.occupationMother && <div className="text-danger fs-12">{errors.occupationMother}</div>}
                      </div>
                      <h4>Educational Details </h4>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-drinking"
                        >
                          Select Your Highest Education 
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <select
                            className="form-control"
                            id="val-drinking"
                            name="val-drinking"
                            value={course}
                            onChange={handleCourseChange}
                          >
                            <option value="">Please select</option>
                            {courses}
                          </select>
                        </div>
                        {errors.course && <div className="text-danger fs-12">{errors.course}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-drinking"
                        >
                          Select Disciple of Your Course 
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <select
                            className="form-control"
                            id="val-drinking"
                            name="val-drinking"
                            value={discipline}
                            onChange={handleDisciplineChange}
                          >
                            <option value="">Please select</option>
                            {disciplines}
                          </select>
                        </div>
                        {errors.discipline && <div className="text-danger fs-12">{errors.discipline}</div>}
                      </div>
                      <h4>Contact Information</h4>
                      <div className="form-group mb-3 row">
                            <label
                            className="col-lg-4 col-form-label"
                            htmlFor="val-residential"
                            >
                            Residential Address<span className="text-danger">*</span>
                            </label>
                            <div className="col-lg-6">
                                <textarea
                                    className="form-control"
                                    id="val-residential"
                                    name="val-residential"
                                    rows="7"
                                    placeholder="Enter Your Permanent Address"
                                    value={residential}
                                    onChange={(e)=>setresidential(e.target.value)}
                                ></textarea>
                            </div>
                            {errors.residential && <div className="text-danger fs-12">{errors.residential}</div>}
                        </div>

                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-contact1"
                        >
                          Contact Number 
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="number"
                            className="form-control"
                            id="val-contact1"
                            name="val-contact1"
                            placeholder="Enter Primary Contact Number"
                            value={contact1}
                            onChange={(e)=>setcontact1(e.target.value)}
                          />
                        </div>
                        {errors.contact1 && <div className="text-danger fs-12">{errors.contact1}</div>}
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-contact1"
                        >
                          Additional Contact Number 
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="number"
                            className="form-control"
                            id="val-contact2"
                            name="val-contact2"
                            placeholder="Enter Another  Contact Number"
                            value={contact2}
                            onChange={(e)=>setcontact2(e.target.value)}
                          />
                        </div>
                        {errors.contact2 && <div className="text-danger fs-12">{errors.contact2}</div>}
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
  else if(userProfile.firstName){
    return(
		<Fragment>
			<PageTitle activeMenu="Profile" motherMenu="App" />
			
			<Row>
			<Col xl={6} className="col-xxl-12">
            <Card>
              <link to="/form-add-advance-info">
              
            <Card.Header className="d-block">
              <Card.Title>Profile Status</Card.Title>
              
            </Card.Header>
            <Card.Body>
              
                <Alert
                  variant='primary'
                  className="solid alert-square"
                >
                  <strong> you didn't fill up advance profile  !!!</strong> Please Fill up Your Additional Profile Details.
                </Alert>
            
                </Card.Body>
                </link>
          </Card>
        </Col>
		<Col xl={6} className="col-xxl-12">
			<Card>
				<Card.Body>
					<Link to="/form-add-advance-info"> Click Here to Fill up Additional Profile Details </Link>
				</Card.Body>
			
			</Card>
			
		</Col>
			</Row>
		</Fragment>
	)
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
                  <strong> profile not found !!!</strong> Please Fill up Your Profile.
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



export default FormAdvanceProfileEdit;
