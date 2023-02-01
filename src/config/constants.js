const baseurl = "https://srs-demo.onrender.com";
const Constants = {
  appname: "SRS",
  baseurl: baseurl,

  url_login: baseurl + "/auth/login",
  url_register: baseurl + "/auth/register",
  url_otpverify: baseurl + "/users/login/complete",

  url_userId: baseurl+"/whoAmI",
  url_getProfiles:baseurl+"/api/profiles",
  url_postProfile:baseurl+"/api/profiles",

  url_getInterests:baseurl+"/api/interests",
  url_interestCount: baseurl+"/api/interests/count",

  url_activateAccount: baseurl + "/payment/payment-razorpay",
  url_accountStatus:baseurl+"/payment/payment-details",

  url_customers: baseurl + "api/coaches",
  url_images: baseurl + "images/",
  url_vendor: baseurl + "/api/v1/vendor",
  url_services : baseurl + "/api/v1/service/public",
  url_clinics : baseurl + "/api/v1/vendor/public?category=1",
  url_salons : baseurl + "/api/v1/vendor/public?category=2",
  url_specialists : baseurl + "/api/v1/vendor/public?category=3",
  url_appointments : baseurl  + "/api/v1/appointment",
  url_schedule : baseurl  + "/api/v1/appointment/vendor/",
  url_bookappointment : baseurl + '/api/v1/appointment/customer'
};

export default Constants;
