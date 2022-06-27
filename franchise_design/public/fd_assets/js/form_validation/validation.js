
 
    $( '#registerButton' ).click( function( event ) {
        console.log("you pressed me")
        event.preventDefault();
    
        //validate fields
        var fail_log = '';
        var name;
        $( '#register' ).find( 'select, textarea, input' ).each(function(){
            if( $( this ).prop( 'required' )){
    
                if ( ! $( this ).val() ) {
                    name = $( this ).attr( 'data-description' );
                    fail_log = 'The ' + name + " field is required \n";
                    //get the parent element and append instructions
                    $(this).parent()
                    .append(
                      $(`<div class="position-relative w-100"><span class="pink">${fail_log}</span>
                        <div class="exclamation w-100 d-flex justify-content-end">
                        <i class="fa fa-exclamation-circle pink  " aria-hidden="true"></i>
                        </div>
                      </div>`)
                    );
                }else{
                    //submit details

                    //move to stage 2
                    // document.getElementById('link').click();
                }
    
            }
        });

    
        // //submit if fail never got set to true
        // if ( ! fail ) {
        //     //process form here.
        // } else {
        //     alert( fail_log );
        // }
    
    });


