/*!
* Start Bootstrap - Creative v7.0.6 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Activate SimpleLightbox plugin for portfolio items
    new SimpleLightbox({
        elements: '#portfolio a.portfolio-box'
    });

});

// Cookie stuff

/* Javascript to show and hide cookie banner using localstorage */
/* Shows the Cookie banner */
function showCookieBanner(){
console.log("ShowCookie Banner");
    let cookieBanner = document.getElementById("cb-cookie-banner");
    cookieBanner.style.display = "block";
   }
   
   /* Hides the Cookie banner and saves the value to localstorage */
   function hideCookieBanner(){
    localStorage.setItem("cb_isCookieAccepted", "yes");
    let cookieBanner = document.getElementById("cb-cookie-banner");
    cookieBanner.style.display = "none";
   }
   
   /* Checks the localstorage and shows Cookie banner based on it. */
   function initializeCookieBanner(){
console.log("Initialize Cookie banner");
    let isCookieAccepted = localStorage.getItem("cb_isCookieAccepted");
    if(isCookieAccepted === null)
    {
console.log("Cookie is 'NULL'");
     localStorage.setItem("cb_isCookieAccepted", "no");
     showCookieBanner();
    }
    if(isCookieAccepted === "no"){
console.log("Cookie is 'NO'");
     showCookieBanner();
    }
    else console.log("Cookies are accepted:" + isCookieAccepted);
   }
   
   // Assigning values to window object
   localStorage.setItem("cb_isCookieAccepted", "no");
   window.onload = initializeCookieBanner();
   window.cb_hideCookieBanner = hideCookieBanner;


  //HELPERS FOR FORM DATA SUBMISSION VALIDATION
  function IsValidInput(inputId, input){
    switch(inputId){
        case 'name':
            return input.match(
                /^(\s)*[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*(\s)*$/
              );
        case 'email':
            return input.match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              );
        case 'message':
            return input.match(
                /^(?!\s*$)[a-zA-Z.+\s'-]+$/
              );
        default:
            return false;
    }
  }

  //Global for after submittion
  var hasSubmitted;
  //Input Validation Eventes
  function ValidateInput(inputId, alertId){
      let input = document.getElementById(inputId).value;
      let isValid = IsValidInput(inputId, input);
      if(isValid){
        document.getElementById(alertId).style.display = 'none'
      }
      else if(hasSubmitted){
        document.getElementById(alertId).style.display = 'block'
      }
      return isValid;
  }

  function ClearInputs(){
    document.getElementById("name").value = null;
    document.getElementById("email").value = null;
    document.getElementById("message").value = null;
  }


   // Custom Form submission API 

async function SubmitFormData() {
    document.getElementById('contactSubmitBtn').classList.add('disabled')
    var dsData = null;  
    console.log("Entered SubmitFormData()");
    hasSubmitted  = true;
    let name     = document.getElementById("name").value;
    let email    = document.getElementById("email").value;
    let interest = document.getElementById("message").value;

    let emailValid    = ValidateInput('email','invalidEmailAlert');
    let nameValid     = ValidateInput('name','invalidNameAlert');
    let interestValid = ValidateInput('message','invalidInterestAlert');
    // if all fields valid, submit form
    if(emailValid && nameValid && interestValid){
        const formData = {
            Name : name, 
            Email : email, 
            Interest : interest, 
        };
        const bodyData = {
            datajson : JSON.stringify(formData),
        };
      
        console.log("About to submit a form: " );
        console.log(bodyData);
        
        const res = await fetch('https://sleepnet.appspot.com/api/about/contact/sendemail', {
          method: "POST",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bodyData)
          })
          .then (res => res.json())
          .then(dataBack =>  { 
             console.log("Data Back from SubmitFormPost:" + dataBack);
             ToastMaker("Contact Submitted Successfully!", 5000, {
                styles: {
                  backgroundColor: 'green',
                  fontSize: "30px",
                  marginTop: '200px',
                  fontFamily:'Segoe UI'
                },
                align: 'center',
                valign: 'top'
              })
             ClearInputs();
             document.getElementById('contactSubmitBtn').classList.remove('disabled')
          });
    }
    
  }

  