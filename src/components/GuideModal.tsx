import React from 'react';
import {
  Smartphone,
  Laptop,
  CheckCircle2,
  Download,
  FolderArchive,
  Terminal,
  Layers,
  Sparkles,
  X,
  ExternalLink
} from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadZip: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose, onDownloadZip }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">دليل تشغيل المشروع على الهواتف والكمبيوتر</h3>
              <p className="text-xs text-emerald-300/80">خطوات تشغيل ملف ZIP في AIDE و Android Code Studio و Android Studio</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs text-slate-300">
          
          {/* Quick Action Download Banner */}
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-600/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <FolderArchive className="w-8 h-8 text-emerald-400 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-sm text-emerald-300">هل قمت بتنزيل ملف الـ ZIP للمشروع؟</h4>
                <p className="text-slate-400 text-[11px]">يحتوي الأرشيف على كامل ملفات Java، وواجهات الـ XML، وقاعدة بيانات Room، وإعدادات Gradle.</p>
              </div>
            </div>

            <button
              onClick={onDownloadZip}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow flex items-center gap-2 whitespace-nowrap active:scale-95 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>تحميل SupermarketApp.zip</span>
            </button>
          </div>

          {/* Section 1: AIDE on Mobile */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-400 border-b border-slate-800 pb-2">
              <Smartphone className="w-4 h-4" />
              <span>1. التشغيل على الهاتف المحمول (AIDE / Android Code Studio)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="w-6 h-6 rounded-full bg-emerald-900/60 text-emerald-300 font-bold flex items-center justify-center text-xs mb-2">1</span>
                <h5 className="font-bold text-slate-200 mb-1">فك الضغط</h5>
                <p className="text-slate-400 leading-relaxed">
                  قم بفك ضغط ملف <code className="text-emerald-400">SupermarketApp_AIDE_Project.zip</code> في ذاكرة الهاتف داخل مجلد <code className="text-amber-300">AppProjects</code> أو <code className="text-amber-300">Download</code> باستخدام أي تطبيق لإدارة الملفات (مثل ZArchiver أو مدير ملفات الجهاز).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="w-6 h-6 rounded-full bg-emerald-900/60 text-emerald-300 font-bold flex items-center justify-center text-xs mb-2">2</span>
                <h5 className="font-bold text-slate-200 mb-1">فتح المشروع في AIDE</h5>
                <p className="text-slate-400 leading-relaxed">
                  افتح تطبيق <strong>AIDE - IDE for Android Java</strong>، اضغط على القائمة ثم <strong>Open Project</strong>، توجه للمجلد المفكوك وحدد مجلد المشروع أو ملف <code className="text-blue-400">settings.gradle</code>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="w-6 h-6 rounded-full bg-emerald-900/60 text-emerald-300 font-bold flex items-center justify-center text-xs mb-2">3</span>
                <h5 className="font-bold text-slate-200 mb-1">بناء الـ APK وتشغيله</h5>
                <p className="text-slate-400 leading-relaxed">
                  اضغط على زر التشغيل <strong>Run ▶️</strong> في أعلى شاشة AIDE. سيقوم التطبيق بتجميع كود Java وعناصر الـ XML وتوليد ملف <code className="text-emerald-400">app-debug.apk</code> وتثبيته مباشرة!
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="w-6 h-6 rounded-full bg-emerald-900/60 text-emerald-300 font-bold flex items-center justify-center text-xs mb-2">4</span>
                <h5 className="font-bold text-slate-200 mb-1">العمل دون إنترنت (Offline)</h5>
                <p className="text-slate-400 leading-relaxed">
                  تم تضمين قاعدة بيانات <strong>Room SQLite</strong> ببيانات تجريبية مسبقة، ليعمل التطبيق بكامل وظائفه (السلة، الأقسام، الكوبونات) فوراً حتى بدون شبكة إنترنت.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Android Studio on PC */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-blue-400 border-b border-slate-800 pb-2">
              <Laptop className="w-4 h-4" />
              <span>2. التشغيل على الكمبيوتر (Android Studio)</span>
            </div>

            <ol className="space-y-2 list-decimal list-inside text-slate-400 leading-relaxed">
              <li>قم بفك ضغط الملف المضغوط على جهاز الكمبيوتر.</li>
              <li>شغّل برنامج <strong>Android Studio</strong> واختر <strong>File &gt; Open</strong>.</li>
              <li>حدد المجلد الرئيسي للمشروع، سيبدأ أندرويد ستوديو بعمل <strong>Gradle Sync</strong> تلقائي.</li>
              <li>اختر المحاكي (Emulator) أو قم بتوصيل هاتفك الأندرويد واضغط على <strong>Run 'app' (Shift + F10)</strong>.</li>
            </ol>
          </div>

          {/* Section 3: Key Features Breakdown */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-amber-400 border-b border-slate-800 pb-2">
              <Layers className="w-4 h-4" />
              <span>3. المواصفات الهندسية المحققة بالمشروع</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              {[
                { title: 'معمارية MVVM نظيفة', desc: 'فصل Model و ViewModel و Repository مع LiveData' },
                { title: 'Room Database & SQLite', desc: 'تخزين الكتالوج والسلة والمفضلة أوفلاين' },
                { title: 'Material 3 Dark & Light', desc: 'دعم الوضع الليلي والنهاري التلقائي' },
                { title: 'ViewBinding مفعل', desc: 'التعامل مع ملفات XML دون أخطاء findViewById' },
                { title: 'حساب الضرائب والتوصيل', desc: 'نظام كوبونات ذكي (SAVE20, FREESHIP)' },
                { title: 'تتبع الطلب متعدد المراحل', desc: 'محاكاة كاملة لمسار المندوب وحالة الشحنة' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-200">{item.title}</div>
                    <div className="text-slate-400">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">جاهز للتصدير والتجميع الفوري على هاتفك</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-colors"
          >
            إغلاق النافذة
          </button>
        </div>

      </div>
    </div>
  );
};
