document.getElementById('chatBox').style.display = 'none';

const user = document.getElementById("username");
user.style.display = 'none';

document.getElementById('chatButton').addEventListener('click', function () {
    var chatBox = document.getElementById('chatBox');
    if (chatBox.style.display === 'none' || chatBox.style.display === '') {
        chatBox.style.display = 'block';
    } else {
        chatBox.style.display = 'none';
    }
});

(function setupConnection() {
    document.querySelector('.sendButton').disabled = true;
    var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
    connection.on("lastMessage", function (message) {
        console.log(message);
        var li = document.createElement("li");
        li.className = "message";
        li.innerHTML = `
            <div>
                <span>
                    <b>${message.name}</b> 
                    <span>:</span>
                </span>
                <p>${message.text}</p>
            </div>
            <time>${message.time}</time>
            `;
        document.getElementById("messagesList").append(li);
        if (user.innerText == message.name)
        {
            li.style.alignSelf = 'flex-end';
            li.style.flexDirection = 'row-reverse';
        };
    });

    connection.start().then(function () {
        document.querySelector('.sendButton').disabled = false;
    }).catch(function (err) {
        return console.error(err.toString());
    });

})();

document.querySelector('.sendButton').addEventListener('click', function (e) {
    let input = document.querySelector(".messageInput");
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    console.log(username);
    if (input.value != "") {
        fetch("/Message", {
            method: "POST",
            body: JSON.stringify({
                name: user.innerText, text: input.value, time
            }),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => console.log('message added!'));
    }
    input.value = "";
    e.preventDefault();
});

