import React, { useState, useEffect } from 'react';
import { 
  Globe, Shield, Download, Bookmark as BookmarkIcon, History, Settings, 
  Plus, X, Lock, Unlock, Search, ArrowLeft, ArrowRight, RotateCw, 
  Smartphone, Code, FileText, CheckCircle2, AlertTriangle, Trash2, 
  Moon, Sun, Sparkles, EyeOff, Eye, Menu, Layers, ExternalLink, 
  Check, Cpu, Database, Play, Copy, ShieldCheck, Wifi, CpuIcon, Zap, MoreVertical, Share2
} from 'lucide-react';
import { 
  Tab, Bookmark, HistoryItem, DownloadItem, 
  INITIAL_BOOKMARKS, SUGGESTED_SEARCHES, INITIAL_DOWNLOADS, 
  TRANSLATIONS, ANDROID_KOTLIN_FILES 
} from './browserData';

export default function App() {
  // Browser State
  const [lang, setLang] = useState<string>('en');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [tabs, setTabs] = useState<Tab[]>([
    { id: '1', title: 'Google India', url: 'https://www.google.co.in', isIncognito: false, isLoading: false },
    { id: '2', title: 'IRCTC Train Booking', url: 'https://www.irctc.co.in', isIncognito: false, isLoading: false }
  ]);
  const [activeTabId, setActiveTabId] = useState<string>('1');
  const [urlInput, setUrlInput] = useState<string>('https://www.google.co.in');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isIncognitoGlobal, setIsIncognitoGlobal] = useState<boolean>(false);
  
  // Shield & Privacy State
  const [shieldActive, setShieldActive] = useState<boolean>(true);
  const [blockedAdsCount, setBlockedAdsCount] = useState<number>(1420);
  const [blockedTrackersCount, setBlockedTrackersCount] = useState<number>(3890);
  const [dataSavedMB, setDataSavedMB] = useState<number>(248.5);

  // Storage State
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(INITIAL_BOOKMARKS);
  const [history, setHistory] = useState<HistoryItem[]>([
    { id: 'h1', title: 'Google India', url: 'https://www.google.co.in', timestamp: 'Just now', isIncognito: false },
    { id: 'h2', title: 'IRCTC Train Booking', url: 'https://www.irctc.co.in', timestamp: '10 mins ago', isIncognito: false },
    { id: 'h3', title: 'Cricbuzz Live Score', url: 'https://www.cricbuzz.com', timestamp: '1 hour ago', isIncognito: false }
  ]);
  const [downloads, setDownloads] = useState<DownloadItem[]>(INITIAL_DOWNLOADS);

  // Modals
  const [activeModal, setActiveModal] = useState<'none' | 'tabs' | 'shield' | 'downloads' | 'bookmarks' | 'history' | 'settings' | 'codeHub' | 'aiSummary'>('none');
  const [showChromeMenu, setShowChromeMenu] = useState<boolean>(false);
  const [selectedFileIndex, setSelectedFileIndex] = useState<number>(0);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [aiSummaryText, setAiSummaryText] = useState<string>('');
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);

  // Permissions state
  const [permissions, setPermissions] = useState({
    camera: 'ask' as 'allow' | 'block' | 'ask',
    microphone: 'ask' as 'allow' | 'block' | 'ask',
    location: 'allow' as 'allow' | 'block' | 'ask',
  });

  const t = TRANSLATIONS[lang] || TRANSLATIONS['en'];
  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  useEffect(() => {
    if (activeTab) {
      setUrlInput(activeTab.url);
    }
  }, [activeTabId, tabs]);

  const handleNavigate = (targetUrl: string) => {
    let finalUrl = targetUrl.trim();
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      if (finalUrl.includes('.') && !finalUrl.includes(' ')) {
        finalUrl = 'https://' + finalUrl;
      } else {
        finalUrl = `https://www.google.co.in/search?q=${encodeURIComponent(finalUrl)}`;
      }
    }

    // Update active tab
    setTabs(tabs.map(t => t.id === activeTabId ? { ...t, url: finalUrl, title: getDomainName(finalUrl), isLoading: true } : t));
    setUrlInput(finalUrl);

    // Add to history if not incognito
    if (!activeTab?.isIncognito) {
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        title: getDomainName(finalUrl),
        url: finalUrl,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isIncognito: false
      };
      setHistory(prev => [newHistoryItem, ...prev]);
    }

    // Simulate load finish
    setTimeout(() => {
      setTabs(prev => prev.map(t => t.id === activeTabId ? { ...t, isLoading: false } : t));
    }, 600);
  };

  const handleBack = () => {
    handleNavigate('https://www.google.co.in');
  };

  const handleForward = () => {
    handleNavigate('https://www.youtube.com');
  };

  const handleRefresh = () => {
    if (activeTab) {
      handleNavigate(activeTab.url);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 't') {
        e.preventDefault();
        createNewTab(false);
      } else if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        createNewTab(true);
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'h') {
        e.preventDefault();
        setActiveModal('history');
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        setActiveModal('downloads');
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setActiveModal('bookmarks');
      } else if (e.key === 'Escape') {
        setActiveModal('none');
        setShowChromeMenu(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [tabs]);

  const getDomainName = (url: string) => {
    try {
      const parsed = new URL(url);
      return parsed.hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  const createNewTab = (isIncog = false) => {
    const newTab: Tab = {
      id: Date.now().toString(),
      title: isIncog ? 'Incognito Tab' : 'New Tab',
      url: 'https://www.google.co.in',
      isIncognito: isIncog,
      isLoading: false
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
    setActiveModal('none');
  };

  const closeTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length === 1) return; // Keep at least one
    const newTabs = tabs.filter(t => t.id !== id);
    setTabs(newTabs);
    if (activeTabId === id) {
      setActiveTabId(newTabs[newTabs.length - 1].id);
    }
  };

  const triggerAiSummary = () => {
    setActiveModal('aiSummary');
    setIsGeneratingAi(true);
    setTimeout(() => {
      setAiSummaryText(`Summary for ${activeTab.url}:\n• Verified TLS 1.3 secure connection with 98% trust score.\n• 4 trackers blocked on this page by India Super Browser Shield.\n• Page category: Official portal / high utility service.\n• Main content optimized for fast mobile reading and low data consumption.`);
      setIsGeneratingAi(false);
    }, 1200);
  };

  const clearAllData = () => {
    setHistory([]);
    setDownloads([]);
    setBlockedAdsCount(0);
    setBlockedTrackersCount(0);
    alert('All browsing cache, cookies, history and download records cleared successfully!');
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans select-none ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* TOP BROWSER TITLEBAR / HEADER */}
      <header className={`px-4 py-2 border-b flex items-center justify-between shadow-sm transition-colors ${
        activeTab?.isIncognito 
          ? 'bg-purple-950 border-purple-800 text-purple-100' 
          : darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-orange-500 via-amber-500 to-indigo-600 flex items-center justify-center shadow-md">
              <Globe className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="font-bold text-sm tracking-wide bg-gradient-to-r from-orange-400 via-amber-300 to-indigo-400 bg-clip-text text-transparent">
                {t.browserName}
              </h1>
              <div className="flex items-center space-x-1.5 text-[10px] text-emerald-400 font-medium">
                <ShieldCheck className="w-3 h-3" />
                <span>{t.safeBrowsingActive}</span>
              </div>
            </div>
          </div>
        </div>

        {/* TOP TABS MINI BAR */}
        <div className="hidden md:flex items-center space-x-1 overflow-x-auto max-w-xl py-1 px-2">
          {tabs.map((tab) => (
            <div 
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs cursor-pointer transition-all border ${
                tab.id === activeTabId 
                  ? tab.isIncognito ? 'bg-purple-900 border-purple-600 text-white shadow' : darkMode ? 'bg-slate-800 border-slate-700 text-white shadow' : 'bg-white border-slate-300 text-slate-900 shadow-sm'
                  : tab.isIncognito ? 'bg-purple-950/60 border-transparent text-purple-300 hover:bg-purple-900/40' : darkMode ? 'bg-slate-900/60 border-transparent text-slate-400 hover:bg-slate-800/60' : 'bg-slate-100 border-transparent text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.isIncognito ? <EyeOff className="w-3.5 h-3.5 text-purple-400" /> : <Globe className="w-3.5 h-3.5 text-orange-400" />}
              <span className="truncate max-w-[120px]">{tab.title}</span>
              {tabs.length > 1 && (
                <button 
                  onClick={(e) => closeTab(tab.id, e)}
                  className="p-0.5 rounded-full hover:bg-slate-700/50 text-slate-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
          <button 
            onClick={() => createNewTab(false)}
            className="p-1.5 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/30 transition"
            title={t.newTab}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* QUICK CONTROLS & LANGUAGE & MENU */}
        <div className="flex items-center space-x-2">
          {/* Language Selector */}
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value)}
            className={`text-xs px-2 py-1 rounded-lg border outline-none ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-100 border-slate-300 text-slate-800'}`}
          >
            <option value="en">English</option>
            <option value="hi">हिंदी (Hindi)</option>
            <option value="ta">தமிழ் (Tamil)</option>
            <option value="bn">বাংলা (Bengali)</option>
            <option value="te">తెలుగు (Telugu)</option>
            <option value="mr">मराठी (Marathi)</option>
          </select>

          {/* Android Code & APK Hub Button */}
          <button 
            onClick={() => setActiveModal('codeHub')}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-semibold shadow transition"
          >
            <Code className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Android Code & APK</span>
          </button>

          {/* GOOGLE CHROME STYLE 3-DOT MENU */}
          <div className="relative">
            <button 
              onClick={() => setShowChromeMenu(!showChromeMenu)}
              className={`p-2 rounded-xl border transition ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'}`}
              title="Customize and control DeVi Browser"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showChromeMenu && (
              <div className={`absolute right-0 mt-2 w-80 rounded-2xl shadow-2xl border py-2 z-50 text-xs ${
                darkMode ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
              }`}>
                {/* Header */}
                <div className="px-4 py-2 border-b border-slate-700/40 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-orange-400" />
                    <span className="font-bold text-sm tracking-wide">DeVi Browser</span>
                  </div>
                  <span className="text-[10px] bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded-full border border-orange-500/20 font-semibold">Chrome UI v128</span>
                </div>

                {/* Section 1: Tabs */}
                <div className="py-1">
                  <button 
                    onClick={() => { createNewTab(false); setShowChromeMenu(false); }}
                    className="w-full px-4 py-2 text-left flex items-center justify-between hover:bg-orange-500/10 transition"
                  >
                    <div className="flex items-center space-x-3">
                      <Plus className="w-4 h-4 text-orange-400" />
                      <span className="font-medium">New tab</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">Ctrl+T</span>
                  </button>

                  <button 
                    onClick={() => { createNewTab(true); setShowChromeMenu(false); }}
                    className="w-full px-4 py-2 text-left flex items-center justify-between hover:bg-purple-500/10 transition"
                  >
                    <div className="flex items-center space-x-3">
                      <EyeOff className="w-4 h-4 text-purple-400" />
                      <span className="font-medium">New incognito tab</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">Ctrl+Shift+N</span>
                  </button>
                </div>

                <div className="border-t border-slate-700/40 my-1"></div>

                {/* Section 2: Library & Records */}
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Library & Records</div>
                <div className="py-1">
                  <button 
                    onClick={() => { setActiveModal('history'); setShowChromeMenu(false); }}
                    className="w-full px-4 py-2 text-left flex items-center justify-between hover:bg-slate-700/30 transition"
                  >
                    <div className="flex items-center space-x-3">
                      <History className="w-4 h-4 text-cyan-400" />
                      <span className="font-medium">{t.history}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">Ctrl+H</span>
                  </button>

                  <button 
                    onClick={() => { setActiveModal('downloads'); setShowChromeMenu(false); }}
                    className="w-full px-4 py-2 text-left flex items-center justify-between hover:bg-slate-700/30 transition"
                  >
                    <div className="flex items-center space-x-3">
                      <Download className="w-4 h-4 text-amber-400" />
                      <span className="font-medium">{t.downloads}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">Ctrl+J</span>
                  </button>

                  <button 
                    onClick={() => { setActiveModal('bookmarks'); setShowChromeMenu(false); }}
                    className="w-full px-4 py-2 text-left flex items-center justify-between hover:bg-slate-700/30 transition"
                  >
                    <div className="flex items-center space-x-3">
                      <BookmarkIcon className="w-4 h-4 text-indigo-400" />
                      <span className="font-medium">{t.bookmarks}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">Ctrl+B</span>
                  </button>

                  <button 
                    onClick={() => { setActiveModal('tabs'); setShowChromeMenu(false); }}
                    className="w-full px-4 py-2 text-left flex items-center justify-between hover:bg-slate-700/30 transition"
                  >
                    <div className="flex items-center space-x-3">
                      <Layers className="w-4 h-4 text-orange-400" />
                      <span className="font-medium">Recent tabs</span>
                    </div>
                    <span className="text-[10px] bg-orange-500/10 text-orange-400 px-1.5 py-0.5 rounded font-bold">{tabs.length}</span>
                  </button>
                </div>

                <div className="border-t border-slate-700/40 my-1"></div>

                {/* Section 3: Tools & Security */}
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Privacy & Tools</div>
                <div className="py-1">
                  <button 
                    onClick={() => { setActiveModal('shield'); setShowChromeMenu(false); }}
                    className="w-full px-4 py-2 text-left flex items-center justify-between hover:bg-emerald-500/10 transition"
                  >
                    <div className="flex items-center space-x-3">
                      <Shield className="w-4 h-4 text-emerald-400" />
                      <span className="font-medium">{t.shield}</span>
                    </div>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded font-semibold">Active</span>
                  </button>

                  <button 
                    onClick={() => { 
                      navigator.clipboard.writeText(activeTab.url);
                      alert('Page URL copied to clipboard: ' + activeTab.url);
                      setShowChromeMenu(false); 
                    }}
                    className="w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-slate-700/30 transition"
                  >
                    <Share2 className="w-4 h-4 text-blue-400" />
                    <span className="font-medium">Share page...</span>
                  </button>

                  <button 
                    onClick={() => { 
                      const query = prompt('Find in page:');
                      if (query) alert(`Found 3 matches for "${query}" on this page.`);
                      setShowChromeMenu(false); 
                    }}
                    className="w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-slate-700/30 transition"
                  >
                    <Search className="w-4 h-4 text-orange-400" />
                    <span className="font-medium">Find in page...</span>
                  </button>

                  <button 
                    onClick={() => { 
                      alert('Page translated to English / Hindi successfully.');
                      setShowChromeMenu(false); 
                    }}
                    className="w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-slate-700/30 transition"
                  >
                    <Globe className="w-4 h-4 text-indigo-400" />
                    <span className="font-medium">Translate page...</span>
                  </button>
                </div>

                <div className="border-t border-slate-700/40 my-1"></div>

                {/* Section 4: Settings & Android Studio */}
                <div className="py-1">
                  <button 
                    onClick={() => { setActiveModal('settings'); setShowChromeMenu(false); }}
                    className="w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-slate-700/30 transition"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    <span className="font-medium">{t.settings}</span>
                  </button>

                  <button 
                    onClick={() => { setActiveModal('codeHub'); setShowChromeMenu(false); }}
                    className="w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-orange-500/10 transition text-orange-400 font-semibold"
                  >
                    <Code className="w-4 h-4" />
                    <span>Android Code & APK Hub</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* OMNIBOX TOOLBAR */}
      <div className={`px-4 py-2 border-b flex items-center space-x-2 transition-colors ${
        activeTab?.isIncognito 
          ? 'bg-purple-900/90 border-purple-800' 
          : darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center space-x-1">
          <button 
            onClick={handleBack}
            className={`p-2 rounded-lg transition ${darkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-600'}`}
            title="Back (Google India)"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={handleForward}
            className={`p-2 rounded-lg transition ${darkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-600'}`}
            title="Forward (YouTube)"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
          <button 
            onClick={handleRefresh}
            className={`p-2 rounded-lg transition ${darkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-600'}`}
            title="Refresh"
          >
            <RotateCw className={`w-4 h-4 ${activeTab?.isLoading ? 'animate-spin text-orange-400' : ''}`} />
          </button>
        </div>

        {/* URL / SEARCH INPUT BAR */}
        <div className={`flex-1 flex items-center px-3 py-1.5 rounded-xl border transition-all ${
          activeTab?.isIncognito
            ? 'bg-purple-950 border-purple-700 text-purple-100'
            : darkMode ? 'bg-slate-950 border-slate-700 focus-within:border-orange-500' : 'bg-slate-100 border-slate-300 focus-within:border-orange-500'
        }`}>
          <div className="flex items-center space-x-2 mr-2 text-emerald-400" title="Secure TLS 1.3 Connection">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20 hidden sm:inline">HTTPS</span>
          </div>

          <input 
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleNavigate(urlInput)}
            placeholder={t.searchOrUrl}
            className="w-full bg-transparent outline-none text-xs sm:text-sm font-medium"
          />

          <div className="flex items-center space-x-1.5 ml-2">
            <button 
              onClick={triggerAiSummary}
              className="p-1 rounded-lg bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 transition flex items-center space-x-1 px-2"
              title={t.aiSummary}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold hidden lg:inline">AI Summary</span>
            </button>
          </div>
        </div>

        {/* TOOLBAR ACTION BUTTONS */}
        <div className="flex items-center space-x-1.5">
          {/* Ad Shield Button */}
          <button 
            onClick={() => setActiveModal('shield')}
            className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition ${
              shieldActive 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20' 
                : 'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20'
            }`}
            title={t.shield}
          >
            <Shield className="w-4 h-4" />
            <span className="hidden md:inline">{blockedAdsCount + blockedTrackersCount}</span>
          </button>

          {/* Tabs Count Button */}
          <button 
            onClick={() => setActiveModal('tabs')}
            className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'}`}
            title="Tabs Manager"
          >
            <Layers className="w-4 h-4 text-orange-400" />
            <span>{tabs.length}</span>
          </button>

          {/* Downloads Button */}
          <button 
            onClick={() => setActiveModal('downloads')}
            className={`p-2 rounded-xl border transition ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'}`}
            title={t.downloads}
          >
            <Download className="w-4 h-4 text-amber-400" />
          </button>

          {/* Bookmarks Button */}
          <button 
            onClick={() => setActiveModal('bookmarks')}
            className={`p-2 rounded-xl border transition ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'}`}
            title={t.bookmarks}
          >
            <BookmarkIcon className="w-4 h-4 text-indigo-400" />
          </button>

          {/* History Button */}
          <button 
            onClick={() => setActiveModal('history')}
            className={`p-2 rounded-xl border transition ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'}`}
            title={t.history}
          >
            <History className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      </div>

      {/* BROWSER VIEWPORT AREA */}
      <main className="flex-1 flex flex-col relative overflow-y-auto">
        
        {/* INCOGNITO BANNER IF ACTIVE */}
        {activeTab?.isIncognito && (
          <div className="bg-purple-900/60 border-b border-purple-700/50 px-4 py-2 flex items-center justify-between text-purple-200 text-xs">
            <div className="flex items-center space-x-2">
              <EyeOff className="w-4 h-4 text-purple-400 animate-bounce" />
              <span>You are in Incognito Mode. Your browsing history, cookies, and site data will not be saved.</span>
            </div>
            <button 
              onClick={() => createNewTab(false)}
              className="text-xs bg-purple-800 hover:bg-purple-700 text-purple-100 px-3 py-1 rounded-lg font-semibold transition"
            >
              Switch to Normal Tab
            </button>
          </div>
        )}

        {/* DYNAMIC VIEWPORT: WEB PORTAL VIEWER OR HOME DASHBOARD */}
        {activeTab?.url && activeTab.url !== 'https://www.google.co.in' ? (
          <div className="flex-1 p-6 md:p-10 max-w-5xl mx-auto w-full flex flex-col space-y-6">
            {/* Page Header Bar */}
            <div className={`p-4 rounded-2xl border flex items-center justify-between ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 font-bold">
                  {getDomainName(activeTab.url).charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-base">{activeTab.title}</h3>
                  <span className="text-xs text-emerald-400 flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Secure TLS 1.3 • {activeTab.url}</span>
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleNavigate('https://www.google.co.in')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition"
                >
                  Home / New Tab
                </button>
                <button 
                  onClick={triggerAiSummary}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-semibold transition flex items-center space-x-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Summary</span>
                </button>
              </div>
            </div>

            {/* Interactive Portal Simulator Content */}
            <div className={`p-6 md:p-8 rounded-3xl border space-y-6 shadow-xl ${
              darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              {activeTab.url.includes('irctc') ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b pb-4 border-slate-700/50">
                    <h4 className="font-extrabold text-xl text-orange-400">IRCTC Next Generation eTicketing System</h4>
                    <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20 font-semibold">Official Govt Portal</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 space-y-2">
                      <label className="text-xs text-slate-400 font-semibold">From Station</label>
                      <input type="text" defaultValue="NDLS - New Delhi" className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs font-medium" />
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 space-y-2">
                      <label className="text-xs text-slate-400 font-semibold">To Station</label>
                      <input type="text" defaultValue="MMCT - Mumbai Central" className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs font-medium" />
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 space-y-2">
                      <label className="text-xs text-slate-400 font-semibold">Journey Date</label>
                      <input type="date" defaultValue="2026-10-15" className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs font-medium" />
                    </div>
                  </div>
                  <button 
                    onClick={() => alert('Searching trains via IRCTC secure API... 12 trains available for booking.')}
                    className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-xl text-sm shadow-lg transition"
                  >
                    Search Trains & Check PNR Availability
                  </button>
                </div>
              ) : activeTab.url.includes('youtube') ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b pb-4 border-slate-700/50">
                    <h4 className="font-extrabold text-xl text-rose-500">YouTube India - Video Streaming</h4>
                    <span className="text-xs bg-rose-500/10 text-rose-400 px-3 py-1 rounded-full border border-rose-500/20 font-semibold">HD Playback Active</span>
                  </div>
                  <div className="aspect-video w-full rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center space-y-3 relative overflow-hidden group">
                    <div className="w-16 h-16 rounded-full bg-rose-600 flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition cursor-pointer" onClick={() => alert('Playing live stream video...')}>
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </div>
                    <span className="text-sm font-semibold text-slate-300">DeVi Browser Pro - Live Demo Stream (1080p 60fps)</span>
                  </div>
                </div>
              ) : activeTab.url.includes('flipkart') || activeTab.url.includes('amazon') ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b pb-4 border-slate-700/50">
                    <h4 className="font-extrabold text-xl text-blue-400">Top Indian E-Commerce Mega Sale</h4>
                    <span className="text-xs bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20 font-semibold">Festive Discount 80% OFF</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 space-y-3">
                      <div className="h-32 bg-slate-950 rounded-xl flex items-center justify-center text-slate-500">Smartphone Pro</div>
                      <h5 className="font-bold text-sm">AI 5G Smartphone (256GB)</h5>
                      <p className="text-orange-400 font-black text-lg">₹21,999</p>
                      <button onClick={() => alert('Added to cart successfully!')} className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition">Add to Cart</button>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 space-y-3">
                      <div className="h-32 bg-slate-950 rounded-xl flex items-center justify-center text-slate-500">Wireless Earbuds</div>
                      <h5 className="font-bold text-sm">ANC Wireless Earbuds</h5>
                      <p className="text-orange-400 font-black text-lg">₹1,499</p>
                      <button onClick={() => alert('Added to cart successfully!')} className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition">Add to Cart</button>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 space-y-3">
                      <div className="h-32 bg-slate-950 rounded-xl flex items-center justify-center text-slate-500">Smartwatch</div>
                      <h5 className="font-bold text-sm">AMOLED Fitness Smartwatch</h5>
                      <p className="text-orange-400 font-black text-lg">₹2,999</p>
                      <button onClick={() => alert('Added to cart successfully!')} className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition">Add to Cart</button>
                    </div>
                  </div>
                </div>
              ) : activeTab.url.includes('cricbuzz') ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b pb-4 border-slate-700/50">
                    <h4 className="font-extrabold text-xl text-emerald-400">Live Cricket Score - India vs Australia</h4>
                    <span className="text-xs bg-rose-500/10 text-rose-400 px-3 py-1 rounded-full border border-rose-500/20 font-semibold animate-pulse">● LIVE Match</span>
                  </div>
                  <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
                    <div className="flex justify-between items-center text-base font-bold">
                      <span>India: 284/4 (42.3 Overs)</span>
                      <span className="text-orange-400">CRR: 6.68</span>
                    </div>
                    <p className="text-xs text-slate-400">Virat Kohli 112* (94) • Rohit Sharma 78 (62)</p>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-3/4"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <h4 className="font-extrabold text-xl text-orange-400">Browsing: {activeTab.title}</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    You are successfully visiting <code className="text-orange-400 font-mono">{activeTab.url}</code> through DeVi Browser Professional. All scripts, trackers and ads are protected by DeVi Shield.
                  </p>
                  <button 
                    onClick={() => handleNavigate('https://www.google.co.in')}
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition"
                  >
                    Return to Search Home
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full flex flex-col items-center justify-start space-y-8">
            
            {/* HERO BRANDING */}
            <div className="text-center space-y-3 mt-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>DeVi Browser: Fastest & Most Secure Professional Mobile Browser</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-orange-400 via-amber-400 to-indigo-400 bg-clip-text text-transparent">
                {t.browserName}
              </h2>
              <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto">
                Built with Chromium-grade Android Kotlin engine, Ad/Tracker Blocker Shield, TLS 1.3 SSL Auditor, and Zero-Trace Incognito Mode.
              </p>
            </div>

            {/* MAIN SEARCH BOX */}
            <div className="w-full max-w-2xl relative">
              <div className={`flex items-center px-4 py-3 rounded-2xl border shadow-xl transition-all ${
                darkMode ? 'bg-slate-900/90 border-slate-700 focus-within:border-orange-500' : 'bg-white border-slate-300 focus-within:border-orange-500'
              }`}>
                <Search className="w-5 h-5 text-orange-400 mr-3" />
                <input 
                  type="text"
                  placeholder={t.searchOrUrl}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleNavigate(searchQuery)}
                  className="w-full bg-transparent outline-none text-sm md:text-base font-medium"
                />
                <button 
                  onClick={() => handleNavigate(searchQuery || 'https://www.google.co.in')}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-5 py-2 rounded-xl text-xs md:text-sm font-bold shadow-md transition"
                >
                  Search
                </button>
              </div>
            </div>

            {/* POPULAR INDIAN SHORTCUTS & PORTALS */}
            <div className="w-full space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-orange-400" />
                  <span>Top Indian Portals & Quick Access</span>
                </h3>
                <span className="text-xs text-slate-500">Fast 0.2s Load Speed</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-3">
                {bookmarks.map((bm) => (
                  <div 
                    key={bm.id}
                    onClick={() => handleNavigate(bm.url)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center space-y-2 group hover:scale-[1.02] ${
                      darkMode 
                        ? 'bg-slate-900/70 border-slate-800 hover:border-orange-500/50 hover:bg-slate-900' 
                        : 'bg-white border-slate-200 hover:border-orange-500/50 hover:shadow-md'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 group-hover:bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-base transition">
                      {bm.title.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs md:text-sm line-clamp-1">{bm.title}</h4>
                      <span className="text-[10px] text-slate-400">{getDomainName(bm.url)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SUGGESTED TRENDING QUERIES */}
            <div className="w-full space-y-3 pb-8">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Trending in India Today</h3>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_SEARCHES.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleNavigate(`https://www.google.co.in/search?q=${encodeURIComponent(item.query)}`)}
                    className={`text-xs px-3 py-1.5 rounded-xl border transition flex items-center space-x-1.5 ${
                      darkMode 
                        ? 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-orange-500/40' 
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-orange-500/40'
                    }`}
                  >
                    <Sparkles className="w-3 h-3 text-orange-400" />
                    <span>{item.query}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}
      </main>

      {/* FOOTER STATS BAR */}
      <footer className={`px-4 py-2 border-t flex flex-wrap items-center justify-between text-xs transition-colors ${
        darkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
      }`}>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Ad Shield Active ({blockedAdsCount + blockedTrackersCount} blocked)</span>
          </div>
          <div className="hidden sm:flex items-center space-x-1 text-amber-400 font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>{dataSavedMB} MB Data Saved</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setActiveModal('shield')}
            className="hover:text-orange-400 transition"
          >
            Privacy Dashboard
          </button>
          <span>•</span>
          <button 
            onClick={() => setActiveModal('codeHub')}
            className="hover:text-orange-400 font-bold transition flex items-center space-x-1"
          >
            <Code className="w-3 h-3" />
            <span>Android Studio Project</span>
          </button>
        </div>
      </footer>

      {/* ================= MODALS ================= */}

      {/* 1. TABS MANAGER MODAL */}
      {activeModal === 'tabs' && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-2xl rounded-3xl p-6 border shadow-2xl space-y-6 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Layers className="w-6 h-6 text-orange-400" />
                <h3 className="text-lg font-bold">Tab Manager ({tabs.length} Tabs Open)</h3>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => createNewTab(false)}
                  className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-xl transition"
                >
                  + New Tab
                </button>
                <button 
                  onClick={() => createNewTab(true)}
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-xl transition"
                >
                  + Incognito Tab
                </button>
                <button onClick={() => setActiveModal('none')} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
              {tabs.map(tab => (
                <div 
                  key={tab.id}
                  onClick={() => { setActiveTabId(tab.id); setActiveModal('none'); }}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                    tab.id === activeTabId 
                      ? 'border-orange-500 bg-orange-500/10' 
                      : darkMode ? 'border-slate-800 bg-slate-950/60 hover:bg-slate-800' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center space-x-3 truncate">
                    {tab.isIncognito ? <EyeOff className="w-5 h-5 text-purple-400" /> : <Globe className="w-5 h-5 text-orange-400" />}
                    <div className="truncate">
                      <h4 className="font-bold text-sm truncate">{tab.title}</h4>
                      <span className="text-xs text-slate-400 truncate">{tab.url}</span>
                    </div>
                  </div>
                  {tabs.length > 1 && (
                    <button 
                      onClick={(e) => closeTab(tab.id, e)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. AD & TRACKER BLOCKER SHIELD MODAL */}
      {activeModal === 'shield' && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-xl rounded-3xl p-6 border shadow-2xl space-y-6 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Ad & Tracker Blocker Shield</h3>
                  <span className="text-xs text-emerald-400">Powered by DeVi Browser Security Engine</span>
                </div>
              </div>
              <button onClick={() => setActiveModal('none')} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 space-y-1">
                <span className="text-xs text-slate-400">Blocked Ads</span>
                <h4 className="text-2xl font-black text-orange-400">{blockedAdsCount}</h4>
              </div>
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 space-y-1">
                <span className="text-xs text-slate-400">Blocked Trackers</span>
                <h4 className="text-2xl font-black text-indigo-400">{blockedTrackersCount}</h4>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
                <span className="text-sm font-semibold">Enable Blocker Shield</span>
                <input 
                  type="checkbox" 
                  checked={shieldActive} 
                  onChange={(e) => setShieldActive(e.target.checked)}
                  className="w-5 h-5 accent-orange-500 cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
                <span className="text-sm font-semibold">Block Social Media Tracking Pixels</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-orange-500 cursor-pointer" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
                <span className="text-sm font-semibold">HTTPS Everywhere Enforcement</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-orange-500 cursor-pointer" />
              </div>
            </div>

            <button 
              onClick={() => { setBlockedAdsCount(0); setBlockedTrackersCount(0); alert('Shield stats reset successfully!'); }}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition"
            >
              Reset Shield Statistics
            </button>
          </div>
        </div>
      )}

      {/* 3. DOWNLOAD MANAGER MODAL */}
      {activeModal === 'downloads' && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-xl rounded-3xl p-6 border shadow-2xl space-y-6 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Download className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Download Manager</h3>
                  <span className="text-xs text-slate-400">High-speed multi-thread download engine</span>
                </div>
              </div>
              <button onClick={() => setActiveModal('none')} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto">
              {downloads.map(item => (
                <div key={item.id} className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 truncate">
                      <FileText className="w-4 h-4 text-orange-400 flex-shrink-0" />
                      <span className="font-bold text-sm truncate">{item.filename}</span>
                    </div>
                    <span className="text-xs text-slate-400">{item.fileSize}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-emerald-400 uppercase font-semibold">{item.safetyStatus}</span>
                    <span>{item.status}</span>
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-full" style={{ width: `${item.progress}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => {
                const newDL: DownloadItem = {
                  id: Date.now().toString(),
                  filename: 'IndiaSuperBrowser_User_Manual.pdf',
                  fileSize: '2.4 MB',
                  url: 'https://superbrowser.in/manual.pdf',
                  progress: 100,
                  status: 'completed',
                  safetyStatus: 'safe',
                  fileType: 'pdf'
                };
                setDownloads([newDL, ...downloads]);
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-bold transition shadow"
            >
              Simulate New Download
            </button>
          </div>
        </div>
      )}

      {/* 4. BOOKMARKS & HISTORY MODAL */}
      {activeModal === 'bookmarks' && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-xl rounded-3xl p-6 border shadow-2xl space-y-6 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <BookmarkIcon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold">Saved Bookmarks</h3>
              </div>
              <button onClick={() => setActiveModal('none')} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto">
              {bookmarks.map(bm => (
                <div 
                  key={bm.id} 
                  onClick={() => { handleNavigate(bm.url); setActiveModal('none'); }}
                  className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:border-orange-500/50 cursor-pointer flex items-center justify-between transition"
                >
                  <div className="flex items-center space-x-3 truncate">
                    <Globe className="w-4 h-4 text-orange-400 flex-shrink-0" />
                    <div className="truncate">
                      <h4 className="font-bold text-sm truncate">{bm.title}</h4>
                      <span className="text-xs text-slate-400 truncate">{bm.url}</span>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">{bm.category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. HISTORY MODAL */}
      {activeModal === 'history' && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-xl rounded-3xl p-6 border shadow-2xl space-y-6 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <History className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold">Browsing History</h3>
              </div>
              <button onClick={() => setActiveModal('none')} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto">
              {history.map(item => (
                <div 
                  key={item.id}
                  onClick={() => { handleNavigate(item.url); setActiveModal('none'); }}
                  className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:border-orange-500/50 cursor-pointer flex items-center justify-between transition"
                >
                  <div className="flex items-center space-x-3 truncate">
                    <Globe className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <div className="truncate">
                      <h4 className="font-bold text-sm truncate">{item.title}</h4>
                      <span className="text-xs text-slate-400 truncate">{item.url}</span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500">{item.timestamp}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setHistory([])}
              className="w-full py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold transition flex items-center justify-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Browsing History</span>
            </button>
          </div>
        </div>
      )}

      {/* 6. SETTINGS & PRIVACY CONTROLS MODAL */}
      {activeModal === 'settings' && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-xl rounded-3xl p-6 border shadow-2xl space-y-6 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  <Settings className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold">Browser Settings & Privacy</h3>
              </div>
              <button onClick={() => setActiveModal('none')} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
                <span className="text-sm font-semibold">Dark Theme</span>
                <input 
                  type="checkbox" 
                  checked={darkMode} 
                  onChange={(e) => setDarkMode(e.target.checked)}
                  className="w-5 h-5 accent-orange-500 cursor-pointer"
                />
              </div>

              {/* Permissions */}
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-3">
                <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider">Android Device Permissions</h4>
                <div className="flex items-center justify-between text-xs">
                  <span>Camera Access</span>
                  <select 
                    value={permissions.camera} 
                    onChange={(e) => setPermissions({...permissions, camera: e.target.value as any})}
                    className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white"
                  >
                    <option value="allow">Allow</option>
                    <option value="block">Block</option>
                    <option value="ask">Ask Every Time</option>
                  </select>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span>Microphone Access</span>
                  <select 
                    value={permissions.microphone} 
                    onChange={(e) => setPermissions({...permissions, microphone: e.target.value as any})}
                    className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white"
                  >
                    <option value="allow">Allow</option>
                    <option value="block">Block</option>
                    <option value="ask">Ask Every Time</option>
                  </select>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span>Location Access</span>
                  <select 
                    value={permissions.location} 
                    onChange={(e) => setPermissions({...permissions, location: e.target.value as any})}
                    className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white"
                  >
                    <option value="allow">Allow</option>
                    <option value="block">Block</option>
                    <option value="ask">Ask Every Time</option>
                  </select>
                </div>
              </div>

              {/* Clear Data Button */}
              <button 
                onClick={clearAllData}
                className="w-full py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold transition flex items-center justify-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>{t.clearData} (Cookies, Cache, History)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. ANDROID KOTLIN SOURCE CODE & APK HUB MODAL */}
      {activeModal === 'codeHub' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-6">
          <div className={`w-full max-w-5xl rounded-3xl p-6 border shadow-2xl space-y-6 flex flex-col max-h-[90vh] ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white shadow">
                  <Code className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">India Super Browser Professional - Android Kotlin Source & APK Hub</h3>
                  <span className="text-xs text-orange-400">Complete native Android source files, Room DAOs, Gradle configs & CI/CD workflow</span>
                </div>
              </div>
              <button onClick={() => setActiveModal('none')} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* FILE TABS */}
            <div className="flex space-x-2 overflow-x-auto pb-2 border-b border-slate-800">
              {ANDROID_KOTLIN_FILES.map((file, idx) => (
                <button
                  key={file.name}
                  onClick={() => setSelectedFileIndex(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center space-x-1.5 ${
                    selectedFileIndex === idx 
                      ? 'bg-orange-500 text-white shadow' 
                      : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{file.name}</span>
                </button>
              ))}
            </div>

            {/* FILE PATH & COPY */}
            <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
              <span className="font-mono text-orange-400">{ANDROID_KOTLIN_FILES[selectedFileIndex].path}</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(ANDROID_KOTLIN_FILES[selectedFileIndex].code);
                  setCopiedCode(true);
                  setTimeout(() => setCopiedCode(false), 2000);
                }}
                className="flex items-center space-x-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-lg transition"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            {/* CODE PREVIEW BOX */}
            <div className="flex-1 bg-slate-950 rounded-2xl p-4 border border-slate-800 overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed max-h-96">
              <pre><code>{ANDROID_KOTLIN_FILES[selectedFileIndex].code}</code></pre>
            </div>

            {/* BUILD INSTRUCTIONS */}
            <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
              <div className="space-y-1 text-left">
                <h4 className="font-bold text-xs text-orange-400 uppercase tracking-wider">How to Build Release APK</h4>
                <p className="text-xs text-slate-300">Run <code className="bg-slate-900 px-1.5 py-0.5 rounded text-orange-300 font-mono">./gradlew assembleRelease</code> inside the <code className="bg-slate-900 px-1.5 py-0.5 rounded text-orange-300 font-mono">android/</code> directory.</p>
              </div>
              <button 
                onClick={() => alert('GitHub Actions workflow (.github/workflows/android-build.yml) is fully configured for automated cloud APK builds!')}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl text-xs font-bold shadow hover:from-orange-600 hover:to-amber-600 transition"
              >
                View CI/CD Workflow
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. AI SUMMARY MODAL */}
      {activeModal === 'aiSummary' && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-lg rounded-3xl p-6 border shadow-2xl space-y-6 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  <Sparkles className="w-6 h-6 animate-spin" />
                </div>
                <h3 className="text-lg font-bold">AI Webpage Summary</h3>
              </div>
              <button onClick={() => setActiveModal('none')} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            {isGeneratingAi ? (
              <div className="py-12 flex flex-col items-center justify-center space-y-3">
                <div className="w-8 h-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin"></div>
                <p className="text-xs text-slate-400">Gemini AI is analyzing webpage content and security heuristics...</p>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 text-sm whitespace-pre-line leading-relaxed">
                {aiSummaryText}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
