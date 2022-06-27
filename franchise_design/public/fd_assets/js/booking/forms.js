
function addform(parentName){
    //gets the first element in a div
    const divElem = document.getElementById(parentName).getElementsByTagName('div')[0];
    const newForm = document.createElement("div");
    newForm.innerHTML = divElem.innerHTML;
    newForm.classList.add("row")
    const inputElements = newForm.querySelectorAll("input");

    // iterates to set the name of the element
    for (let i = 1; i < inputElements.length; i++) {
        let attributeValue = inputElements[i].getAttribute('name');
        let nodePosition = document.getElementById(parentName).childElementCount;
        inputElements[i].setAttribute("name", `${attributeValue}${nodePosition++}`);
    }

    //add the delete button to the parent form
    if(parentName === "childForm"){
        const newButton = document.createElement("div");
        newButton.innerHTML = "<span class='d-flex justify-content-end custom-delete'><i class='fa fa-trash' aria-hidden='true'></i></span>"
        // newButton.setAttribute("oclic", "button")
        
        let pos = document.getElementById(parentName).children.length  
        newButton.setAttribute("onClick", `removeform(${parentName}, ${pos} )`)
        newForm.prepend(newButton)
    }

    document.getElementById(parentName).appendChild(newForm)

}

$(document).ready(function() {
    $("#check").click(function(event) {
        if(!event.target.checked){
            addAddress('parentFormRows')
        }else{
            removeAddressForm()
        }
        
    });
});

function addAddress(parentName){
    const list = document.getElementById(parentName)
    // iterates to add forms

    addform('AddressParentForm')
}

function removeAddressForm(){
    const list = document.getElementById('AddressParentForm');
    if (list.hasChildNodes()) {
        list.removeChild(list.children[1]);
    }
    
}


function removeform( parentName='parentFormRows', childPostion){
    var name =parentName.getAttribute('id')
    const list = document.getElementById(name);
    if (list.hasChildNodes()) {
      list.removeChild(list.children[childPostion]);
    }
    
}

function  prefill(parentName, childPostion){
    //get the values of the first address
    const divElem = document.getElementById(parentName).getElementsByTagName('div')[0];
    const inputElements = divElem.querySelectorAll("input")
    var details ={}

    for (let i = 0; i < foo.length; i++) {
        let attributeValue = inputElements[i].getAttribute('name');
        let Value = inputElements[i].getAttribute('value');
        details[attributeValue] = Value
    }

    //prefill into the specified child position

    const childElem = document.getElementById(parentName).getElementsByTagName('div')[childPostion];
    const childInputElements = childElem.querySelectorAll("input")

    for (let i = 0; i < foo.length; i++) {
        let attributeValue = inputElements[i].getAttribute('name');
        let Value = childInputElements[i].setAttribute('value', details[attributeValue]);  
    }

}

function removePrefill(parentName, childPostion){
    //prefill into the specified child position

    const childElem = document.getElementById(parentName).getElementsByTagName('div')[childPostion];
    const childInputElements = childElem.querySelectorAll("input")

    for (let i = 0; i < foo.length; i++) {
        let Value = childInputElements[i].setAttribute('value',  '');  
    }
}


function calculatePlan(id){
    let amount = id.getAttribute('value')

    //get the number of child fields
    let children = document.getElementById('childForm').childElementCount
    console.log(children)
    // 2 CHILDREN X $500.00 USD
    let checkPlural = children > 1 ? 'Children' : 'child'
    document.getElementById('countChild').innerHTML = `${children} ${checkPlural} X $${amount} USD`

    document.getElementById('totalCost').innerHTML = `$${children * amount}`

}