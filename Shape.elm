module Shape exposing (..)

import Handle exposing (Handle, handle)
import OpenSolid.Geometry.Types exposing (..)


type alias Point =
    ( Float, Float )


type alias Shape =
    List Handle


type alias RenderedShape =
    { controlHandles : List ( Point2d, Point2d )
    , controlPoints : List Point2d
    , splines : List QuadraticSpline2d
    }


shape : List ( Maybe Point, Point, Maybe Point ) -> Shape
shape handleData =
    List.map (\( left, center, right ) -> handle left center right) handleData


render : Shape -> RenderedShape
render shape =
    -- TODO: finish
    { controlHandles = []
    , controlPoints = []
    , splines = []
    }
