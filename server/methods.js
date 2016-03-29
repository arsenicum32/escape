Meteor.methods({
    'send': function(from, to, content){
      if(from && to && content){
        return Messages.insert({
          createdAt: (new Date()).getTime(),
          from: from,
          to: to,
          content: content,
          read: false
        });
        //var chat = Chats.update( { party: { $all : [ from, to ] } } , { $addToSet: { message: content } } , true);
        //Users.update( { $or: [ { _id: from }, { _id: to } ] } , { $addToSet: { chats: chat } } );
      }else{
        return false;
      }
    },
    'sendmyself': function(message , userID ){
      var lastreadar = Messages.find({"from": userID , "to": userID}).fetch();
      var lastread = lastreadar && lastreadar.length ?lastreadar[lastreadar.length - 1].read : true;
      if(message && userID){
        if(lastread){
          Users.update({_id: userID}, { $inc: {
            'level': 1
          }});
          if(typeof message===typeof []){
            for(var i in message){
              Messages.insert({
                createdAt: (new Date()).getTime(),
                from: userID,
                to: userID,
                content: message[i],
                read: false
              });
            }
            return 2;
          }else{
            Messages.insert({
              createdAt: (new Date()).getTime(),
              from: userID,
              to: userID,
              content: message,
              read: false
            });
            return 2;
          }
        }else{
          return 1;
        }
      }else{
        return false;
      }
    },
    'shesend': function(me, message){
      var she = Users.findOne()._id;
      console.log('allrigth');
      var lastreadar = Messages.findOne({"from": she , "to": me}) ? Messages.find({"from": she , "to": me}).fetch() : true;
      var lastread = lastreadar? lastreadar.length ? lastreadar[lastreadar.length - 1].read : true : true;
      if(message){
        if(lastread){
          Users.update({_id: me}, { $inc: {
            'level': 1
          }});
          if(typeof message===typeof []){
            for(var i in message){
              Messages.insert({
                createdAt: (new Date()).getTime(),
                from: she,
                to: me,
                content: message[i],
                read: false
              });
            }
            return 2;
          }else{
            Messages.insert({
              createdAt: (new Date()).getTime(),
              from: she,
              to: me,
              content: message,
              read: false
            });
            return 2;
          }
        }else{
          return 1;
        }
      }else{
        return -1;
      }
    },
    'singup': function(data){
      data.createdAt = (new Date()).getTime();
      var id =  Users.insert(data);
      console.log(id);
      return id;
    },
    'edit': function(userid, data){
      return Users.update({_id: userid }, {$set: data });
    },
    'disconnect': function(id,ip){
      console.log('close connection: '+id+'  :  ip: '+ip);
    },
    'connect': function(id,ip, h){
      console.log('open connection: '+id+'  :  ip: '+ip+'  :url ');
      for(var i in h){
        console.log(i+ ' : '+h[i]);
      }
    }
});
