ST.mapp = new Marionette.Application();

ST.mapp.addRegions({

    headerRegion: '#header-region',
    contentRegion: '#content-region',
    footerRegion: '#footer-region'

});

ST.Router = Backbone.Marionette.AppRouter.extend({

    routes: {

        'pages': 'nav',
        'pages/:id': 'nav',
        'pages/tutorial/:id': 'tutorialNav',
        'app/ripsaw': 'startRipsaw',
        '*path': 'redirectToHome'

    },

    redirectToHome: function() {

        Backbone.history.navigate('pages/home', {
            trigger: true
        });

        this.nav('home');

    },

    getTemplate: function(templateLocationEnding) {

        var templateKey = 'gh-pages/assets/js/templates/pages/' + templateLocationEnding;

        if (JST[templateKey]) {

            return JST[templateKey];

        }

        return JST['gh-pages/assets/js/templates/pages/home/main.jst'];

    },

    nav: function(page) {

        page = page || "home";

        ST.mapp.contentRegion.show(new Marionette.ItemView({

            template: this.getTemplate(page + "/main.jst"),
            className: 'section'

        }));

        $('.nav a').removeClass('active');
        $('.nav a#a-' + page).addClass('active');

    },

    tutorialNav: function(pageNumber) {

        ST.mapp.contentRegion.show(new Marionette.ItemView({
            template: this.getTemplate('tutorial/pg/' + pageNumber + ".jst"),
            className: 'section'
        }));

    },

    startRipsaw: function() { //

        $('.modal').addClass('modal-s-revealed');

        var geometry = RIPSAW.textAssets.shapeLibrary.fork;

        RIPSAW.masterPiece = new RIPSAW.Bezier2D(geometry);
        RIPSAW.masterPiece.normalize();

        RIPSAW.containerID = 'ripsaw-wrapper';

        RIPSAW.init();
        RIPSAW.launch();

        $('body').on('click', function(e) {

            //RIPSAW.stop();
            console.log($(e.target));
            $('.modal').removeClass('modal-s-revealed');

        });

    }

});

ST.mapp.on('start', function() {

    ST.mapp.headerRegion.show(new ST.HeaderView());
    ST.mapp.footerRegion.show(new ST.FooterView());

    ST.router = new ST.Router();

    if (Backbone.history) {

        Backbone.history.start();

    }

});
