package hu.hm.szititourbackend.util

import kotlin.math.*

object LocationUtils {

    const val earthRadius = 6371
    const val LATITUDE = "latitude"
    const val LONGITUDE = "longitude"
    const val GAMEID = "gameid"

    /**
     * Calculate distance between two points in latitude and longitude.
     * Uses Haversine method as its base.
     *
     * lat1, lon1 Start point lat2, lon2
     * @returns Distance in Meters
     */
    fun getDistance(lat1: Double, lon1: Double, lat2: Double, lon2: Double): Double {
        val latDistance = Math.toRadians(lat2 -lat1)
        val lonDistance = Math.toRadians(lon2 - lon1)
        val a = (sin(latDistance / 2) * sin(latDistance / 2)
                + (cos(Math.toRadians(lat1)) * cos(Math.toRadians(lat2))
                * sin(lonDistance / 2) * sin(lonDistance / 2)));
        val c = 2 * atan2(sqrt(a), sqrt(1 - a))
        var distance: Double = earthRadius * c * 1000 // convert to meters
        distance = distance.pow(2) + 0.0.pow(2);
        return sqrt(distance)
    }
}