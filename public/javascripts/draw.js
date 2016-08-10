var socket = io.connect('http://107.170.238.78:5000');

socket.on('move', function (data) {
    $('img').animate(data);
});

$('#move').click(function () {
    socket.emit('move', {
        left: $('#left').val(),
        top: $('#top').val()
    });
});

