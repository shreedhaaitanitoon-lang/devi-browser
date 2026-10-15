package in.devibrowser.android.tabs

import android.content.Context
import java.util.UUID

data class BrowserTab(
    val id: String = UUID.randomUUID().toString(),
    var title: String,
    var url: String,
    val isIncognito: Boolean
)

class TabManager(private val context: Context) {
    private val tabs = mutableListOf<BrowserTab>()
    private var activeTabId: String? = null

    init {
        createNewTab("https://www.google.co.in", false)
    }

    fun createNewTab(url: String, isIncognito: Boolean): BrowserTab {
        val tab = BrowserTab(title = if (isIncognito) "Incognito Tab" else "New Tab", url = url, isIncognito = isIncognito)
        tabs.add(tab)
        activeTabId = tab.id
        return tab
    }

    fun closeTab(tabId: String) {
        tabs.removeAll { it.id == tabId }
        if (activeTabId == tabId && tabs.isNotEmpty()) {
            activeTabId = tabs.last().id
        }
    }

    fun getActiveTab(): BrowserTab? = tabs.find { it.id == activeTabId }
    fun getAllTabs(): List<BrowserTab> = tabs.toList()
}
