Template.profile.helpers({
  me: function(){
     return Users.findOne({_id: Session.get('Im')});
  },
  mobile: function(){
    return /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(navigator.appVersion)?'full':'screen';
  }
});

Template.main.helpers({
  mobile: function(){
    return /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(navigator.appVersion);
  }
});

Template.admin.helpers({
  SHE: function(){
    var all = She.find().fetch();
    for(var n in all){
      delete all[n]._id;
    }
    return JSON.stringify( all , null, '\t');
  }
})

Template.viewprofile.helpers({
  me: function(){
     var p = Users.findOne({_id: Session.get('profile')});
     if(!p.age){
       p.age = 'возраст не указан';
     }else{
       if(p.age.indexOf(' ')==-1){
         p.age+=' лет';
       }
     }
     if(!p.about){
       p.about = 'пользователь не рассказал о себе ничего';
     }
     if(!p.link){
       p.link = 'пользователь не оставил ссылок';
     }
     return p;
  },
  mobile: function(){
    return /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(navigator.appVersion)?'full':'screen';
  }
});

Template.singup.helpers({
  phone: function(){
    return Session.get('phone');
  },
  ava: function(){
    return Session.get('ava');
  },
  mobile: function(){
    return /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(navigator.appVersion)?'full':'screen';
  }
});

Template.dialog.helpers({
  chats: function(){
    moment.lang('ru');
    var dialogs = [];
    var d = [];
    var mes = Messages.find({$or:[ {from: Session.get('Im')}, {to: Session.get('Im')} ]}).fetch();
    mes = mes.reverse();
    for(var i in mes){
      if(d.indexOf(mes[i].to)==-1 || d.indexOf(mes[i].from)==-1){
        d.push(mes[i].to);
        d.push(mes[i].from);
        var neigb = mes[i].to==Session.get('Im')?mes[i].from:mes[i].to;
        var fin = Users.findOne({ _id: neigb });
        fin.online = moment(fin.online).fromNow();
        fin.content = mes[i].content;
        fin.read = mes[i].read?'':'newmes'; // parse To class
        fin.addres = neigb;
        dialogs.push(fin);
      }
    }

    return dialogs;
  },
  mobile: function(){
    return /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(navigator.appVersion)?'full':'screen';
  },
  you: function(){
    var fin = Users.findOne({ _id: Session.get('Im')});
    if(fin.count()){
      return fin;
    }else{
      FlowRouter.go('/');
      return false;
    }
  }
});

Template.chat.helpers({
  message: function(){
    var m = Messages.find({ $or: [ {from: Session.get('Im') ,to: Session.get('chatto')} , {from: Session.get('chatto') ,to: Session.get('Im')} ]}).fetch();
    _.each(m , function(item){
      if(item.from == Session.get('Im')){
        item.d = 'me';
      }else{
        item.d = '';
      }
      item.time = moment(item.createdAt).fromNow();
      item.read = item.read?'readed':'newmes';
    });
    //console.log(m);
    return m;
  },
  name: function(){
    return Users.findOne({_id: Session.get('chatto')});
  },
  send: function(){
    if(Users.findOne({_id: Session.get('chatto')}).send == Session.get('Im')){
      return 'печатает сообщение...';
    }else{
      return false;
    }
  },
  mobile: function(){
    return /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(navigator.appVersion)?'full':'screen';
  }
});

Template.users.helpers({
  users: function(){
    var u = Session.get('searchfield')? Users.find({ username: { $regex: Session.get('searchfield'), $options:"i" } }).fetch() : Users.find().fetch();
    _.map(u, function(item){
      item.online = moment(item.online).fromNow();
      var m = Messages.findOne({ $or: [ {from: Session.get('Im') ,to: item._id} , {from: item._id ,to: Session.get('Im')} ]});
      item.namestyle = m?'':'font-size:1.25em';
      item.content = m?m.content:false;
      item.read = m?'newmes':'';
    });
    return u;
  },
  mobile: function(){
    return /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(navigator.appVersion)?'full':'screen';
  },
  lastin: function(){
    return Session.get('searchfield');
  }
});
