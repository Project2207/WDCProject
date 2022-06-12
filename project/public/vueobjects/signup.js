// var signupUser = function signupUser(callback) {
//     var xhttp = new XMLHttpRequest();

//     xhttp.onreadystatechange = function() {
//       if (this.readyState == 4 &&  this.status == 200) {
//         //var resObject = JSON.parse(this.response)[0];
//         callback(JSON.parse(this.response)[0]);
//       }
//     };

//     //ADD LOGIC HERE FOR WHICH USER IS LOGGED IN
//     xhttp.open("POST", "/request/createUser", true);
//     xhttp.send();
//   }

var signup = new Vue({
    el: '#vue_signup',
    data: {
        username: "",
        email: "",
        password: ""
    },

    methods: {
        onClickUserSignUpManual: function() {
            console.log("signup");
            //sign up user here
            let user_data = {name: this.username,
                             email: this.email,
                             password: this.password};

            // Create new AJAX request
            var xhttp = new XMLHttpRequest();
            // Open connection
            xhttp.open("POST", "/signUp", true);
            // Set content type to JSON
            xhttp.setRequestHeader("Content-type","application/json");
            // Send request
            xhttp.send(JSON.stringify(user_data));

            // Handle response
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    // Functions once emails have been sent
                    location.assign('/user');
                }
            };
        }
    }
})