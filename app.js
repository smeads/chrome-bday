$(document).ready(function() {

  $('.container').append("<h1 id='main-header'>" + "REGARDS" + "</h1>")
  $('.container').append("<div id='login-container'></div>");
  $('.container').append("<button type='submit' id='logout-btn' class='hide'>" + "Logout" + "</button>");
  $('.container').append("<button id='add-btn' class='hide'>" + "Add" + "</button>");
  // Login Form
  $('#login-container').append("<form id='login-form'></form>");
  $('#login-form').append("<input type='email' id='email' placeholder='username'>");
  $('#login-form').append("<input type='password' id='password' placeholder='password'>");
  $('#login-form').append("<button type='submit' id='login-btn'>" + "Login" + "</button>");
  $('#login-form').append("<button type='submit' id='signup-btn'>" + "SignUp" + "</button>");
  // BDday Form
  $(".container").append("<form class='hide' id='bday-form'></form>");
  $("#bday-form").append("<input type='text' id='name' placeholder='name'/>");
  $("#bday-form").append("<input type='email' id='email-add' placeholder='email'/>");
  $("#bday-form").append("<input type='date' id='birthday'/>");
  $("#bday-form").append("<button id='submit-btn'>" + "Submit" +"</button>");
  // BDay List
  $(".container").append("<div class='hide' id='contact-list' style='border: 1px solid'><h1>" + "BDAY CONTACT LIST" + "</h1></div>")

  // On signup show ADD btn
  function signUp() {
    $('#main-header').text("ADD");
    $('#login-container').hide();
    $('#logout-btn').removeClass('hide');
    $('#add-btn').removeClass('hide');
  };

  // On login function
  function logIn() {
    console.log("logged In");
    $('#main-header').text("ADD");
    $('#login-container').hide();
    $('#logout-btn').removeClass('hide');
    $('#add-btn').removeClass('hide');
  }

  function logOut() {
    console.log("logged Out");
    $('#main-header').text("REGARDS");
    $('#logout-btn').addClass('hide');
    $('#add-btn').addClass('hide');
    $('#bday-form').addClass('hide');
    $('#login-container').show();
  }

  function addBday() {
    $('#bday-form').removeClass('hide');
  }

  let uid;

  function addContact(name, email, birthday) {
    console.log(email);
    console.log("addcontact", uid);
    const database = firebase.database().ref('/' + uid);
    console.log("UID", uid);
    const contact = {
        name: name,
        email: email,
        birthday: birthday
      }

    database.push(contact);

    database.on('child_added', function(data) {
      let nameData = data.val().name;
      let birthdayData = data.val().birthday;
      let emailData = data.val().email;
      console.log(nameData);
      console.log(birthdayData);
      console.log(emailData);
      $('#contact-list').removeClass();
      $('#contact-list').append("<p class='birthday'><strong>" + "Name: " + "</strong>" + nameData + "</p>");
      $('#contact-list').append("<p class='birthday'><strong>" + "Birthday: " + "</strong>" + birthdayData + "</p>");
      $('#contact-list').append("<p class='email'><strong>" + "Email: " + "</strong>" + "<a href='#'>" + emailData + "</a></p>");

    }, function (errorObject) {
       console.log('The read failed: ' + errorObject.code);

    });
  }
  // Add login event
  $('#login-btn').on('click', function(event) {
    event.preventDefault();
    // Get email and pass
    const auth = firebase.auth();
    console.log("auth", auth);
    const email = $('#email').val();
    const password = $('#password').val();
    // const userUID;
    // Sign in
    const promise = auth.signInWithEmailAndPassword(email, password);
    promise
    .then(user => {
      console.log('logged in');
      uid = user.uid;
    })
    .catch(e => console.log(e.message));
    $('#email').val('');
    $('#password').val('');
  })

  // Add signup event
  $('#signup-btn').on('click', function(event) {
    event.preventDefault();
    // Get email and pass
    const auth = firebase.auth();
    const email = $('#email').val();
    const password = $('#password').val();
    // const userUID;
    // Sign in
    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise
      .then(user => {
        console.log('signed up');
        uid = user.uid;
      })
      .catch(e => console.log(e.message));
      console.log("you are logged in");
      $('#email').val('');
      $('#password').val('');
  })

  $('#logout-btn').on('click', event => {
    firebase.auth().signOut();
    logOut();
  });
  // Add a realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      // signup func
      logIn();
    } else {
      console.log('not logged in');
    // login func
      signUp();
    }
  })
  // Add B-Day to contact list
  $('#add-btn').on('click', function(event) {
    event.preventDefault();
    console.log("clicked");
    addBday();
  });
  // Add contact to database
  $('#submit-btn').on('click', function(event) {
    event.preventDefault();
    console.log("clicked submit btn");

    const name = $('#name').val();
    const email = $('#email-add').val();
    console.log(email);
    const birthday = $('#birthday').val();

    addContact(name, email, birthday);
  })
});

// function writeUserData(userId, name, email, imageUrl) {
//   firebase.database().ref('users/' + userId).set({
//     username: name,
//     email: email,
//     profile_picture : imageUrl
//   });
// }
