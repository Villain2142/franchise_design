
 function signUpInfo( data, url ){
    frappe.call({
        method: url,
        type: "POST",
        args: data,
        callback: function (rt) {
        
            if (rt.message.status === 200) {
                sessionStorage.setItem('robothink_parent', JSON.stringify(rt.message.data));
                window.location.replace("/fd_design/signup-2");
                                                       
            } else {
                // Disable button to avoid multiple click
                document.getElementById( 'registerButton' ).disabled = false;
                Swal.fire({
                    text: rt.message.message,
                    icon: "error",
                    buttonsStyling: true,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                });
            }

        },
    })       
    return false;
}

function addInfo( data, url ){
    frappe.call({
        method: url,
        type: "POST",
        args: data,
        callback: function (rt) {
        
            if (rt.message.status === 200) {
                window.location.replace("/fd_design/dashboard");
                                                       
            } else {
                // Disable button to avoid multiple click
                document.getElementById( 'registerButton' ).disabled = false;
                Swal.fire({
                    text: rt.message.message,
                    icon: "error",
                    buttonsStyling: true,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                });
            }

        },
    })       
    return false;
}

function login( data, url ){
    frappe.call({
        method: url,
        type: "POST",
        args: data,
        callback: function (rt) {
            if (rt.message.status === 200) {
                Swal.fire({
                    text: rt.message.message,
                    icon: "success",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                }).then(function (result) {
                    if (result.isConfirmed) {
                        window.location.href = "/signup-2";
                       
                    }
                });
            } else {
                Swal.fire({
                    text: rt.message.message,
                    icon: "error",
                    buttonsStyling: true,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                });
            }

        },
    })       
    return false;
}

function validateFields(parentClass){

    const form = document.getElementById(parentClass);
    var validator = FormValidation.formValidation(
        form,
        {
            fields: {
                'first_name': {
                    validators: {
                        notEmpty: {
                            message: 'first name is required'
                        }
                    }
                },
                'last_name': {
                    validators: {
                        notEmpty: {
                            message: 'last name is required'
                        }
                    }
                },
                'email': {
                    validators: {
                        emailAddress: {
                            message: 'The value is not a valid email address'
                        },
                        notEmpty: {
                            message: 'email is required'
                        }
                    }
                },
                'confirm_email': {
                    validators: {
                        emailAddress: {
                            message: 'The value is not a valid email address'
                        },
                        notEmpty: {
                            message: 'email is required'
                        },
                        identical: {
                            compare: function () {
                                return form.querySelector('[name="email"]').value;
                            },
                            message: 'The email and its confirm are not the same'
                        }
                    }
                },     
                'password': {
                    validators: {
                        notEmpty: {
                            message: 'password is required'
                        }
                    }
                },
                'confirm_password': {
                    validators: {
                        notEmpty: {
                            message: 'password is required'
                        },
                        identical: {
                            compare: function () {
                                return form.querySelector('[name="password"]').value;
                            },
                            message: 'The password and its confirm are not the same'
                        }
                    }
                },
                address: {validators: { notEmpty: { message: "address line 1 is required" } }},
                'address-2': {validators: { notEmpty: { message: "address line 2 is required" } }},
                city: {validators: { notEmpty: { message: "city is required" } }},
                postcode: {validators: { notEmpty: { message: "postcode is required" } }},
            },
    
            plugins: {
                trigger: new FormValidation.plugins.Trigger(),
                bootstrap: new FormValidation.plugins.Bootstrap5({
                    rowSelector: '.fv-row',
                    eleInvalidClass: '',
                    eleValidClass: ''
                })
            }
        }
    );
    return validator;
}

$( '#registerButton' ).click( function( event ) {
  
    event.preventDefault();
    if($( '#register' ).find( '.invalid-feedback div' ).text() ===''){
        const validator = validateFields('register')

        // Validate form before submit
        if (validator) {
            validator.validate().then(function (status) {
    
                if (status == 'Valid') {
                    // Show loading indication
                    document.getElementById( 'registerButton' ).setAttribute('data-kt-indicator', 'on');
    
                    // Disable button to avoid multiple click
                    document.getElementById( 'registerButton' ).disabled = true;
    
                    const signData={ 
                        title: document.getElementById('title').value,
                        first_name: document.getElementById('first_name').value,
                        last_name: document.getElementById('last_name').value,
                        email: document.getElementById('email').value,
                        home_phone_number: document.getElementById('phone_no').value,
                        mobile_number: document.getElementById('mobile_phone_no').value,
                        work_phone_number: document.getElementById('work_phone_no').value,
                        address_line_1: document.getElementById('address').value,
                        address_line_2: document.getElementById('address-2').value,
                        city: document.getElementById('city').value,
                        county: document.getElementById('county').value,
                        postcode: document.getElementById('postcode').value,
                        password: document.getElementById('password').value,
                        gender: document.getElementById('gender').value,
                        dob: document.getElementById('dob').value
                    }
                   
                    signUpInfo({ "args": signData }, 'franchise_design.user_management.user_signup')
                }
            });
        }
    }

    return false
});

$( '#addStudentButton' ).click( function( event ) {
    event.preventDefault();

    if(validateFields('#complete_registration') ===''){
        console.log('submitting')
        const data=  JSON.parse(sessionStorage.getItem('robothink_parent')) 
        const signData={
            first_name: document.getElementById('first_name').value,
            last_name: document.getElementById('last_name').value,
            gender: document.getElementById('gender').value,
            dob: document.getElementById('dob').value,
            parent_id: data.parent_id,
            parent_name: data.parent_name,
            customer_relationship: document.getElementById('customer_relationship').value,
        }

        console.log(signData)
        
        addInfo({args: signData}, 'franchise_design.user_management.create_student')
    }
    return false
});

$( '#loginButton' ).click( function( event ) {
    event.preventDefault();

    if(validateFields('#loginContainer') ===''){
        console.log('submitting')
        const loginData={
            usr: document.getElementById('email').value,
            pwd: document.getElementById('password').value,
        }
        
        login(loginData, 'login')
    }
    return false
});




// function validateFields(parentClass){
//     //validate fields
//     var fail_log = '';
//     var name;
//     $( parentClass ).find( 'select, textarea, input' ).each(function(){
//         if( $( this ).prop( 'required' )){

//             if ( ! $( this ).val() ) {
//                 name = $( this ).attr( 'data-description' );
//                 fail_log = 'The ' + name + " field is required \n";
//                 //get the parent element and append instructions
//                 if ($(this).parent().find('.exclamation').length === 0) {
//                     $(this).parent()
//                     .append(
//                         $(`<div class="position-relative w-100"><span class="pink">${fail_log}</span>
//                         <div class="exclamation w-10 d-flex justify-content-end">
//                         <i class="fa fa-exclamation-circle pink  " aria-hidden="true"></i>
//                         </div>
//                         </div>`)
//                     );
//                 }

//             }

//         }
//     });

//     return fail_log
// }

