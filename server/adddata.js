//     Mongo Scheme
//     messages:
//     id, createdAt, chat_id = id of chat, owner_id = id of user, content = text
//     users:
//     id, createdAt, username, phone, ava = link to image, chats = [ ids of chats]
//     chats:
//     id, createdAt, messages = [ids of messages], users = [ids of users]
var users = [
  {
    createdAt: (new Date()).getTime(),
    phone: '89164835827',
    username: "ars32",
    ava: "https://robohash.org/ars32"
  },
  {
    createdAt: (new Date()).getTime(),
    phone: '9876543210',
    username: "sasha",
    ava: "https://robohash.org/sasha"
  },
  {
    createdAt: (new Date()).getTime(),
    phone: '1234567890',
    username: "anna",
    ava: "https://robohash.org/anna"
  }
];

var messages = [
  {
    createdAt: (new Date()).getTime(),
    from: '',
    to: '',
    content: 'Lorem ipsum'
  }
];

var message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

function rand(i){
  return Math.floor(Math.random()*(i || 10));
}
Meteor.startup(function () {
  if (Users.find().count() === 0 && Messages.find().count() === 0) {
    var timestamp = (new Date()).getTime();
    var allu = [];
    _.each( users , function(list) {
      var l_id = Users.insert(
        {
          username: list.username,
          phone: list.phone,
          ava: list.ava
        });
        allu.push(l_id);
    });
    for (var i = rand(550)+1 ; i>0 ; i = i - 1 ){
      var a = rand(3), b = rand(3);
      while(b==a){
        b = rand(3);
      }
      Messages.insert({
        from: allu[a],
        to: allu[b],
        content: message.substring( rand(message.length - 1), rand(message.length) )
      });
    }
  }
});
