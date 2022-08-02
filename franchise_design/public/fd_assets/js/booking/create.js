function submitfranchise(){
    //the form values
    submitInfo(getAllValues())
    return false;
}

function pay(){
    //the form values
    const data= {
        course_id:'',
        name: document.getElementById('card_name').value,
        card_no: document.getElementById('card_number').value,
        card_expiry_date:{
            year: document.getElementById('card_expiry_year').value,
            month: document.getElementById('card_expiry_month').value
        },
        card_cvv: document.getElementById('card_cvv').value,
        save_card: document.getElementById('save_card').value

    }

    submitInfo(data)
    return false;
}

function submitInfo(data){
    console.log(data)
    frappe.call({
        method: "robothink.api_core.test_api_data",
        type: "POST",
        args: data,
        callback: function (rt) {
            console.log(rt.message)
            // if (rt.message) {

            //     Swal.fire({
            //         text: "Franchise created!",
            //         icon: "success",
            //         buttonsStyling: false,
            //         confirmButtonText: "Ok, got it!",
            //         customClass: {
            //             confirmButton: "btn btn-primary"
            //         }
            //     }).then(function (result) {
            //         if (result.isConfirmed) {
            //             //window.location.href = "/invoice/invoice_details/" + r.message;
            //             r.removeAttribute("data-kt-indicator")
            //         }
            //     });
            // } else {
            //     Swal.fire({
            //         text: "Error while creating franchise",
            //         icon: "error",
            //         buttonsStyling: true,
            //         confirmButtonText: "Ok, got it!",
            //         customClass: {
            //             confirmButton: "btn btn-primary"
            //         }
            //     });
            // }

        },
    })       
return false;
}


function getAllValues() {
    var tobeSubmitted= {}
    var children =[]
    $('#kt_modal_create_app_form :input').map(function() {
        var type = $(this).prop("type");
        var name = $(this).prop("name");
        if(!document.querySelector('#childForm').contains(this)){
        // checked radios/checkboxes
            if ((type == "checkbox" || type == "radio") && this.checked) {
                tobeSubmitted[name]= $(this).val()
            
            }
            // all other fields, except buttons
            else if (type != "button" && type != "submit") {
                tobeSubmitted[name]= $(this).val()
            }
        }

    })
    
    $('#childForm > .row').map(function() {
        var childList ={}
        $(this).find('input').map(function(){
            var type = $(this).prop("type");
            var name = $(this).prop("name");
           console.log(name,type)
            if (type != "button" && type != "submit") {
                childList[name]= $(this).val()
            }
      
            
        })
        children.push(childList)
    })
    

    tobeSubmitted['children'] = children
    return tobeSubmitted
}