module Main exposing (main)

import Html exposing (Html, div, text)
import Html.Attributes exposing (style)
import Svg exposing (svg, path)
import Svg.Attributes exposing (d, viewBox, stroke, strokeWidth)
import OpenSolid.Geometry.Types exposing (..)
import OpenSolid.CubicSpline2d exposing (bezier)
import OpenSolid.Svg


view : Html msg
view =
    svg
        [ viewBox "0 0 100 100"
        , style
            [ ( "width", "300px" )
            , ( "height", "300px" )
            ]
        ]
        [ OpenSolid.Svg.cubicSpline2d []
            (bezier
                (Point2d ( 10, 10 ))
                (Point2d ( 20, 10 ))
                (Point2d ( 10, 20 ))
                (Point2d ( 20, 20 ))
            )
        ]


main : Html msg
main =
    div []
        [ view
        ]
