$("#btnSignin").click((e) => {
  e.preventDefault();
  $.ajax({
    url: "auth/sign-up",
    method: "post",
    data: {
      email: $("#email").val(),
      name: $("#name").val(),
      birthday: $("#birthday").val(),
      phone: $("#phone").val(),
      address: $("#address").val(),
      identification: $("#identification").val(),
      username: $("#username").val(),
      role: $("#role").val(),
      password: $("#password").val(),
    }
  }).then((data) => {
    console.log(data);
    if (!data.error && data.status === 200) {
      window.location.href = '/login';
      alert(data.message);
    } else {
      alert(data.message);
    }
  })
}) 