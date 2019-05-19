const database = firebase.database();

let USER_ID = sessionStorage["USER_ID"];
if (!USER_ID) window.location.href = "login.html";

$(document).ready(async function() {
  const db = new Repository(database);
  const user = await db.getUserById(USER_ID);
  const bdayParts = user.birthday.split('-');

  $(".picture").html(user.picture);
  $(".name").text(user.name);
  $(".email").text(user.email);
  $(".bday").text(`${bdayParts[2]}/${bdayParts[1]}/${bdayParts[0]}`);
  $(".gender").text(user.gender);
  $(".state").text(user.state);
  $(".city").text(user.city);
});

