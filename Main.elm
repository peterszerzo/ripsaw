module Main exposing (main)

import Html exposing (Html, program, div, text)
import Html.Attributes exposing (style)
import Svg exposing (svg, path, line, g, circle)
import Svg.Attributes exposing (d, viewBox, stroke, strokeWidth, fill, cx, cy, r, x1, x2, y1, y2, strokeLinecap, strokeLinejoin, strokeMiterlimit, strokeDasharray)
import OpenSolid.Geometry.Types exposing (..)
import OpenSolid.CubicSpline2d exposing (bezier, controlPoints)
import OpenSolid.Point2d exposing (coordinates)
import OpenSolid.Svg


main : Program Never Model Msg
main =
    program
        { view = view
        , update = update
        , init = init
        , subscriptions = subscriptions
        }



-- Model


type alias Model =
    List ( Float, Float )


init : ( Model, Cmd Msg )
init =
    ( [ ( 10, 10 )
      , ( 20, 50 )
      , ( 80, 50 )
      , ( 90, 90 )
      ]
    , Cmd.none
    )



-- Msg


type Msg
    = NoOp



-- Update


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( model, Cmd.none )



-- Subs


subscriptions : Model -> Sub Msg
subscriptions =
    always Sub.none



-- Views


viewLine : ( Point2d, Point2d ) -> Html msg
viewLine ( pt1, pt2 ) =
    let
        ( x1_, y1_ ) =
            coordinates pt1

        ( x2_, y2_ ) =
            coordinates pt2
    in
        line
            [ x1 (toString x1_)
            , y1 (toString y1_)
            , x2 (toString x2_)
            , y2 (toString y2_)
            , stroke "#333"
            , strokeDasharray "3, 3"
            , strokeWidth "1"
            ]
            []


viewControlPoint : Point2d -> Html msg
viewControlPoint pt =
    let
        ( x, y ) =
            coordinates pt
    in
        circle [ cx (toString x), cy (toString y), r "2" ] []


viewSpline : CubicSpline2d -> Html msg
viewSpline spline =
    let
        ( pt1, pt2, pt3, pt4 ) =
            controlPoints spline
    in
        g []
            [ OpenSolid.Svg.cubicSpline2d
                [ fill "none"
                , stroke "black"
                , strokeLinecap "round"
                , strokeLinejoin "round"
                , strokeWidth "1"
                ]
                spline
            , g []
                [ viewControlPoint pt1
                , viewControlPoint pt2
                , viewControlPoint pt3
                , viewControlPoint pt4
                ]
            , g []
                [ viewLine ( pt1, pt2 )
                , viewLine ( pt3, pt4 )
                ]
            ]


view : Model -> Html Msg
view model =
    div
        [ style
            [ ( "padding", "40px" )
            , ( "max-width", "600px" )
            , ( "margin", "auto" )
            ]
        ]
        [ logo
        , svg
            [ viewBox "0 0 100 100"
            , style
                [ ( "width", "600px" )
                , ( "height", "600px" )
                , ( "margin-top", "40px" )
                , ( "border", "1px solid #ddd" )
                ]
            ]
            [ viewSpline
                (bezier
                    (Point2d ( 10, 10 ))
                    (Point2d ( 20, 50 ))
                    (Point2d ( 80, 50 ))
                    (Point2d ( 90, 90 ))
                )
            ]
        ]


logo : Html msg
logo =
    svg
        [ viewBox "0 0 400 400"
        , style
            [ ( "width", "100px" )
            , ( "height", "100px" )
            , ( "display", "block" )
            , ( "margin", "auto" )
            ]
        ]
        [ path [ fill "#3D384F", d "M34.41,115.572c2.844,0.762,5.687,1.522,8.531,2.284c6.89,1.844,10.981,8.923,9.136,15.812 c-4.452,16.63-8.904,33.262-13.356,49.893c-1.844,6.889-8.924,10.977-15.812,9.133c-2.845-0.762-5.688-1.523-8.531-2.285 C15.769,163.5,22.173,139.578,34.41,115.572z" ] []
        , path [ fill "#3D384F", d "M48.319,92.562c52.037-73.48,149.245-99.118,230.751-60.86c81.505,38.26,123.887,129.421,100.604,216.397 C356.39,335.075,274.133,392.87,184.415,385.293C94.695,377.715,23.297,306.94,14.93,217.292c8.75,2.343,17.499,4.685,26.246,7.025 c6.891,1.846,13.968-2.245,15.812-9.135c8.909,0.01,17.816,0.019,26.727,0.027c4.328-5.32,8.209-9.781,11.64-13.385 c6.188-2.198,8.435,2.27,6.735,13.401c4.329-5.318,8.21-9.779,11.641-13.384c6.188-2.198,8.432,2.27,6.734,13.402 c4.329-5.319,8.208-9.781,11.641-13.386c6.188-2.196,8.432,2.271,6.731,13.402c4.332-5.318,8.211-9.78,11.643-13.383 c6.188-2.198,8.435,2.269,6.733,13.401c4.329-5.319,8.21-9.78,11.64-13.385c6.191-2.198,8.436,2.27,6.735,13.402 c4.329-5.319,8.21-9.779,11.641-13.384c6.189-2.199,8.432,2.269,6.732,13.4c4.332-5.317,8.211-9.779,11.643-13.382 c6.188-2.199,8.434,2.269,6.733,13.399c4.329-5.317,8.21-9.779,11.64-13.382c6.189-2.199,8.435,2.27,6.736,13.401 c5.601,0.005,11.202,0.011,16.807,0.017c5.849,0.004,10.97-3.924,12.483-9.574c2.483-9.279,4.968-18.559,7.452-27.836 c1.843-6.89-2.244-13.969-9.132-15.812c-58.208-15.583-116.417-31.165-174.624-46.746c1.844-6.888-2.243-13.967-9.134-15.812 C65.818,97.247,57.069,94.904,48.319,92.562z" ] []
        , line [ fill "none", stroke "#3D384F", strokeWidth "5.4093", strokeLinecap "round", strokeLinejoin "round", strokeMiterlimit "10", x1 "87.756", y1 "110.455", x2 "58.031", y2 "221.493" ] []
        ]
