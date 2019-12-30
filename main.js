document.getElementById('taskInputForm').addEventListener('submit', SaveTask);

function SaveTask(e) {

    var taskId = chance.guid();
    var taskTitle = document.getElementById('taskTitleInput').value;
    var taskDesc = document.getElementById('taskDescInput').value;
    var taskImportance = document.getElementById('taskImportanceInput').value;
    var taskStatus = document.getElementById('taskStatusInput').value;
    var taskAssignedTo = document.getElementById('taskAssignedToInput').value;


  var task = {
    id: taskId,
    title: taskTitle,
    description: taskDesc,
    importance: taskImportance,
    assignedTo: taskAssignedTo,
    status: taskStatus
  }

  if (localStorage.getItem('tasks') == null) {
    var tasks = [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else {
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  document.getElementById('taskInputForm').reset();

  loadTasks();

  e.preventDefault();
}



function loadTasks() {
  var tasks = JSON.parse(localStorage.getItem('tasks'));
  var tasksList = document.getElementById('tasksList');

  tasksList.innerHTML = '';

  for (var i = 0; i < tasks.length; i++) {
    var id = tasks[i].id;
    var title = tasks[i].title;
    var desc = tasks[i].description;
    var importance = tasks[i].importance;
    var assignedTo = tasks[i].assignedTo;
    var status = tasks[i].status;

    tasksList.innerHTML +=   '<div class="task jumbotron" style="background-color: #b3ffff; padding:20px;">'+
                              '<h6>Task ID: ' + id + '</h6>'+
                              '<p>Status: <span class="badge badge-info">' + status + '</span></p>'+
                              '<h3>' + title + '</h3>' +
                              '<p>' + desc + '</p>'+
                              '<p><i class="fas fa-exclamation"></i> ' + importance + '</p>'+
                              '<p><i class="fas fa-user"></i> ' + assignedTo + '</p>'+
                              '<a href="#" onclick="deleteTask(\''+id+'\')" class="btn btn-danger pull-right">Delete</a>'+
                              '<div class="btn-group" style="margin:10px;">' +
                              '<button type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' + 'Set Status' +
                              '</button>' +
                              '<div class="dropdown-menu">' +
                              '  <button class="dropdown-item" onclick="setStatus(\''+id+'\', \'' + 'Available' +'\')" href="#">Available</button>' +
                              '  <a class="dropdown-item" onclick="setStatus(\''+id+'\', \'' + 'In Progress' +'\')" href="#">In Progress</a>' + 
                              '  <a class="dropdown-item" onclick="setStatus(\''+id+'\', \'' + 'Done' +'\')" href="#">Done</a>' +
                              '</div>' +
                              '</div>' +
                              '</div>';
  }
}


function deleteTask(id) {
    var tasks = JSON.parse(localStorage.getItem('tasks'));
  
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id == id) {
        tasks.splice(i, 1);
      }
    }
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
  }

  //usun wszystkie taski
  $('button#deleteAll').click(function(){
    var tasks = JSON.parse(localStorage.getItem('tasks'));

    tasks.splice(0, tasks.length);

    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
  })

//zmiana statusu

function setStatus(id, status) {

    var tasks = JSON.parse(localStorage.getItem('tasks'));
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id == id) {
            tasks[i].status = status;
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
  }

//filtry

$('button.filter').click(function(){
    $('.task.jumbotron').hide();
    $('small#caption').empty();
    var fired_button = $(this).text();

    $(".task.jumbotron").each(function (index, element) {
        var status = $(element).find("span.badge.badge-info").text();
        if (fired_button === status){
            $('small#caption').append('Showing \''+ status +'\'');
            $(this).slideDown();
        }  
        
    });
})

function filterReset(){
    $('.task.jumbotron').show();
    $('small#caption').empty();
}

