function fetchCampInfo(){
    console.log('started fetching')
    frappe.call({
        method: "robothink.api_core.test_api_data",
        type: "POST",
        args: {
            "image": "encode_data[1]"
        },
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
// return false;
}

window.onload = function() {

    fetchCampInfo()
}

var current = 0

function changeColumn(){
    controlTable(current)
    return false
}

function controlTable(current){
    const data = {
        "0": [
            {
                title: "week 9/12",
                lesson:"Arrival"
            },
            {
                title: "week 9/12",
                lesson:"Introduction to 9/12"
            }
        ],
        "1": [
            {
                title: "week 9/12",
                lesson:"Arrival"
            },
            {
                title: "week 9/12",
                lesson:"Introduction to 9/12"
            }
        ],
        "2": [
            {
                title: "week 9/12",
                lesson:"Arrival"
            },
            {
                title: "week 9/12",
                lesson:"Introduction to 9/12"
            }
        ],
        "3": [
            {
                title: "week 9/12",
                lesson:"Arrival"
            },
            {
                title: "week 9/12",
                lesson:"Introduction to 9/12"
            }
        ],
        "4": [
            {
                title: "week 9/12",
                lesson:"Arrival"
            },
            {
                title: "week 9/12",
                lesson:"Introduction to 9/12"
            }
        ]
    }

    //get the digits of each column
    
    var first = current+1;
    var second = current+2;
    var third = current+3
    current+=1
    // Object.keys(data)[first];
    // Object.keys(data)[second];
    // Object.keys(data)[third];

    console.log(
        first, second, third
    )

    return false;
}