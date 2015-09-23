RIPSAW.intro = {

	1:  function() {
	
		var opacity,
			spd = RIPSAW.anim.speed;	
		
		opacity = RIPSAW.sineAnimate(4 * spd, 0, 0, spd);
		RIPSAW.pen.write("Yourk", 0.5, 0.34, 2, 1, opacity);
		
		opacity = RIPSAW.sineAnimate(3 * spd, 0, spd, 2 * spd);
		RIPSAW.pen.write("Guided Design in the Browser", 0.5, 0.41, 1.33, 2, opacity);
		
		opacity = RIPSAW.sineAnimate(3 * spd, 0, 2 * spd, 3 * spd);
		RIPSAW.pen.write("a tool inspired by and dedicated to", 0.5, 0.7, 1, 2, opacity);
		
		opacity = RIPSAW.sineAnimate(3 * spd, 0, 3 * spd, 4 * spd);
		RIPSAW.pen.write("Maya Kryvitskaya Davis and Stephen Davis", 0.5, 0.74, 1.2, 2, opacity);
		
		opacity = RIPSAW.sineAnimate(1.8 * spd, 0, 4 * spd, 10 * spd);
		RIPSAW.pen.write("~ click to proceed ~", 0.5, 0.5, 0.9, 2, opacity);
		
	},

	2: function() {
	
		var opacity,
			spd = RIPSAW.anim.speed;
		
		opacity = RIPSAW.sineAnimate(4 * spd, 0, 0, spd);
		RIPSAW.pen.write("if you could choose the exact fork design for your next meal...", 0.5, 0.30, 1.3, 2, opacity);
		
		opacity = RIPSAW.sineAnimate(4 * spd, 0, spd, 2 * spd);
		RIPSAW.pen.write("whether a light snack or a greedy feast", 0.5, 0.4, 1, 2, opacity);
		
		opacity = RIPSAW.sineAnimate(4 * spd, 0, 2 * spd, 3 * spd);
		RIPSAW.pen.write("a fast-food takeout, a barbecue or an elaborate home-cooked dinner", 0.5, 0.44, 1, 2, opacity);
		
		opacity = RIPSAW.sineAnimate(4 * spd, 0, 3 * spd, 4 * spd);
		RIPSAW.pen.write("what would it be?", 0.5, 0.57, 1.3, 2, opacity);
		
	},
	
	run: function() {
	
		if (typeof this[RIPSAW.stage.no] !== "undefined") {
			this[RIPSAW.stage.no]();
		}
		
	}
	
};

RIPSAW.tutorial.stageManager = {

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
	]

};


RIPSAW.createMasterPiece = (function() {

	var modelDepth = RIPSAW.rDim.d / RIPSAW.rDim.l * RIPSAW.rDim.depthScale;

	RIPSAW.masterPiece = new RIPSAW.Bezier3D(RIPSAW.textAssets.shapeLibrary["fork"], modelDepth, 0.7, 0.4, 1);
	
	RIPSAW.masterPiece.stageManager = {
		
		1: {
			
			plan: { permissionsBinary: "0" },
			side: { permissionsBinary: "0" },
			threeD: { permissionsBinary: "0" }
			
		},
		
		3: {
			
			plan: {
				
				permissionsBinary: "11000",
				x0: 0.5, y0: 0.42,
				scale: 0.9
				
			}
			
		},
		
		3.7: {

			plan: { permissionsBinary: "0" },

			side: { permissionsBinary: "0" },

			threeD: {

				permissionsBinary: "10000",
				x0: 0.5, y0: 0.4,
				scale: 1.2

			}

		},
		
		3.8: {
			
			plan: { permissionsBinary: "0" },

			threeD: {
			
				permissionsBinary: "10000",
				x0: 0.7, y0: 0.4,
				scale: 1.2
			
			},
			
			side: {
				
				permissionsBinary: "11000",
				x0: 0.3, y0: 0.4,
				scale: 0.5
				
			}
			
		},
		
		
		4: {
		
			plan: {
		
				permissionsBinary: "11100",
				x0: 0.5, y0: 0.42,
				scale: 0.9
			
			},

			side: { permissionsBinary: "0" },
			threeD: { permissionsBinary: "0" }
			
		},
		
		
		5: {

			plan: {

				permissionsBinary: "0"

			},
			
			side: {
				
				permissionsBinary: "11000",
				x0: 0.25, y0: 0.7,
				scale: 0.5	
							
			},
			
			threeD: {
				
				permissionsBinary: "10001",
				x0: 0.7, y0: 0.3,
				scale: 1.2
				
			}
			
		}	
		
	};
			
})();


RIPSAW.allButtons = {

	"mode1": {
		helpText: "drawing mode 1 - independent handles",
		onClick: function() {
			RIPSAW.mode = "mode1";
		}
	},
	
	"mode2": {
		helpText:"drawing mode 2 - partially coupled handles",
		onClick: function() {
			RIPSAW.mode = "mode2";
		}
	},
	
	"mode3": {
		helpText: "drawing mode 3 - fully coupled handles",
		onClick: function() {
			RIPSAW.mode = "mode3";
		}
	},
	
	"smooth": {
		helpText: "smooth kink",
		onClick: function() {
			RIPSAW.mode = "smooth";
		}
	},
	
	"preview": {
		helpText: "preview - hide control points",
		onClick: function() {
			RIPSAW.mode = "preview";
		}
	},
	
	"3dpreview": {
		helpText: "rotate 3d view",
		onClick: function() {
			RIPSAW.mode = "3dpreview";
		}
	},
	
	"zoomIn": {
		helpText: "zoom in",
		onClick: function() {
		
			RIPSAW.masterPiece.plan.scale *= 1.15;
			
		}
	},
	
	"zoomOut": {
		helpText: "zoom out",
		onClick: function() {
		
			RIPSAW.masterPiece.plan.scale /= 1.15;
			
		}
	},
	
	"extents": {
		helpText: "zoom extents",
		onClick: function() {
		
			RIPSAW.masterPiece.plan.updateState();
			
		}
	},
	
	"backward": {
		helpText: "back",
		onClick: function() {
		
			if (RIPSAW.stage.no > 3) RIPSAW.stage.change(-0.1);
			
		}
	},
	
	"forward": {
		helpText: "forward",
		onClick: function() {
		
			RIPSAW.stage.change(0.1);
			
		}
	},
	
	"skip": {
		helpText: "skip tutorial",
		onClick: function() {
		
			RIPSAW.stage.set(4);
			RIPSAW.mode = "mode3";
			
		}	
	},
	
	"2d": {
		helpText: "back to 2d design",
		onClick: function() {
		
			RIPSAW.stage.change(-1);
			RIPSAW.mode = "mode3";
			
		}
	},
	
	"3d": {
	
		helpText: "proceed to 3d design",
		onClick: function() {
		
			RIPSAW.masterPiece.plan.normalize();
			RIPSAW.stage.change(+1);
			RIPSAW.mode = "3dpreview";
			
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
		
			var uriContent = "data:image/svg+xml," + encodeURIComponent(RIPSAW.masterPiece.plan.toSVG()), 
				newWindow=window.open(uriContent);

		}

	},
	
	"downloadPython": {

		helpText: "download Python script for Rhino3d",
		onClick: function() {
					
			var uriContent = "data:text/svg+xml," + encodeURIComponent(RIPSAW.masterPiece.toRhinoPythonScript());
			
			window.open(uriContent);
				
		}

	}
	
};


RIPSAW.loadButtonImages = (function() {

	var img, name;
	
	for (name in RIPSAW.allButtons) {
	
		img = new Image();
		img.src = "images/buttonImages/" + name + ".png";
		RIPSAW.allButtons[name].image = img;
		
	}
	
}());

	
RIPSAW.nav.stageManager = {

	3 : {
	
		buttons: [
			{ name: "backward", x: 0.1, y: 0.35, animate: true },
			{ name: "forward", x: 0.9, y: 0.35, animate: true },
			{ name: "skip", x: 0.9, y: 0.15, animate: true }
		],
		displayHelp: false,
		xHelp: 0.5,
		yHelp: 0.85,
		defaultMode: "mode3"
		
	},
	
	
	3.1: {
		buttons: [
			{ name: "backward", x: 0.1, y: 0.35, animate: false },
			{ name: "forward", x: 0.9, y: 0.35, animate: false },
			{ name: "skip", x: 0.9, y: 0.15, animate: false }
		],
		displayHelp: false,
		xHelp: 0.5,
		yHelp: 0.85,
		defaultMode: "mode3"
	},
	
	
	3.2: {
		buttons: [
			{ name: "backward", x: 0.1, y: 0.35, animate: false },
			{ name: "forward", x: 0.9, y: 0.35, animate: false },
			{ name: "skip", x: 0.9, y: 0.15, animate: false }
		],
		displayHelp: false,
		xHelp: 0.5,
		yHelp: 0.85,
		defaultMode: "mode3"
	},
	
	
	3.3: {
		buttons: [
			{ name: "backward", x: 0.1, y: 0.35, animate: false },
			{ name: "forward", x: 0.9, y: 0.35, animate: false },
			{ name: "skip", x: 0.9, y: 0.15, animate: false }
		],
		displayHelp: false,
		xHelp: 0.5,
		yHelp: 0.85,
		defaultMode: "mode3"
	},
	
	
	3.7: {
		buttons: [
			{ name: "backward", x: 0.1, y: 0.35, animate: false },
			{ name: "forward", x: 0.9, y: 0.35, animate: false },
			{ name: "skip", x: 0.9, y: 0.15, animate: false }
		],
		displayHelp: false,
		xHelp: 0.5,
		yHelp: 0.85,
		defaultMode: "mode3"
	},


	3.4: {
		buttons: [
			{ name: "mode1", x: 0.44, y: 0.15, animate: true },
			{ name: "mode2", x: 0.5, y: 0.15, animate: true },
			{ name: "mode3", x: 0.56, y: 0.15, animate: true },
			{ name: "backward", x: 0.1, y: 0.35, animate: false },
			{ name: "forward", x: 0.9, y: 0.35, animate: false },
			{ name: "skip", x: 0.9, y: 0.15, animate: false }
		],
		displayHelp: false,
		xHelp: 0.5,
		yHelp: 0.85,
		defaultMode: "mode3",
		buttonGroups: [[0,1,2]]
	},
	
	
	3.5: {
		buttons: [
			{ name: "mode1", x: 0.41, y: 0.15, animate: false },
			{ name: "mode2", x: 0.47, y: 0.15, animate: false },
			{ name: "mode3", x: 0.53, y: 0.15, animate: false },
			{ name: "smooth", x: 0.59, y: 0.15, animate: true },
			{ name: "backward", x: 0.1, y: 0.35, animate: false },
			{ name: "forward", x: 0.9, y: 0.35, animate: false },
			{ name: "skip", x: 0.9, y: 0.15, animate: false }
		],
		displayHelp: false,
		xHelp: 0.5,
		yHelp: 0.85,
		defaultMode: "mode3",
		buttonGroups: [[0,1,2],[3]]
	},
	
	
	3.6: {
		buttons: [
			{ name: "mode1", x: 0.29, y: 0.15, animate: false },
			{ name: "mode2", x: 0.35, y: 0.15, animate: false },
			{ name: "mode3", x: 0.41, y: 0.15, animate: false },
			{ name: "smooth", x: 0.47, y: 0.15, animate: false },
			{ name: "preview", x: 0.53, y: 0.15, animate: true },
			{ name: "zoomIn", x: 0.59, y: 0.15, animate: true },
			{ name: "zoomOut", x: 0.65, y: 0.15, animate: true },
			{ name: "extents", x: 0.71, y: 0.15, animate: true },
			{ name: "backward", x: 0.1, y: 0.35, animate: false },
			{ name: "forward", x: 0.9, y: 0.35, animate: false },
			{ name: "skip", x: 0.9, y: 0.15, animate: false }
		],
		displayHelp: false,
		xHelp: 0.5,
		yHelp: 0.85,
		defaultMode: "mode3",
		buttonGroups: [[0,1,2,3],[4],[5,6,7]]
	},
	
	
	3.8: {
		buttons: [
			{ name: "mode1", x: 0.44, y: 0.15, animate: false },
			{ name: "mode2", x: 0.5, y: 0.15, animate: false },
			{ name: "mode3", x: 0.56, y: 0.15, animate: false },
			{ name: "backward", x: 0.1, y: 0.35, animate: false },
			{ name: "forward", x: 0.9, y: 0.35, animate: false },
			{ name: "skip", x: 0.9, y: 0.15, animate: false }
		],
		displayHelp: false,
		xHelp: 0.5,
		yHelp: 0.85,
		defaultMode: "mode3",
		buttonGroups: [[0,1,2]]
	},
	
	
	3.9: {
		buttons: [
			{ name: "mode1", x: 0.44, y: 0.15, animate: false },
			{ name: "mode2", x: 0.5, y: 0.15, animate: false },
			{ name: "mode3", x: 0.56, y: 0.15, animate: false },
			{ name: "backward", x: 0.1, y: 0.35, animate: false },
			{ name: "forward", x: 0.9, y: 0.35, animate: false },
			{ name: "skip", x: 0.9, y: 0.15, animate: false }
		],
		displayHelp: false,
		xHelp: 0.5,
		yHelp: 0.85,
		defaultMode: "mode3",
		buttonGroups: [[0,1,2]]
	},

	
	4 : {
		buttons: [
			{ name: "mode1", x: 0.1, y: 0.15+0*0.0875, animate: false },
			{ name: "mode2", x: 0.1, y: 0.15+1*0.0875, animate: false },
			{ name: "mode3", x: 0.1, y: 0.15+2*0.0875, animate: false },
			{ name: "smooth", x: 0.1, y: 0.15+3*0.0875, animate: false },
			{ name: "preview", x: 0.1, y: 0.15+4*0.0875, animate: false },
			{ name: "downloadSVG", x: 0.1, y: 0.15+5*0.0875, animate: false },
			{ name: "zoomIn", x: 0.1, y: 0.15+6*0.0875, animate: false },
			{ name: "zoomOut", x: 0.1, y: 0.15+7*0.0875, animate: false },
			{ name: "extents", x: 0.1, y: 0.15+8*0.0875, animate: false },
			{ name: "3d", x: 0.9, y: 0.15+0*0.0875, animate: false },
			{ name: "doc", x: 0.9, y: 0.15+1*0.0875, animate: false }
		],
		displayHelp: true,
		xHelp: 0.5,
		yHelp: 0.85,
		defaultMode: "mode3",
		buttonGroups: [[0,1,2,3],[4,5],[6,7,8],[9,10]]
	},
	
	
	5 : {
		buttons: [
			{ name: "mode1", x: 0.16, y: 0.55, animate: false },
			{ name: "mode2", x: 0.22,    y: 0.55, animate: false },
			{ name: "mode3", x: 0.28,    y: 0.55, animate: false },
			{ name: "2d",    x: 0.16,    y: 0.17, animate: false },
			{ name: "3dpreview", x: 0.22, y: 0.17, animate: false },
			{ name: "downloadPython", x: 0.28, y: 0.17, animate: false }
		],
		displayHelp: true,
		xHelp: 0.7,
		yHelp: 0.85,
		defaultMode: "3dpreview",
		buttonGroups: [[0,1,2],[3,4,5]]
	}

};

RIPSAW.stage.subscribe(RIPSAW.masterPiece);
RIPSAW.stage.subscribe(RIPSAW.nav);
RIPSAW.stage.subscribe(RIPSAW.tutorial);