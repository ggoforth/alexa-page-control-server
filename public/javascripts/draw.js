// var socket = io.connect('http://localhost:5000'),
var socket = io.connect('http://bitwiseman.shift3sandbox.com'),
  $i = $('img.supes'),
  $w = $(window),
  $crosshairs = $('.crosshairs');

/**
 * The move event.
 */
socket.on('move', function (data) {
  if (data.left > $w.width() - $i.width()) {
    data.left = $w.width() - $i.width();
  }

  if (data.top > $w.height() - $i.height()) {
    data.top = $w.height() - $i.height();
  }

  var crosshairs = {
    display: 'block',
    left: parseInt(data.left, 10),
    top: parseInt(data.top, 10)
  };
  
  $crosshairs.css(crosshairs);

  setTimeout(function () {
    $i.animate(data);
  }, 0);
});

/**
 * Handle resetting.
 */
socket.on('reset', function () {
  window.location.reload(true);
});

/**
 * Handle spinning.
 */
socket.on('showoff', function () {
  $crosshairs.hide();
  
  $i.addClass('spin');
  
  setTimeout(function () {
    $i.removeClass('spin'); 
  }, 2000);
});

/**
 * The Zoom event.
 */
socket.on('zoom', (function () {
  $crosshairs.hide();
  
  var $scaled = $i.clone(),
    scaling = 1.7;

  $scaled.css({
    position: 'absolute',
    top: '-10000px',
    left: '-10000px',
    height: $i.height() * scaling,
    width: $i.width() * scaling
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
        /**
         * Scale him up while keeping him in the center of the screen.
         */
        $i.animate({
          height: $i.height() * scaling,
          width: $i.width() * scaling,
          top: (height / 2) - ($scaled.height() / 2),
          left: (width / 2) - ($scaled.width() / 2)
        }, 2000, 'easeOutExpo', function () {
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

/**
 * Show off
 */
$('#showoff').click(function () {
  socket.emit('showoff', {});
});

$('.help').click(function () {
  $('body').toggleClass('show-help'); 
});



