/** App intros. */
DCHISEL.intro = {
    1: function() {

        var opacity;

        opacity = DCHISEL.sineAnimate(4 * DCHISEL.anim.speed, 0, 0, DCHISEL.anim.speed);
        DCHISEL.pen.write("Yourk", 0.5, 0.34, 2, 1, opacity);
        opacity = DCHISEL.sineAnimate(3 * DCHISEL.anim.speed, 0, DCHISEL.anim.speed, 2 * DCHISEL.anim.speed);
        DCHISEL.pen.write("Guided Design in the Browser", 0.5, 0.41, 1.33, 2, opacity);
        opacity = DCHISEL.sineAnimate(3 * DCHISEL.anim.speed, 0, 2 * DCHISEL.anim.speed, 3 * DCHISEL.anim.speed);
        DCHISEL.pen.write("a tool inspired by and dedicated to", 0.5, 0.7, 1, 2, opacity);
        opacity = DCHISEL.sineAnimate(3 * DCHISEL.anim.speed, 0, 3 * DCHISEL.anim.speed, 4 * DCHISEL.anim.speed);
        DCHISEL.pen.write("Maya Kryvitskaya Davis and Stephen Davis", 0.5, 0.74, 1.2, 2, opacity);
        opacity = DCHISEL.sineAnimate(1.8 * DCHISEL.anim.speed, 0, 4 * DCHISEL.anim.speed, 10 * DCHISEL.anim.speed);
        DCHISEL.pen.write("~ click to proceed ~", 0.5, 0.5, 0.9, 2, opacity);

    },

    2: function() {

        var opacity;

        opacity = DCHISEL.sineAnimate(4 * DCHISEL.anim.speed, 0, 0, DCHISEL.anim.speed);
        DCHISEL.pen.write("if you could choose the exact fork design for your next meal...", 0.5, 0.30, 1.3, 2, opacity);
        opacity = DCHISEL.sineAnimate(4 * DCHISEL.anim.speed, 0, DCHISEL.anim.speed, 2 * DCHISEL.anim.speed);
        DCHISEL.pen.write("whether a light snack or a greedy feast", 0.5, 0.4, 1, 2, opacity);
        opacity = DCHISEL.sineAnimate(4 * DCHISEL.anim.speed, 0, 2 * DCHISEL.anim.speed, 3 * DCHISEL.anim.speed);
        DCHISEL.pen.write("a fast-food takeout, a barbecue or an elaborate home-cooked dinner", 0.5, 0.44, 1, 2, opacity);
        opacity = DCHISEL.sineAnimate(4 * DCHISEL.anim.speed, 0, 3 * DCHISEL.anim.speed, 4 * DCHISEL.anim.speed);
        DCHISEL.pen.write("what would it be?", 0.5, 0.57, 1.3, 2, opacity);

    },

    run: function() {

        if (typeof this[DCHISEL.stage.no] !== "undefined") {
            this[DCHISEL.stage.no]();
        }

    }
};

/** Tutorial text for each relevant stage */
DCHISEL.tutorialText = {

    3.0: [
        "Let's walk through how to edit the fork above to your desired 3d shape.",
        "Use the arrows and the X icon to navigate or quit this tutorial.",
        ""
    ],

    3.1: [
        "Let's start 2d. See what happens if you drag the colored points around a bit!",
        "If you have worked in a vector drawing application before, this should be familiar.",
        "If not, this is a great start - we've made it much easier to learn and use."
    ],

    3.2: [
        "Congratulations, you've made your first edits!",
        "Feel free to play around here - this kind of 'drawing' does takes some practice.",
        "After a while, though, you'll be amazed at how much control it offers."
    ],

    3.3: [
        "More drawing? By the way, these points are called control points.",
        "They accurately describe a complex curved shape",
        "Thank you, Mr. Bezier!"
    ],

    3.4: ["Notice how the purple dots move together and the smoothness is always maintained.",
        "This might not always be what you want.",
        "Swap around the three drawing modes above to see what else you can do."
    ],

    3.5: [
        "Notice that if you use Drawing Mode 1, you can introduce a kink in the shape.",
        "Check out the smooth option to get rid of it!",
        ""
    ],

    3.6: [
        "Great! We've added a few more menu options to help you view your creation.",
        "- from close-up, from afar, just the way you found it, or without control points -",
        "- as well as an option to center back your drawing again -"
    ],

    3.7: [
        "And now, prep yourself for some free-dee magic!",
        "This fork so far is a flat object with a uniform thickness to it.",
        "You'd have a hard time with your salads if we stuck to that. Worry not, we won't!"
    ],

    3.8: [
        "The two curves on the left control the depth profile of the fork.",
        "Which is, in plain words, how depth changes along the length.",
        "Now go ahead and change these curves. See what happens to your creation on the right."
    ],

    3.9: [
        "I hope that's catching your attention somewhat - we'll leave you to it now.",
        "Wish you lots of joys as you engage in this simple guided design.",
        "Oh, and just for the record: this is clean, 3d-printer ready geometry - congratulations!"
    ],

    /** Return tutorial texts corresponding to current stage. */
    current: function() {

        return this[DCHISEL.stage.no];

    }

};

/** Define masterpiece */
DCHISEL.masterPiece.build = (function() {

    var path = "M308.25,72c-31.917,67.667,13.227,76.111,14.25,134.674C324,292.5,296.853,335.5,344,337.5c54.951,2.331,18.061-68.047,14-134.5c-3.031-49.593,45.666-48.666,11.123-131.652c0,0-7.873,18.527-7.373,41.152c0.324,14.677-5.083,18.167-5.083,18.167s-6.375-4.592-6.167-22.542c0.25-21.625-10.493-33-10.493-33S329.875,85.25,330.25,107.5c0.265,15.743-6.25,23.501-6.25,23.501s-6.5-7.001-6-23.251C318.647,86.707,308.25,72,308.25,72z", // svg path
        BH = [], // BezierHandle array
        modelDepth;

    // PLAN DESIGN

    DCHISEL.masterPiece.plan = [];
    DCHISEL.masterPiece.plan[0] = new DCHISEL.BezierObject(path, -Math.PI / 2, 0.5, 0.42, 0.9, true);
    DCHISEL.masterPiece.plan[0].normalize();
    DCHISEL.masterPiece.plan[0].setSubdivisions(DCHISEL.mesh.n1);

    // extend masterPiece.plan - to include behavior by stage
    DCHISEL.masterPiece.plan.sMgmt = {

        1: {
            allow: {
                draw: "no",
                edit: false,
                pan: false
            },
            p0T: new DCHISEL.Vector(0.5, 0.42),
            scale: 0.9
        },

        2: {
            allow: {
                draw: "no",
                edit: false,
                pan: false
            },
            p0T: new DCHISEL.Vector(0.5, 0.42),
            scale: 0.9
        },

        3: {
            allow: {
                draw: "2d_view",
                edit: true,
                pan: false
            },
            p0T: new DCHISEL.Vector(0.5, 0.42),
            scale: 0.9
        },

        3.1: {
            allow: {
                draw: "2d_edit",
                edit: true,
                pan: false
            },
            p0T: new DCHISEL.Vector(0.5, 0.42),
            scale: 0.9
        },

        3.2: {
            allow: {
                draw: "2d_edit",
                edit: true,
                pan: false
            },
            p0T: new DCHISEL.Vector(0.5, 0.42),
            scale: 0.9
        },

        3.3: {
            allow: {
                draw: "2d_edit",
                edit: true,
                pan: false
            },
            p0T: new DCHISEL.Vector(0.5, 0.42),
            scale: 0.9
        },

        3.4: {
            allow: {
                draw: "2d_edit",
                edit: true,
                pan: false
            },
            p0T: new DCHISEL.Vector(0.5, 0.42),
            scale: 0.9
        },

        3.5: {
            allow: {
                draw: "2d_edit",
                edit: true,
                pan: false
            },
            p0T: new DCHISEL.Vector(0.5, 0.42),
            scale: 0.9
        },

        3.6: {
            allow: {
                draw: "2d_edit",
                edit: true,
                pan: false
            },
            p0T: new DCHISEL.Vector(0.5, 0.42),
            scale: 0.9
        },

        3.7: {
            allow: {
                draw: "3d",
                edit: false,
                pan: false
            },
            p0T: new DCHISEL.Vector(0.6, 0.3),
            scale: 0.9
        },

        3.8: {
            allow: {
                draw: "3d",
                edit: false,
                pan: false
            },
            p0T: new DCHISEL.Vector(0.7, 0.3),
            scale: 0.7
        },

        3.9: {
            allow: {
                draw: "3d",
                edit: false,
                pan: false
            },
            p0T: new DCHISEL.Vector(0.7, 0.3),
            scale: 0.7
        },

        4: {
            allow: {
                draw: "2d_edit",
                edit: true,
                pan: true
            },
            p0T: new DCHISEL.Vector(0.5, 0.42),
            scale: 0.9
        },

        5: {
            allow: {
                draw: "3d",
                edit: false,
                pan: false
            },
            p0T: new DCHISEL.Vector(0.7, 0.3),
            scale: 0.7
        },

        current: function() {

            return this[DCHISEL.stage.no];

        }
    };

    DCHISEL.masterPiece.plan.stageUpdate = function() {
        if (typeof this.sMgmt.current() !== "undefined") {
            this[0].p0T = this.sMgmt.current().p0T.copy();
            this[0].scale = this.sMgmt.current().scale;
            this[0].allow.edit = this.sMgmt.current().allow.edit;
            this[0].allow.pan = this.sMgmt.current().allow.pan;
        }
    };


    // DEPTH PROFILES

    // calculate normalized depth in model
    modelDepth = DCHISEL.rDim.d / DCHISEL.rDim.l * DCHISEL.rDim.depthScale;
    for (i = 0; i < DCHISEL.mesh.nP; i++) {
        BH.push(new DCHISEL.BezierHandle(
            new DCHISEL.Vector((i - 0.3) / (DCHISEL.mesh.nP - 1) - 0.5, -modelDepth / 2, 0),
            new DCHISEL.Vector((i + 0.0) / (DCHISEL.mesh.nP - 1) - 0.5, -modelDepth / 2, 0),
            new DCHISEL.Vector((i + 0.3) / (DCHISEL.mesh.nP - 1) - 0.5, -modelDepth / 2, 0)));
    }
    DCHISEL.masterPiece.side = [];
    DCHISEL.masterPiece.side[0] = new DCHISEL.BezierObject(BH, 0, 0.3, 0.4, 0.5, false, true);
    DCHISEL.masterPiece.side[1] = DCHISEL.masterPiece.side[0].copy(new DCHISEL.Vector(0, modelDepth, 0));

    DCHISEL.masterPiece.side.sMgmt = {

        3.8: {
            allow: {
                draw: "2d_edit",
                edit: true,
                pan: false
            },
            p0T: new DCHISEL.Vector(0.3, 0.4),
            scale: 0.5
        },

        3.9: {
            allow: {
                draw: "2d_edit",
                edit: true,
                pan: false
            },
            p0T: new DCHISEL.Vector(0.3, 0.4),
            scale: 0.5
        },

        5: {
            allow: {
                draw: "2d_edit",
                edit: true,
                pan: false
            },
            p0T: new DCHISEL.Vector(0.25, 0.7),
            scale: 0.5
        },

        current: function() {

            return this[DCHISEL.stage.no];

        }

    };

    /** Updates object properties (display centerpoint, scale, permissions) at new stage. */
    DCHISEL.masterPiece.side.stageUpdate = function() {

        if (typeof this.sMgmt.current() !== "undefined") {
            this[0].p0T = this.sMgmt.current().p0T.copy();
            this[1].p0T = this.sMgmt.current().p0T.copy();
            this[0].scale = this[1].scale = this.sMgmt.current().scale;
            this[0].allow.edit = this[1].allow.edit = this.sMgmt.current().allow.edit;
            this[0].allow.pan = this[1].allow.pan = this.sMgmt.current().allow.pan;
        }

    };

    /** Combine stageUpdate functions. */
    DCHISEL.masterPiece.stageUpdate = function() {

        this.plan.stageUpdate();
        this.side.stageUpdate();

    };

    /** Draw all objects. */
    DCHISEL.masterPiece.draw = function() {

        var allow;

        if (typeof this.plan.sMgmt.current() !== "undefined") {
            allow = this.plan.sMgmt.current().allow.draw;
            if (allow === "2d_view") {
                this.plan[0].draw(1, 0, 0);
            } else if (allow === "2d_edit") {
                this.plan[0].draw(1, 2, 0.5);
            } else if (allow === "3d") {
                this.plan[0].draw3(DCHISEL.cam, 1, 1, 1);
            }
        }

        if (typeof this.side.sMgmt.current() !== "undefined") {
            allow = this.side.sMgmt.current().allow.draw;
            if (allow === "2d_view") {
                this.side[0].draw(1, 0, 0);
                this.side[1].draw(1, 0, 0);
            } else if (allow === "2d_edit") {
                this.side[0].draw(1, 2, 0.5);
                this.side[1].draw(1, 2, 0.5);
            }
        }

    };

    DCHISEL.masterPiece.mouseMove = function() {

        var edit, pan;

        if (typeof this.plan.sMgmt.current() !== "undefined") {
            edit = this.plan.sMgmt.current().allow.edit;
            pan = this.plan.sMgmt.current().allow.pan;
            this.plan[0].mouseMove(pan);
        }

        if (typeof this.side.sMgmt.current() !== "undefined") {
            edit = this.side.sMgmt.current().allow.draw;
            pan = this.side.sMgmt.current().allow.pan;
            this.side[0].mouseMove(false);
            this.side[1].mouseMove(false);
        }

    };

    DCHISEL.masterPiece.mouseUp = function() {

        if (typeof this.plan.sMgmt.current() !== "undefined") {
            this.plan[0].mouseUp();
        }

        if (typeof this.side.sMgmt.current() !== "undefined") {
            this.side[0].mouseUp();
            this.side[1].mouseUp();
        }

    };

    /** Create application camera. */
    DCHISEL.cam = new DCHISEL.Camera(0.7, 50 * Math.PI / 180, -40 * Math.PI / 180, 0.6);
    DCHISEL.cam.buildEye();

})();


/** All navigation buttons. */
DCHISEL.allButtons = {

    "mode1": {
        helpText: "drawing mode 1 - independent handles",
        onClick: function() {
            DCHISEL.activeMode = 0;
            DCHISEL.mode = "mode1";
        }
    },

    "mode2": {
        helpText: "drawing mode 2 - partially coupled handles",
        onClick: function() {
            DCHISEL.activeMode = 1;
            DCHISEL.mode = "mode2";
        }
    },

    "mode3": {
        helpText: "drawing mode 3 - fully coupled handles",
        onClick: function() {
            DCHISEL.mode = "mode3";
        }
    },

    "smooth": {
        helpText: "smooth kink",
        onClick: function() {
            DCHISEL.mode = "smooth";
        }
    },

    "preview": {
        helpText: "preview - hide control points",
        onClick: function() {
            DCHISEL.mode = "preview";
        }
    },

    "3dpreview": {
        helpText: "rotate 3d view",
        onClick: function() {
            DCHISEL.mode = "3dpreview";
        }
    },

    "zoomIn": {
        helpText: "zoom in",
        onClick: function() {
            DCHISEL.masterPiece.plan[0].scale *= 1.15;
        }
    },

    "zoomOut": {
        helpText: "zoom out",
        onClick: function() {
            DCHISEL.masterPiece.plan[0].scale /= 1.15;
        }
    },
    "extents": {
        helpText: "zoom extents",
        onClick: function() {
            DCHISEL.masterPiece.plan.stageUpdate();
        }
    },

    "backward": {
        helpText: "back",
        onClick: function() {
            if (DCHISEL.stage.no > 3) DCHISEL.stage.change(-0.1);
            DCHISEL.masterPiece.stageUpdate();
        }
    },

    "forward": {
        helpText: "forward",
        onClick: function() {
            DCHISEL.stage.change(0.1);
            DCHISEL.masterPiece.stageUpdate();
        }
    },

    "skip": {
        helpText: "skip tutorial",
        onClick: function() {
            DCHISEL.stage.set(4);
            DCHISEL.mode = "mode3";
            DCHISEL.masterPiece.stageUpdate();
        }
    },

    "2d": {
        helpText: "back to 2d design",
        onClick: function() {
            DCHISEL.stage.change(-1);
            DCHISEL.mode = "mode3";
            DCHISEL.masterPiece.stageUpdate();
        }
    },

    "3d": {
        helpText: "proceed to 3d design",
        onClick: function() {
            DCHISEL.masterPiece.plan[0].normalize();
            DCHISEL.stage.change(+1);
            DCHISEL.mode = "3dpreview";
            DCHISEL.masterPiece.stageUpdate();
        }
    },

    "doc": {
        helpText: "documentation",
        onClick: function() {
            OpenInNewTab("doc/YourkDoc.html");
        }
    },

    "downloadSVG": {
        helpText: "download SVG",
        onClick: function() {
            var uriContent = "data:image/svg+xml," + encodeURIComponent(DCHISEL.masterPiece.plan[0].exportSVG()),
                newWindow = window.open(uriContent);
            /*$.ajax({
				url: "script/serveFiles.php",
				type: "POST",
				data: {
					name: "plan",
					extension: "svg",
					content: DCHISEL.masterPiece.plan[0].exportSVG()
				},
				success: function(result) {
					console.log('ajax success');
				},
				failure: function(result) {
					console.log('ajax fail');
				}
			});	*/
        }
    },

    "downloadPython": {
        helpText: "download Python script for Rhino3d",
        onClick: function() {
            var scriptHeader = "import rhinoscriptsyntax as rs\n\nimport math\n\ndef Main():\n\n",
                scriptFooter = "Main()",
                fullScript = scriptHeader + DCHISEL.masterPiece.plan[0].exportRhinoScriptPython("plan", 1, true) + DCHISEL.masterPiece.side[0].exportRhinoScriptPython("profileTop", 2.1, false) + DCHISEL.masterPiece.side[1].exportRhinoScriptPython("profileBottom", 2.2, false) + scriptFooter,
                uriContent = "data:text/py," + encodeURIComponent(fullScript),
                newWindow = window.open(uriContent);
        }
    }

};

DCHISEL.loadButtonImages = (function() {

    var img, name;

    for (name in DCHISEL.allButtons) {
        img = new Image();
        img.src = "images/buttonImages/" + name + ".png";
        DCHISEL.allButtons[name].image = img;
    }

})();

DCHISEL.buildNav = (function() {

    DCHISEL.nav = [];

    DCHISEL.nav[3] = new DCHISEL.Navigation({
        buttons: [{
            name: "backward",
            x: 0.1,
            y: 0.35,
            animate: true
        }, {
            name: "forward",
            x: 0.9,
            y: 0.35,
            animate: true
        }, {
            name: "skip",
            x: 0.9,
            y: 0.15,
            animate: true
        }],
        displayHelp: false,
        xHelp: 0.5,
        yHelp: 0.85,
        defaultMode: "mode3"
    });

    DCHISEL.nav[3.1] = new DCHISEL.Navigation({
        buttons: [{
            name: "backward",
            x: 0.1,
            y: 0.35,
            animate: false
        }, {
            name: "forward",
            x: 0.9,
            y: 0.35,
            animate: false
        }, {
            name: "skip",
            x: 0.9,
            y: 0.15,
            animate: false
        }],
        displayHelp: false,
        xHelp: 0.5,
        yHelp: 0.85,
        defaultMode: "mode3"
    });

    DCHISEL.nav[3.2] = new DCHISEL.Navigation({
        buttons: [{
            name: "backward",
            x: 0.1,
            y: 0.35,
            animate: false
        }, {
            name: "forward",
            x: 0.9,
            y: 0.35,
            animate: false
        }, {
            name: "skip",
            x: 0.9,
            y: 0.15,
            animate: false
        }],
        displayHelp: false,
        xHelp: 0.5,
        yHelp: 0.85,
        defaultMode: "mode3"
    });

    DCHISEL.nav[3.3] = new DCHISEL.Navigation({
        buttons: [{
            name: "backward",
            x: 0.1,
            y: 0.35,
            animate: false
        }, {
            name: "forward",
            x: 0.9,
            y: 0.35,
            animate: false
        }, {
            name: "skip",
            x: 0.9,
            y: 0.15,
            animate: false
        }],
        displayHelp: false,
        xHelp: 0.5,
        yHelp: 0.85,
        defaultMode: "mode3"
    });

    DCHISEL.nav[3.7] = new DCHISEL.Navigation({
        buttons: [{
            name: "backward",
            x: 0.1,
            y: 0.35,
            animate: false
        }, {
            name: "forward",
            x: 0.9,
            y: 0.35,
            animate: false
        }, {
            name: "skip",
            x: 0.9,
            y: 0.15,
            animate: false
        }],
        displayHelp: false,
        xHelp: 0.5,
        yHelp: 0.85,
        defaultMode: "mode3"
    });

    DCHISEL.nav[3.4] = new DCHISEL.Navigation({
        buttons: [{
            name: "mode1",
            x: 0.44,
            y: 0.15,
            animate: true
        }, {
            name: "mode2",
            x: 0.5,
            y: 0.15,
            animate: true
        }, {
            name: "mode3",
            x: 0.56,
            y: 0.15,
            animate: true
        }, {
            name: "backward",
            x: 0.1,
            y: 0.35,
            animate: false
        }, {
            name: "forward",
            x: 0.9,
            y: 0.35,
            animate: false
        }, {
            name: "skip",
            x: 0.9,
            y: 0.15,
            animate: false
        }],
        displayHelp: false,
        xHelp: 0.5,
        yHelp: 0.85,
        defaultMode: "mode3"
    });
    DCHISEL.nav[3.4].buttonGroups = [
        [0, 1, 2]
    ];

    DCHISEL.nav[3.5] = new DCHISEL.Navigation({
        buttons: [{
            name: "mode1",
            x: 0.41,
            y: 0.15,
            animate: false
        }, {
            name: "mode2",
            x: 0.47,
            y: 0.15,
            animate: false
        }, {
            name: "mode3",
            x: 0.53,
            y: 0.15,
            animate: false
        }, {
            name: "smooth",
            x: 0.59,
            y: 0.15,
            animate: true
        }, {
            name: "backward",
            x: 0.1,
            y: 0.35,
            animate: false
        }, {
            name: "forward",
            x: 0.9,
            y: 0.35,
            animate: false
        }, {
            name: "skip",
            x: 0.9,
            y: 0.15,
            animate: false
        }],
        displayHelp: false,
        xHelp: 0.5,
        yHelp: 0.85,
        defaultMode: "mode3"
    });
    DCHISEL.nav[3.5].buttonGroups = [
        [0, 1, 2],
        [3]
    ];

    DCHISEL.nav[3.6] = new DCHISEL.Navigation({
        buttons: [{
            name: "mode1",
            x: 0.29,
            y: 0.15,
            animate: false
        }, {
            name: "mode2",
            x: 0.35,
            y: 0.15,
            animate: false
        }, {
            name: "mode3",
            x: 0.41,
            y: 0.15,
            animate: false
        }, {
            name: "smooth",
            x: 0.47,
            y: 0.15,
            animate: false
        }, {
            name: "preview",
            x: 0.53,
            y: 0.15,
            animate: true
        }, {
            name: "zoomIn",
            x: 0.59,
            y: 0.15,
            animate: true
        }, {
            name: "zoomOut",
            x: 0.65,
            y: 0.15,
            animate: true
        }, {
            name: "extents",
            x: 0.71,
            y: 0.15,
            animate: true
        }, {
            name: "backward",
            x: 0.1,
            y: 0.35,
            animate: false
        }, {
            name: "forward",
            x: 0.9,
            y: 0.35,
            animate: false
        }, {
            name: "skip",
            x: 0.9,
            y: 0.15,
            animate: false
        }],
        displayHelp: false,
        xHelp: 0.5,
        yHelp: 0.85,
        defaultMode: "mode3"
    });
    DCHISEL.nav[3.6].buttonGroups = [
        [0, 1, 2, 3],
        [4],
        [5, 6, 7]
    ];

    DCHISEL.nav[3.8] = new DCHISEL.Navigation({
        buttons: [{
            name: "mode1",
            x: 0.44,
            y: 0.15,
            animate: false
        }, {
            name: "mode2",
            x: 0.5,
            y: 0.15,
            animate: false
        }, {
            name: "mode3",
            x: 0.56,
            y: 0.15,
            animate: false
        }, {
            name: "backward",
            x: 0.1,
            y: 0.35,
            animate: false
        }, {
            name: "forward",
            x: 0.9,
            y: 0.35,
            animate: false
        }, {
            name: "skip",
            x: 0.9,
            y: 0.15,
            animate: false
        }],
        displayHelp: false,
        xHelp: 0.5,
        yHelp: 0.85,
        defaultMode: "mode3"
    });
    DCHISEL.nav[3.8].buttonGroups = [
        [0, 1, 2]
    ];

    DCHISEL.nav[3.9] = new DCHISEL.Navigation({
        buttons: [{
            name: "mode1",
            x: 0.44,
            y: 0.15,
            animate: false
        }, {
            name: "mode2",
            x: 0.5,
            y: 0.15,
            animate: false
        }, {
            name: "mode3",
            x: 0.56,
            y: 0.15,
            animate: false
        }, {
            name: "backward",
            x: 0.1,
            y: 0.35,
            animate: false
        }, {
            name: "forward",
            x: 0.9,
            y: 0.35,
            animate: false
        }, {
            name: "skip",
            x: 0.9,
            y: 0.15,
            animate: false
        }],
        displayHelp: false,
        xHelp: 0.5,
        yHelp: 0.85,
        defaultMode: "mode3"
    });
    DCHISEL.nav[3.9].buttonGroups = [
        [0, 1, 2]
    ];


    DCHISEL.nav[4] = new DCHISEL.Navigation({
        buttons: [{
            name: "mode1",
            x: 0.1,
            y: 0.15 + 0 * 0.0875,
            animate: false
        }, {
            name: "mode2",
            x: 0.1,
            y: 0.15 + 1 * 0.0875,
            animate: false
        }, {
            name: "mode3",
            x: 0.1,
            y: 0.15 + 2 * 0.0875,
            animate: false
        }, {
            name: "smooth",
            x: 0.1,
            y: 0.15 + 3 * 0.0875,
            animate: false
        }, {
            name: "preview",
            x: 0.1,
            y: 0.15 + 4 * 0.0875,
            animate: false
        }, {
            name: "downloadSVG",
            x: 0.1,
            y: 0.15 + 5 * 0.0875,
            animate: false
        }, {
            name: "zoomIn",
            x: 0.1,
            y: 0.15 + 6 * 0.0875,
            animate: false
        }, {
            name: "zoomOut",
            x: 0.1,
            y: 0.15 + 7 * 0.0875,
            animate: false
        }, {
            name: "extents",
            x: 0.1,
            y: 0.15 + 8 * 0.0875,
            animate: false
        }, {
            name: "3d",
            x: 0.9,
            y: 0.15 + 0 * 0.0875,
            animate: false
        }, {
            name: "doc",
            x: 0.9,
            y: 0.15 + 1 * 0.0875,
            animate: false
        }],
        displayHelp: true,
        xHelp: 0.5,
        yHelp: 0.85,
        defaultMode: "mode3"
    });
    DCHISEL.nav[4].buttonGroups = [
        [0, 1, 2, 3],
        [4, 5],
        [6, 7, 8],
        [9, 10]
    ];

    DCHISEL.nav[5] = new DCHISEL.Navigation({
        buttons: [{
            name: "mode1",
            x: 0.16,
            y: 0.55,
            animate: false
        }, {
            name: "mode2",
            x: 0.22,
            y: 0.55,
            animate: false
        }, {
            name: "mode3",
            x: 0.28,
            y: 0.55,
            animate: false
        }, {
            name: "2d",
            x: 0.16,
            y: 0.17,
            animate: false
        }, {
            name: "3dpreview",
            x: 0.22,
            y: 0.17,
            animate: false
        }, {
            name: "downloadPython",
            x: 0.28,
            y: 0.17,
            animate: false
        }],
        displayHelp: true,
        xHelp: 0.7,
        yHelp: 0.85,
        defaultMode: "3dpreview"
    });
    DCHISEL.nav[5].buttonGroups = [
        [0, 1, 2],
        [3, 4, 5]
    ];

    DCHISEL.nav.current = function() {

        return DCHISEL.nav[DCHISEL.stage.no];

    };

    DCHISEL.nav.place = function() {

        if (typeof DCHISEL.nav[DCHISEL.stage.no] !== "undefined") {
            DCHISEL.nav[DCHISEL.stage.no].place();
        }

    };

    DCHISEL.nav.mouseDown = function() {

        if (typeof this.current() !== "undefined") this.current().mouseDown();

    };

    DCHISEL.nav.mouseMove = function() {

        if (typeof this.current() !== "undefined") this.current().mouseMove();

    };
})();
