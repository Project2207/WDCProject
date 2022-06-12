function login(details) {
    // Create new AJAX request
    var xhttp = new XMLHttpRequest();
    // Open connection
    xhttp.open("POST", "/login", true);
    // Set content type to JSON
    xhttp.setRequestHeader("Content-type","application/json");
    // Send request
    xhttp.send(JSON.stringify(details));

     // Handle response
     xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            location.assign('/user/events');
            return true;
        } else if (this.readyState == 4 && this.status >= 400) {
            alert("Login Unsuccessful");
            return false;
        }
    };
}

var signin = new Vue({
    el: '#vue_signin',
    data: {
        email: "",
        password: ""
    },

    methods: {
        // onSignIn: function (googleUser) {
        //     var profile = googleUser.getBasicProfile();
        //     console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        //     console.log('Name: ' + profile.getName());
        //     console.log('Image URL: ' + profile.getImageUrl());
        //     console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
        //   }

        onClickUserSignIn: function() {
            console.log("signin");
            //sign in stuff here
            let details = {email: this.email,
                           password: this.password};

            login(details);
            // if (success == true) {
            //     location.assign('/user/events');
            // } else {
            //     alert("Incorrect login details");
            // }
            //check if user with that email exists (and get userID)
            // var xhttp1 = new XMLHttpRequest();

            // xhttp1.onreadystatechange = function() {
            //   if (this.readyState == 4 &&  this.status == (200 || 304)) {
            //     var resObject = JSON.parse(this.response)[0];
            //     console.log(resObject);
            //   }
            // };

            // var tempEmail = "modralandonwilliams@gmail.com"

            // xhttp1.open("GET", "/request/getUserByEmail?email=" + encodeURIComponent(tempEmail), true);
            // xhttp1.send();

            //get user by userID

            //check if password is matched

            //post request for session thing
        },

        onClickAdminSignIn: function() {
            //sign in stuff here

            location.assign('/admin/events');
        }

    }
})