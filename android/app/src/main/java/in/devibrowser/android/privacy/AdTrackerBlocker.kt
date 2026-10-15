package in.devibrowser.android.privacy

import android.content.Context
import android.net.Uri

class AdTrackerBlocker(private val context: Context) {
    private var blockedAdsCount = 1420
    private var blockedTrackersCount = 3890
    private var isShieldActive = true

    private val blockedDomains = setOf(
        "adservice.google.com",
        "googlesyndication.com",
        "doubleclick.net",
        "connect.facebook.net",
        "analytics.twitter.com",
        "adcolony.com"
    )

    fun shouldBlockRequest(url: String): Boolean {
        if (!isShieldActive) return false
        val uri = Uri.parse(url)
        val host = uri.host ?: return false
        return blockedDomains.any { host.contains(it) }
    }

    fun getStats(): Map<String, Int> {
        return mapOf(
            "ads" to blockedAdsCount,
            "trackers" to blockedTrackersCount
        )
    }

    fun toggleShield(active: Boolean) {
        isShieldActive = active
    }
}
