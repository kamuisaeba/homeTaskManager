// Add multiple users to the users list.
function updateUserList(users) {
  users.forEach(function(user) {
    addUser(user);
  });
}

function updateCategoryList(categories){
	categories.forEach(function(category){
		addCategory(category);
	})
}


// Add multiple users to the users list.
function updateTaskList(list) {
  list.forEach(function(user) {
    addItemTask(user);
  });
}

function addUser(user) {
	$('#users ul').append('<li>'+user.name+"</li>")
}

function addCategory(cat){
	$('ul.nav.navbar-nav').append('<li><a href="#" id='+cat.id+'>'+String(cat.name)+'<span class="badge">'+cat.tasks.length+'</span></a></li>')
}

function addItemTask(user) {

	$('#tasks ul').append('<li>'+user.name+"</li>")
}

io.socket.on('connect', function socketConnected() {
io.socket.on('hello', function(data) {
		console.info(data);
		//Rellenamos tantos div como categorías tenga el usuario
		//todos los div's están escondidos, hasta que se haga click en su elemento de menú

    });	
io.socket.on('user', function messageReceived(message) {

      switch (message.verb) {

        // Handle user creation
        case 'created':
          addUser(message.data);
          break;

        // Handle a user changing their name
        case 'updated':

          // Get the user's old name by finding the <option> in the list with their ID
          // and getting its text.
          var oldName = $('#user-'+message.id).text();

          // Update the name in the user select list
          $('#user-'+message.id).text(message.data.name);

          // If we have a private convo with them, update the name there and post a status message in the chat.
          if ($('#private-username-'+message.id).length) {
            $('#private-username-'+message.id).html(message.data.name);
            postStatusMessage('private-messages-'+message.id,oldName+' has changed their name to '+message.data.name);
          }

          break;

        // Handle user destruction
        case 'destroyed':
          removeUser(message.id);
          break;

        // Handle private messages.  Only sockets subscribed to the "message" context of a
        // User instance will get this message--see the onConnect logic in config/sockets.js
        // to see where a new user gets subscribed to their own "message" context
        case 'messaged':
          receivePrivateMessage(message.data);
          break;

        default:
          break;
      }

    });


io.socket.on('task', function messageReceived(message) {
	switch (message.verb) {
	case 'created':
          addItemTask(message.data);
          break;
    default:
         break;

      }
});

// Get the current list of users online.  This will also subscribe us to
    // update and destroy events for the individual users.
    io.socket.get('/category',updateCategoryList);

    io.socket.get('/user', updateUserList);

    io.socket.get('/task',updateTaskList);

    $('#submitTask').click(function(){
    	console.info("new task");
     io.socket.post('/task',{name: $('#task').val()}, function (response) { 
     	addItemTask(response);
     	console.info(response);  	
    })
  // create a new user
});
});

