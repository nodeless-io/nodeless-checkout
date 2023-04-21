(function () {

  function warn() {
    if (window.console && window.console.warn) {
      window.console.warn.apply(window.console, arguments)
    }
  }

  if (window.nodeless) {
    warn('index.js attempted to initialize more than once.')
    return
  }

  var modal = document.createElement('div');
  modal.id = 'nodeless-modal';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  modal.style.display = 'none';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.zIndex = '9999';

  var iframe = document.createElement('iframe');

  iframe.name = 'nodeless'
  iframe.class = 'nodeless'
  iframe.style.border = 0
  iframe.style.position = 'absolute'
  iframe.style.top = '50%'
  iframe.style.left = '50%'
  iframe.style.height = '80%'
  iframe.style.maxWidth = '500px'
  iframe.style.width = '100%'
  iframe.style.zIndex = '2000'
  iframe.style.transform = 'translate(-50%, -50%)'
  iframe.style.borderRadius = '10px'

  var close = document.createElement('span');
  close.id = 'close';
  close.innerHTML = '&times;';
  close.style.position = 'absolute';
  close.style.top = '10px';
  close.style.right = '20px';
  close.style.cursor = 'pointer';
  close.style.color = 'white'
  close.style.fontSize = '30px'

  modal.appendChild(iframe);
  modal.appendChild(close);

  function showFrame(requestId) {
    if (window.document.getElementsByName('nodeless').length === 0) {
      document.body.appendChild(modal);
    }

    iframe.src = `http://localhost/gated-inbox-request/${requestId}`;
    modal.style.display = 'flex';
  }

  function closeFrame() {
    modal.style.display = 'none';
    iframe = window.document.body.removeChild(iframe);
  }

  window.addEventListener('load', function load() {
    window.removeEventListener('load', load);
  });

  close.addEventListener('click', function () {
    closeFrame()
  });

  window.nodeless = {
    showFrame: showFrame,
    closeFrame: closeFrame
  }

})()


