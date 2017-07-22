module Shape
    exposing
        ( ControlPointLocation(..)
        , Shape
        , ControlPointAddress
        , RenderedShape
        , shape
        , render
        )

import Handle exposing (Handle, handle)
import Types exposing (..)
import OpenSolid.Geometry.Types exposing (..)


{-| A shape is define as a mere list of control handles.
-}
type alias Shape =
    List Handle


type ControlPointLocation
    = Left
    | Center
    | Right


{-| This record is used to map a control point to its corresponding handle and location on its handle. This is used to be able to update handles when control points are dragged.
-}
type alias ControlPointAddress =
    { handle : Int
    , location : ControlPointLocation
    }


{-| A record of OpenSolid data types used for rendering a shape, as well as information used to map these objects to handles for updating.
-}
type alias RenderedShape =
    { controlHandles : List ( Point2d, Point2d )
    , controlPoints : List ( ControlPointAddress, Point2d )
    , splines : List QuadraticSpline2d
    }


{-| Construct a shape from a list of handle data.
-}
shape : List ( Maybe RawPoint2d, RawPoint2d, Maybe RawPoint2d ) -> Shape
shape handleData =
    List.map (\( left, center, right ) -> handle left center right) handleData


{-| Create RenderedShape from raw shape.
-}
render : Shape -> RenderedShape
render shape =
    -- TODO: finish
    { controlHandles = []
    , controlPoints = []
    , splines = []
    }
