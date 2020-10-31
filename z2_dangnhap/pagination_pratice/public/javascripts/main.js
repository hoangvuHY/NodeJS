$('#paging').pagination({
    dataSource: '/user?page=1',
    locator: 'data',
    totalNumberLocator: function(response) {
        // you can return totalNumber by analyzing response content
        // return Math.floor(Math.random() * (1000 - 100)) + 100;
        // console.log(response);
        return response.total;
    },
    showGoInput: true,
    showGoButton: true,
    pageSize: 3,
    pageRange: null,
    showPageNumbers: true,
    afterPageOnClick: (event, pageNumber) => {
        loadPage(pageNumber);
    },
    afterPreviousOnClick: (event, pageNumber) => {
        loadPage(pageNumber);
    },
    afterNextOnClick: (event, pageNumber) => {
        loadPage(pageNumber);
    },
    afterGoInputOnEnter: (event, pageNumber) => {
        loadPage(pageNumber);
    },
    afterGoButtonOnClick: (event, pageNumber) => {
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
            // console.log(res.data); 
            res.data.forEach((element) => {
                var item = $(`
      <h3>${element.username}: ${element.password}</h3>
      `)
                $('#container').append(item);
            })

        })
        .catch((err) => { console.log(error); })
}
loadPage(1);