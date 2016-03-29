Template.profile.events({
  "click #todialog": function(event, template){
    setOnline();
    if(Session.get('chatto'))
    FlowRouter.go( '/'+Session.get('Im')+'/dialog');
  },
  'click #loggout': function(){
    Cookie.set('user', 0);
    FlowRouter.go( '/');
  },
  'input': _.throttle(function(e){
    var newNick = $(e.target).val();
    var field = $(e.target).attr('fld');
    if(newNick && field){
      if(field=='age'){
        Users.update( Users.findOne( {_id: Session.get('Im') } )._id , { $set:{
          age: newNick,
          online: (new Date()).getTime(),
          send: (new Date()).getTime()
        }});
      }
      if(field=='about'){
        Users.update( Users.findOne( {_id: Session.get('Im') } )._id , { $set:{
          about: newNick,
          online: (new Date()).getTime(),
          send: (new Date()).getTime()
        }});
      }
      if(field=='link' && validateUrl(newNick)){
        Users.update( Users.findOne( {_id: Session.get('Im') } )._id , { $set:{
          link: newNick,
          online: (new Date()).getTime(),
          send: (new Date()).getTime()
        }});
      }
      if(field=='username'){
        Users.update( Users.findOne( {_id: Session.get('Im') } )._id , { $set:{
          username: newNick,
          online: (new Date()).getTime(),
          send: (new Date()).getTime()
        }});
      }
      if(field=='ava' && validateUrl(newNick)){
        Users.update( Users.findOne( {_id: Session.get('Im') } )._id , { $set:{
          ava: newNick,
          online: (new Date()).getTime(),
          send: (new Date()).getTime()
        }});
      }
    }
  }, 300)
});

Template.viewprofile.events({
  //////////////////// swipe logic
  'mousedown': function(e){
    seeSwipe('down',e);
  },
  'mouseup': function(e){
    var dir = seeSwipe('up', e);
    if(dir == 'left' || dir == 'right' && Session.get('chatto'))
    FlowRouter.go('/'+Session.get('Im')+'/chat/'+Session.get('chatto'));
    if(dir == 'up') FlowRouter.go('/'+Session.get('Im')+'/dialog');
  },
  ////////////////////////////////
  "click #todialog": function(event, template){
    setOnline();
    if(Session.get('chatto'))
    FlowRouter.go('/'+Session.get('Im')+'/chat/'+Session.get('chatto'));
  },
  "click #gotolink": function(e){
    window.open( $('#gotolink').text() ,'_blank');
  }
});


Template.users.events({
  //////////////////// swipe logic
  'mousedown': function(e){
    seeSwipe('down',e);
  },
  'mouseup': function(e){
    var dir = seeSwipe('up', e);
    if(dir == 'down') FlowRouter.go('/'+Session.get('Im')+'/dialog');
    if(dir == 'left'){
      var to = $(e.target).attr('userid');
      if(to){
        Session.set('chatto', to);
        FlowRouter.go('/'+Session.get('Im')+'/chat/'+Session.get('chatto'));
      }
    }
  },
  ////////////////////////////////
  'click #Allusers': function(e){
    setOnline();
    var to = $(e.target).attr('userid');
    if(to){
      Session.set('chatto', to);
      FlowRouter.go('/'+Session.get('Im')+'/chat/'+Session.get('chatto'));
    }
  },
  'click #backgroung': function(){
    FlowRouter.go('/'+Session.get('Im')+'/dialog');
  },
  'input #searchIn':_.throttle(function(){
    Session.set('searchfield', $('#searchIn').val());
  }, 900)
});




Template.singup.events({
  "keypress #setname": function(e, template){
    Session.set('ava', 'https://robohash.org/'+$(e.target).val());
  },
  "click #singup": function(){
    if($('#setname').val()){
      var id =  Users.insert({
        username: $('#setname').val(),
        ava: Session.get('ava'),
        phone: Session.get('phone'),
        createdAt: (new Date()).getTime()
      });
      Session.set('Im', id);
      setOnline();
      FlowRouter.go( '/'+Session.get('Im')+'/dialog');
    }else{
      console.log('error');
    }
  }
});





Template.dialog.events({
  'click .gochat': function(e){
    setOnline();
    Session.set('chatto', $(e.target).attr('men'));
    FlowRouter.go('/'+Session.get('Im')+'/chat/'+Session.get('chatto'));
    read();
    gotoshe(Session.get('chatto')); /// ОНА В КОДЕ!!!!
  },
  'click #newchat': function(){
    setOnline();
    FlowRouter.go('/'+Session.get('Im')+'/users');
  },
  'click #settings': function(){
    setOnline();
    FlowRouter.go('/'+Session.get('Im')+'/profile');
  }
});


Template.chat.events({
  //////////////////// swipe logic
  'mousedown': function(e){
    seeSwipe('down',e);
  },
  'mouseup': function(e){
    var dir = seeSwipe('up', e);
    if(dir == 'down') FlowRouter.go('/'+Session.get('Im')+'/profile/'+Session.get('chatto'));
  },
  ////////////////////////////////
  'click #send': function(){
     if($('#message').val()){
       Meteor.call('send', Session.get('Im'), Session.get('chatto'), $('#message').val());
       Users.update( Users.findOne( {_id: Session.get('Im') } )._id , { $set:{
         online: (new Date()).getTime()
       }});
       $('#message').val('');
     }
  },
  'click #seeP': function(){
    FlowRouter.go('/'+Session.get('Im')+'/profile/'+Session.get('chatto'));
  },
  'click #todialog': function(){
    FlowRouter.go( '/'+Session.get('Im')+'/dialog');
  },
  'focusout #message': function(){
    Users.update( Users.findOne( {_id: Session.get('Im') } )._id , { $set:{
      send: ''
    }});
  },
  'focus #message': function(){
    read();
    Users.update( Users.findOne( {_id: Session.get('Im') } )._id , { $set:{
      send: Session.get('chatto')
    }});
  },
  'keypress #message': function(e){
    if(e.keyCode===13){
      if($('#message').val()){
        Meteor.call('send', Session.get('Im'), Session.get('chatto'), $('#message').val());
        Users.update( Users.findOne( {_id: Session.get('Im') } )._id , { $set:{
          online: (new Date()).getTime()
        }}, function(){   // добавил callback скролиинга страницы....
          $("#chat").scrollTop($("#chat")[0].scrollHeight);
        });
        $('#message').val('');
      }
    }
  },
  'input #message': _.throttle(function(e){
    read();
  }, 900)
});



Template.join.events({
  'click #next': function () {
    if($('#phoneJoin').val()){
      var me = Users.findOne({ phone: $('#phoneJoin').val() });
      if(me && me._id){
        Session.set('Im', me._id );
        Cookie.set('user', me._id);
        FlowRouter.go( '/'+Session.get('Im')+'/dialog');
      }else{
        FlowRouter.go( '/singup/'+$('#phoneJoin').val());
      }
    }
   }
});

function read(){
  var newMes = Messages.find({from: Session.get('chatto') , to: Session.get('Im')}).fetch();
  for(var i in newMes){
    Messages.update( newMes[i]._id, {$set: {read: true}});
  }
}

function setOnline(){
  Users.update( Users.findOne( {_id: Session.get('Im') } )._id , { $set:{
    online: (new Date()).getTime()
  }});
}


function seeSwipe(e, event){
  if(e=='down'){
    Session.set('startX', event.clientX);
    Session.set('startY', event.clientY);
  }else if(e=='up'){
    var startX = Session.get('startX');
    var startY = Session.get('startY');
    var endX = event.clientX;
    var endY = event.clientY;
    var deltaX = Math.abs(endX - startX);
    var deltaY = Math.abs(endY - startY);
    if( deltaX > 100 || deltaY > 100){
      var dirX = endX>startX?'right':'left';
      var dirY = endY>startY?'down':'up';
      if(deltaX > deltaY){
        return dirX;
       // alert(dirX); !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! touch direction
      }else{
        return dirY;
       // alert(dirY); !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! touch direction
      }
      //console.log(template);
    }
  }
}
function validateUrl(value){
      return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
}
