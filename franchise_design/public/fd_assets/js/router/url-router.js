

// create document click that watches the nav links only
document.addEventListener("click", (e) => {
	e.preventDefault();
	const { target } = e;
	if (target.matches("a")) {
        urlRoute();
	}
    else{
        return;
    }

});

// create an object that maps the url to the template
const urlRoutes = {
	"/fd_design/login": {
		template: "/fd_design/login.html",
		// title: "404 | " + urlPageTitle,
		// description: "Page not found",
	},
	"/fd_design/register": {
		template: "/fd_design/register.html",
        files: "/assets/franchise_design/fd_assets/js/form_validation/validation.js"
	},
	"/fd_design/dashboard": {
		template: "/fd_design/dashboard.html",
	},
	"/fd_design/consumers": {
		template: "/fd_design/consumers.html",
	},
	"/fd_design/classes": {
		template: "/fd_design/classes.html",
	},
	"/fd_design/manage-account": {
		template: "/fd_design/manage-account.html",
	},
	"/fd_design/manage-account/details": {
		template: "/fd_design/manage-account/details.html",
	},
	"/fd_design/manage-account/cards": {
		template: "/fd_design/manage-account/cards.html",
	},
	"/fd_design/manage-account/change-password": {
		template: "/fd_design/manage-account/change-password.html",
	},
	"/fd_design/payments": {
		template: "/fd_design/payments.html",
	},


};

// create a function that watches the url and calls the urlLocationHandler
const urlRoute = (event) => {
	event = event || window.event; // get window.event if event argument not provided
	event.preventDefault();
	// window.history.pushState(state, unused, target link);
	window.history.pushState({}, "", event.target.href);
	urlLocationHandler();
};

// create a function that handles the url location
const urlLocationHandler = async () => {
	const location = window.location.pathname; // get the url path
	// if the path length is 0, set it to primary page route
	if (location.length == 0) {
		location = "/fd_design/login";
	}
	// get the route object from the urlRoutes object
	const route = urlRoutes[location] || urlRoutes["404"];
	// get the html from the template
	const html = await fetch(route.template).then((response) => response.text());
	// set the content of the content div to the html

    var parser=new DOMParser();
    var xmlDoc=parser.parseFromString(html,"text/html");
    var htmlContent = xmlDoc.getElementById('contents');
    console.log(htmlContent)
	document.getElementById("content").innerHTML = htmlContent.innerHTML

    if(route.files){
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = route.files
        $("head").append(s);
    }


};

// add an event listener to the window that watches for url changes
window.onpopstate = urlLocationHandler;
// call the urlLocationHandler function to handle the initial url
window.route = urlRoute;
// call the urlLocationHandler function to handle the initial url
// urlLocationHandler();

window.fetch = new Proxy(window.fetch, {
	
    apply(fetch, that, args) {
		console.log("fetched started")
		window.scrollTo({ top: 0, behavior: 'smooth' })
		$("#content").hide();
		$(".lds-ring").show();
		
        // Forward function call to the original fetch
        const result = fetch.apply(that, args);

        // Do whatever you want with the resulting Promise
        result.then((response) => {
            console.log("fetch completed!", args, response);
			
			$("#content").show();
			$(".lds-ring").hide();
			
        });

        return result;
    }
});