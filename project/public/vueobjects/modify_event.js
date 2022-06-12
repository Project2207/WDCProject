// // Preliminary data - testing
// var event = {
//     name: "Alice's 21th",
//     organiser: "SherlockGnome",
//     descr: "Cat ipsum dolor sit amet, suddenly go on wild-eyed crazy rampage to pet a cat, rub its belly, endure blood and agony, quietly weep, keep rubbing belly. Mark territory stare at guinea pigs. Love. Floof tum, tickle bum, jellybean footies curly toes do not try to mix old food with new one to fool me! eat from dog's food for meow find a way to fit in tiny box. Steal the warm chair right after you get up. Meow stare at guinea pigs yet i is playing on your console hooman white cat sleeps on a black shirt, and if it fits, i sits but attack the child yet the dog smells bad. ",
//     addr_street: "Eiffel Tower",
//     addr_street_2: "12 Assembly Dr",
//     addr_city: "Tullamarine",
//     addr_state: "Victoria",
//     addr_postcode: "3043",
//     addr_country: "Australia",
//     start: new Date("2022-05-28 09:30"),
//     end: new Date("2022-05-30 11:30"),
//     invitees: ["jane.doe23@gmail.com ",
//     "sophie@gmail.com",
//     "saschaiscool@gmail.com",
//     "hannahiscooltoo@gmail.com",
//     "katieiscooler@gmail.com"]
// };

// var getEventInfo = function getEventInfo(callback) {
//     var xhttp = new XMLHttpRequest();

//     xhttp.onreadystatechange = function() {
//       if (this.readyState == 4 &&  this.status == 200) {
//         //var resObject = JSON.parse(this.response)[0];
//         callback(JSON.parse(this.response)[0]);
//       }
//     };

//     //ADD LOGIC HERE FOR WHICH PLAN THE USER IS VIEWING
//     xhttp.open("GET", "/request/getEventWithAddresses?id=1", true);
//     xhttp.send();
//   }

// var getEventInvitees = function getEventInvitees(callback) {
//     var xhttp = new XMLHttpRequest();

//     xhttp.onreadystatechange = function() {
//       if (this.readyState == 4 &&  this.status == 200) {
//         //var resObject = JSON.parse(this.response)[0];
//         callback(JSON.parse(this.response)[0]);
//       }
//     };

//     //ADD LOGIC HERE FOR GETTING THE INVITEES TO A PLAN
//     xhttp.open("GET", "/request/getEventInvitees?id=1", true);
//     xhttp.send();
//   }

function getEventInfo() {
    // Create new AJAX request
    var xhttp = new XMLHttpRequest();
    // Open connection
    xhttp.open("GET", "/request/getEvent", true);

    // Send request
    xhttp.send();

    // Handle response
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && (this.status >= 200 && this.status <= 399)) {
            let event = JSON.parse(this.responseText)[0];
            return event;
        }
    };
}

function getEventInvitees() {
    // Create new AJAX request
    var xhttp = new XMLHttpRequest();
    // Open connection
    xhttp.open("GET", "/request/getEventInvitees", true);

    // Send request
    xhttp.send();

    // Handle response
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && (this.status >= 200 && this.status <= 399)) {
            let invitees = JSON.parse(this.responseText);
            return invitees;
        }
    };
}

function getTimes() {
    // Create new AJAX request
    var xhttp = new XMLHttpRequest();
    // Open connection
    xhttp.open("GET", "/request/getTimes", true);

    // Send request
    xhttp.send();

    // Handle response
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && (this.status >= 200 && this.status <= 399)) {
            let times = JSON.parse(this.responseText);
            return times;
        }
    };
}

function getTotalAvailableInvitees(timeID) {
    // Create new AJAX request
    var xhttp = new XMLHttpRequest();
    // Open connection
    xhttp.open("POST", "/request/getTotalAvailableInvitees", true);
    // Set content type to JSON
    xhttp.setRequestHeader("Content-type","application/json");
    // Send request
    xhttp.send(JSON.stringify(timeID));
    // Handle response
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && (this.status >= 200 && this.status <= 399)) {
            let total_avail_invitees = JSON.parse(this.responseText)[0];
            return total_avail_invitees;
        }
    };
}

function timeIn12hrFormat(hours, minutes) {
    if (minutes == 0) {
        minutes = "00";
    }
    if (hours == 12) {
        return "12." + minutes + "pm"
    } else if (hours > 12) {
        return (hours - 12) + "." + minutes + "pm"
    } else if (hours == 0) {
        return "12." + minutes + "am"
    } else {
        return hours + "." + minutes + "am"
    };
}

// var months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
// var days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
// var day = 1000 * 60 * 60 * 24;

// // Number of days
// let cols = ((event.end.getTime() - event.start.getTime())/ day);
// // Number of half-hour time_slots
// let time_slots = ((event.end.getHours()+event.end.getMinutes()/60)-(event.start.getHours()+event.start.getMinutes()/60))*2;

// let opacity = 0.2; // change later

// var possible_times = [];
// var opacities = [];
// var row_slots = [];
// var row_opacities = [];
// var time_slot_date = new Date(event.start);
// var first_date = event.start.getDate();
// // Number of time-slots
// for (let i = 0; i < time_slots; i++) {
//     // Number of days
//     for (let j = 0; j < cols; j++) {
//         row_slots.push({time: timeIn12hrFormat(time_slot_date.getHours(),
//                         time_slot_date.getMinutes()),
//                         day: days[time_slot_date.getDay()] + " " + time_slot_date.getDate() + " " + months[time_slot_date.getMonth()],
//                         date: new Date(time_slot_date),
//                         opacity: opacity,
//                         selected: false});
//         row_opacities.push(opacity);
//         time_slot_date.setDate(time_slot_date.getDate() + 1);
//     }
//     possible_times.push(row_slots);
//     opacities.push(row_opacities);
//     row_slots = [];
//     row_opacities = [];
//     time_slot_date.setMinutes(time_slot_date.getMinutes() + 30);
//     time_slot_date.setDate(first_date);
// }

function arrayOfPossibleTimes(start,end,opacities) {
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    var day = 1000 * 60 * 60 * 24;
    // Number of days
    let cols = ((end.getTime() - start.getTime())/ day);
    // Number of half-hour time_slots
    let time_slots = ((end.getHours()+end.getMinutes()/60)-(start.getHours()+start.getMinutes()/60))*2;

    var possible_times = [];
    var row_slots = [];
    var time_slot_date = new Date(start);
    var first_date = start.getDate();
    // Number of time-slots
    for (let i = 0; i < time_slots; i++) {
        // Number of days
        for (let j = 0; j < cols; j++) {
            row_slots.push({time: timeIn12hrFormat(time_slot_date.getHours(),
                            time_slot_date.getMinutes()),
                            day: days[time_slot_date.getDay()] + " " + time_slot_date.getDate() + " " + months[time_slot_date.getMonth()],
                            date: new Date(time_slot_date),
                            selected: false,
                            opacity: opacities[i+j*time_slots],});
            time_slot_date.setDate(time_slot_date.getDate() + 1);
        }
        possible_times.push(row_slots);
        row_slots = [];
        time_slot_date.setMinutes(time_slot_date.getMinutes() + 30);
        time_slot_date.setDate(first_date);
    }
    return possible_times;
}

//Check which invitees want notifications
// Not finished
function inviteesToEmail(invitees, email_type) {
    let invitee_list = [];
    for (invitee in invitees) {
        // Check if invitee wants to receive notifications
        if (true /* change later*/) {
            invitee_list.push(invitee);
        }
    }
    return invitee_list;
}

var modify_event = new Vue({
    el: '#vue_modify_event',
    data: {
        // event_name: event.name,
        // event_organiser: event.organiser,
        // event_descr: event.descr,
        // event_addr_street: event.addr_street,
        // event_addr_street_2: event.addr_street_2,
        // event_addr_city: event.addr_city,
        // event_addr_state: event.addr_state,
        // event_addr_postcode: event.addr_postcode,
        // event_addr_country: event.addr_country,
        // event_start_day: days[event.start.getDay()],
        // event_start_date: event.start.getDate(),
        // event_start_month: months[event.start.getMonth()],
        // event_start_year: event.start.getFullYear(),
        // event_end_date: event.end.getDate(),
        // event_end_month: months[event.end.getMonth()],
        // event_end_year: event.end.getFullYear(),
        // event_start_time: timeIn12hrFormat(event.start.getHours(), event.start.getMinutes()),
        // event_end_time: timeIn12hrFormat(event.end.getHours(), event.end.getMinutes()),
        // invitee_email: "",
        // invitees: event.invitees,
        // times_data: possible_times,
        // opacity_array: opacities,
        // invitees_email_finalised: [],
        // invitees_email_cancelled: [],
        // chosen_times: []

        event_name: "",
        event_descr: "",
        event_start: "",
        event_end: "",

        event_addr_street: "",
        event_addr_street_2: "",
        event_addr_city: "",
        event_addr_state: "",
        event_addr_postcode: "",
        event_addr_country: "",

        invitee_email: "",
        invitees: [],

        opacity_array: [],
        invitees_email_finalised: [],
        invitees_email_cancelled: [],

        times_data: [],
        chosen_times: []
    },
    methods: {
        onClickSelect: function(i,j) {
            if (this.times_data[i][j].selected == false) {
                this.times_data[i][j].selected = true;
                this.times_data[i][j].opacity = 1;
                this.chosen_times.push(this.times_data[i][j].date);
            } else {
                this.times_data[i][j].selected = false;
                let position = -1;
                for (date in this.chosen_times) {
                    if (this.chosen_times[date] === this.times_data[i][j].date) {
                        this.times_data[i][j].opacity = this.opacity_array[i][j];
                        position = date;
                        break;
                    }
                }
                if (position != -1) {
                    this.chosen_times.splice(position,1);
                }
            }
            // console.log("Dates:");
            // for (date in this.chosen_times) {
            //     console.log(this.chosen_times[date]);
            // }
        },

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

        onClickDeletePlanOrganiser: function() {
            //delete plan stuff goes here

            // Send email notifications to invitees
            let event_dates = this.event_start_date + " " + this.event_start_month + " " + this.event_start_year +
            " - " + this.event_end_date + " " + this.event_end_month + " " + this.event_end_year;
            let event_times = this.event_start_time + " - " + this.event_end_time;

            let email_data = {invitees: this.invitees,
                organiser: this.event_organiser,
                name: this.event_name,
                //loc: this.event_loc,
                descr: this.event_descr,
                dates: event_dates,
                times: event_times};

            // Create new AJAX request
            var xhttp = new XMLHttpRequest();
            // Open connection
            xhttp.open("POST", "/users/emailcancelled", true);
            // Set content type to JSON
            xhttp.setRequestHeader("Content-type","application/json");
            // Send request
            xhttp.send(JSON.stringify(email_data));

            // Handle response
            xhttp.onreadystatechange = function() {
                // Functions once emails have been sent
                location.assign('/user/events');
            };
        },

        onClickDeletePlanAdmin: function() {
            //delete plan stuff goes here too

            // Send email notifications to invitees
            let event_dates = this.event_start_date + " " + this.event_start_month + " " + this.event_start_year +
            " - " + this.event_end_date + " " + this.event_end_month + " " + this.event_end_year;
            let event_times = this.event_start_time + " - " + this.event_end_time;

            let email_data = {invitees: this.invitees,
                organiser: this.event_organiser,
                name: this.event_name,
                //loc: this.event_loc,
                descr: this.event_descr,
                dates: event_dates,
                times: event_times};

            // Create new AJAX request
            var xhttp = new XMLHttpRequest();
            // Open connection
            xhttp.open("POST", "/users/emailcancelled", true);
            // Set content type to JSON
            xhttp.setRequestHeader("Content-type","application/json");
            // Send request
            xhttp.send(JSON.stringify(email_data));

            // Handle response
            xhttp.onreadystatechange = function() {
                // Functions once emails have been sent
                location.assign('/admin/events');
            };
        },

        onClickFinaliseEventOrganiser: function() {
            //finalisation stuff here

            // Update / Finalise Event Details
                // this.event_name
                // this.event_descr
                // this.event_start // Get from this.chosen_times
                // this.event_end // Get from this.chosen_times
            // let event_data = {description: this.event_descr,
            //                     name: this.event_name,
            //                     start: ,
            //                     end: };
            // finaliseEvent(event_data);

            // Update Address
            // Check if needs to be done ????
                // this.event_addr_street
                // this.event_addr_street_2
                // this.event_addr_city
                // this.event_addr_state
                // this.event_addr_postcode
                // this.event_addr_country
            //updateAddress(location_data); -----------

            // Update Invitees
            // Check if needs to be done ????
                // this.invitees
            //addInvitees(add_invitee_emails); --------------
            //deleteInvitees(remove_invitee_emails); ------------

            // Delete Availability and Invitation Data ?????

            // Send email notifications to invitees
            let event_dates = this.event_start_date + " " + this.event_start_month + " " + this.event_start_year +
            " - " + this.event_end_date + " " + this.event_end_month + " " + this.event_end_year;
            let event_times = this.event_start_time + " - " + this.event_end_time;

            let email_data = {invitees: this.invitees,
                organiser: this.event_organiser,
                name: this.event_name,
                //loc: this.event_loc,
                descr: this.event_descr,
                dates: event_dates,
                times: event_times};

            // Create new AJAX request
            var xhttp = new XMLHttpRequest();
            // Open connection
            xhttp.open("POST", "/users/emailfinalised", true);
            // Set content type to JSON
            xhttp.setRequestHeader("Content-type","application/json");
            // Send request
            xhttp.send(JSON.stringify(email_data));

            // Handle response
            xhttp.onreadystatechange = function() {
                // Navigation away only once emails have been sent
                location.assign('/user/events/event/organiser');
            };
        },

        onClickFinaliseEventAdmin: function() {
            //finalisation stuff here

            // Send email notifications to invitees
            let event_dates = this.event_start_date + " " + this.event_start_month + " " + this.event_start_year +
            " - " + this.event_end_date + " " + this.event_end_month + " " + this.event_end_year;
            let event_times = this.event_start_time + " - " + this.event_end_time;

            let email_data = {invitees: this.invitees,
                organiser: this.event_organiser,
                name: this.event_name,
                //loc: this.event_loc,
                descr: this.event_descr,
                dates: event_dates,
                times: event_times};

            // Create new AJAX request
            var xhttp = new XMLHttpRequest();
            // Open connection
            xhttp.open("POST", "/users/emailfinalised", true);
            // Set content type to JSON
            xhttp.setRequestHeader("Content-type","application/json");
            // Send request
            xhttp.send(JSON.stringify(email_data));

            // Handle response
            xhttp.onreadystatechange = function() {
                // Navigation away only once emails have been sent
                location.assign('/admin/events/event');
            };
        },

        onClickUpdatePlanOrganiser: function() {
            //update plan stuff here

            location.reload();
        },

        onClickUpdatePlanAdmin: function() {
            //update plan stuff here

            location.reload();
        },

        onClickAddToCalendar: function() {
            //trigger calendar file download or add to google calendar
        }
    },

    beforeMount() {
        // getEventInfo(info => {
        //     this.event_name = info.name,
        //     this.event_descr = info.description,
        //     this.event_start = info.start,
        //     this.event_end = info.end,
        //     this.event_addr_street = info.street,
        //     this.event_addr_street_2 = info.streetAdd,
        //     this.event_addr_city = info.suburb,
        //     this.event_addr_state = info.state,
        //     this.event_addr_postcode = info.postcode,
        //     this.event_addr_country = info.country,
        //     this.times_data = arrayOfPossibleTimes(info.start,info.end)
        // });
        // getEventInvitees(info => {
        //     this.invitees = info
        // });

        // Get Event Info
        let event = getEventInfo();

        // Get Event Invitees
        let invitees = [];
        let invitee_array = getEventInvitees(); // Array of objects
        for (invitee in invitee_array){
            invitees.push(invitee.email);
        }
        this.invitees = invitees;

        // Get Availability data to create opacities

        // To get all the availabile times we need:
        // In Availability Table: For each TimeID associated with the event
        // - the number of rows where available == 1

        // opacity = number of available people in timeID / max (number of available people in each timeID)

        // Get times
        let opacities = [];
        let times = getTimes(); // array of objects {timeID: int, start: datetime}
        let num_invitees = invitees.length;
        for (time in times){
            let num_avail_in_timeslot = getTotalAvailableInvitees(time.timeID);
            let opacity = num_avail_in_timeslot / num_invitees;
            opacities.push(opacity);
        }

        this.event_name = event.name;
        this.event_descr = event.description;
        this.event_start = event.start;
        this.event_end = event.end;
        this.times_data = arrayOfPossibleTimes(event.start,event.end,opacities);

        let address_id = event.addressID;

        // Get Address Info
        // Create new AJAX request
        var xhttp = new XMLHttpRequest();
        // Open connection
        xhttp.open("POST", "/request/getAddress", true);
        // Set content type to JSON
        xhttp.setRequestHeader("Content-type","application/json");
        // Send request
        xhttp.send({addressID: address_id});

        // Handle response
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && (this.status == 200 || this.status == 304)) {
                let address = JSON.parse(this.responseText)[0];

                vuesinst.event_addr_street = address.street;
                vuesinst.event_addr_street_2 = address.streetAdd;
                vuesinst.event_addr_city = address.suburb;
                vuesinst.event_addr_state = address.state;
                vuesinst.event_addr_postcode = address.postcode;
                vuesinst.event_addr_country = address.country;
            }
        };

      }
});
