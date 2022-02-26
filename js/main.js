$(document).ready(function () {
  // buttons and spinners
  var load_list = $("#load-list");
  var load_list_spinner = $("#load-list-spinner");
  var create_account_btn = $("#create-account-btn");
  var create_account_btn_spinner = $("#create-account-btn-spinner");
  var generate_token_btn = $("#generate-token-btn");
  var generate_token_btn_spinner = $("#generate-token-btn-spinner");
  var create_todo_btn = $("#create-todo-btn");
  var create_todo_btn_spinner = $("#create-todo-btn-spinner");
  var update_todo_btn = $("#update-todo-btn");
  var update_todo_btn_spinner = $("#update-todo-btn-spinner");
  var delete_todo_btn = $("#delete-todo-btn");
  var delete_todo_btn_spinner = $("#delete-todo-btn-spinner");

  load_list_spinner.hide();
  create_account_btn_spinner.hide();
  generate_token_btn_spinner.hide();
  create_todo_btn_spinner.hide();
  update_todo_btn_spinner.hide();
  delete_todo_btn_spinner.hide();

  // hide/show token
  var token = $("#token");
  var token_btn = $("#token-btn");

  token_btn.click(function () {
    token.toggleClass("show-hide");
  });

  // ajax
  var create_form = $("#create-form");
  var token_form = $("#token-form");
  var create_todo = $("#create-todo");
  var update_todo = $("#update-todo");
  var delete_todo = $("#delete-todo");

  create_form.submit(function (event) {
    event.preventDefault();

    var form_data = {
      username: $("#create-username").val(),
      email: $("#email").val(),
      first_name: $("#first-name").val(),
      last_name: $("#second-name").val(),
      password: $("#create-password").val(),
    };

    $.ajax({
      url: "https://hidden-garden-92379.herokuapp.com/api/create-account/",
      method: "POST",
      async: true,
      dataType: "json",
      data: form_data,
      beforeSend: function () {
        create_account_btn.hide();
        create_account_btn_spinner.show();
      },
      success: function (response) {
        console.log(response);
        alert(response["Action status"]);
      },
      error: function (error) {
        console.log(error);
        alert(error["Action status"]);
      },
      complete: function () {
        create_account_btn_spinner.hide();
        create_account_btn.show();
      },
    });
  });

  token_form.submit(function (event) {
    event.preventDefault();

    var form_data = {
      username: $("#authenticate-username").val(),
      password: $("#authenticate-password").val(),
    };

    $.ajax({
      url: "https://hidden-garden-92379.herokuapp.com/api/generate-token/",
      method: "POST",
      async: true,
      dataType: "json",
      data: form_data,
      beforeSend: function () {
        generate_token_btn.hide();
        generate_token_btn_spinner.show();
      },
      success: function (response) {
        console.log(response);
        localStorage.setItem($("#authenticate-username").val(), response.token);
        alert("Token generated successfully.");
      },
      error: function (error) {
        console.log(error);
        alert(error.Error);
      },
      complete: function () {
        generate_token_btn_spinner.hide();
        generate_token_btn.show();
        var username = $("#authenticate-username").val();
        var user_token = localStorage.getItem(username);
        token.val(user_token);
      },
    });
  });

  create_todo.submit(function (event) {
    event.preventDefault();

    var todo_item = $("#todo-create").val();
    var access_token = $("#todo-create-token").val();
    var completed_task = $("#completed-create");
    var check = completed_task.is(":checked");

    if (check === true) {
      var todo_complete = check;
    } else {
      var todo_complete = check;
    }

    var form_data = {
      thing_to_do: todo_item,
      completed: todo_complete,
    };

    $.ajax({
      url: "https://hidden-garden-92379.herokuapp.com/api/todo-list/",
      method: "POST",
      async: true,
      dataType: "json",
      data: form_data,
      headers: {
        Authorization: "Token " + access_token,
      },
      beforeSend: function () {
        create_todo_btn.hide();
        create_todo_btn_spinner.show();
      },
      success: function (response) {
        console.log(response);
        alert("To-do item created successfully");
      },
      error: function (error) {
        console.log(error);
        alert("Error! You have made a bad request.");
      },
      complete: function () {
        create_todo_btn_spinner.hide();
        create_todo_btn.show();
      },
    });
  });

  update_todo.submit(function (event) {
    event.preventDefault();

    var access_token = $("#todo-update-token").val();
    var todo_item_id = $("#todo-update").val();
    var todo_edit = $("#todo-edit").val();
    var completed_task = $("#completed-update");
    var check = completed_task.is(":checked");

    if (check === true) {
      var todo_complete = check;
    } else {
      var todo_complete = check;
    }

    var form_data = {
      thing_to_do: todo_edit,
      completed: todo_complete,
    };

    $.ajax({
      url:
        "https://hidden-garden-92379.herokuapp.com/api/todo-item/" +
        todo_item_id +
        "/",
      method: "PUT",
      async: true,
      dataType: "json",
      data: form_data,
      headers: {
        Authorization: "Token " + access_token,
      },
      beforeSend: function () {
        update_todo_btn.hide();
        update_todo_btn_spinner.show();
      },
      success: function (response) {
        console.log(response);
        alert("To-do item updated successfully");
      },
      error: function (error) {
        console.log(error);
        alert(error.Error);
      },
      complete: function () {
        update_todo_btn_spinner.hide();
        update_todo_btn.show();
      },
    });
  });

  delete_todo.submit(function (event) {
    event.preventDefault();

    var access_token = $("#todo-delete-token").val();
    var todo_item_id = $("#todo-delete").val();

    $.ajax({
      url:
        "https://hidden-garden-92379.herokuapp.com/api/todo-item/" +
        todo_item_id +
        "/",
      method: "DELETE",
      async: true,
      dataType: "json",
      headers: {
        Authorization: "Token " + access_token,
      },
      beforeSend: function () {
        delete_todo_btn.hide();
        delete_todo_btn_spinner.show();
      },
      success: function (response) {
        console.log(response);
        alert("Item deleted successfully.");
      },
      error: function (error) {
        console.log(error);
        alert("Error! You have made a bad request.");
      },
      complete: function () {
        delete_todo_btn_spinner.hide();
        delete_todo_btn.show();
      },
    });
  });
});
