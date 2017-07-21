module Main exposing (main)

import Json.Decode as Decode
import Html exposing (Html, program, div, text)
import Html.Attributes exposing (style)
import Svg exposing (svg, path, line, g, circle)
import Svg.Attributes exposing (d, viewBox, stroke, strokeWidth, fill, cx, cy, r, x1, x2, y1, y2, strokeLinecap, strokeLinejoin, strokeMiterlimit, strokeDasharray)
import Svg.Events exposing (on)
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


type Dragged
    = Dragged String Int Int Int Int


type alias Model =
    { controlPoints : List ( Float, Float )
    , dragged : Maybe Dragged
    , scale : Float
    }


init : ( Model, Cmd Msg )
init =
    ( { controlPoints =
            [ ( 10, 10 )
            , ( 20, 50 )
            , ( 80, 50 )
            , ( 90, 90 )
            ]
      , dragged = Nothing
      , scale = 6
      }
    , Cmd.none
    )


temporaryControlPoint : Model -> Int -> Point2d
temporaryControlPoint model index =
    let
        id =
            (controlPointId index)

        ( offsetX, offsetY ) =
            case model.dragged of
                Just (Dragged dragId x0 y0 xd yd) ->
                    if id == dragId then
                        ( (toFloat (xd - x0)) / model.scale
                        , (toFloat (yd - y0)) / model.scale
                        )
                    else
                        ( 0, 0 )

                _ ->
                    ( 0, 0 )
    in
        model.controlPoints
            |> List.drop index
            |> List.head
            |> Maybe.map (\( x, y ) -> ( x + offsetX, y + offsetY ))
            |> Maybe.withDefault ( 0, 0 )
            |> Point2d



-- Msg


type Msg
    = MouseMove Int Int
    | MouseDown String Int Int
    | MouseUp String Int Int



-- Update


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case ( msg, model.dragged ) of
        ( MouseMove xm ym, Just (Dragged dragId x0 y0 xd yd) ) ->
            ( { model
                | dragged =
                    Just (Dragged dragId x0 y0 xm ym)
              }
            , Cmd.none
            )

        ( MouseDown id x y, _ ) ->
            ( { model | dragged = Just (Dragged id x y x y) }, Cmd.none )

        ( MouseUp id x y, Just (Dragged dragId x0 y0 xd yd) ) ->
            ( { model
                | dragged = Nothing
                , controlPoints =
                    List.indexedMap
                        (\index ( ptx, pty ) ->
                            if controlPointId index == id then
                                ( ptx + (toFloat (x - x0)) / model.scale
                                , pty + (toFloat (y - y0)) / model.scale
                                )
                            else
                                ( ptx, pty )
                        )
                        model.controlPoints
              }
            , Cmd.none
            )

        ( _, _ ) ->
            ( model, Cmd.none )



-- Subs


subscriptions : Model -> Sub Msg
subscriptions =
    always Sub.none



-- Views


viewLine : ( Point2d, Point2d ) -> Html Msg
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


controlPointId : Int -> String
controlPointId index =
    "ctrl" ++ (toString index)


controlPointIndex : String -> Int
controlPointIndex id =
    String.dropLeft 4 id
        |> String.toInt
        |> Result.withDefault 0


viewControlPoint : Int -> Point2d -> Html Msg
viewControlPoint index pt =
    let
        ( x, y ) =
            coordinates pt
    in
        circle
            [ cx (toString x)
            , cy (toString y)
            , r "2"
            , on "mouseup"
                (Decode.map2 (MouseUp (controlPointId index))
                    (Decode.field "screenX" Decode.int)
                    (Decode.field "screenY" Decode.int)
                )
            , on "mousedown"
                (Decode.map2 (MouseDown (controlPointId index))
                    (Decode.field "screenX" Decode.int)
                    (Decode.field "screenY" Decode.int)
                )
            ]
            []


view : Model -> Html Msg
view model =
    let
        pt1 =
            temporaryControlPoint model 0

        pt2 =
            temporaryControlPoint model 1

        pt3 =
            temporaryControlPoint model 2

        pt4 =
            temporaryControlPoint model 3

        spline =
            bezier pt1 pt2 pt3 pt4
    in
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
                    [ ( "width", (model.scale * 100 |> toString) ++ "px" )
                    , ( "height", (model.scale * 100 |> toString) ++ "px" )
                    , ( "margin-top", "40px" )
                    , ( "border", "1px solid #ddd" )
                    ]
                , on "mousemove"
                    (Decode.map2 MouseMove
                        (Decode.field "screenX" Decode.int)
                        (Decode.field "screenY" Decode.int)
                    )
                ]
                [ g
                    []
                    [ OpenSolid.Svg.cubicSpline2d
                        [ fill "none"
                        , stroke "black"
                        , strokeLinecap "round"
                        , strokeLinejoin "round"
                        , strokeWidth "1"
                        ]
                        spline
                    , g []
                        [ viewLine ( pt1, pt2 )
                        , viewLine ( pt3, pt4 )
                        ]
                    , g []
                        [ viewControlPoint 0 pt1
                        , viewControlPoint 1 pt2
                        , viewControlPoint 2 pt3
                        , viewControlPoint 3 pt4
                        ]
                    ]
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
        [ path [ fill "#3D384F", d "M45.4297887,217.655867 L74.9021163,107.635798 C76.0485964,100.674591 71.7449043,93.8451811 64.7791798,91.9814291 C55.3647965,89.4688873 45.9482607,86.9488165 36.5306485,84.4298212 C92.5379953,5.39661381 197.162823,-22.1789628 284.887611,18.9703628 C372.611323,60.1218396 418.227008,158.172278 393.167549,251.721438 C368.107014,345.270597 279.573925,407.43342 183.010574,399.283793 C86.4450693,391.13309 9.59950662,315.009311 0.59411679,218.586217 C10.011729,221.106288 19.4282648,223.625283 28.8426481,226.142127 C35.8009038,228.00489 42.9353637,224.24711 45.4297887,217.655867 Z M51.8137869,216.323294 C59.4177347,216.331471 67.0211692,216.338971 74.6273114,216.345795 C79.2855314,210.62374 83.4626461,205.825602 87.1554263,201.949232 C93.8155616,199.585119 96.2340044,204.390786 94.4042969,216.363005 C99.0635933,210.6431 103.240708,205.844962 106.933488,201.967517 C113.593623,199.603404 116.008837,204.409071 114.181282,216.382365 C118.840579,210.661385 123.015541,205.862172 126.710474,201.984726 C133.370609,199.622765 135.785823,204.427355 133.955039,216.399574 C138.617564,210.679669 142.792526,205.880456 146.486383,202.005162 C153.146518,199.641049 155.564961,204.44564 153.733101,216.418934 C158.392397,210.697954 162.569512,205.899817 166.261216,202.022371 C172.92458,199.658259 175.34087,204.463925 173.510087,216.437219 C178.169383,210.716239 182.346497,205.919177 186.039278,202.041731 C192.700489,199.676543 195.114627,204.48221 193.284919,216.454428 C197.947445,210.735599 202.122407,205.936386 205.816263,202.061092 C212.476399,199.695904 214.893765,204.50157 213.062981,216.472713 C217.722278,210.753884 221.899392,205.954671 225.591096,202.079376 C232.252308,199.714188 234.669674,204.52093 232.841043,216.493149 C238.869391,216.498527 244.897739,216.50498 250.930393,216.511434 C257.225663,216.515736 262.737388,212.29088 264.365827,206.213885 C267.038276,196.23363 269.712878,186.252299 272.386404,176.274195 C274.370022,168.863488 269.97119,161.249496 262.557646,159.267213 C201.761275,143.002224 140.96389,126.738249 80.1684428,110.475286 L51.8137869,216.323294 Z M21.5604122,109.178788 C24.6214052,109.998376 27.681322,110.815813 30.742315,111.6354 C38.1580119,113.618759 42.5611492,121.232751 40.5753784,128.642383 C35.7836973,146.529185 30.9920163,164.418139 26.2003352,182.306017 C24.2156407,189.715649 16.5954471,194.112597 9.18190279,192.129238 C6.11983346,191.30965 3.05991673,190.491138 0,189.67155 C1.49713126,160.728918 8.38974707,134.999027 21.5604122,109.178788 Z" ] []
        ]
