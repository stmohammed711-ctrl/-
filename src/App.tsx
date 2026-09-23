import React, { useState } from 'react';
import {
  Smartphone,
  Code2,
  FolderTree,
  Download,
  BookOpen,
  CheckCircle2,
  Layers,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Zap,
  Coffee,
  Package,
  HardDrive
} from 'lucide-react';
import { PhoneSimulator } from './components/PhoneSimulator';
import { CodeExplorer } from './components/CodeExplorer';
import { GuideModal } from './components/GuideModal';
import { generateAndDownloadProjectZip } from './utils/zipGenerator';
import { PROJECT_FILES } from './data/androidProjectSource';

export default function App() {
  const [activeTab, setActiveTab] = useState<'simulator' | 'code' | 'structure'>('simulator');
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadProgress, setDownloadProgress] = useState<{ percent: number; status: string } | null>(null);
  const [targetCodeFile, setTargetCodeFile] = useState<string>('app/src/main/java/com/supermarket/app/ui/MainActivity.java');

  const handleDownloadZip = async () => {
    if (isDownloading) return;
    try {
      setIsDownloading(true);
      await generateAndDownloadProjectZip((percent, status) => {
        setDownloadProgress({ percent, status });
      });
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setTimeout(() => {
        setIsDownloading(false);
        setDownloadProgress(null);
      }, 2000);
    }
  };

  const handleOpenCodeForFile = (filePath: string) => {
    setTargetCodeFile(filePath);
    setActiveTab('code');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-['Cairo',sans-serif] selection:bg-emerald-500 selection:text-white flex flex-col">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Logo & Project Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-950/50 font-black text-xl">
              🛒
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-white">
                  سوبر ماركت إكسبريس
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Android Java + XML
                </span>
                <span className="hidden md:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  Room DB + MVVM
                </span>
              </div>
              <p className="text-[11px] text-slate-400">تطبيق أندرويد متكامل جاهز للتجميع والتشغيل على AIDE و Android Studio</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsGuideOpen(true)}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="دليل التشغيل في تطبيق AIDE"
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">دليل AIDE</span>
            </button>

            <button
              onClick={handleDownloadZip}
              disabled={isDownloading}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-950/40 active:scale-95 transition-all disabled:opacity-75"
            >
              <Download className={`w-4 h-4 ${isDownloading ? 'animate-bounce' : ''}`} />
              <span>
                {isDownloading
                  ? `${downloadProgress?.percent || 0}% جاري التحضير...`
                  : 'تحميل المشروع كاملاً ZIP'}
              </span>
            </button>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-2 border-t border-slate-800/80 pt-1 pb-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'simulator'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>المعاينة التفاعلية للتطبيق (Live Phone)</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'code'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>مستكشف الأكواد (Java & XML Source Files)</span>
          </button>

          <button
            onClick={() => setActiveTab('structure')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'structure'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <FolderTree className="w-4 h-4" />
            <span>هيكلية المشروع والمعمارية (Architecture & Directory)</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col">
        {/* TAB 1: PHONE SIMULATOR */}
        {activeTab === 'simulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Phone Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <PhoneSimulator onOpenCodeForFile={handleOpenCodeForFile} />
            </div>

            {/* Right Column: App Highlights & Fast Code Jump */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Feature Highlights Card */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-black text-white flex items-center gap-2">
                      <span>تطبيق سوبر ماركت أندرويد متكامل</span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        100% جاهز لـ AIDE
                      </span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      تمت كتابة الكود بلغة <strong>Java</strong> وتصميم الواجهات بواسطة <strong>XML</strong> بالكامل وفق أعلى معايير <strong>Material Design 3</strong> ومعمارية <strong>MVVM</strong>.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-200">الواجهات والتصميم (Material 3)</h4>
                      <p className="text-slate-400 text-[11px] mt-0.5">Splash Screen، بنرات متحركة، بطاقات منتجات، سلة، تفاصيل، وتتبع الطلب خطوة بخطوة.</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-200">قاعدة بيانات Room المحلية</h4>
                      <p className="text-slate-400 text-[11px] mt-0.5">تخزين الأصناف وسلة التسوق محلياً لدعم وضع عدم الاتصال (Offline Mode) دون توقف.</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-200">كوبونات وحساب الضرائب</h4>
                      <p className="text-slate-400 text-[11px] mt-0.5">خصم الكوبونات (SAVE20)، رسوم التوصيل، وضريبة القيمة المضافة 15% وحساب الإجمالي آلياً.</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-200">دعم الوضع الليلي والنهاري</h4>
                      <p className="text-slate-400 text-[11px] mt-0.5">ملفات Themes و Colors مخصصة للوضع الليلي (values-night) مع دعم كامل للغة العربية RTL.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>متوافق مع AIDE 3.2+ و Android Studio Iguana / Hedgehog</span>
                  </div>

                  <button
                    onClick={handleDownloadZip}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow flex items-center gap-2 active:scale-95 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>تنزيل ملف الـ ZIP للهاتف الآن</span>
                  </button>
                </div>
              </div>

              {/* Quick Links to View Major Source Code */}
              <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-amber-400" />
                  <span>تصفح ملفات الكود الرئيسية مباشرة:</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { path: 'app/src/main/java/com/supermarket/app/ui/MainActivity.java', name: 'MainActivity.java', desc: 'النشاط الرئيسي والبنرات والأقسام' },
                    { path: 'app/src/main/res/layout/activity_main.xml', name: 'activity_main.xml', desc: 'واجهة الشاشة الرئيسية الشاملة' },
                    { path: 'app/src/main/java/com/supermarket/app/ui/CartActivity.java', name: 'CartActivity.java', desc: 'سلة المشتريات والكوبونات والحسابات' },
                    { path: 'app/src/main/res/layout/activity_cart.xml', name: 'activity_cart.xml', desc: 'واجهة سلة المشتريات والتفقيط' },
                    { path: 'app/src/main/java/com/supermarket/app/data/local/AppDatabase.java', name: 'AppDatabase.java', desc: 'قاعدة بيانات Room SQLite المحلية' },
                    { path: 'app/src/main/java/com/supermarket/app/ui/OrderTrackingActivity.java', name: 'OrderTrackingActivity.java', desc: 'تتبع مسار الطلب خطوة بخطوة' },
                    { path: 'app/build.gradle', name: 'build.gradle (Module)', desc: 'مكتبات Room, Glide, Material3, ViewBinding' },
                    { path: 'app/src/main/AndroidManifest.xml', name: 'AndroidManifest.xml', desc: 'الصلاحيات والأنشطة والـ Theme' },
                  ].map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleOpenCodeForFile(item.path)}
                      className="text-right p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 flex items-center justify-between group transition-all"
                    >
                      <div>
                        <div className="font-bold text-slate-200 group-hover:text-emerald-300 font-mono text-[11px]">{item.name}</div>
                        <div className="text-[10px] text-slate-500">{item.desc}</div>
                      </div>
                      <span className="text-slate-500 group-hover:text-emerald-400 text-xs">←</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile AIDE Steps Quick Callout */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/30 to-slate-900 border border-amber-600/30 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-xs">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-base flex-shrink-0">
                    💡
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-200">تريد فتح الكود على هاتفك عبر AIDE فوراً؟</h4>
                    <p className="text-slate-400 text-[11px]">حمل ملف الـ ZIP، فك ضغطه في الذاكرة، ثم افتحه في AIDE واضغط زر تشغيل Run ▶️ لتثبيت الـ APK.</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsGuideOpen(true)}
                  className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold rounded-lg whitespace-nowrap transition-colors"
                >
                  عرض الشرح المصور
                </button>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: CODE EXPLORER */}
        {activeTab === 'code' && (
          <div className="w-full space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-black text-white">مستكشف الكود المصدري للأندرويد (Java & XML)</h2>
                <p className="text-xs text-slate-400">تصفح وانسخ كود أي ملف أندرويد تم إنشاؤه لهذا المشروع بالكامل</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/40">
                  {PROJECT_FILES.length} ملفاً جاهزاً
                </span>
              </div>
            </div>

            <CodeExplorer
              initialFilePath={targetCodeFile}
              onDownloadZip={handleDownloadZip}
            />
          </div>
        )}

        {/* TAB 3: PROJECT STRUCTURE & ARCHITECTURE */}
        {activeTab === 'structure' && (
          <div className="space-y-6">
            
            {/* Header info */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
              <h2 className="text-lg font-black text-white mb-2">هيكلية المشروع الكاملة (Project Directory Structure)</h2>
              <p className="text-xs text-slate-400 leading-relaxed max-w-4xl">
                تم تنظيم المشروع وفق معمارية <strong>MVVM (Model-View-ViewModel)</strong> القياسية لأندرويد، مع هيكلية حزم نظيفة تضمن التوافق التام مع تطبيق <strong>AIDE</strong> على الهاتف ومع <strong>Android Studio</strong> على الكمبيوتر.
              </p>

              {/* Directory Tree Pre */}
              <div className="mt-5 p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto leading-loose" dir="ltr">
                <pre>{`SupermarketApp/
├── build.gradle                                # Root build configuration
├── settings.gradle                             # Project module settings
├── gradle.properties                           # AndroidX & JVM configuration
├── README.md                                   # Complete guide for AIDE & Android Studio
└── app/
    ├── build.gradle                            # Dependencies: Room, Material3, Glide, ViewBinding
    ├── proguard-rules.pro
    └── src/
        └── main/
            ├── AndroidManifest.xml             # Permissions, Activities, App Theme
            ├── java/
            │   └── com/supermarket/app/
            │       ├── data/
            │       │   ├── model/
            │       │   │   ├── Product.java    # Room @Entity (id, name, price, rating, category...)
            │       │   │   ├── Category.java   # Category data model
            │       │   │   └── CartItem.java   # Room @Entity (cart item with quantity & total)
            │       │   ├── local/
            │       │   │   ├── AppDatabase.java # Room Database Singleton (SQLite)
            │       │   │   ├── ProductDao.java  # Room DAO for search, deals & favorites
            │       │   │   └── CartDao.java     # Room DAO for cart items & count
            │       │   └── repository/
            │       │       └── SupermarketRepository.java # Background executors & data cache
            │       ├── viewmodel/
            │       │   └── MainViewModel.java  # AndroidViewModel with LiveData
            │       ├── adapter/
            │       │   ├── BannerAdapter.java  # ViewPager2 Image Slider
            │       │   ├── CategoryAdapter.java# Horizontal categories recycler
            │       │   ├── ProductAdapter.java # Product card with add to cart & star ratings
            │       │   └── CartAdapter.java    # Cart recycler with +/- quantity & delete
            │       └── ui/
            │           ├── SplashActivity.java # Animated launcher screen
            │           ├── AuthActivity.java   # Sign in, Sign up, Guest mode
            │           ├── MainActivity.java   # Home screen, banners, deals, search
            │           ├── ProductDetailActivity.java # Details, stock, quantity selector
            │           ├── CartActivity.java   # Cart summary, coupon discounts, VAT 15%
            │           ├── CheckoutActivity.java # Payment method & delivery address
            │           └── OrderTrackingActivity.java # Step-by-step progress stepper
            └── res/
                ├── layout/
                │   ├── activity_splash.xml
                │   ├── activity_auth.xml
                │   ├── activity_main.xml
                │   ├── activity_product_detail.xml
                │   ├── activity_cart.xml
                │   ├── activity_checkout.xml
                │   ├── activity_order_tracking.xml
                │   ├── item_banner.xml
                │   ├── item_category.xml
                │   ├── item_product.xml
                │   └── item_cart.xml
                ├── menu/
                │   └── bottom_nav_menu.xml
                ├── values/
                │   ├── strings.xml             # Arabic & English text
                │   ├── colors.xml              # Material 3 emerald palette
                │   └── themes.xml              # Day theme
                ├── values-night/
                │   └── themes.xml              # Dark Mode theme
                └── drawable/
                    ├── bg_splash_gradient.xml
                    ├── bg_rounded_card.xml
                    ├── bg_discount_tag.xml
                    ├── bg_badge_circle.xml
                    ├── bg_quantity_selector.xml
                    └── vector icons (cart, home, orders, profile...)`}</pre>
              </div>
            </div>

            {/* Architecture Explanation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">1. نمط المعمارية MVVM</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  فصل طبقة الواجهات (Activities / Adapters) عن منطق التطبيق (ViewModel) ومصدر البيانات (Repository)، مع مراقبة التغيرات عبر LiveData لمنع تسريب الذاكرة وإعادة تحميل الواجهات بسلاسة.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                  <HardDrive className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">2. قاعدة بيانات Room Offline</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  تخزين كامل أصناف السوبرماركت وسلة الشراء محلياً بواسطة SQLite و Room DAO. يتيح التطبيق للعميل تصفح الكتالوج، وإضافة المنتجات للسلة، وتطبيق الكوبونات حتى عند انقطاع شبكة الإنترنت.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">3. توافق 100% مع هواتف الأندرويد</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  تم ضبط ملفات Gradle وإعدادات Java 8 و ViewBinding لتعمل مباشرة داخل تطبيق AIDE على الهاتف المحمول دون الحاجة لحاسوب، مع إمكانية التجميع والتعديل وإنشاء ملف APK جاهز للتثبيت بضغطة واحدة.
                </p>
              </div>
            </div>

            {/* Bottom download CTA */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-700/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white">هل أنت مستعد لبدء تشغيل التطبيق على هاتفك؟</h3>
                <p className="text-xs text-slate-400 mt-1">اضغط على الزر أدناه لتنزيل الأرشيف المضغوط ZIP بجميع الملفات المذكورة في الهيكل أعلاه.</p>
              </div>

              <button
                onClick={handleDownloadZip}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-950/50 flex items-center gap-2 whitespace-nowrap active:scale-95 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>تحميل SupermarketApp.zip</span>
              </button>
            </div>

          </div>
        )}
      </main>

      {/* Guide Modal */}
      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onDownloadZip={handleDownloadZip}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/80 py-4 px-6 text-center text-xs text-slate-500">
        تطبيق سوبر ماركت إكسبريس المتكامل لأندرويد • تطوير بلغة Java و XML معمارية MVVM و Room Database • جاهز لـ AIDE و Android Studio.
      </footer>
    </div>
  );
}
