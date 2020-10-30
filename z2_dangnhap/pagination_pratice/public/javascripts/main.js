$('#paging').pagination({
  dataSource: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
  pageSize: 2,
  afterPageOnClick: (event, pageNumber) => {
    // console.log(p);
    loadPage(pageNumber);
  }
})

var current = 1;
function loadPage(page) {
  $("#container").empty();
  // current = page;
  $.ajax({
    url: './user?page=' + page,
    method: 'get'
  }).then((res) => {
    console.log(res.data);
    console.log(res.totalPage);
    res.data.forEach((element) => {
      console.log(element);
      var item = $(`
      <h3>${element.username}</h3>
      `)
      $('#container').append(item);
    })

  })
    .catch((err) => { console.log(error); })
}