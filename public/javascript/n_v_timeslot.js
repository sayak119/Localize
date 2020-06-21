
var m_timeslot = "";


function set_timeslot(id) {
    // console.log('what is timeslot');
    document.getElementsByClassName("okbutton")[0].disabled = false;
    m_timeslot = id;
    console.log(id);
    $("#needvol").text('timeslot: ' + id);
}



async function display_needvol(ids) {
    console.log(m_timeslot);
    console.log(ids);
    var data = {
        text: ids,
        time: m_timeslot
    };
    $.ajax({
        url: '/n_v_timeslot',
        method: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (res) {
            console.log(res);
            document.getElementById(m_timeslot).style.display = 'none';
            $("#needvol").text('You successfully requested order you want.');

        },
        error: function (error) {
            console.log('some error in fetching the intents');
        },
    });

}

function closewebview() {


    MessengerExtensions.requestCloseBrowser(function success() {
        // webview closed
    }, function error(err) {
        // an error occurred
    });


}

// (function (d, s, id) {
//     var js, fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) { return; }
//     js = d.createElement(s);
//     js.id = id;
//     js.src = "//connect.facebook.net/en_US/messenger.Extensions.js";
//     fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'Messenger'));

