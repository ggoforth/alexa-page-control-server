var socket = io.connect('http://localhost:5000');

socket.on('move', function (data) {
    $('img').animate(data);
});

$('#move').click(function () {
    socket.emit('move', {
        left: $('#left').val(),
        top: $('#top').val()
    });
});

