$("#btn").click((e) => {
  e.preventDefault();
  $.ajax({
    url: "auth/login",
    method: "post",
    data: {
      email: $("#email").val(),
      password: $("#password").val(),
    }
  }).then((data) => {
    console.log(data)
    if (!data.error && data.status === 200) {
      // window.location.href = '/home';
      alert(data.message);
    } else {
      alert(data.message);
    }
  })
})