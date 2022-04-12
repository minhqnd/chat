var config = {
    apiKey: "AIzaSyDVgPfw2XjnC5HaFgSBmXuTQwSMdng_t_A",
    authDomain: "stromez-ed239.firebaseapp.com",
    databaseURL: "https://stromez-ed239-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "stromez-ed239",
    storageBucket: "stromez-ed239.appspot.com",
    messagingSenderId: "163917711894",
};
firebase.initializeApp(config);
const database = firebase.database();
const cuid = document.getElementById('cuid');
const duid = document.getElementById('duid');
const iduc = document.getElementById('idcu');
const chatmain = document.getElementById('chat-area-main');
const toggleButton = document.querySelector('.dark-light');
const colors = document.querySelectorAll('.color');
const likebutton = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="#ffffff" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" class="likebutton"><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" /></svg>';
const id = Date.now();
var user = 'guest';
console.log(id);
check = false;

function defavt(uid) {
    var cc = '#' + uid.toString(16).substr(5, 11)
        return '<svg class="chat-msg-img" xmlns="http://www.w3.org/2000/svg" opacity="0.8" fill="' + cc + '" viewBox="2.5 2 35 35" version="1.1"><title>ID: ' + uid + '</title> <path d="M 20 2.5 C 10.34375 2.5 2.5 10.34375 2.5 20 C 2.5 29.65625 10.34375 37.5 20 37.5 C 29.65625 37.5 37.5 29.65625 37.5 20 C 37.5 10.34375 29.65625 2.5 20 2.5 Z M 15.03125 14.6875 C 15.1875 12.1875 17.21875 10.1875 19.71875 10.03125 C 22.625 9.875 25 12.1875 25 15.03125 C 25 17.78125 22.75 20.03125 20 20.03125 C 17.125 20.03125 14.84375 17.59375 15.03125 14.6875 Z M 30 29.15625 C 30 29.625 29.625 30 29.15625 30 L 10.875 30 C 10.40625 30 10.03125 29.625 10.03125 29.15625 L 10.03125 26.65625 C 10.03125 23.34375 16.6875 21.65625 20 21.65625 C 23.3125 21.65625 29.96875 23.3125 29.96875 26.65625 Z M 30 29.15625 "></path></svg>'
};

colors.forEach(color => {
    color.addEventListener('click', e => {
        colors.forEach(c => c.classList.remove('selected'));
        const theme = color.getAttribute('data-color');
        document.body.setAttribute('data-theme', theme);
        color.classList.add('selected');
    });
});

toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

function refresh() {
    chatmain.innerHTML = '';
    idcu.innerHTML = '';
    cuid.innerHTML = '';
    duid.innerHTML = '';
    chain = false;
};

function converttime(t) {
    const dt = new Date(t);
    const hr = dt.getHours();
    const m = "0" + dt.getMinutes();
    return hr + ':' + m.substr(-2)
};

function convertdate(t) {
    const dt = new Date(t);
    const d = dt.getDate();
    const m = dt.getMonth() + 1;
    const y = dt.getFullYear();
    return d + '/' + m + '/' + y;
}

function deletechat() {
    database.ref("/chat").remove();
    refresh();
};

if (user == 'guest') {
    loadchat();
} else {
    loadchat();
};

function checkid(idd) {
    if (idcu.innerHTML == '') {
        idcu.innerHTML = idd;
        cuid.innerHTML = 'c' + idcu.innerHTML;
        duid.innerHTML = 'd' + idcu.innerHTML;
        chain = false;
    } else {
        if (idd != idcu.innerHTML) {
            idcu.innerHTML = idd;
            cuid.innerHTML = 'c' + idcu.innerHTML;
            duid.innerHTML = 'd' + idcu.innerHTML;
            chain = false;
        } else {
            chain = true;
        }
    }
    return;
}

function loadchat() {
    database.ref("/chat").on("child_added", function (snapshot) {
        var message = snapshot.val().chat;
        var time = snapshot.val().time;
        checkid(snapshot.val().id);
        if (id == snapshot.val().id) {
            check = true;
            if (chain) {
                if (message == 'likebutton') {
                    $('.' + cuid.innerHTML).append(likebutton);
                } else {
                    $('.' + cuid.innerHTML).append('<div class="chat-msg-text">' + message + ' </div>');
                }
                document.getElementById(duid.innerHTML).innerHTML = 'Message seen ' + converttime(time);
            } else {
                var chatLine = $('<div class="chat-msg owner">');
                chatLine.append('<div class="chat-msg-profile">' + defavt(snapshot.val().id) + '<div class="chat-msg-date" id="' + duid.innerHTML + '">Message seen ' + converttime(time) + '</div> </div>');
                if (message == 'likebutton') {
                    chatLine.append('<div class="chat-msg-content ' + cuid.innerHTML + '">' + likebutton + '</div>');
                } else {
                    chatLine.append('<div class="chat-msg-content ' + cuid.innerHTML + '"><div class="chat-msg-text">' + message + '</div></div>');
                }
            }
            $(".chat-area-main").append(chatLine);
            scrollDown();
        } else {
            //tin nhan nhan
            check = false;
            if (chain) {
                if (message == 'likebutton') {
                    $('.' + cuid.innerHTML).append(likebutton);
                } else {
                    $('.' + cuid.innerHTML).append('<div class="chat-msg-text">' + message + ' </div>');
                }
                document.getElementById(duid.innerHTML).innerHTML = 'Message seen ' + converttime(time);
            } else {
                var chatLine = $('<div class="chat-msg">');
                chatLine.append('<div class="chat-msg-profile">' + defavt(snapshot.val().id) + '<div class="chat-msg-date" id="' + duid.innerHTML + '">Message seen ' + converttime(time) + '</div> </div>');
                if (message == 'likebutton') {
                    chatLine.append('<div class="chat-msg-content ' + cuid.innerHTML + '">' + likebutton + '</div>');
                } else {
                    chatLine.append('<div class="chat-msg-content ' + cuid.innerHTML + '"><div class="chat-msg-text">' + message + '</div></div>');
                }
            }
            $(".chat-area-main").append(chatLine);
            scrollDown();
        }
        //hien tom tat chat
        //if (message.length > 16) {
        //document.getElementById('generalchat').innerHTML = (message.slice(0, 16) + '...')
        //} else {
        //	document.getElementById('generalchat').innerHTML = (message)
        //}
        if (convertdate(Date.now()) != convertdate(id)) {
            deletechat();
        }
    });
}

function loadlike(chatLine) {
    $('.' + cuid.innerHTML).append(likebutton);
}

function scrollDown() {
    var chatRoom = $(".chat-area");
    var height = chatRoom[0].scrollHeight;
    chatRoom.scrollTop(height);
}

$(".sendmess").keyup(function (event) {
    if (event.keyCode == 13) {
        send();
    }
});

$(".like").click(function () {
    sendlike();
});

function sendlike() {
    if (check) {
        database.ref("/chat").push({
            chat: 'likebutton',
            id: id,
            time: Date.now(),
        });
    } else {
        database.ref("/chat").push({
            chat: 'likebutton',
            id: id,
            time: Date.now(),
        })
    }
}

function send() {
    var enteredText = $(".sendmess").val();
    if (enteredText.length > 0) {
        if (check) {
            database.ref("/chat").push({
                chat: enteredText,
                id: id,
                time: Date.now(),
            });
        } else {
            database.ref("/chat").push({
                chat: enteredText,
                id: id,
                time: Date.now(),
            })
        }
    }
    $(".sendmess").val("");
}
