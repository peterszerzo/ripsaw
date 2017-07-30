module DraggableShape exposing (..)

import Html exposing (Html, Attribute)
import Html.Attributes exposing (style)
import Shape
import Drag
import Json.Decode as Decode
import Svg exposing (svg, path, line, g, circle)
import Svg.Attributes exposing (d, viewBox, stroke, strokeWidth, fill, cx, cy, r, x1, x2, y1, y2, strokeLinecap, strokeLinejoin, strokeMiterlimit, strokeDasharray)
import Svg.Events exposing (on)
import OpenSolid.Geometry.Types exposing (..)
import OpenSolid.Point2d exposing (coordinates)
import OpenSolid.Svg
import Utils


-- Model


type alias Model =
    { shape : Shape.Shape
    , drag : Drag.Drag Shape.ControlPointAddress
    }


init : Shape.Shape -> Model
init shape =
    Model shape Drag.init



-- Msg


type Msg
    = MouseMove Float Float
    | MouseDown Shape.ControlPointAddress Float Float
    | MouseUp Float Float



-- Update


update : ( Float, Float ) -> Msg -> Model -> Model
update ( width, height ) msg model =
    let
        scale =
            (min width height) / 100
    in
        case msg of
            MouseMove xm ym ->
                { model
                    | drag =
                        Drag.move ( xm, ym ) model.drag
                }

            MouseDown address x y ->
                { model
                    | drag =
                        Drag.start address ( x, y )
                }

            MouseUp x y ->
                { model
                    | drag = Drag.init
                    , shape =
                        case Drag.state model.drag of
                            Just ( address, ( diffX, diffY ) ) ->
                                Shape.moveControlPoint address ( diffX / scale, diffY / scale ) model.shape

                            Nothing ->
                                model.shape
                }



-- View


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


view : { isClosed : Bool, size : ( Float, Float ) } -> List (Attribute Msg) -> Model -> Html Msg
view { isClosed, size } attrs model =
    let
        ( width, height ) =
            size

        scale =
            (min width height) / 100

        renderedShape =
            case Drag.state model.drag of
                Just ( address, ( diffX, diffY ) ) ->
                    Shape.moveControlPoint address ( diffX / scale, diffY / scale ) model.shape

                Nothing ->
                    model.shape

        { controlHandles, controlPoints, splines } =
            Shape.render renderedShape
    in
        svg
            ([ viewBox "0 0 100 100"
             , style
                [ ( "width", Utils.toPx width )
                , ( "height", Utils.toPx height )
                ]
             , on "mousemove"
                (Decode.map2 MouseMove
                    (Decode.field "screenX" Decode.float)
                    (Decode.field "screenY" Decode.float)
                )
             ]
                ++ attrs
            )
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
