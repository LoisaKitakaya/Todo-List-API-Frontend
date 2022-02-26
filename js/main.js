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

  load_list_spinner.hide();
  create_account_btn_spinner.hide();
  generate_token_btn_spinner.hide();
  create_todo_btn_spinner.hide();
  update_todo_btn_spinner.hide();

  // hide/show token
  var token = $("#token");
  var token_btn = $("#token-btn");

  token_btn.click(function () {
    token.toggleClass("show-hide");
  });

  // alert
  var success_alert = $("#success-alert");
  var error_alert = $("#error-alert");

  success_alert.hide();
  error_alert.hide();
});
