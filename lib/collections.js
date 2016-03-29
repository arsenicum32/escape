//     Mongo Scheme
//     messages:
//     id, createdAt, from, to, content = text, read = bool (readed mes?)
//     users:
//     id, createdAt, username, phone, ava = link to image, online = last onlinetime, send = last send user id or empty string, chats = [ids of chats]
//     chats:
//     id, createdAt, party = [ids of users], message = [ids of message]
//     she:
//     id, createdAt, message = message to send, who = people, who send, step = stage of gamelevel, effect = effect to play

Users = new Mongo.Collection("users");
Users.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});

She = new Mongo.Collection("she");
She.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});

Messages = new Mongo.Collection("messages");
Messages.allow({
  insert: function(){
    return true;
  },
  update: function () {
    return true;
  },
  remove: function(){
    return true;
  }
});
