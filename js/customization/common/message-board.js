/**
 * Created by Jason on 21/10/2017.
 */

function firstLoadDetailReply(varMessageBoardId, varMessageBoardUserId) {
    console.log(varMessageBoardId);
    console.log(varMessageBoardUserId);

    $.ajax({
        url: '/messageBoard/loadReplyDetail',
        type: "POST",//请求方式：get或post
        scriptCharset: 'utf-8',
        dataType: "json",//数据返回类型：xml、json、script
        cache: false,
        data: {
            'messageBoardId': varMessageBoardId,
            'messageBoardUserId': varMessageBoardUserId,
        },//自定义提交的数据
        success: function (json) {
            if (json !== null || json !== undefined || json !== '') {
                var masterArea = '<div class="media-left">' +
                    '<a href="#">' +
                    '<img class="media-object" src="/image/avator/' + json.data.avator + '" alt="avator"/>' +
                    '</a>' +
                    '</div>' +
                    '<div class="media-body">' +
                    '<h4 class="media-heading">' + json.data.userName +
                    '&nbsp;<button type="button" class="btn btn-primary btn-xs subReplyButtonMainClass" id="replyButtonInModel">' +
                    '回复&nbsp;' +
                    '<input type="hidden" id="messageBoardIdInModel" value="' + json.data.id + '"/>' +
                    '<input type="hidden" id="messageBoardUserIdInModel" value="' + json.data.userid + '"/>' +
                    '</button>' +
                    '</h4>' +
                    '<div>' + json.data.content +
                    '</div>' +
                    '</div>';
                $(".master-area").append(masterArea);
            }

            var subReplyArea = '<ul class="nav nav-tabs" role="tablist">' +
                '<li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">回复</a></li>' +
                '</ul>' +
                '<div class="tab-content" style="">' +
                '<div role="tabpanel" class="tab-pane active" id="home" style="padding-top: 20px">';
            /*<![CDATA[*/
            for (var i = 0; i < json.data.messageBoardSubreply.length; i++) {
                subReplyArea = subReplyArea +
                    '<div class="media">' +
                    '<div class="media-left">' +
                    '<a href="#">' +
                    '<img class="media-object" src="/image/avator/' + json.data.messageBoardSubreply[i].custom1 + '" alt="avator" width="60"/>' +
                    '</a>' +
                    '</div>' +
                    '<div class="media-body">' +
                    '<h4 class="media-heading">';
                if (json.data.messageBoardSubreply[i].replyUserId !== null) {
                    subReplyArea = subReplyArea + json.data.messageBoardSubreply[i].userName + '&nbsp;回复&nbsp;' + json.data.messageBoardSubreply[i].replyUserName + '&nbsp;';
                } else {
                    subReplyArea = subReplyArea + json.data.messageBoardSubreply[i].userName + '&nbsp;';
                }

                subReplyArea = subReplyArea + '<button type="button" class="btn btn-primary btn-xs subReplyButtonClass" id="subReplyButtonInModel">' +
                    '&nbsp;回复&nbsp;' +
                    '<input type="hidden" id="subReplyMessageBoardIdInModel" value="' + json.data.messageBoardSubreply[i].id + '"/>' +
                    '<input type="hidden" id="subReplyMessageBoardUserIdInModel" value="' + json.data.messageBoardSubreply[i].userid + '"/>' +
                    '<input type="hidden" id="subReplyMessageBoardUserNameInModel" value="' + json.data.messageBoardSubreply[i].userName + '"/>' +
                    '</button>' +
                    '</h4>' +
                    '<div>' + json.data.messageBoardSubreply[i].content + '</div>' +
                    '</div>' +
                    '</div>'
            }

            /*]]>*/
            subReplyArea = subReplyArea + '</div>';
            subReplyArea = subReplyArea + '<div class="set-margin-top next-btn">';
            if (json.data.custom1 == 'Y') {

                subReplyArea = subReplyArea + '<button type="button" class="btn btn-primary btn-block" id="nextPageBtn">下一页</button>' +
                    '<input type="hidden" id="nextPage" value="2"/>' +
                    '<input type="hidden" id="MessageBoardIdInSubRply" value="' + varMessageBoardId + '"/>' +
                    '<!--<input type="hidden" id="totalPage" value=""/>-->' +
                    '<!--<input type="hidden" id="PageSize" value=""/>-->';
            }
            subReplyArea = subReplyArea + '</div>' +


                '</div>';

            $(".subReply-area").append(subReplyArea);


            var replyArea = '<form action="/messageBoard/subReply" method="post">' +
                '<div class="form-group">' +
                '<label for="message-text" class="control-label">回复:</label>' +
                '<textarea class="form-control" id="messageText" name="messageText"></textarea>' +
                '<input type="hidden" id="replyTo" name="replyTo" value=""/>' +
                '<input type="hidden" id="messageBoardId4Reply" name="messageBoardId4Reply" value="' + json.data.id + '"/>' +
                '</div>' +
                '</form>';

            $(".reply-area").append(replyArea);
        },
        error: function (json) {
            alert("Request Error!")
        }
    })
}

function sendReplyOrSubReply(messageBoardId4Reply, replyTo, messageText) {
    $.ajax({
        url: '/messageBoard/sendReplyOrSubReply',
        type: "POST",//请求方式：get或post
        scriptCharset: 'utf-8',
        dataType: "json",//数据返回类型：xml、json、script
        cache: false,
        data: {
            'messageBoardId4Reply': messageBoardId4Reply,
            'replyTo': replyTo,
            'messageText': messageText
        },//自定义提交的数据
        success: function (json) {
            if (json !== null || json !== undefined || json !== '') {
                var subReply = '';
                subReply = subReply +
                    '<div class="media">' +
                    '<div class="media-left">' +
                    '<a href="#">' +
                    '<img class="media-object" src="/image/avator/' + json.data.custom1 + '" alt="avator" width="60"/>' +
                    '</a>' +
                    '</div>' +
                    '<div class="media-body">' +
                    '<h4 class="media-heading">';
                if (json.data.replyUserId !== null) {
                    subReply = subReply + json.data.userName + '&nbsp;回复&nbsp;' + json.data.replyUserName + '&nbsp;';
                } else {
                    subReply = subReply + json.data.userName + '&nbsp;';
                }

                subReply = subReply + '<button type="button" class="btn btn-primary btn-xs subReplyButtonClass" id="subReplyButtonInModel">' +
                    '&nbsp;回复&nbsp;' +
                    '<input type="hidden" id="subReplyMessageBoardIdInModel" value="' + json.data.id + '"/>' +
                    '<input type="hidden" id="subReplyMessageBoardUserIdInModel" value="' + json.data.userid + '"/>' +
                    '<input type="hidden" id="subReplyMessageBoardUserNameInModel" value="' + json.data.userName + '"/>' +
                    '</button>' +
                    '</h4>' +
                    '<div>' + json.data.content + '</div>' +
                    '</div>' +
                    '</div>';
                $("#home").append(subReply);
            }
        },
        error: function (json) {
            alert("Request Error!")
        }
    })
}

function getNextPage(pageIndex, messageBoardId4Reply) {
    $.ajax({
        url: '/messageBoard/getNextSubReply',
        type: "POST",//请求方式：get或post
        scriptCharset: 'utf-8',
        dataType: "json",//数据返回类型：xml、json、script
        cache: false,
        data: {
            'pageIndex': pageIndex,
            'messageBoardId4Reply': messageBoardId4Reply
        },//自定义提交的数据
        success: function (json) {
            if (json !== null || json !== undefined || json !== '') {
                /*<![CDATA[*/
                var subReply = '';

                for (var i = 0; i < json.data.Subreply.length; i++) {
                    subReply = subReply +
                        '<div class="media">' +
                        '<div class="media-left">' +
                        '<a href="#">' +
                        '<img class="media-object" src="/image/avator/' + json.data.Subreply[i].custom1 + '" alt="avator" width="60"/>' +
                        '</a>' +
                        '</div>' +
                        '<div class="media-body">' +
                        '<h4 class="media-heading">';
                    if (json.data.Subreply[i].replyUserId !== null) {
                        subReply = subReply + json.data.Subreply[i].userName + '&nbsp;回复&nbsp;' + json.data.Subreply[i].replyUserName + '&nbsp;';
                    } else {
                        subReply = subReply + json.data.Subreply[i].userName + '&nbsp;';
                    }

                    subReply = subReply + '<button type="button" class="btn btn-primary btn-xs subReplyButtonClass" id="subReplyButtonInModel">' +
                        '&nbsp;回复&nbsp;' +
                        '<input type="hidden" id="subReplyMessageBoardIdInModel" value="' + json.data.Subreply[i].id + '"/>' +
                        '<input type="hidden" id="subReplyMessageBoardUserIdInModel" value="' + json.data.Subreply[i].userid + '"/>' +
                        '<input type="hidden" id="subReplyMessageBoardUserNameInModel" value="' + json.data.Subreply[i].userName + '"/>' +
                        '</button>' +
                        '</h4>' +
                        '<div>' + json.data.Subreply[i].content + '</div>' +
                        '</div>' +
                        '</div>';
                }

                $("#home").append(subReply);
                checkNextBtn(pageIndex, messageBoardId4Reply)
                $("#nextPage").val(parseInt($("#nextPage").val()) + 1)
                /*]]>*/
            }
        },
        error: function (json) {
            alert("Request Error!")
        }
    })
}

function checkNextBtn(pageIndex, messageBoardId4Reply) {
    $.ajax({
        url: '/messageBoard/getSubReply',
        type: "POST",//请求方式：get或post
        scriptCharset: 'utf-8',
        dataType: "json",//数据返回类型：xml、json、script
        cache: false,
        data: {
            'pageIndex': pageIndex,
            'messageBoardId4Reply': messageBoardId4Reply
        },//自定义提交的数据
        success: function (json) {
            if (json !== null || json !== undefined || json !== '') {
                if (pageIndex == json.data) {
                    $(".next-btn").html('')
                }
            }
        },
        error: function (json) {
            alert("Request Error!")
        }
    })
}

$(document).ready(function () {

    $(".replyButtonClass").on("click", function () {
        firstLoadDetailReply($(this).children("#messageBoardId").val(), $(this).children("#messageBoardUserId").val());


        $("#subReplyModel").modal({
            keyboard: true//当按下esc键时，modal框消失
        })
    });

    $("#subReplyModel").on("hidden.bs.modal", function () {
        $(".master-area").html('');
        $(".subReply-area").html('');
        $(".reply-area").html('');
    });

    $(".master-area").delegate(".subReplyButtonMainClass", "click", function () {

        $("#replyTo").val('');
        $("#messageText").attr("placeholder", "");
        $("#messageText").val("");
    });

    $(".subReply-area").delegate(".subReplyButtonClass", "click", function () {
        $("#replyTo").val($(this).children("#subReplyMessageBoardUserIdInModel").val());
        var user = '@' + $(this).children('#subReplyMessageBoardUserNameInModel').val();
        $("#messageText").attr("placeholder", user);
        $("#messageText").val("");
    })

    $("#saveReplyBtn").on("click", function () {
        sendReplyOrSubReply($("#messageBoardId4Reply").val(), $("#replyTo").val(), $("#messageText").val())
        $("#messageText").val("");
    })

    $(".subReply-area").delegate("#nextPageBtn", "click", function () {
        getNextPage($("#nextPage").val(), $("#MessageBoardIdInSubRply").val());
    })

})