function submitData(){
    var dataobj={"parent":document.getElementById("parent").value,"child":document.getElementById("child").value,"start_date":document.getElementById("start_date").value,"Booking_Type":document.getElementById("Booking_Type").value,"Process_Status":document.getElementById("Process_Status").value,"Booking_Status":document.getElementById("Booking_Status").value,"parentname":document.getElementById("parentname").value,"childname":document.getElementById("childname").value,"UsedTokens":document.getElementById("UsedTokens").value,"AvailableTokens":document.getElementById("AvailableTokens").value,"TotalActiveTokens":document.getElementById("TotalActiveTokens").value,"Price":document.getElementById("Price").value,"BookingAmount":document.getElementById("BookingAmount").value,"payment_date":document.getElementById("payment_date").value,"course":document.getElementById("course").value,"FranchiseName":document.getElementById("FranchiseName").value,"VenueName":document.getElementById("VenueName").value,"CourseName":document.getElementById("CourseName").value,"Batches":document.getElementById("Batches").value,"AvailableSeats":document.getElementById("AvailableSeats").value,"Gender":document.getElementById("Gender").value}
    console.log(dataobj);
    return false;
}