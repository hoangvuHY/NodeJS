
var currentPage = 1;
function loadPage(page) {
  currentPage = page;
  $.ajax({
    url: '/user?page=' + currentPage,
    method: 'get'
  }).then((data) => {
    // console.log();
    $("#container").html('');
    for (let i = 0; i < data.data.length; i++) {
      const element = data.data[i];
      console.log(element);
      var item = $(`
      <h1>${element.username}: ${element.password}</h1>
    `)
      $("#container").append(item);
    }
    // console.log(data);
  }).catch((err) => {
    console.log('API error');
  })
}
function nextPage() {
  currentPage++;
  $.ajax({
    url: '/user?page=' + currentPage,
    method: 'get'
  }).then((data) => {
    $("#container").empty();
    for (let i = 0; i < data.data.length; i++) {
      const element = data.data[i];
      var item = $(`
    <h1>${element.username}: ${element.password}</h1>
  `)
      $("#container").append(item);
    }
    // console.log(data);
  }).catch((err) => {
    console.log('API error');
  })
}
function previousPage() {
  currentPage--;
  $.ajax({
    url: '/user?page=' + currentPage,
    method: 'get'
  }).then((data) => {
    $("#container").empty();
    for (let i = 0; i < data.data.length; i++) {
      const element = data.data[i];
      var item = $(`
    <h1>${element.username}: ${element.password}</h1>
  `)
      $("#container").append(item);
    }
    // console.log(data);
  }).catch((err) => {
    console.log('API error');
  })
}
$.ajax({
  url: '/user',
  method: 'get'
}).then((data) => {
  // console.log(data.totalPage);
  for (let i = 0; i < data.totalPage; i++) {
    var li = $(`
    <li onclick="loadPage(${i + 1})" class="page-item"><a class="page-link" href="#">${i + 1}</a></li>      
    `)
    $(".pagination").append(li);
  }

  var li = $(`
  <li onclick="nextPage()" class="page-item"><a class="page-link" href="#">Next</a></li>
  `);
  $('.page-item:last-child ').after(li);
  // console.log(data);
}).catch((err) => {
  console.log('API error');
})