package in.devibrowser.android

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
                val formattedUrl = if (query.startsWith("http")) query else "https://www.google.co.in/search?q=$query"
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
}
