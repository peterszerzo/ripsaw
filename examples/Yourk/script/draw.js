/** General mousedown function. */
DCHISEL.mouseDown = function(e) {
    // mouse
    DCHISEL.updateMouse(e, 'down');
    // stage
    if (DCHISEL.stage.no < 3) DCHISEL.stage.change(1);
    // nav
    DCHISEL.nav.mouseDown();
    // object
    DCHISEL.masterPiece.plan[0].mouseDown();
};

/** General mousemove function */
DCHISEL.mouseMove = function(e) {
    // mouse
    DCHISEL.updateMouse(e, 'move');
    // nav
    DCHISEL.nav.mouseMove();
    // object
    DCHISEL.masterPiece.mouseMove();

    // camera
    if (DCHISEL.stage.no === 5 && DCHISEL.mode === "3dpreview") {
        DCHISEL.cam.mouseMove();
    }
};

/** General mouseup function */
DCHISEL.mouseUp = function(e) {
    /** Mouse: turn DCHISEl.dragging to false */
    DCHISEL.updateMouse(e, 'up');
    /** Objects: update permanent coordinates if dragging is finished */
    DCHISEL.masterPiece.mouseUp();
    /** Camera: update permanent camera if dragging is finished */
    if (DCHISEL.stage.no === 5 && DCHISEL.mode === "3dpreview") DCHISEL.cam.update();
};

/** General draw function. */
DCHISEL.draw = function() {
    // Clear canvas, clear rounding errors in stage.
    DCHISEL.prepDraw();
    // Display current navigation.
    DCHISEL.nav.place();

    // Display tutorial text.
    if (typeof DCHISEL.tutorialText[DCHISEL.stage.no] !== "undefined") {
        DCHISEL.pen.write(DCHISEL.tutorialText.current()[0], 0.5, 0.75, 1, 2, 1);
        DCHISEL.pen.write(DCHISEL.tutorialText.current()[1], 0.5, 0.8, 1, 2, 1);
        DCHISEL.pen.write(DCHISEL.tutorialText.current()[2], 0.5, 0.85, 1, 2, 1);
    }

    DCHISEL.intro.run();
    DCHISEL.masterPiece.draw();

    if (DCHISEL.stage.no === 0) {
        DCHISEL.stage.change(1);
    }
    if (DCHISEL.stage.no === 5) {
        DCHISEL.pen.write("edit depth profile", 0.22, 0.45, 1.2, 3, 1);
    }
};

// initialize
DCHISEL.init("wrapper", true, "purple");
// launch
DCHISEL.launch();
