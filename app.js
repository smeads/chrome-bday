$(document).ready(function() {

  $('.container').append("<h1 id='main-header'>" + "Login/Signup" + "</h1>")
  $('.container').append("<div id='login-container'></div>");
  $('.container').append("<button type='submit' id='logout-btn' class='hide'>" + "Logout" + "</button>");
  $('.container').append("<button id='add-btn' class='hide'>" + "Add" + "</button>");
  $('#login-container').append("<form id='login-form'></form>");
  $('#login-form').append("<input type='email' id='email' placeholder='username'>");
  $('#login-form').append("<input type='password' id='password' placeholder='password'>");
  $('#login-form').append("<button type='submit' id='login-btn'>" + "Login" + "</button>");
  $('#login-form').append("<button type='submit' id='signup-btn'>" + "SignUp" + "</button>");
  $(".container").append("<form class='hide' id='bday-form'></form>");
  $("#bday-form").append("Name: " + "<input type='text' id='name'/>");
  $("#bday-form").append("Email: " + "<input type='email' id='email-add'/>");
  $("#bday-form").append("Birthday: " + "<input type='date' id='birthday'/>");
  $("#bday-form").append("<button id='submit-btn'>" + "Submit" +"</button>");
  $(".container").append("<div class='hide' id='contact-list'><h1>" + "BDAY CONTACT LIST" + "</h1></div>")

  // On signup show ADD btn
  function signUp() {
    $('#main-header').text("B-Day List");
    $('#login-container').hide();
    $('#logout-btn').removeClass('hide');
    $('#add-btn').removeClass('hide');
  };

  // On login function
  function logIn() {
    console.log("logged In");
    $('#main-header').text("B-Day List");
    $('#login-container').hide();
    $('#logout-btn').removeClass('hide');
    $('#add-btn').removeClass('hide');
  }

  function logOut() {
    console.log("logged Out");
    $('#main-header').text("Login/SignUp");
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
    const database = firebase.database().ref('/userContacts').child('/' + uid);
    console.log("UID", uid);
    const contact = {
        name: name,
        email: email,
        birthday: birthday
      }

    database.push(contact);

    database.on('value', function(data) {
      console.log(database);
      console.log(data.val());
      console.log(data.name);
      console.log(data.birthday);
      console.log(data.email);
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

  $('#add-btn').on('click', function(event) {
    event.preventDefault();
    console.log("clicked");
    addBday();
  });

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
