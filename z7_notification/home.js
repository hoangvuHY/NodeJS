function notifyMe() {
  if (!window.Notification) {
    console.log('Browser does not support notifications.');
  } else {
    // check if permission is already granted
    if (Notification.permission === 'granted') {
      // show notification here
      var notify = new Notification('Hi there!', {
        body: 'How are you doing?',
        icon: 'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg',
      });
    } else {
      // request permission from user
      Notification.requestPermission().then(function (p) {
        if (p === 'granted') {
          // show notification here
          var notify = new Notification('Hi there!', {
            body: 'How are you doing?',
            icon: 'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg',
          });
        } else {
          console.log('User blocked notifications.');
        }
      }).catch(function (err) {
        console.error(err);
      });
    }
  }
}