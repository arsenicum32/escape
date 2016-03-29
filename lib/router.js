FlowRouter.route('/:id/chat/:to', {
    // do some action for this route
    action: function(params, queryParams) {
        Session.set('Im', params.id);
        Session.set('chatto', params.to);
        //BlazeLayout.render('chat');
        BlazeLayout.render("main", {content: "chat"});
    },

    name: "chat" // optional
});

FlowRouter.route('/:id/dialog', {
    // do some action for this route
    action: function(params, queryParams) {
      Cookie.set('seed', 0);
        Session.set('Im', params.id);
        //BlazeLayout.render('dialog');
        BlazeLayout.render("main", {content: "dialog"});
    },

    name: "dialog" // optional
});

FlowRouter.route('/:id/profile', {
    // do some action for this route
    action: function(params, queryParams) {
        Session.set('Im', params.id);
        //BlazeLayout.render('profile');
        BlazeLayout.render("main", {content: "profile"});
    },

    name: "profile" // optional
});

FlowRouter.route('/glitch', {
    // do some action for this route
    action: function(params, queryParams) {
        //Session.set('Im', params.id);
        //BlazeLayout.render('profile');
        BlazeLayout.render("main", {content: "glitch"});
    },

    name: "glitch" // optional
});


FlowRouter.route('/:id/profile/:see', {
    // do some action for this route
    action: function(params, queryParams) {
        Session.set('Im', params.id);
        Session.set('profile', params.see);
        //BlazeLayout.render('viewprofile');
        BlazeLayout.render("main", {content: "viewprofile"});

    },

    name: "viewprofile" // optional
});

FlowRouter.route('/:id/users', {
    // do some action for this route
    action: function(params, queryParams) {
        Session.set('Im', params.id);
        //BlazeLayout.render('users');
        BlazeLayout.render("main", {content: "users"});
    },

    name: "users" // optional
});

FlowRouter.route('/singup/:phone', {
    // do some action for this route
    action: function(params, queryParams) {
        Session.set('phone', params.phone);
        //BlazeLayout.render('singup');
        BlazeLayout.render("main", {content: "singup"});
    },

    name: "singup" // optional
});

FlowRouter.route('/admin', {
    // do some action for this route
    action: function(params, queryParams) {
        if(queryParams.p=='1'){
          BlazeLayout.render('admin');
        }else{
          FlowRouter.go('/');
        }
        //BlazeLayout.render("main", {content: "singup"});
    },

    name: "admin" // optional
});


FlowRouter.route('/', {
    // do some action for this route
    action: function(params, queryParams) {
        document.cookie = 'seed=0';
        document.cookie = 'user=0';
        var seed = Math.random();
        Session.set('seed', seed);
        Cookie.set('seed', seed);
        if(Cookie.get('user')!=0){
          FlowRouter.go('/'+Cookie.get('user')+'/dialog');
        }
        BlazeLayout.render('main', {content: "join"});
    },

    name: "dialog" // optional
});
