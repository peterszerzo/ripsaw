RIPSAW.mouseDown = function(e) {

    RIPSAW.mouse.update(e,'down');
    
    if (RIPSAW.stage.no < 3) {

    	RIPSAW.stage.change(1);

    }
    
    RIPSAW.nav.mouseDown();
    RIPSAW.masterPiece.mouseDown();
    
};


RIPSAW.mouseMove = function(e) {

    RIPSAW.mouse.update(e,'move');
    
    RIPSAW.nav.mouseMove();
    RIPSAW.masterPiece.mouseMove();
    
};


RIPSAW.mouseUp = function(e) {

    RIPSAW.mouse.update(e,'up');
	RIPSAW.masterPiece.mouseUp();
    
};


RIPSAW.draw = function() {

	RIPSAW.prepDraw();	
	
	RIPSAW.intro.run();
	
	RIPSAW.nav.draw();	
	RIPSAW.tutorial.place();
	
	RIPSAW.masterPiece.draw();
	
	if (RIPSAW.stage.no === 0) {

		RIPSAW.stage.change(1);

	}

	if (RIPSAW.stage.no === 5) {

		RIPSAW.pen.write("edit depth profile", 0.22, 0.45, 1.2, 3, 1);

	}
	
};


RIPSAW.init();
RIPSAW.launch();