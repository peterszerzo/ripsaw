module Main exposing (main)

import Window
import Task
import Json.Decode as Decode
import Html exposing (Html, program, div, text)
import Html.Attributes exposing (style)
import Svg exposing (svg, path, line, g, circle)
import Svg.Attributes exposing (d, viewBox, stroke, strokeWidth, fill, cx, cy, r, x1, x2, y1, y2, strokeLinecap, strokeLinejoin, strokeMiterlimit, strokeDasharray)
import Svg.Events exposing (on)
import OpenSolid.Geometry.Types exposing (..)
import OpenSolid.Point2d exposing (coordinates)
import OpenSolid.Svg
import Drag
import Shape


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
    { shape : Shape.Shape
    , topDepthProfile : Shape.Shape
    , bottomDepthProfile : Shape.Shape
    , drag : Drag.Drag Shape.ControlPointAddress
    , scale : Float
    , windowSize : Window.Size
    }


init : ( Model, Cmd Msg )
init =
    ( { shape =
            Shape.shape
                [ ( Just ( 30, 10 ), ( 20, 20 ), Just ( 10, 30 ) )
                , ( Just ( 40, 80 ), ( 50, 70 ), Just ( 60, 60 ) )
                , ( Just ( 80, 30 ), ( 70, 20 ), Just ( 60, 10 ) )
                ]
      , topDepthProfile =
            Shape.shape
                [ ( Just ( -10, 0.05 ), ( 0, 0.05 ), Just ( 10, 0.05 ) )
                , ( Just ( 40, 0.05 ), ( 50, 0.05 ), Just ( 60, 0.05 ) )
                , ( Just ( 90, 0.05 ), ( 100, 0.05 ), Just ( 110, 0.05 ) )
                ]
      , bottomDepthProfile =
            Shape.shape
                [ ( Just ( -10, -0.05 ), ( 0, -0.05 ), Just ( 10, -0.05 ) )
                , ( Just ( 40, -0.05 ), ( 50, -0.05 ), Just ( 60, -0.05 ) )
                , ( Just ( 90, -0.05 ), ( 100, -0.05 ), Just ( 110, -0.05 ) )
                ]
      , drag = Drag.init
      , scale = 2
      , windowSize = { width = 0, height = 0 }
      }
    , Task.perform Resize Window.size
    )


type Msg
    = MouseMove Float Float
    | MouseDown Shape.ControlPointAddress Float Float
    | MouseUp Float Float
    | Resize Window.Size



-- Update


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        MouseMove xm ym ->
            ( { model
                | drag =
                    Drag.move ( xm, ym ) model.drag
              }
            , Cmd.none
            )

        MouseDown address x y ->
            ( { model
                | drag =
                    Drag.start address ( x, y )
              }
            , Cmd.none
            )

        MouseUp x y ->
            ( { model
                | drag = Drag.init
                , shape =
                    case Drag.state model.drag of
                        Just ( address, ( diffX, diffY ) ) ->
                            Shape.moveControlPoint address ( diffX / model.scale, diffY / model.scale ) model.shape

                        Nothing ->
                            model.shape
              }
            , Cmd.none
            )

        Resize windowSize ->
            ( { model | windowSize = windowSize }, Cmd.none )



-- Subs


subscriptions : Model -> Sub Msg
subscriptions model =
    Window.resizes Resize



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


viewControlPoint : Shape.ControlPointAddress -> Point2d -> Html Msg
viewControlPoint address pt =
    let
        ( x, y ) =
            coordinates pt
    in
        circle
            [ cx (toString x)
            , cy (toString y)
            , r "2"
            , on "mouseup"
                (Decode.map2
                    MouseUp
                    (Decode.field "screenX" Decode.float)
                    (Decode.field "screenY" Decode.float)
                )
            , on "mousedown"
                (Decode.map2 (MouseDown address)
                    (Decode.field "screenX" Decode.float)
                    (Decode.field "screenY" Decode.float)
                )
            ]
            []


view : Model -> Html Msg
view model =
    let
        renderedShape =
            case Drag.state model.drag of
                Just ( address, ( diffX, diffY ) ) ->
                    Shape.moveControlPoint address ( diffX / model.scale, diffY / model.scale ) model.shape

                Nothing ->
                    model.shape

        { controlHandles, controlPoints, splines } =
            Shape.render renderedShape
    in
        div
            [ style
                [ ( "width", "100vw" )
                , ( "height", "100vh" )
                , ( "position", "relative" )
                ]
            ]
            [ div
                [ style
                    [ ( "width", "80px" )
                    , ( "height", "80px" )
                    , ( "position", "absolute" )
                    , ( "top", "calc(50% - 40px)" )
                    , ( "left", "calc(50% - 40px)" )
                    , ( "z-index", "100" )
                    ]
                ]
                [ logo ]
            , div
                [ style
                    [ ( "width", "calc(50% - 30px)" )
                    , ( "height", "calc(50% - 30px)" )
                    , ( "top", "20px" )
                    , ( "left", "20px" )
                    , ( "position", "absolute" )
                    , ( "border", "1px solid #EEEEEE" )
                    , ( "border-radius", "6px" )
                    ]
                ]
                [ svg
                    [ viewBox "0 0 100 100"
                    , style
                        [ ( "width", (model.scale * 100 |> toString) ++ "px" )
                        , ( "height", (model.scale * 100 |> toString) ++ "px" )
                        , ( "position", "absolute" )
                        , ( "top", "50%" )
                        , ( "left", "50%" )
                        , ( "transform", "translate3d(-50%, -50%, 0)" )
                        ]
                    , on "mousemove"
                        (Decode.map2 MouseMove
                            (Decode.field "screenX" Decode.float)
                            (Decode.field "screenY" Decode.float)
                        )
                    ]
                    [ g
                        []
                        [ g [] <|
                            List.map
                                (OpenSolid.Svg.cubicSpline2d
                                    [ fill "none"
                                    , stroke "black"
                                    , strokeLinecap "round"
                                    , strokeLinejoin "round"
                                    , strokeWidth "1"
                                    ]
                                )
                                splines
                        , g [] <|
                            List.map viewLine controlHandles
                        , g [] <|
                            List.map (\( address, point ) -> viewControlPoint address point) controlPoints
                        ]
                    ]
                ]
            , div
                [ style
                    [ ( "width", "calc(50% - 30px)" )
                    , ( "height", "calc(50% - 30px)" )
                    , ( "bottom", "20px" )
                    , ( "left", "20px" )
                    , ( "position", "absolute" )
                    , ( "border", "1px solid #EEEEEE" )
                    , ( "border-radius", "6px" )
                    ]
                ]
                []
            , div
                [ style
                    [ ( "width", "calc(50% - 30px)" )
                    , ( "height", "calc(100% - 40px)" )
                    , ( "top", "20px" )
                    , ( "right", "20px" )
                    , ( "position", "absolute" )
                    , ( "border", "1px solid #EEEEEE" )
                    , ( "border-radius", "6px" )
                    ]
                ]
                []
            ]


logo : Html msg
logo =
    svg
        [ viewBox "0 0 400 400"
        ]
        [ path [ fill "#3D384F", d "M45.4297887,217.655867 L74.9021163,107.635798 C76.0485964,100.674591 71.7449043,93.8451811 64.7791798,91.9814291 C55.3647965,89.4688873 45.9482607,86.9488165 36.5306485,84.4298212 C92.5379953,5.39661381 197.162823,-22.1789628 284.887611,18.9703628 C372.611323,60.1218396 418.227008,158.172278 393.167549,251.721438 C368.107014,345.270597 279.573925,407.43342 183.010574,399.283793 C86.4450693,391.13309 9.59950662,315.009311 0.59411679,218.586217 C10.011729,221.106288 19.4282648,223.625283 28.8426481,226.142127 C35.8009038,228.00489 42.9353637,224.24711 45.4297887,217.655867 Z M51.8137869,216.323294 C59.4177347,216.331471 67.0211692,216.338971 74.6273114,216.345795 C79.2855314,210.62374 83.4626461,205.825602 87.1554263,201.949232 C93.8155616,199.585119 96.2340044,204.390786 94.4042969,216.363005 C99.0635933,210.6431 103.240708,205.844962 106.933488,201.967517 C113.593623,199.603404 116.008837,204.409071 114.181282,216.382365 C118.840579,210.661385 123.015541,205.862172 126.710474,201.984726 C133.370609,199.622765 135.785823,204.427355 133.955039,216.399574 C138.617564,210.679669 142.792526,205.880456 146.486383,202.005162 C153.146518,199.641049 155.564961,204.44564 153.733101,216.418934 C158.392397,210.697954 162.569512,205.899817 166.261216,202.022371 C172.92458,199.658259 175.34087,204.463925 173.510087,216.437219 C178.169383,210.716239 182.346497,205.919177 186.039278,202.041731 C192.700489,199.676543 195.114627,204.48221 193.284919,216.454428 C197.947445,210.735599 202.122407,205.936386 205.816263,202.061092 C212.476399,199.695904 214.893765,204.50157 213.062981,216.472713 C217.722278,210.753884 221.899392,205.954671 225.591096,202.079376 C232.252308,199.714188 234.669674,204.52093 232.841043,216.493149 C238.869391,216.498527 244.897739,216.50498 250.930393,216.511434 C257.225663,216.515736 262.737388,212.29088 264.365827,206.213885 C267.038276,196.23363 269.712878,186.252299 272.386404,176.274195 C274.370022,168.863488 269.97119,161.249496 262.557646,159.267213 C201.761275,143.002224 140.96389,126.738249 80.1684428,110.475286 L51.8137869,216.323294 Z M21.5604122,109.178788 C24.6214052,109.998376 27.681322,110.815813 30.742315,111.6354 C38.1580119,113.618759 42.5611492,121.232751 40.5753784,128.642383 C35.7836973,146.529185 30.9920163,164.418139 26.2003352,182.306017 C24.2156407,189.715649 16.5954471,194.112597 9.18190279,192.129238 C6.11983346,191.30965 3.05991673,190.491138 0,189.67155 C1.49713126,160.728918 8.38974707,134.999027 21.5604122,109.178788 Z" ] []
        ]
