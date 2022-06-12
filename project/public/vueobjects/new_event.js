function addAddress(location_data) {
    // Create new AJAX request
    var xhttp = new XMLHttpRequest();
    // Open connection
    xhttp.open("POST", "/event/addAddress", true);
    // Set content type to JSON
    xhttp.setRequestHeader("Content-type","application/json");
    // Send request
    xhttp.send(JSON.stringify(location_data));
    // Handle response
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && (this.status >= 200 && this.status <= 399)) {
            let address_id = JSON.parse(this.responseText).addressID;
            let start = new_event.event_start_date + " " + new_event.event_start_time + ":00";
            let end = new_event.event_end_date + " " + new_event.event_end_time + ":00";
            // Define event_data
            let event_data = {addressID: address_id,
                              description: new_event.event_descr,
                              name: new_event.event_name,
                              start: start,
                              end: end};

            // Add new plan to database
            createNewPlan(event_data);
            //return address_id;
        }
    };
}

// function checkIfAddressExists(location_data) {
//     // Create new AJAX request
//     var xhttp = new XMLHttpRequest();
//     // Open connection
//     xhttp.open("POST", "/event/checkIfAddressExists", true);
//     // Set content type to JSON
//     xhttp.setRequestHeader("Content-type","application/json");
//     // Send request
//     xhttp.send(JSON.stringify(location_data));
//     // Handle response
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && (this.status == 200 || this.status == 304)) {
//             let result = JSON.parse(this.responseText)[0].exists;
//             return result;
//         }
//     };
// }

// function getAddress(location_data) {
//     // Create new AJAX request
//     var xhttp = new XMLHttpRequest();
//     // Open connection
//     xhttp.open("POST", "/event/getAddress", true);
//     // Set content type to JSON
//     xhttp.setRequestHeader("Content-type","application/json");
//     // Send request
//     xhttp.send(JSON.stringify(location_data));
//     // Handle response
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && (this.status == 200 || this.status == 304)) {
//             let address_id = JSON.parse(this.responseText)[0].address_id;
//             return address_id;
//         }
//     };
// }

// function addAdress(location_data) {
//     // Create new AJAX request
//     var xhttp = new XMLHttpRequest();
//     // Open connection
//     xhttp.open("POST", "/event/addAdress", true);
//     // Set content type to JSON
//     xhttp.setRequestHeader("Content-type","application/json");
//     // Send request
//     xhttp.send(JSON.stringify(location_data));
//     // Handle response
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && (this.status == 200 || this.status == 304)) {
//             let address_id = JSON.parse(this.responseText)[0].address_id;
//             return address_id;
//         }
//     };
// }

function createNewPlan(event_data) {
    // Create new AJAX request
    var xhttp = new XMLHttpRequest();
    // Open connection
    xhttp.open("POST", "/event/createPlan", true);
    // Set content type to JSON
    xhttp.setRequestHeader("Content-type","application/json");
    // Send request
    xhttp.send(JSON.stringify(event_data));

    // Handle response
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && (this.status >= 200 && this.status <= 399)) {
            let event_id = JSON.parse(this.responseText).event_id;
            // Define times_data
            let start = new_event.event_start_date + " " + new_event.event_start_time + ":00";
            let end = new_event.event_end_date + " " + new_event.event_end_time + ":00";
            let times_data = {eventID: event_id,
                            start: start,
                            end: end};
                // Add times to database
                createTimes(times_data);
                //return event_id;
        }
    };
}

function createTimes(times_data) {
    // Create new AJAX request
    var xhttp = new XMLHttpRequest();
    // Open connection
    xhttp.open("POST", "/event/addTimes", true);
    // Set content type to JSON
    xhttp.setRequestHeader("Content-type","application/json");
    // Send request
    xhttp.send(JSON.stringify(times_data));
    // Handle response
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && (this.status >= 200 && this.status <= 399)) {
            // let event_id = JSON.parse(this.responseText).eventID;
            // // Define invit_data
            let invit_data = {invitees: new_event.invitees};
            // Add invitations to database
            addGuestEmails(invit_data);
            //return timeID_array;
        }
    };
}

function addGuestEmails(invit_data) {
    // Create new AJAX request
    var xhttp = new XMLHttpRequest();
    // Open connection
    xhttp.open("POST", "/event/addGuestEmails", true);
    // Set content type to JSON
    xhttp.setRequestHeader("Content-type","application/json");
    // Send request
    xhttp.send(JSON.stringify(invit_data));
    // Handle response
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && (this.status >= 200 && this.status <= 399)) {
            let invit_data = {invitees: new_event.invitees};
            getUserIDs();
            return;
        }
    };
}

function getUserIDs() {
    let invit_data = {invitees: new_event.invitees};
    //let userIDs = [];
    let email = "";
    let invitees = invit_data.invitees;

    for (let i = 0; i < invitees.length; i++)
    {
        email = invitees[i];
        //console.log(email);
        // Create new AJAX request
        var xhttp = new XMLHttpRequest();
        // Open connection
        xhttp.open("POST", "/event/getUserID", true);
        // Set content type to JSON
        xhttp.setRequestHeader("Content-type","application/json");
        // Send request
        xhttp.send(JSON.stringify({email: email}));
        // Handle response
        xhttp.onreadystatechange =  function() {
            if (this.readyState == 4 && (this.status >= 200 && this.status <= 399)) {
                let guest_email = JSON.parse(this.responseText).email;
                //userIDs.push(userID);
                //addInvitation(userID);
                // check if email is last in list
                if (guest_email == invitees[invitees.length-1]) {
                    location.assign('/user/events/');
                }
            }
        };
    }
}

// function addInvitation(userID) {
//     // Create new AJAX request
//     var xhttp = new XMLHttpRequest();
//     // Open connection
//     xhttp.open("POST", "/event/addInvitation", true);

//     // Set content type to JSON
//     xhttp.setRequestHeader("Content-type","application/json");
//     // Send request
//     xhttp.send(JSON.stringify({userID: userID}));

//     // Handle response
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && (this.status >= 200 && this.status <= 399)) {
//             //let userID = JSON.parse(this.responseText).userID;
//             //createAvailabilities(userID);
//             return;
//         }
//     };
// }

// function createAvailabilities(userID) {
//     // Create new AJAX request
//     var xhttp = new XMLHttpRequest();
//     // Open connection
//     xhttp.open("POST", "/event/addAvails", true);

//     // Set content type to JSON
//     xhttp.setRequestHeader("Content-type","application/json");
//     // Send request
//     xhttp.send(JSON.stringify({userID: userID}));

//     // // Handle response
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && (this.status >= 200 && this.status <= 399)) {
//             return;
//         }
//     };
// }

var new_event = new Vue({
    el: '#vue_new_event',
    data: {
        event_name: "",
        event_descr: "",
        event_addr_street: "",
        event_addr_street_2: "",
        event_addr_city: "",
        event_addr_state: "",
        event_addr_postcode: "",
        event_addr_country: "",
        event_start_date: "",
        event_end_date: "",
        event_start_time: "09:00",
        event_end_time: "17:00",
        invitee_email: "",
        invitees: []
    },
    methods: {
        addInvitee: function() {
            this.invitees.push(this.invitee_email);
            this.invitee_email = "";
        },

        removeInvitee: function(invitee) {
            let position = -1;
            for (email in this.invitees){
                if (this.invitees[email] == invitee) {
                    position = email;
                    break;
                }
            }
            if (position != -1) {
                this.invitees.splice(position,1);
            }
        },

        onClickCreatePlan: function() {
            //create new plan stuff here
            //console.log("create plan");

            // Define location_data
            let location_data = {street: this.event_addr_street,
                                 streetAdd: this.event_addr_street_2,
                                 suburb: this.event_addr_city,
                                 state: this.event_addr_state,
                                 postcode: this.event_addr_postcode,
                                 country: this.event_addr_country};

            // // Get addressID OR (add new address and get get addressID)
            // let result = checkIfAddressExists(location_data);
            // if (result == 0 ) {
            //     // Insert Address
            //     // Get Address ID
            //     let address_id = addAddress(location_data);
            // } else {
            //     // Get Address ID
            //     let address_id = getAddress(location_data);
            // }
            // let address_id = addAddress(location_data);
            addAddress(location_data);

            // // Define event_data
            // let event_data = {addressID: address_id,//from above not from vue
            //                   description: this.event_descr,
            //                   name: this.event_name,
            //                   start: this.event_start,
            //                   end: this.event_end};

            // // Add new plan to database
            // let event_id = createNewPlan(event_data);

            // // Define times_data
            // let times_data = {eventID: event_id,
            //                   start: this.event_start,
            //                   end: this.event_end};
            // // Add times to database
            // let timeID_array = createTimes(times_data);

            // // Define invit_data ------- NEED TO DO
            // let invit_data = {eventID: event_id,
            //                   invitees: this.invitees};
            // // Add invitations to database
            // createInvitations(invit_data);
            //let invitationID_array = createInvitations(invit_data);

            // // Define avail_data ------- NEED TO DO
            // let avail_data = {eventID: event_id,
            //                   times: timeID_array,
            //                   invites: invitationID_array};

            // // Add availabilities to database ------------------ NEED TO DO in index.js
            // createAvailabilities();

            // Send email notifications to invitees
            let event_dates = this.event_start_date + " " + this.event_start_month + " " + this.event_start_year +
            " - " + this.event_end_date + " " + this.event_end_month + " " + this.event_end_year;
            let event_times = this.event_start_time + " - " + this.event_end_time;

            let email_data = {invitees: this.invitees,
                //organiser: this.event_organiser,
                name: this.event_name,
                //loc: this.event_loc,
                descr: this.event_descr,
                dates: event_dates,
                times: event_times};

            // Create new AJAX request
            var xhttp = new XMLHttpRequest();
            // Open connection
            xhttp.open("POST", "/users/emailcreated", true);
            // Set content type to JSON
            xhttp.setRequestHeader("Content-type","application/json");
            // Send request
            xhttp.send(JSON.stringify(email_data));

            // Handle response
            xhttp.onreadystatechange = function() {
                // Send user to different page
                //location.assign('events/plan/' + event_id.toString() + '/organiser');
                //location.assign('/user/events/');
            };
        }
    } //methods
    }) //vue