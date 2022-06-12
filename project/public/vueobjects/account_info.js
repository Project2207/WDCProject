// var users = [
//   {id: 1000,
//   username: 'JohnGrapeseed',
//   password: 'john',
//   email: 'john@gmail.com',
//   access: 0,
//   notification: {
//     responded: true,
//     finalised: true,
//     cancelled: true,
//   }}
// ];

var getAccountInfo = function getAccountInfo(callback) {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status >= 200 && this.status <= 399)) {
      callback(JSON.parse(this.response)[0]);
    }
  };

  //Get which user is logged in here from session
  var userID = 1;

  //ADD LOGIC HERE FOR WHICH USER IS LOGGED IN
  xhttp.open("GET", "/request/getUserById?id=" + userID, true);
  xhttp.send();
}

var user_info = new Vue({
    el: '#vue_user_info',

    data: {
      name: "",
      email: "",
    },

    methods: {
      onClickSignOut: function () {
        //Sign out stuff goes HERE

        location.assign('/');
      },
    },

    beforeMount() {
      getAccountInfo(info => {
        this.name = info.name
        this.email = info.email
      });
    }

  });