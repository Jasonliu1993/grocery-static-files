function updateRow(currentRow) {
    $.ajax({
        url: '/messageBoard/updateMessageBoardTitleMessage',
        type: "POST",//请求方式：get或post
        scriptCharset: 'utf-8',
        dataType: "json",//数据返回类型：xml、json、script
        cache: false,
        data: {
            'id': currentRow.children("td:first").children().val(),
            'content': currentRow.children("td:first").next().children().val(),
            'orderNum': currentRow.children("td:first").next().next().children().val(),
        },//自定义提交的数据
        success: function (json) {
            if (json !== null || json !== undefined || json !== '') {
                currentRow.children("td:first").children().val(json.data.id)
                currentRow.children("td:first").next().next().next().next().append("<i class='glyphicon glyphicon-ok'></i>")
            }
        },
        error: function (json) {
//                    alert("Request Error!")
            children("td:first").next().next().next().next().append("<i class='glyphicon glyphicon-remove'></i>")
        }
    })
}

function insertRow(currentRow) {
    $.ajax({
        url: '/messageBoard/insertMessageBoardTitleMessage',
        type: "POST",//请求方式：get或post
        scriptCharset: 'utf-8',
        dataType: "json",//数据返回类型：xml、json、script
        cache: false,
        data: {
            'content': currentRow.children("td:first").next().children().val(),
            'orderNum': currentRow.children("td:first").next().next().children().val(),
        },//自定义提交的数据
        success: function (json) {
            if (json !== null || json !== undefined || json !== '') {
                currentRow.children("td:first").children().val(json.data.id)
                currentRow.children("td:first").next().next().next().next().append("<i class='glyphicon glyphicon-ok'></i>")
            }
        },
        error: function (json) {
//                    alert("Request Error!")
            children("td:first").next().next().next().next().append("<i class='glyphicon glyphicon-remove'></i>")
        }
    })
}

function addRow(table) {

    var table = $('#editTable').DataTable();
    table.row.add(["", "", "", ""]).draw();

}

function deleteRow(currentRow, table) {

    $.ajax({
        url: '/messageBoard/deleteMessageBoardTitleMessages',
        type: "POST",//请求方式：get或post
        scriptCharset: 'utf-8',
        dataType: "json",//数据返回类型：xml、json、script
        cache: false,
        data: {
            'id': currentRow.parent().prev().prev().prev().children().val(),
        },//自定义提交的数据
        success: function (json) {
            if (json !== null || json !== undefined || json !== '') {
                if ("Y" == json.data) {
                    table.row('.selected').remove().draw(false);
                }
            }
        },
        error: function (json) {
            alert("Request Error!")
        }
    })
}

function setAdminMenuActive(currentType) {
    $(".nav-stacked li").each(function () {
        $(this).removeClass("active");
    })
    $("#" + currentType + "").addClass("active");
}

function transforDataToNull(data) {
    if (data == null || data == undefined || data == '') {
        return '';
    } else {
        return data
    }
}
