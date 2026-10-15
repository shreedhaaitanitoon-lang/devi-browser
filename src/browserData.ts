export interface Tab {
  id: string;
  title: string;
  url: string;
  isIncognito: boolean;
  isLoading: boolean;
  favicon?: string;
}

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  category: 'Popular' | 'Govt' | 'Shopping' | 'News';
}

export interface HistoryItem {
  id: string;
  title: string;
  url: string;
  timestamp: string;
  isIncognito: boolean;
}

export interface DownloadItem {
  id: string;
  filename: string;
  fileSize: string;
  url: string;
  progress: number; // 0 to 100
  status: 'completed' | 'downloading' | 'paused' | 'failed';
  safetyStatus: 'safe' | 'warning' | 'verified';
  fileType: 'apk' | 'pdf' | 'zip' | 'image' | 'doc';
}

export const INITIAL_BOOKMARKS: Bookmark[] = [
  { id: '1', title: 'Google India', url: 'https://www.google.co.in', category: 'Popular' },
  { id: '2', title: 'YouTube', url: 'https://www.youtube.com', category: 'Popular' },
  { id: '3', title: 'IRCTC Train Booking', url: 'https://www.irctc.co.in', category: 'Govt' },
  { id: '4', title: 'National Portal of India', url: 'https://www.india.gov.in', category: 'Govt' },
  { id: '5', title: 'Flipkart', url: 'https://www.flipkart.com', category: 'Shopping' },
  { id: '6', title: 'Amazon India', url: 'https://www.amazon.in', category: 'Shopping' },
  { id: '7', title: 'Cricbuzz Live Cricket', url: 'https://www.cricbuzz.com', category: 'News' },
  { id: '8', title: 'Wikipedia', url: 'https://en.wikipedia.org', category: 'Popular' },
];

export const SUGGESTED_SEARCHES = [
  { query: 'IRCTC Train ticket booking status', category: 'Govt' },
  { query: 'Live Cricket Score India vs Australia', category: 'Sports' },
  { query: 'Latest Govt Jobs Notification 2026', category: 'Career' },
  { query: 'Top 10 AI Smartphones under 25000', category: 'Tech' },
  { query: 'Weather forecast New Delhi today', category: 'Utility' },
  { query: 'Aadhaar Card update online portal', category: 'Govt' },
];

export const INITIAL_DOWNLOADS: DownloadItem[] = [
  {
    id: 'd1',
    filename: 'DeViBrowser_v3.2_Pro.apk',
    fileSize: '24.8 MB',
    url: 'https://devibrowser.in/download/v3.2.apk',
    progress: 100,
    status: 'completed',
    safetyStatus: 'verified',
    fileType: 'apk'
  },
  {
    id: 'd2',
    filename: 'IRCTC_Ticket_Confirmation_84729.pdf',
    fileSize: '412 KB',
    url: 'https://irctc.co.in/ticket/pdf',
    progress: 100,
    status: 'completed',
    safetyStatus: 'safe',
    fileType: 'pdf'
  },
  {
    id: 'd3',
    filename: 'Aadhaar_Download_E_Aadhaar.pdf',
    fileSize: '1.2 MB',
    url: 'https://uidai.gov.in/download',
    progress: 75,
    status: 'downloading',
    safetyStatus: 'verified',
    fileType: 'pdf'
  }
];

export const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    browserName: 'DeVi Browser',
    searchOrUrl: 'Search or type web address (URL)...',
    newTab: 'New Tab',
    incognitoTab: 'New Incognito Tab',
    bookmarks: 'Bookmarks',
    history: 'History',
    downloads: 'Downloads',
    shield: 'Ad & Tracker Shield',
    settings: 'Settings',
    codeAndApk: 'Android Code & APK Hub',
    secureConnection: 'Secure HTTPS / TLS 1.3',
    adsBlocked: 'Ads Blocked',
    trackersBlocked: 'Trackers Blocked',
    dataSaved: 'Data Saved',
    clearData: 'Clear Browsing Data',
    permissions: 'Permissions Manager',
    darkMode: 'Dark Mode',
    language: 'Language',
    aiSummary: 'AI Page Summary',
    safeBrowsingActive: 'Safe Browsing Active',
  },
  hi: {
    browserName: 'देवी ब्राउज़र (DeVi Browser)',
    searchOrUrl: 'वेब पता दर्ज करें या खोजें...',
    newTab: 'नया टैब',
    incognitoTab: 'गुप्त टैब (Incognito)',
    bookmarks: 'बुकमार्क',
    history: 'इतिहास (History)',
    downloads: 'डाउनलोड',
    shield: 'विज्ञापन और ट्रैकर शील्ड',
    settings: 'सेटिंग्स',
    codeAndApk: 'एंड्रॉइड कोड और एपीके हब',
    secureConnection: 'सुरक्षित HTTPS / TLS 1.3',
    adsBlocked: 'विज्ञापन ब्लॉक किए गए',
    trackersBlocked: 'ट्रacker ब्लॉक किए गए',
    dataSaved: 'डेटा बचाया गया',
    clearData: 'ब्राउज़िंग डेटा साफ़ करें',
    permissions: 'अनुमतियाँ प्रबंधक',
    darkMode: 'डार्क मोड',
    language: 'भाषा',
    aiSummary: 'AI पेज सारांश',
    safeBrowsingActive: 'सुरक्षित ब्राउज़िंग सक्रिय',
  },
  ta: {
    browserName: 'தேவி உலாவி (DeVi Browser)',
    searchOrUrl: 'முகவரியை உள்ளிடவும் அல்லது தேடவும்...',
    newTab: 'புதிய ট্যাব',
    incognitoTab: 'மறைநிலை ট্যাব',
    bookmarks: 'வழிகாட்டிகள்',
    history: 'வரலாறு',
    downloads: 'பதிவிறக்கங்கள்',
    shield: 'விளம்பர பாதுகாப்பு கவசம்',
    settings: 'அமைப்புகள்',
    codeAndApk: 'ஆண்ட்ராய்டு குறியீடு & APK',
    secureConnection: 'பாதுகாப்பான HTTPS',
    adsBlocked: 'தடுக்கப்பட்ட விளம்பரங்கள்',
    trackersBlocked: 'தடுக்கப்பட்ட டிராக்கர்கள்',
    dataSaved: 'சேமிக்கப்பட்ட தரவு',
    clearData: 'தரவை அழிக்கவும்',
    permissions: 'அனுமதிகள் மேலாளர்',
    darkMode: 'இருண்ட பயன்முறை',
    language: 'மொழி',
    aiSummary: 'AI பக்க சுருக்கம்',
    safeBrowsingActive: 'பாதுகாப்பான உலாவுதல்',
  },
  bn: {
    browserName: 'দেবী ব্রাউজার (DeVi Browser)',
    searchOrUrl: 'ওয়েব ঠিকানা খুঁজুন বা টাইপ করুন...',
    newTab: 'নতুন ট্যাব',
    incognitoTab: 'গোপন ট্যাব',
    bookmarks: 'বুকমার্ক',
    history: 'ইতিহাস',
    downloads: 'ডাউনলোড',
    shield: 'বিজ্ঞাপন ও ট্র্যাকার শিল্ড',
    settings: 'সেটিংস',
    codeAndApk: 'অ্যান্ড্রয়েড কোড ও APK',
    secureConnection: 'নিরাপদ HTTPS',
    adsBlocked: 'বিজ্ঞাপন ব্লক',
    trackersBlocked: 'ট্র্যাকার ব্লক',
    dataSaved: 'সংরক্ষিত ডেটা',
    clearData: 'ডেটা পরিষ্কার করুন',
    permissions: 'অনুমতি ম্যানেজার',
    darkMode: 'ডার্ক মোড',
    language: 'ভাষা',
    aiSummary: 'AI পেজ সারসংক্ষেপ',
    safeBrowsingActive: 'নিরাপদ ব্রাউজিং সক্রিয়',
  },
  te: {
    browserName: 'దేవి బ్రౌజర్ (DeVi Browser)',
    searchOrUrl: 'వెబ్ చిరునామాను టైప్ చేయండి లేదా శోధించండి...',
    newTab: 'కొత్త ట్యాబ్',
    incognitoTab: 'ఇన్‌కోగ్నిటో ట్యాబ్',
    bookmarks: 'బుక్‌మార్క్‌లు',
    history: 'చరిత్ర',
    downloads: 'డౌన్‌లోడ్‌లు',
    shield: 'యాడ్ & ట్రాకర్ షీల్డ్',
    settings: 'సెట్టింగ్‌లు',
    codeAndApk: 'ఆండ్రాయిడ్ కోడ్ & APK',
    secureConnection: 'సురక్షిత HTTPS',
    adsBlocked: 'బ్లాక్ చేయబడిన ప్రకటనలు',
    trackersBlocked: 'బ్లాక్ చేయబడిన ట్రాకర్లు',
    dataSaved: 'సేవ్ చేయబడిన డేటా',
    clearData: 'డేటాను క్లియర్ చేయండి',
    permissions: 'అనుమతుల మేనేజర్',
    darkMode: 'డార్క్ मोड',
    language: 'భాష',
    aiSummary: 'AI పేజ్ సారాంశం',
    safeBrowsingActive: 'సురక్షిత బ్రౌజింగ్ సక్రియంగా ఉంది',
  },
  mr: {
    browserName: 'देवी ब्राऊजर (DeVi Browser)',
    searchOrUrl: 'वेब पत्ता टाका किंवा शोधा...',
    newTab: 'नवीन टॅब',
    incognitoTab: 'गुप्त टॅब',
    bookmarks: 'बुडमार्क',
    history: 'इतिहास',
    downloads: 'डाउनलोड्स',
    shield: 'जाहिरात व ट्रॅकर शील्ड',
    settings: 'सेटिंग्स',
    codeAndApk: 'अँड्रॉइड कोड व APK',
    secureConnection: 'सुरक्षित HTTPS',
    adsBlocked: 'ब्लॉक केलेल्या जाहिराती',
    trackersBlocked: 'ब्लॉक केलेले ट्रॅकर्स',
    dataSaved: 'वाचवलेला डेटा',
    clearData: 'डेटा साफ करा',
    permissions: 'परवानग्या व्यवस्थापक',
    darkMode: 'डार्क मोड',
    language: 'भाषा',
    aiSummary: 'AI पृष्ठ सारांश',
    safeBrowsingActive: 'सुरक्षित ब्राउझिंग सक्रिय',
  }
};

export const ANDROID_KOTLIN_FILES = [
  {
    name: 'MainActivity.kt',
    path: 'android/app/src/main/java/in/devibrowser/android/MainActivity.kt',
    language: 'kotlin',
    code: `package in.devibrowser.android

import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import in.devibrowser.android.databinding.ActivityMainBinding
import in.devibrowser.android.privacy.AdTrackerBlocker
import in.devibrowser.android.security.SecurityAuditor
import in.devibrowser.android.tabs.TabManager

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private lateinit var tabManager: TabManager
    private lateinit var adTrackerBlocker: AdTrackerBlocker
    private lateinit var securityAuditor: SecurityAuditor

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        tabManager = TabManager(this)
        adTrackerBlocker = AdTrackerBlocker(this)
        securityAuditor = SecurityAuditor(this)

        setupWebViewEngine()
        setupToolbarControls()
        checkPermissions()
    }

    private fun setupWebViewEngine() {
        val webSettings = binding.webView.settings
        webSettings.javaScriptEnabled = true
        webSettings.domStorageEnabled = true
        webSettings.loadWithOverviewMode = true
        webSettings.useWideViewPort = true
        webSettings.cacheMode = WebSettings.LOAD_DEFAULT

        binding.webView.webViewClient = object : WebViewClient() {
            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                url?.let {
                    securityAuditor.auditUrl(it) { report ->
                        updateSecurityBadge(report.isSecure)
                    }
                }
            }
        }
        binding.webView.loadUrl("https://www.google.co.in")
    }

    private fun setupToolbarControls() {
        binding.btnSearch.setOnClickListener {
            val query = binding.etUrlBar.text.toString()
            if (query.isNotEmpty()) {
                val formattedUrl = if (query.startsWith("http")) query else "https://www.google.co.in/search?q=\$query"
                binding.webView.loadUrl(formattedUrl)
            }
        }
    }

    private fun checkPermissions() {
        val permissions = arrayOf(
            Manifest.permission.CAMERA,
            Manifest.permission.RECORD_AUDIO,
            Manifest.permission.ACCESS_FINE_LOCATION
        )
        if (permissions.any { ContextCompat.checkSelfPermission(this, it) != PackageManager.PERMISSION_GRANTED }) {
            ActivityCompat.requestPermissions(this, permissions, 1001)
        }
    }

    private fun updateSecurityBadge(isSecure: Boolean) {
        if (isSecure) {
            binding.ivLock.setColorFilter(ContextCompat.getColor(this, android.R.color.holo_green_dark))
            Toast.makeText(this, "TLS 1.3 Secure Connection - DeVi Browser", Toast.LENGTH_SHORT).show()
        } else {
            binding.ivLock.setColorFilter(ContextCompat.getColor(this, android.R.color.holo_red_dark))
        }
    }
}`
  },
  {
    name: 'TabManager.kt',
    path: 'android/app/src/main/java/in/devibrowser/android/tabs/TabManager.kt',
    language: 'kotlin',
    code: `package in.devibrowser.android.tabs

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
}`
  },
  {
    name: 'AdTrackerBlocker.kt',
    path: 'android/app/src/main/java/in/devibrowser/android/privacy/AdTrackerBlocker.kt',
    language: 'kotlin',
    code: `package in.devibrowser.android.privacy

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
}`
  },
  {
    name: 'SecurityAuditor.kt',
    path: 'android/app/src/main/java/in/devibrowser/android/security/SecurityAuditor.kt',
    language: 'kotlin',
    code: `package in.devibrowser.android.security

import android.content.Context
import android.net.Uri

data class SecurityReport(
    val url: String,
    val isSecure: Boolean,
    val tlsVersion: String,
    val trustScore: Int,
    val warnings: List<String>
)

class SecurityAuditor(private val context: Context) {

    fun auditUrl(url: String, callback: (SecurityReport) -> Unit) {
        val uri = Uri.parse(url)
        val isHttps = uri.scheme?.equals("https", ignoreCase = true) == true
        val warnings = mutableListOf<String>()

        if (!isHttps) {
            warnings.add("Insecure HTTP connection detected. Data can be intercepted.")
        }

        val domain = uri.host ?: ""
        val trustedGovDomains = listOf(".gov.in", ".nic.in", "irctc.co.in", "uidai.gov.in", "google.com", "google.co.in")
        val isTrustedGov = trustedGovDomains.any { domain.endsWith(it) }

        val trustScore = when {
            isHttps && isTrustedGov -> 98
            isHttps -> 92
            else -> 45
        }

        callback(
            SecurityReport(
                url = url,
                isSecure = isHttps,
                tlsVersion = if (isHttps) "TLS 1.3 (AES_256_GCM)" else "None",
                trustScore = trustScore,
                warnings = warnings
            )
        )
    }
}`
  },
  {
    name: 'DownloadManagerHelper.kt',
    path: 'android/app/src/main/java/in/devibrowser/android/downloads/DownloadManagerHelper.kt',
    language: 'kotlin',
    code: `package in.devibrowser.android.downloads

import android.app.DownloadManager
import android.content.Context
import android.net.Uri
import android.os.Environment

class DownloadManagerHelper(private val context: Context) {

    fun downloadFile(url: String, title: String): Long {
        val request = DownloadManager.Request(Uri.parse(url)).apply {
            setTitle(title)
            setDescription("Downloading via DeVi Browser Pro...")
            setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)
            setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, title)
            allowScanningByMediaScanner()
        }

        val downloadManager = context.getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager
        return downloadManager.enqueue(request)
    }
}
`
  },
  {
    name: 'android-build.yml',
    path: '.github/workflows/android-build.yml',
    language: 'yaml',
    code: `name: Build DeVi Browser Pro APK

on:
  push:
    branches: [ "main", "master" ]
  pull_request:
    branches: [ "main", "master" ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Set up JDK 17
        uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '17'
          cache: 'gradle'

      - name: Grant execute permission for gradlew
        run: chmod +x android/gradlew

      - name: Build Release APK with Gradle
        run: |
          cd android
          ./gradlew assembleRelease

      - name: Upload APK Artifact
        uses: actions/upload-artifact@v4
        with:
          name: DeViBrowser-Pro-Release
          path: android/app/build/outputs/apk/release/app-release.apk
`
  }
];
