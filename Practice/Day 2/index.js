const name_input = document.querySelector("input[type = 'text']");

const email_input = document.querySelector("input[type='email']");

const confirm_button = document.querySelector(".confirm");

function check_form(){

  const name = name_input.value.trim();

  const email = email_input.value.trim();

  if (!name || !email){
    window.alert("Fill in the form, b1tch!");
    return;
  }

  if (!email.includes("@") || !email.includes(".")){
    window.alert("That is not a facking email!");
    return;
  }

  window.alert(`Finally, ${name} know how to put it properly.`);

}