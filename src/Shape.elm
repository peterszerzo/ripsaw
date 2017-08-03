module Shape
    exposing
        ( Shape
        , ControlPointAddress
        , RenderedShape
        , shape
        , render
        , moveControlPoint
        , discretePoints
        )

{-| This module models a closed spline shape as a collection of control handles (see [Handle](/Handle)).

# Types
@docs Shape, ControlPointAddress, RenderedShape

# The constructor
@docs shape

# Update methods
@docs moveControlPoint, discretePoints

# The renderer
@docs render
-}

import Handle exposing (Handle, ControlPointLocation(..), handle)
import Types exposing (..)
import OpenSolid.Geometry.Types exposing (..)
import OpenSolid.CubicSpline2d exposing (bezier)
import Utils


{-| A shape is define as a mere list of control handles.
-}
type Shape
    = Shape Bool (List Handle)


{-| An opaque type encoding information that maps a control point to its corresponding handle on the shape and location on its handle (left, center or right). This contextual information can then be passed along with `Html` messages, so that whenever a point is dragged, the shape can be updated accordingly.
-}
type ControlPointAddress
    = ControlPointAddress
        { handle : Int
        , location : ControlPointLocation
        }


{-| A record of OpenSolid data types used for rendering a shape, as well as information used to map these objects to handles for updating.
-}
type alias RenderedShape =
    { controlHandles : List ( Point2d, Point2d )
    , controlPoints : List ( ControlPointAddress, Point2d )
    , splines : List CubicSpline2d
    }


{-| Construct a shape from a list of handle data.
-}
shape : Bool -> List ( Maybe RawPoint2d, RawPoint2d, Maybe RawPoint2d ) -> Shape
shape isClosed handleData =
    List.map (\( left, center, right ) -> handle left center right) handleData |> Shape isClosed


{-| Update a single handle in the shape, as specified by the `ControlPointAddress` argument.
-}
moveControlPoint : ControlPointAddress -> RawPoint2d -> Shape -> Shape
moveControlPoint (ControlPointAddress address) diff (Shape isClosed shape) =
    List.indexedMap
        (\index handle ->
            if index == address.handle then
                case address.location of
                    Left ->
                        Handle.moveLeft diff handle

                    Center ->
                        Handle.moveCenter diff handle

                    Right ->
                        Handle.moveRight diff handle
            else
                handle
        )
        shape
        |> Shape isClosed


{-| Subdivide shape into discrete points.
-}
discretePoints : Int -> Shape -> List RawPoint2d
discretePoints count (Shape isClosed handles) =
    Utils.closedLinkedMap (\h1 h2 -> Handle.discretePoints count h1 h2) handles
        |> (\list ->
                if isClosed then
                    list
                else
                    List.take ((List.length list) - 1) list
           )
        |> List.indexedMap
            (\index list ->
                if (not isClosed) && (index == (List.length handles) - 2) then
                    list
                else
                    List.take ((List.length list) - 1) list
            )
        |> List.foldr (++) []


{-| Create RenderedShape from raw shape.
-}
render : Shape -> RenderedShape
render (Shape isClosed shape) =
    { controlHandles =
        List.map
            (\handle ->
                let
                    center =
                        Handle.center handle |> Point2d
                in
                    [ Handle.left handle |> Maybe.map Point2d |> Maybe.map (\left -> ( left, center ))
                    , Handle.right handle |> Maybe.map Point2d |> Maybe.map (\right -> ( right, center ))
                    ]
                        |> List.filterMap identity
            )
            shape
            |> List.foldl (++) []
    , controlPoints =
        List.indexedMap
            (\index handle ->
                [ Handle.left handle
                    |> Maybe.map Point2d
                    |> Maybe.map
                        (\pt ->
                            ( ControlPointAddress
                                { handle = index
                                , location = Left
                                }
                            , pt
                            )
                        )
                , Handle.center handle
                    |> (\pt ->
                            ( ControlPointAddress
                                { handle = index
                                , location = Center
                                }
                            , Point2d pt
                            )
                       )
                    |> Just
                , Handle.right handle
                    |> Maybe.map Point2d
                    |> Maybe.map
                        (\pt ->
                            ( ControlPointAddress
                                { handle = index
                                , location = Right
                                }
                            , pt
                            )
                        )
                ]
                    |> List.filterMap identity
            )
            shape
            |> List.foldl (++) []
    , splines =
        Utils.closedLinkedMap
            (\h1 h2 ->
                let
                    pt1 =
                        Handle.center h1 |> Point2d

                    pt4 =
                        Handle.center h2 |> Point2d

                    pt2 =
                        Handle.right h1 |> Maybe.map Point2d |> Maybe.withDefault pt1

                    pt3 =
                        Handle.left h2 |> Maybe.map Point2d |> Maybe.withDefault pt4
                in
                    bezier pt1 pt2 pt3 pt4
            )
            shape
            |> (if isClosed then
                    identity
                else
                    (\list -> List.take ((List.length list) - 1) list)
               )
    }
