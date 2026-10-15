package in.devibrowser.android.downloads

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
