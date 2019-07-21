database = firebase.database();

let USER_ID = sessionStorage['USER_ID'];
if (!USER_ID) window.location.href = 'login.html';

$(document).ready(async function() {
  $('#save').on('click', saveActivity);
  $('#cancel').on('click', cancelAdd);

  const db = new Repository(database);
  const activities = await db.getActivitiesByUserId(USER_ID);
  const activitiesHtml = activities.map(a => showActivities(a));
  $('#my-activities').append(activitiesHtml);
});

async function saveActivity() {
  const activity = $('.activity-list').val();
  const weekday = $('.weekday').val();
  const period = $('.period').val();
  const db = new Repository(database);

  const newActivityId = db.insertActivity({
    timestamp: new Date().getTime(),
    user: USER_ID,
    activity: activity,
    weekday: weekday,
    period: period
  });

  const activities= await db.getActivityByID(newActivityId, USER_ID);
  $('#my-activities').prepend(showActivities(activities));
}

function showActivities(activity){
  const template = `
  <li>
    <div class="edit-align rounded-border">
      <span class="font-size-m span-padding">${abbr(activity.activity)}</span>
      <span class="font-size-m span-border">${activity.weekday.substring(0,3)}</span>
      <span class="font-size-m span-padding">${activity.period}</span>
      <i class="fas fa-pen span-padding font-size-m"></i>
    </div>
  </li>`

  return template;
}

function abbr(str){
  return str.length > 10 ? str.substring(0, 10) : str; 
}

function cancelAdd() {
  window.location.reload();
}