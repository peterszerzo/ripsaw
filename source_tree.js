module.exports = [

        {

            dir: '', // root

            files: [

                {
                    name: 'NameSpace',
                    inBuilds: ['full', 'demo']
                },

                {
                    name: 'textAssets',
                    inBuilds: ['full', 'demo']
                },

                {
                    name: 'setup',
                    inBuilds: ['full', 'demo']
                }

            ]

        },

        {

            dir: 'util',

            files: [

                {
                    name: 'events',
                    inBuilds: ['full']
                }, 

                {
                    name: 'observer',
                    inBuilds: ['full', 'demo']
                }, 

                {
                    name: 'inheritance',
                    inBuilds: ['full', 'demo']
                }, 

                {
                    name: 'util',
                    inBuilds: ['full', 'demo']
                }

            ]

        },

        {

            dir: 'math',

            files: [

                {
                    name: 'Matrix',
                    inBuilds: ['full', 'demo']
                }, 

                {
                    name: 'Vector',
                    inBuilds: ['full', 'demo']
                }, 

                {
                    name: 'DragNode',
                    inBuilds: ['full', 'demo']
                }, 

                {
                    name: 'PointCloud',
                    inBuilds: ['full', 'demo']
                }, 

                {
                    name: 'Line',
                    inBuilds: ['full', 'demo']
                }

            ]

        },

        {

            dir: 'render',

            files: [

                {
                    name: 'Camera',
                    inBuilds: ['full']
                }, 

                {
                    name: 'colors',
                    inBuilds: ['full', 'demo']
                }, 

                {
                    name: 'pen',
                    inBuilds: ['full', 'demo']
                }

            ]

        },

        {

            dir: 'app',

            files: [

                {
                    name: 'mouse',
                    inBuilds: ['full', 'demo']
                }, 

                {
                    name: 'stage',
                    inBuilds: ['full', 'demo']
                }, 

                {
                    name: 'tutorial',
                    inBuilds: ['full', 'demo']
                }

            ]

        },

        {

            dir: 'app/nav',

            files: [

                {
                    name: 'MenuButton',
                    inBuilds: ['full', 'demo']
                }, 

                {
                    name: 'Navigation',
                    inBuilds: ['full', 'demo']
                }

            ]

        },

        {

            dir: 'masterpieces',

            files: [

                {
                    name: 'MasterPiece',
                    inBuilds: ['full', 'demo']
                }, 

                {
                    name: 'MasterPiecePermissions',
                    inBuilds: ['full', 'demo']
                }

            ]

        },

        {

            dir: 'masterpieces/Bezier',

            files: [

                {
                    name: 'BezierSVGPath',
                    inBuilds: ['full', 'demo']
                }, 

                {
                    name: 'BezierHandle',
                    inBuilds: ['full', 'demo']
                }, 

                {
                    name: 'Bezier2D',
                    inBuilds: ['full', 'demo']
                }, 

                {
                    name: 'Bezier3D',
                    inBuilds: ['full']
                }

            ]

        },

        {

            dir: 'masterpieces/Pantograph',

            files: [

                {
                    name: 'Pantograph',
                    inBuilds: ['full']
                }, 

                {
                    name: 'CurvingPantograph',
                    inBuilds: ['full']
                }

            ]

        },

        {

            dir: 'masterpieces/Voronoi',

            files: [

                {
                    name: 'VoronoiIntersection',
                    inBuilds: ['full']
                },

                {
                    name: 'voronoiWave',
                    inBuilds: ['full']
                },

                {
                    name: 'voronoiWaveFront',
                    inBuilds: ['full']
                },

                {
                    name: 'Voronoi',
                    inBuilds: ['full']
                }

            ]

        }

    ];