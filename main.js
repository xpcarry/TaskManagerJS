document.getElementById('taskInputForm').addEventListener('submit', SaveTask);

function SaveTask(e) {

    var taskId = chance.guid();
    var taskDesc = document.getElementById('taskDescInput').value;
    var taskImportance = document.getElementById('taskImportanceInput').value;
    var taskStatus = document.getElementById('taskStatusInput').value;
    var taskAssignedTo = document.getElementById('taskAssignedToInput').value;


  var task = {
    id: taskId,
    description: taskDesc,
    Importance: taskImportance,
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
  var tasksListe = document.getElementById('tasksList');

  tasksList.innerHTML = '';

  for (var i = 0; i < tasks.length; i++) {
    var id = tasks[i].id;
    var desc = tasks[i].description;
    var Importance = tasks[i].Importance;
    var assignedTo = tasks[i].assignedTo;
    var status = tasks[i].status;

    tasksList.innerHTML +=   '<div class="task jumbotron" style="background-color: #b3ffff; padding:20px;">'+
                              '<h6>Task ID: ' + id + '</h6>'+
                              '<p>Status: <span class="badge badge-info">' + status + '</span></p>'+
                              '<h3>' + desc + '</h3>'+
                              '<p><i class="fas fa-exclamation"></i> ' + Importance + '</p>'+
                              '<p><i class="fas fa-user"></i> ' + assignedTo + '</p>'+
                              '<a href="#" onclick="deleteTask(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                              '<div class="btn-group" style="margin:10px;">' +
                              '<button type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' + 'Set Status' +
                              '</button>' +
                              '<div class="dropdown-menu">' +
                              '  <a class="dropdown-item" onclick="setStatusAvailable(\''+id+'\')" href="#">Available</a>' +
                              '  <a class="dropdown-item" onclick="setStatusInProgress(\''+id+'\')" href="#">In Progress</a>' + 
                              '  <a class="dropdown-item" onclick="setStatusDone(\''+id+'\')" href="#">Done</a>' +
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


function setStatusAvailable(id) {
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id == id) {
            tasks[i].status = 'Available';
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
  }

  function setStatusInProgress(id) {
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id == id) {
            tasks[i].status = 'In Progress';
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
  }

  function setStatusDone(id) {
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id == id) {
            tasks[i].status = 'Done';
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
  }
  

$('button.filter').click(function(){
    $('.task.jumbotron').hide();
    var fired_button = $(this).text();

    $(".task.jumbotron").each(function (index, element) {
        var status = $(element).find("span.badge.badge-info").text();
        if (fired_button === status){
            $(this).slideDown();
        }  
        
    });
})

function filterReset(){
    $('.task.jumbotron').show();
}

