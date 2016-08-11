var socket = io.connect('http://localhost:5000');
// var socket = io.connect('http://107.170.238.78:5000');

/**
 * The move event.
 */
socket.on('move', function (data) {
  $('img').animate(data);
});

/**
 * The Zoom event.
 */
socket.on('zoom', (function () {
  var $w = $(window),
    $i = $('img'),
    scale = '120%';

  var $scaled = $i.clone();
  $scaled.css({
    position: 'absolute',
    top: '-10000px',
    left: '-10000px',
    height: scale,
    width: scale
  });

  $('body').append($scaled);

  return function (data) {
    var height = $w.height(),
      width = $w.width(),
      iHeight = $i.height(),
      iWidth = $i.width(),
      centered = {
        top: (height / 2) - (iHeight / 2),
        left: (width / 2) - (iWidth / 2)
      };

    /**
     * Animate supes to the center of the screen
     */
    $i.animate(centered, function () {
      setTimeout(function () {
        $i.animate($.extend({
          height: '35%',
          width: '25%'
        }, centered), 500, 'easeInOutQuint', function () {
          /**
           * Scale him up while keeping him in the center of the screen.
           */
          $i.animate({
            height: scale,
            width: scale,
            top: (height / 2) - ($scaled.height() / 2),
            left: (width / 2) - ($scaled.width() / 2)
          }, 500, 'easeOutExpo', function () {
            /**
             * After some time, scale him back down
             */
            setTimeout(function () {
              $i.animate($.extend({
                height: iHeight,
                width: iWidth
              }, centered), 3000);
            }, 2000);
          });
        });
      }, 500);
    });
  };
})());

/**
 * Handle the manual move.
 */
$('#move').click(function () {
  socket.emit('move', {
    left: $('#left').val(),
    top: $('#top').val()
  });
});

/**
 * Handle the manual zoom.
 */
$('#zoom').click(function () {
  socket.emit('zoom', {
    left: $('#left').val(),
    top: $('#top').val()
  });
});

