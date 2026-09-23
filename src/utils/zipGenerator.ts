import JSZip from 'jszip';
import confetti from 'canvas-confetti';
import { PROJECT_FILES } from '../data/androidProjectSource';

export async function generateAndDownloadProjectZip(onProgress?: (percent: number, status: string) => void): Promise<void> {
  const zip = new JSZip();

  if (onProgress) onProgress(10, 'جاري تهيئة حزمة أندرويد ستوديو و AIDE...');

  // إضافة جميع الملفات البرمجية وملفات التكوين
  for (const file of PROJECT_FILES) {
    zip.file(file.path, file.content);
  }

  if (onProgress) onProgress(40, 'جاري تضمين ملفات الرسوميات Drawable والـ XML...');

  // ملفات إضافية ضرورية لتشغيل AIDE دون أخطاء
  const extraDrawables: Record<string, string> = {
    'gradle/wrapper/gradle-wrapper.properties': `distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\\://services.gradle.org/distributions/gradle-8.2-bin.zip
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
`,
    'app/proguard-rules.pro': `# Add project specific ProGuard rules here.
-keep class com.supermarket.app.data.model.** { *; }
-keep class com.supermarket.app.data.local.** { *; }
`,
    'app/src/main/res/drawable/bg_splash_gradient.xml': `<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <gradient
        android:angle="135"
        android:startColor="#059669"
        android:centerColor="#047857"
        android:endColor="#064E3B"
        android:type="linear" />
</shape>
`,
    'app/src/main/res/drawable/bg_rounded_card.xml': `<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <solid android:color="#F1F5F9" />
    <corners android:radius="16dp" />
</shape>
`,
    'app/src/main/res/drawable/bg_discount_tag.xml': `<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <solid android:color="#EF4444" />
    <corners android:radius="8dp" />
</shape>
`,
    'app/src/main/res/drawable/bg_badge_circle.xml': `<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="oval">
    <solid android:color="#EF4444" />
</shape>
`,
    'app/src/main/res/drawable/bg_circle_trans.xml': `<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="oval">
    <solid android:color="#80FFFFFF" />
</shape>
`,
    'app/src/main/res/drawable/bg_quantity_selector.xml': `<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <solid android:color="#F1F5F9" />
    <corners android:radius="12dp" />
    <stroke android:width="1dp" android:color="#E2E8F0" />
</shape>
`,
    'app/src/main/res/drawable/bg_category_chip.xml': `<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <solid android:color="#D1FAE5" />
    <corners android:radius="8dp" />
</shape>
`,
    'app/src/main/res/drawable/bg_step_active.xml': `<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="oval">
    <solid android:color="#059669" />
    <size android:width="28dp" android:height="28dp" />
</shape>
`,
    'app/src/main/res/drawable/ic_shopping_cart.xml': `<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp"
    android:height="24dp"
    android:viewportWidth="24"
    android:viewportHeight="24">
  <path
      android:fillColor="#FF000000"
      android:pathData="M7,18c-1.1,0 -1.99,0.9 -1.99,2S5.9,22 7,22s2,-0.9 2,-2 -0.9,-2 -2,-2zM1,2v2h2l3.6,7.59 -1.35,2.45c-0.16,0.28 -0.25,0.61 -0.25,0.96 0,1.1 0.9,2 2,2h12v-2L7.42,15c-0.14,0 -0.25,-0.11 -0.25,-0.25l0.03,-0.12 0.9,-1.63h7.45c0.75,0 1.41,-0.41 1.75,-1.03l3.58,-6.49c0.08,-0.14 0.12,-0.31 0.12,-0.48 0,-0.55 -0.45,-1 -1,-1L5.21,4l-0.94,-2L1,2zM17,18c-1.1,0 -1.99,0.9 -1.99,2s0.89,2 1.99,2 2,-0.9 2,-2 -0.9,-2 -2,-2z"/>
</vector>`,
    'app/src/main/res/drawable/ic_shopping_bag.xml': `<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp"
    android:height="24dp"
    android:viewportWidth="24"
    android:viewportHeight="24">
  <path
      android:fillColor="#FF000000"
      android:pathData="M18,6h-2c0,-2.21 -1.79,-4 -4,-4S8,3.79 8,6L6,6c-1.1,0 -2,0.9 -2,2v12c0,1.1 0.9,2 2,2h12c1.1,0 2,-0.9 2,-2L20,8c0,-1.1 -0.9,-2 -2,-2zM12,4c1.1,0 2,0.9 2,2h-4c0,-1.1 0.9,-2 2,-2zM18,20L6,20L6,8h2v2c0,0.55 0.45,1 1,1s1,-0.45 1,-1L10,8h4v2c0,0.55 0.45,1 1,1s1,-0.45 1,-1L16,8h2v12z"/>
</vector>`,
    'app/src/main/res/drawable/ic_favorite_border.xml': `<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp"
    android:height="24dp"
    android:viewportWidth="24"
    android:viewportHeight="24">
  <path
      android:fillColor="#FF000000"
      android:pathData="M16.5,3c-1.74,0 -3.41,0.81 -4.5,2.09C10.91,3.81 9.24,3 7.5,3 4.42,3 2,5.42 2,8.5c0,3.78 3.4,6.86 8.55,11.54L12,21.35l1.45,-1.32C18.6,15.36 22,12.28 22,8.5 22,5.42 19.58,3 16.5,3zM12.1,18.55l-0.1,0.1 -0.1,-0.1C7.14,14.24 4,11.39 4,8.5 4,6.5 5.5,5 7.5,5c1.54,0 3.04,0.99 3.57,2.36h1.87C13.46,5.99 14.96,5 16.5,5c2,0 3.5,1.5 3.5,3.5 0,2.89 -3.14,5.74 -7.9,10.05z"/>
</vector>`,
    'app/src/main/res/drawable/ic_favorite_filled.xml': `<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp"
    android:height="24dp"
    android:viewportWidth="24"
    android:viewportHeight="24">
  <path
      android:fillColor="#FFEF4444"
      android:pathData="M12,21.35l-1.45,-1.32C5.4,15.36 2,12.28 2,8.5 2,5.42 4.42,3 7.5,3c1.74,0 3.41,0.81 4.5,2.09C13.09,3.81 14.76,3 16.5,3 19.58,3 22,5.42 22,8.5c0,3.78 -3.4,6.86 -8.55,11.54L12,21.35z"/>
</vector>`,
    'app/src/main/res/drawable/ic_arrow_back.xml': `<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp"
    android:height="24dp"
    android:viewportWidth="24"
    android:viewportHeight="24">
  <path
      android:fillColor="#FF000000"
      android:pathData="M20,11H7.83l5.59,-5.59L12,4l-8,8 8,8 1.41,-1.41L7.83,13H20v-2z"/>
</vector>`,
    'app/src/main/res/drawable/ic_plus.xml': `<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp"
    android:height="24dp"
    android:viewportWidth="24"
    android:viewportHeight="24">
  <path
      android:fillColor="#FF000000"
      android:pathData="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
</vector>`,
    'app/src/main/res/drawable/ic_minus.xml': `<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp"
    android:height="24dp"
    android:viewportWidth="24"
    android:viewportHeight="24">
  <path
      android:fillColor="#FF000000"
      android:pathData="M19,13H5v-2h14v2z"/>
</vector>`,
    'app/src/main/res/drawable/ic_delete.xml': `<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp"
    android:height="24dp"
    android:viewportWidth="24"
    android:viewportHeight="24">
  <path
      android:fillColor="#FF000000"
      android:pathData="M6,19c0,1.1 0.9,2 2,2h8c1.1,0 2,-0.9 2,-2V7H6v12zM19,4h-3.5l-1,-1h-5l-1,1H5v2h14V4z"/>
</vector>`,
    'app/src/main/res/drawable/ic_home.xml': `<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp"
    android:height="24dp"
    android:viewportWidth="24"
    android:viewportHeight="24">
  <path
      android:fillColor="#FF000000"
      android:pathData="M10,20v-6h4v6h5v-8h3L12,3 2,12h3v8z"/>
</vector>`,
    'app/src/main/res/drawable/ic_orders.xml': `<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp"
    android:height="24dp"
    android:viewportWidth="24"
    android:viewportHeight="24">
  <path
      android:fillColor="#FF000000"
      android:pathData="M19,3h-4.18C14.4,1.84 13.3,1 12,1c-1.3,0 -2.4,0.84 -2.82,2H5c-1.1,0 -2,0.9 -2,2v14c0,1.1 0.9,2 2,2h14c1.1,0 2,-0.9 2,-2V5c0,-1.1 -0.9,-2 -2,-2zm-7,0c0.55,0 1,0.45 1,1s-0.45,1 -1,1 -1,-0.45 -1,-1 0.45,-1 1,-1zm2,14H7v-2h7v2zm3,-4H7v-2h10v2zm0,-4H7V7h10v2z"/>
</vector>`,
    'app/src/main/res/drawable/ic_profile.xml': `<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp"
    android:height="24dp"
    android:viewportWidth="24"
    android:viewportHeight="24">
  <path
      android:fillColor="#FF000000"
      android:pathData="M12,12c2.21,0 4,-1.79 4,-4s-1.79,-4 -4,-4 -4,1.79 -4,4 1.79,4 4,4zm0,2c-2.67,0 -8,1.34 -8,4v2h16v-2c0,-2.66 -5.33,-4 -8,-4z"/>
</vector>`,
    'app/src/main/res/drawable/ic_search.xml': `<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp"
    android:height="24dp"
    android:viewportWidth="24"
    android:viewportHeight="24">
  <path
      android:fillColor="#FF000000"
      android:pathData="M15.5,14h-0.79l-0.28,-0.27C15.41,12.59 16,11.11 16,9.5 16,5.91 13.09,3 9.5,3S3,5.91 3,9.5 5.91,16 9.5,16c1.61,0 3.09,-0.59 4.23,-1.57l0.27,0.28v0.79l5,4.99L20.49,19l-4.99,-5zm-6,0C7.01,14 5,11.99 5,9.5S7.01,5 9.5,5 14,7.01 14,9.5 11.99,14 9.5,14z"/>
</vector>`,
    'app/src/main/res/color/selector_nav_color.xml': `<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:color="#059669" android:state_checked="true" />
    <item android:color="#64748B" />
</selector>
`,
    'app/src/main/res/anim/fade_in_scale.xml': `<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android"
    android:interpolator="@android:anim/decelerate_interpolator">
    <alpha
        android:fromAlpha="0.0"
        android:toAlpha="1.0"
        android:duration="1000" />
    <scale
        android:fromXScale="0.8"
        android:toXScale="1.0"
        android:fromYScale="0.8"
        android:toYScale="1.0"
        android:pivotX="50%"
        android:pivotY="50%"
        android:duration="1000" />
</set>
`
  };

  for (const [filePath, content] of Object.entries(extraDrawables)) {
    zip.file(filePath, content);
  }

  if (onProgress) onProgress(75, 'جاري ضغط الملفات وتجهيز أرشيف ZIP...');

  const content = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 }
  });

  if (onProgress) onProgress(95, 'بدء تنزيل الملف على جهازك...');

  // بدء التنزيل المباشر
  const url = URL.createObjectURL(content);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'SupermarketApp_AIDE_Project.zip';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  if (onProgress) onProgress(100, 'اكتمل التنزيل بنجاح! جاهز للاستيراد على هاتفك');

  // إطلاق احتفال خفيف
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  } catch (e) {
    // ignore
  }
}
