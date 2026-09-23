export interface ProjectFile {
  path: string;
  name: string;
  category: 'java' | 'xml' | 'gradle' | 'config' | 'doc';
  description: string;
  content: string;
}

export const PROJECT_FILES: ProjectFile[] = [
  // ----------------------------------------------------
  // Root and Gradle Configurations
  // ----------------------------------------------------
  {
    path: 'build.gradle',
    name: 'build.gradle (Project)',
    category: 'gradle',
    description: 'ملف التكوين الرئيسي للمشروع وإعداد مستودعات Google و Maven',
    content: `// Top-level build file where you can add configuration options common to all sub-projects/modules.
buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:8.1.2'
    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
`
  },
  {
    path: 'settings.gradle',
    name: 'settings.gradle',
    category: 'gradle',
    description: 'ملف إعداد اسم المشروع والموديولات التابعة',
    content: `rootProject.name = "SupermarketApp"
include ':app'
`
  },
  {
    path: 'gradle.properties',
    name: 'gradle.properties',
    category: 'config',
    description: 'إعدادات تشغيل Gradle وتفعيل AndroidX و Jetifier',
    content: `org.gradle.jvmargs=-Xmx2048m -Dfile.encoding=UTF-8
android.useAndroidX=true
android.enableJetifier=true
`
  },
  {
    path: 'app/build.gradle',
    name: 'app/build.gradle (Module)',
    category: 'gradle',
    description: 'إعدادات موديول التطبيق والمكتبات (Room, Material3, Glide, ViewBinding)',
    content: `plugins {
    id 'com.android.application'
}

android {
    namespace 'com.supermarket.app'
    compileSdk 34

    defaultConfig {
        applicationId "com.supermarket.app"
        minSdk 21
        targetSdk 34
        versionCode 1
        versionName "1.0.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"

        javaCompileOptions {
            annotationProcessorOptions {
                arguments += ["room.schemaLocation": "$projectDir/schemas".toString()]
            }
        }
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }

    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }

    buildFeatures {
        viewBinding true
    }
}

dependencies {
    // AndroidX & Material Design
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.11.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    implementation 'androidx.recyclerview:recyclerview:1.3.2'
    implementation 'androidx.cardview:cardview:1.0.0'
    implementation 'androidx.viewpager2:viewpager2:1.0.0'

    // Architecture Components & MVVM (ViewModel & LiveData)
    implementation 'androidx.lifecycle:lifecycle-viewmodel:2.7.0'
    implementation 'androidx.lifecycle:lifecycle-livedata:2.7.0'

    // Room Database (Local Caching & Offline Mode)
    implementation 'androidx.room:room-runtime:2.6.1'
    annotationProcessor 'androidx.room:room-compiler:2.6.1'

    // Image Loading (Glide)
    implementation 'com.github.bumptech.glide:glide:4.16.0'
    annotationProcessor 'com.github.bumptech.glide:compiler:4.16.0'

    // Testing
    testImplementation 'junit:junit:4.13.2'
    androidTestImplementation 'androidx.test.ext:junit:1.1.5'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.5.1'
}
`
  },
  {
    path: 'app/src/main/AndroidManifest.xml',
    name: 'AndroidManifest.xml',
    category: 'xml',
    description: 'البيان التعريفي للتطبيق مع الصلاحيات والأنشطة (Activities)',
    content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.supermarket.app">

    <!-- الصلاحيات المطلوبة للتطبيق -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />

    <application
        android:allowBackup="true"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:fullBackupContent="@xml/backup_rules"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.SupermarketApp"
        android:usesCleartextTraffic="true"
        tools:targetApi="31">

        <!-- شاشة البداية الافتتاحية (Splash Screen) -->
        <activity
            android:name=".ui.SplashActivity"
            android:exported="true"
            android:theme="@style/Theme.SupermarketApp.Splash">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <!-- شاشة تسجيل الدخول وإنشاء الحساب (Auth) -->
        <activity
            android:name=".ui.AuthActivity"
            android:exported="false"
            android:windowSoftInputMode="adjustResize" />

        <!-- الشاشة الرئيسية للمتجر (MainActivity) -->
        <activity
            android:name=".ui.MainActivity"
            android:exported="false"
            android:windowSoftInputMode="adjustPan" />

        <!-- شاشة تفاصيل المنتج (ProductDetailActivity) -->
        <activity
            android:name=".ui.ProductDetailActivity"
            android:exported="false"
            android:parentActivityName=".ui.MainActivity" />

        <!-- شاشة سلة المشتريات (CartActivity) -->
        <activity
            android:name=".ui.CartActivity"
            android:exported="false"
            android:parentActivityName=".ui.MainActivity" />

        <!-- شاشة تأكيد الدفع وإتمام الطلب (CheckoutActivity) -->
        <activity
            android:name=".ui.CheckoutActivity"
            android:exported="false"
            android:parentActivityName=".ui.CartActivity" />

        <!-- شاشة تتبع مسار وحالة الطلب (OrderTrackingActivity) -->
        <activity
            android:name=".ui.OrderTrackingActivity"
            android:exported="false"
            android:parentActivityName=".ui.MainActivity" />

    </application>

</manifest>
`
  },

  // ----------------------------------------------------
  // Java Models
  // ----------------------------------------------------
  {
    path: 'app/src/main/java/com/supermarket/app/data/model/Product.java',
    name: 'Product.java',
    category: 'java',
    description: 'كائن بيانات المنتج مع تعليقات Room للتخزين المحلي',
    content: `package com.supermarket.app.data.model;

import androidx.room.Entity;
import androidx.room.PrimaryKey;
import java.io.Serializable;

/**
 * نموذج بيانات المنتج لمتجر السوبر ماركت
 * مدعوم بـ Room Entity للتخزين المؤقت دون اتصال
 */
@Entity(tableName = "products")
public class Product implements Serializable {

    @PrimaryKey
    private int id;
    private String nameAr;
    private String nameEn;
    private String category;
    private String categoryNameAr;
    private double price;
    private double originalPrice;
    private String unit;
    private String imageUrl;
    private float rating;
    private int reviewsCount;
    private String descriptionAr;
    private String descriptionEn;
    private boolean inStock;
    private boolean isBestSeller;
    private boolean isDailyDeal;
    private boolean isFavorite;

    // المنشئ الافتراضي
    public Product() {}

    public Product(int id, String nameAr, String nameEn, String category, String categoryNameAr,
                   double price, double originalPrice, String unit, String imageUrl,
                   float rating, int reviewsCount, String descriptionAr, String descriptionEn,
                   boolean inStock, boolean isBestSeller, boolean isDailyDeal) {
        this.id = id;
        this.nameAr = nameAr;
        this.nameEn = nameEn;
        this.category = category;
        this.categoryNameAr = categoryNameAr;
        this.price = price;
        this.originalPrice = originalPrice;
        this.unit = unit;
        this.imageUrl = imageUrl;
        this.rating = rating;
        this.reviewsCount = reviewsCount;
        this.descriptionAr = descriptionAr;
        this.descriptionEn = descriptionEn;
        this.inStock = inStock;
        this.isBestSeller = isBestSeller;
        this.isDailyDeal = isDailyDeal;
        this.isFavorite = false;
    }

    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getNameAr() { return nameAr; }
    public void setNameAr(String nameAr) { this.nameAr = nameAr; }

    public String getNameEn() { return nameEn; }
    public void setNameEn(String nameEn) { this.nameEn = nameEn; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getCategoryNameAr() { return categoryNameAr; }
    public void setCategoryNameAr(String categoryNameAr) { this.categoryNameAr = categoryNameAr; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public double getOriginalPrice() { return originalPrice; }
    public void setOriginalPrice(double originalPrice) { this.originalPrice = originalPrice; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public float getRating() { return rating; }
    public void setRating(float rating) { this.rating = rating; }

    public int getReviewsCount() { return reviewsCount; }
    public void setReviewsCount(int reviewsCount) { this.reviewsCount = reviewsCount; }

    public String getDescriptionAr() { return descriptionAr; }
    public void setDescriptionAr(String descriptionAr) { this.descriptionAr = descriptionAr; }

    public String getDescriptionEn() { return descriptionEn; }
    public void setDescriptionEn(String descriptionEn) { this.descriptionEn = descriptionEn; }

    public boolean isInStock() { return inStock; }
    public void setInStock(boolean inStock) { this.inStock = inStock; }

    public boolean isBestSeller() { return isBestSeller; }
    public void setBestSeller(boolean bestSeller) { isBestSeller = bestSeller; }

    public boolean isDailyDeal() { return isDailyDeal; }
    public void setDailyDeal(boolean dailyDeal) { isDailyDeal = dailyDeal; }

    public boolean isFavorite() { return isFavorite; }
    public void setFavorite(boolean favorite) { isFavorite = favorite; }

    // حساب نسبة الخصم
    public int getDiscountPercentage() {
        if (originalPrice > price) {
            return (int) Math.round(((originalPrice - price) / originalPrice) * 100);
        }
        return 0;
    }
}
`
  },
  {
    path: 'app/src/main/java/com/supermarket/app/data/model/Category.java',
    name: 'Category.java',
    category: 'java',
    description: 'كائن أقسام المنتجات (الفواكه، الألبان، المخبوزات، اللحوم..)',
    content: `package com.supermarket.app.data.model;

import java.io.Serializable;

public class Category implements Serializable {
    private String id;
    private String nameAr;
    private String nameEn;
    private String iconEmoji;
    private int itemsCount;

    public Category(String id, String nameAr, String nameEn, String iconEmoji, int itemsCount) {
        this.id = id;
        this.nameAr = nameAr;
        this.nameEn = nameEn;
        this.iconEmoji = iconEmoji;
        this.itemsCount = itemsCount;
    }

    public String getId() { return id; }
    public String getNameAr() { return nameAr; }
    public String getNameEn() { return nameEn; }
    public String getIconEmoji() { return iconEmoji; }
    public int getItemsCount() { return itemsCount; }
}
`
  },
  {
    path: 'app/src/main/java/com/supermarket/app/data/model/CartItem.java',
    name: 'CartItem.java',
    category: 'java',
    description: 'كائن عناصر سلة المشتريات مع Room Entity وحساب الإجمالي',
    content: `package com.supermarket.app.data.model;

import androidx.room.Embedded;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity(tableName = "cart_items")
public class CartItem {

    @PrimaryKey(autoGenerate = true)
    private int cartId;

    @Embedded
    private Product product;

    private int quantity;

    public CartItem(Product product, int quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    public int getCartId() { return cartId; }
    public void setCartId(int cartId) { this.cartId = cartId; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public double getTotalPrice() {
        if (product != null) {
            return product.getPrice() * quantity;
        }
        return 0.0;
    }
}
`
  },

  // ----------------------------------------------------
  // Room Database & DAOs
  // ----------------------------------------------------
  {
    path: 'app/src/main/java/com/supermarket/app/data/local/ProductDao.java',
    name: 'ProductDao.java',
    category: 'java',
    description: 'واجهة استعلامات Room للمنتجات والمفضلة',
    content: `package com.supermarket.app.data.local;

import androidx.lifecycle.LiveData;
import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.OnConflictStrategy;
import androidx.room.Query;
import androidx.room.Update;
import com.supermarket.app.data.model.Product;
import java.util.List;

@Dao
public interface ProductDao {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void insertAll(List<Product> products);

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void insert(Product product);

    @Update
    void update(Product product);

    @Query("SELECT * FROM products")
    LiveData<List<Product>> getAllProducts();

    @Query("SELECT * FROM products WHERE category = :categoryId")
    LiveData<List<Product>> getProductsByCategory(String categoryId);

    @Query("SELECT * FROM products WHERE isBestSeller = 1")
    LiveData<List<Product>> getBestSellers();

    @Query("SELECT * FROM products WHERE isDailyDeal = 1")
    LiveData<List<Product>> getDailyDeals();

    @Query("SELECT * FROM products WHERE isFavorite = 1")
    LiveData<List<Product>> getFavorites();

    @Query("SELECT * FROM products WHERE nameAr LIKE '%' || :query || '%' OR nameEn LIKE '%' || :query || '%'")
    LiveData<List<Product>> searchProducts(String query);

    @Query("SELECT * FROM products WHERE id = :productId LIMIT 1")
    LiveData<Product> getProductById(int productId);

    @Query("UPDATE products SET isFavorite = :isFav WHERE id = :productId")
    void setFavorite(int productId, boolean isFav);
}
`
  },
  {
    path: 'app/src/main/java/com/supermarket/app/data/local/CartDao.java',
    name: 'CartDao.java',
    category: 'java',
    description: 'واجهة استعلامات Room لسلة التسوق',
    content: `package com.supermarket.app.data.local;

import androidx.lifecycle.LiveData;
import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.OnConflictStrategy;
import androidx.room.Query;
import androidx.room.Update;
import com.supermarket.app.data.model.CartItem;
import java.util.List;

@Dao
public interface CartDao {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void insert(CartItem item);

    @Update
    void update(CartItem item);

    @Delete
    void delete(CartItem item);

    @Query("SELECT * FROM cart_items")
    LiveData<List<CartItem>> getAllCartItems();

    @Query("SELECT * FROM cart_items WHERE id = :productId LIMIT 1")
    CartItem getCartItemByProductId(int productId);

    @Query("DELETE FROM cart_items")
    void clearCart();

    @Query("SELECT COUNT(*) FROM cart_items")
    LiveData<Integer> getCartCount();
}
`
  },
  {
    path: 'app/src/main/java/com/supermarket/app/data/local/AppDatabase.java',
    name: 'AppDatabase.java',
    category: 'java',
    description: 'فئة قاعدة بيانات Room المركزية بنمط Singleton',
    content: `package com.supermarket.app.data.local;

import android.content.Context;
import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;
import com.supermarket.app.data.model.CartItem;
import com.supermarket.app.data.model.Product;

@Database(entities = {Product.class, CartItem.class}, version = 1, exportSchema = false)
public abstract class AppDatabase extends RoomDatabase {

    private static volatile AppDatabase INSTANCE;

    public abstract ProductDao productDao();
    public abstract CartDao cartDao();

    public static AppDatabase getInstance(final Context context) {
        if (INSTANCE == null) {
            synchronized (AppDatabase.class) {
                if (INSTANCE == null) {
                    INSTANCE = Room.databaseBuilder(
                            context.getApplicationContext(),
                            AppDatabase.class,
                            "supermarket_database"
                    )
                    .fallbackToDestructiveMigration()
                    .build();
                }
            }
        }
        return INSTANCE;
    }
}
`
  },

  // ----------------------------------------------------
  // Repository & ViewModel
  // ----------------------------------------------------
  {
    path: 'app/src/main/java/com/supermarket/app/data/repository/SupermarketRepository.java',
    name: 'SupermarketRepository.java',
    category: 'java',
    description: 'مستودع البيانات (Repository) الذي يدير Room والخيوط الخلفية Executor',
    content: `package com.supermarket.app.data.repository;

import android.app.Application;
import androidx.lifecycle.LiveData;
import com.supermarket.app.data.local.AppDatabase;
import com.supermarket.app.data.local.CartDao;
import com.supermarket.app.data.local.ProductDao;
import com.supermarket.app.data.model.CartItem;
import com.supermarket.app.data.model.Product;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class SupermarketRepository {

    private final ProductDao productDao;
    private final CartDao cartDao;
    private final LiveData<List<Product>> allProducts;
    private final LiveData<List<CartItem>> cartItems;
    private final LiveData<Integer> cartCount;
    private final ExecutorService executorService;

    public SupermarketRepository(Application application) {
        AppDatabase db = AppDatabase.getInstance(application);
        productDao = db.productDao();
        cartDao = db.cartDao();
        allProducts = productDao.getAllProducts();
        cartItems = cartDao.getAllCartItems();
        cartCount = cartDao.getCartCount();
        executorService = Executors.newFixedThreadPool(4);

        // تهيئة البيانات الأولية إذا كانت فارغة
        seedInitialData();
    }

    public LiveData<List<Product>> getAllProducts() { return allProducts; }
    public LiveData<List<Product>> getBestSellers() { return productDao.getBestSellers(); }
    public LiveData<List<Product>> getDailyDeals() { return productDao.getDailyDeals(); }
    public LiveData<List<Product>> getFavorites() { return productDao.getFavorites(); }
    public LiveData<List<CartItem>> getCartItems() { return cartItems; }
    public LiveData<Integer> getCartCount() { return cartCount; }

    public LiveData<List<Product>> getProductsByCategory(String categoryId) {
        if ("all".equalsIgnoreCase(categoryId)) {
            return productDao.getAllProducts();
        }
        return productDao.getProductsByCategory(categoryId);
    }

    public LiveData<List<Product>> searchProducts(String query) {
        return productDao.searchProducts(query);
    }

    public void toggleFavorite(Product product) {
        executorService.execute(() -> {
            boolean newState = !product.isFavorite();
            productDao.setFavorite(product.getId(), newState);
        });
    }

    public void addToCart(Product product, int quantity) {
        executorService.execute(() -> {
            CartItem existing = cartDao.getCartItemByProductId(product.getId());
            if (existing != null) {
                existing.setQuantity(existing.getQuantity() + quantity);
                cartDao.update(existing);
            } else {
                cartDao.insert(new CartItem(product, quantity));
            }
        });
    }

    public void updateCartItemQuantity(CartItem item, int newQty) {
        executorService.execute(() -> {
            if (newQty <= 0) {
                cartDao.delete(item);
            } else {
                item.setQuantity(newQty);
                cartDao.update(item);
            }
        });
    }

    public void removeFromCart(CartItem item) {
        executorService.execute(() -> cartDao.delete(item));
    }

    public void clearCart() {
        executorService.execute(cartDao::clearCart);
    }

    private void seedInitialData() {
        executorService.execute(() -> {
            // بيانات تجريبية جاهزة للعمل بدون إنترنت
            List<Product> dummyList = new ArrayList<>();
            dummyList.add(new Product(1, "تفاح أحمر إيطالي فاخر", "Fresh Italian Apple", "fruits_veg", "خضار وفواكه",
                    8.50, 11.00, "كجم", "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6", 4.8f, 142,
                    "تفاح أحمر طازج ومقرمش غني بالفيتامينات", "Fresh red apples", true, true, true));
            dummyList.add(new Product(2, "حليب طازج كامل الدسم", "Fresh Milk", "dairy", "ألبان وأجبان",
                    6.00, 7.50, "2 لتر", "https://images.unsplash.com/photo-1563636619-e9143da7973b", 4.9f, 310,
                    "حليب طبيعي 100% غني بالكالسيوم وفيتامين د", "Pure fresh milk", true, true, false));
            dummyList.add(new Product(3, "كرواسون زبدة طازج", "Fresh Butter Croissant", "bakery", "مخبوزات",
                    12.00, 15.00, "علبة 4 حبات", "https://images.unsplash.com/photo-1555507036-ab1f4038808a", 4.7f, 89,
                    "كرواسون مخبوز يومياً بزبدة فرنسية هشة", "French butter croissants", true, false, true));
            dummyList.add(new Product(4, "صدور دجاج طازجة مبردة", "Fresh Chicken Breast", "meat", "لحوم",
                    24.50, 29.00, "1 كجم طبق", "https://images.unsplash.com/photo-1604503468506-a8da13d82791", 4.9f, 220,
                    "صدور دجاج طازجة خالية من الهرمونات من مزارع وطنية", "Fresh chicken breasts", true, true, true));
            dummyList.add(new Product(5, "زيت زيتون بكر ممتاز", "Extra Virgin Olive Oil", "pantry", "معلبات",
                    34.00, 42.00, "750 مل", "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5", 4.9f, 175,
                    "عصرة أولى على البارد بنسبة حموضة منخفضة", "First cold press olive oil", true, true, false));
            dummyList.add(new Product(6, "عصير برتقال طبيعي معصور", "Natural Orange Juice", "beverages", "مشروبات",
                    9.50, 12.00, "1.5 لتر", "https://images.unsplash.com/photo-1613478223719-2ab802602423", 4.6f, 95,
                    "عصير برتقال طبيعي 100% بدون سكر مضاف", "Pure natural orange juice", true, false, true));

            productDao.insertAll(dummyList);
        });
    }
}
`
  },
  {
    path: 'app/src/main/java/com/supermarket/app/viewmodel/MainViewModel.java',
    name: 'MainViewModel.java',
    category: 'java',
    description: 'نموذج العرض (ViewModel) لإدارة حالة الواجهات والـ LiveData',
    content: `package com.supermarket.app.viewmodel;

import android.app.Application;
import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.Transformations;
import com.supermarket.app.data.model.CartItem;
import com.supermarket.app.data.model.Product;
import com.supermarket.app.data.repository.SupermarketRepository;
import java.util.List;

public class MainViewModel extends AndroidViewModel {

    private final SupermarketRepository repository;
    private final MutableLiveData<String> selectedCategory = new MutableLiveData<>("all");
    private final MutableLiveData<String> searchQuery = new MutableLiveData<>("");

    public MainViewModel(@NonNull Application application) {
        super(application);
        repository = new SupermarketRepository(application);
    }

    public LiveData<List<Product>> getProducts() {
        return Transformations.switchMap(selectedCategory, repository::getProductsByCategory);
    }

    public LiveData<List<Product>> getBestSellers() {
        return repository.getBestSellers();
    }

    public LiveData<List<Product>> getDailyDeals() {
        return repository.getDailyDeals();
    }

    public LiveData<List<Product>> getFavorites() {
        return repository.getFavorites();
    }

    public LiveData<List<CartItem>> getCartItems() {
        return repository.getCartItems();
    }

    public LiveData<Integer> getCartCount() {
        return repository.getCartCount();
    }

    public void selectCategory(String categoryId) {
        selectedCategory.setValue(categoryId);
    }

    public void search(String query) {
        searchQuery.setValue(query);
    }

    public LiveData<List<Product>> getSearchResults() {
        return Transformations.switchMap(searchQuery, repository::searchProducts);
    }

    public void addToCart(Product product, int quantity) {
        repository.addToCart(product, quantity);
    }

    public void updateCartQuantity(CartItem item, int quantity) {
        repository.updateCartItemQuantity(item, quantity);
    }

    public void removeFromCart(CartItem item) {
        repository.removeFromCart(item);
    }

    public void clearCart() {
        repository.clearCart();
    }

    public void toggleFavorite(Product product) {
        repository.toggleFavorite(product);
    }
}
`
  },

  // ----------------------------------------------------
  // Java Adapters
  // ----------------------------------------------------
  {
    path: 'app/src/main/java/com/supermarket/app/adapter/ProductAdapter.java',
    name: 'ProductAdapter.java',
    category: 'java',
    description: 'محول بطاقات المنتجات مع تقييم النجوم وزر الإضافة للسلة',
    content: `package com.supermarket.app.adapter;

import android.content.Context;
import android.graphics.Paint;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.bumptech.glide.Glide;
import com.google.android.material.button.MaterialButton;
import com.supermarket.app.R;
import com.supermarket.app.data.model.Product;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public class ProductAdapter extends RecyclerView.Adapter<ProductAdapter.ProductViewHolder> {

    private final Context context;
    private List<Product> products = new ArrayList<>();
    private final OnProductClickListener listener;

    public interface OnProductClickListener {
        void onProductClick(Product product);
        void onAddToCartClick(Product product);
        void onFavoriteClick(Product product);
    }

    public ProductAdapter(Context context, OnProductClickListener listener) {
        this.context = context;
        this.listener = listener;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public ProductViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.item_product, parent, false);
        return new ProductViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ProductViewHolder holder, int position) {
        Product product = products.get(position);

        holder.tvTitle.setText(product.getNameAr());
        holder.tvUnit.setText(product.getUnit());
        holder.tvPrice.setText(String.format(Locale.US, "%.2f ريال", product.getPrice()));
        holder.tvRating.setText(String.format(Locale.US, "★ %.1f", product.getRating()));

        // السعر الأصلي وشطب السعر عند وجود خصم
        if (product.getOriginalPrice() > product.getPrice()) {
            holder.tvOriginalPrice.setVisibility(View.VISIBLE);
            holder.tvOriginalPrice.setText(String.format(Locale.US, "%.2f", product.getOriginalPrice()));
            holder.tvOriginalPrice.setPaintFlags(holder.tvOriginalPrice.getPaintFlags() | Paint.STRIKE_THRU_TEXT_FLAG);

            holder.tvDiscountBadge.setVisibility(View.VISIBLE);
            holder.tvDiscountBadge.setText(String.format(Locale.US, "-%d%%", product.getDiscountPercentage()));
        } else {
            holder.tvOriginalPrice.setVisibility(View.GONE);
            holder.tvDiscountBadge.setVisibility(View.GONE);
        }

        // صورة المنتج بواسطة Glide
        Glide.with(context)
                .load(product.getImageUrl())
                .centerCrop()
                .placeholder(R.drawable.bg_rounded_card)
                .into(holder.ivProduct);

        // أيقونة المفضلة
        holder.ivFavorite.setImageResource(product.isFavorite() ?
                R.drawable.ic_favorite_filled : R.drawable.ic_favorite_border);

        // معالجة الضغط
        holder.itemView.setOnClickListener(v -> listener.onProductClick(product));
        holder.btnAddToCart.setOnClickListener(v -> listener.onAddToCartClick(product));
        holder.ivFavorite.setOnClickListener(v -> listener.onFavoriteClick(product));
    }

    @Override
    public int getItemCount() {
        return products != null ? products.size() : 0;
    }

    public static class ProductViewHolder extends RecyclerView.ViewHolder {
        ImageView ivProduct, ivFavorite;
        TextView tvTitle, tvUnit, tvPrice, tvOriginalPrice, tvRating, tvDiscountBadge;
        MaterialButton btnAddToCart;

        public ProductViewHolder(@NonNull View itemView) {
            super(itemView);
            ivProduct = itemView.findViewById(R.id.ivProduct);
            ivFavorite = itemView.findViewById(R.id.ivFavorite);
            tvTitle = itemView.findViewById(R.id.tvTitle);
            tvUnit = itemView.findViewById(R.id.tvUnit);
            tvPrice = itemView.findViewById(R.id.tvPrice);
            tvOriginalPrice = itemView.findViewById(R.id.tvOriginalPrice);
            tvRating = itemView.findViewById(R.id.tvRating);
            tvDiscountBadge = itemView.findViewById(R.id.tvDiscountBadge);
            btnAddToCart = itemView.findViewById(R.id.btnAddToCart);
        }
    }
}
`
  },
  {
    path: 'app/src/main/java/com/supermarket/app/adapter/CategoryAdapter.java',
    name: 'CategoryAdapter.java',
    category: 'java',
    description: 'محول الأقسام الأفقية مع تحديد القسم النشط',
    content: `package com.supermarket.app.adapter;

import android.content.Context;
import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.core.content.ContextCompat;
import androidx.recyclerview.widget.RecyclerView;
import com.google.android.material.card.MaterialCardView;
import com.supermarket.app.R;
import com.supermarket.app.data.model.Category;
import java.util.List;

public class CategoryAdapter extends RecyclerView.Adapter<CategoryAdapter.CategoryViewHolder> {

    private final Context context;
    private final List<Category> categories;
    private String selectedCategoryId = "all";
    private final OnCategoryClickListener listener;

    public interface OnCategoryClickListener {
        void onCategoryClick(Category category);
    }

    public CategoryAdapter(Context context, List<Category> categories, OnCategoryClickListener listener) {
        this.context = context;
        this.categories = categories;
        this.listener = listener;
    }

    public void setSelectedCategoryId(String id) {
        this.selectedCategoryId = id;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public CategoryViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.item_category, parent, false);
        return new CategoryViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull CategoryViewHolder holder, int position) {
        Category category = categories.get(position);
        boolean isSelected = category.getId().equalsIgnoreCase(selectedCategoryId);

        holder.tvIcon.setText(category.getIconEmoji());
        holder.tvName.setText(category.getNameAr());

        if (isSelected) {
            holder.cardCategory.setCardBackgroundColor(ContextCompat.getColor(context, R.color.emerald_primary));
            holder.tvName.setTextColor(Color.WHITE);
        } else {
            holder.cardCategory.setCardBackgroundColor(ContextCompat.getColor(context, R.color.card_background));
            holder.tvName.setTextColor(ContextCompat.getColor(context, R.color.text_primary));
        }

        holder.itemView.setOnClickListener(v -> {
            selectedCategoryId = category.getId();
            notifyDataSetChanged();
            listener.onCategoryClick(category);
        });
    }

    @Override
    public int getItemCount() {
        return categories.size();
    }

    public static class CategoryViewHolder extends RecyclerView.ViewHolder {
        MaterialCardView cardCategory;
        TextView tvIcon, tvName;

        public CategoryViewHolder(@NonNull View itemView) {
            super(itemView);
            cardCategory = itemView.findViewById(R.id.cardCategory);
            tvIcon = itemView.findViewById(R.id.tvIcon);
            tvName = itemView.findViewById(R.id.tvName);
        }
    }
}
`
  },
  {
    path: 'app/src/main/java/com/supermarket/app/adapter/CartAdapter.java',
    name: 'CartAdapter.java',
    category: 'java',
    description: 'محول سلة المشتريات مع أزرار زيادة ونقصان الكمية والحذف',
    content: `package com.supermarket.app.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.bumptech.glide.Glide;
import com.supermarket.app.R;
import com.supermarket.app.data.model.CartItem;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public class CartAdapter extends RecyclerView.Adapter<CartAdapter.CartViewHolder> {

    private final Context context;
    private List<CartItem> items = new ArrayList<>();
    private final OnCartActionClickListener listener;

    public interface OnCartActionClickListener {
        void onQuantityChanged(CartItem item, int newQuantity);
        void onRemoveItem(CartItem item);
    }

    public CartAdapter(Context context, OnCartActionClickListener listener) {
        this.context = context;
        this.listener = listener;
    }

    public void setItems(List<CartItem> items) {
        this.items = items;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public CartViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.item_cart, parent, false);
        return new CartViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull CartViewHolder holder, int position) {
        CartItem item = items.get(position);

        holder.tvTitle.setText(item.getProduct().getNameAr());
        holder.tvUnitPrice.setText(String.format(Locale.US, "%.2f ريال / %s",
                item.getProduct().getPrice(), item.getProduct().getUnit()));
        holder.tvTotalPrice.setText(String.format(Locale.US, "%.2f ريال", item.getTotalPrice()));
        holder.tvQuantity.setText(String.valueOf(item.getQuantity()));

        Glide.with(context)
                .load(item.getProduct().getImageUrl())
                .centerCrop()
                .into(holder.ivProduct);

        holder.btnPlus.setOnClickListener(v ->
                listener.onQuantityChanged(item, item.getQuantity() + 1));

        holder.btnMinus.setOnClickListener(v -> {
            if (item.getQuantity() > 1) {
                listener.onQuantityChanged(item, item.getQuantity() - 1);
            } else {
                listener.onRemoveItem(item);
            }
        });

        holder.btnDelete.setOnClickListener(v -> listener.onRemoveItem(item));
    }

    @Override
    public int getItemCount() {
        return items != null ? items.size() : 0;
    }

    public static class CartViewHolder extends RecyclerView.ViewHolder {
        ImageView ivProduct, btnDelete;
        TextView tvTitle, tvUnitPrice, tvTotalPrice, tvQuantity;
        View btnPlus, btnMinus;

        public CartViewHolder(@NonNull View itemView) {
            super(itemView);
            ivProduct = itemView.findViewById(R.id.ivProduct);
            btnDelete = itemView.findViewById(R.id.btnDelete);
            tvTitle = itemView.findViewById(R.id.tvTitle);
            tvUnitPrice = itemView.findViewById(R.id.tvUnitPrice);
            tvTotalPrice = itemView.findViewById(R.id.tvTotalPrice);
            tvQuantity = itemView.findViewById(R.id.tvQuantity);
            btnPlus = itemView.findViewById(R.id.btnPlus);
            btnMinus = itemView.findViewById(R.id.btnMinus);
        }
    }
}
`
  },

  // ----------------------------------------------------
  // Java Activities
  // ----------------------------------------------------
  {
    path: 'app/src/main/java/com/supermarket/app/ui/SplashActivity.java',
    name: 'SplashActivity.java',
    category: 'java',
    description: 'شاشة البداية الافتتاحية مع مؤثرات حركية فاخرة',
    content: `package com.supermarket.app.ui;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import androidx.appcompat.app.AppCompatActivity;
import com.supermarket.app.R;
import com.supermarket.app.databinding.ActivitySplashBinding;

@SuppressLint("CustomSplashScreen")
public class SplashActivity extends AppCompatActivity {

    private ActivitySplashBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivitySplashBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        // أنيميشن ظهور الشعار والنصوص بسلاسة
        Animation fadeInScale = AnimationUtils.loadAnimation(this, R.anim.fade_in_scale);
        binding.layoutLogoContainer.startAnimation(fadeInScale);

        // الانتقال للشاشة الرئيسية بعد 2.5 ثانية
        new Handler(Looper.getMainLooper()).postDelayed(() -> {
            Intent intent = new Intent(SplashActivity.this, MainActivity.class);
            startActivity(intent);
            finish();
            overridePendingTransition(android.R.anim.fade_in, android.R.anim.fade_out);
        }, 2500);
    }
}
`
  },
  {
    path: 'app/src/main/java/com/supermarket/app/ui/MainActivity.java',
    name: 'MainActivity.java',
    category: 'java',
    description: 'النشاط الرئيسي مع البنرات المتحركة والأقسام والأكثر مبيعاً والبحث',
    content: `package com.supermarket.app.ui;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.viewpager2.widget.ViewPager2;
import com.google.android.material.snackbar.Snackbar;
import com.supermarket.app.R;
import com.supermarket.app.adapter.BannerAdapter;
import com.supermarket.app.adapter.CategoryAdapter;
import com.supermarket.app.adapter.ProductAdapter;
import com.supermarket.app.data.model.Category;
import com.supermarket.app.data.model.Product;
import com.supermarket.app.databinding.ActivityMainBinding;
import com.supermarket.app.viewmodel.MainViewModel;
import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity implements
        ProductAdapter.OnProductClickListener,
        CategoryAdapter.OnCategoryClickListener {

    private ActivityMainBinding binding;
    private MainViewModel viewModel;
    private ProductAdapter bestSellersAdapter;
    private ProductAdapter dealsAdapter;
    private ProductAdapter allProductsAdapter;
    private CategoryAdapter categoryAdapter;
    private final Handler bannerHandler = new Handler(Looper.getMainLooper());
    private Runnable bannerRunnable;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        viewModel = new ViewModelProvider(this).get(MainViewModel.class);

        setupBanners();
        setupCategories();
        setupRecyclers();
        setupSearchAndFilter();
        setupBottomNavigation();
        observeData();
    }

    private void setupBanners() {
        BannerAdapter bannerAdapter = new BannerAdapter(this);
        binding.viewPagerBanners.setAdapter(bannerAdapter);

        // تدوير البنرات آلياً كل 4 ثوانٍ
        bannerRunnable = () -> {
            int current = binding.viewPagerBanners.getCurrentItem();
            int total = bannerAdapter.getItemCount();
            binding.viewPagerBanners.setCurrentItem((current + 1) % total, true);
            bannerHandler.postDelayed(bannerRunnable, 4000);
        };
        bannerHandler.postDelayed(bannerRunnable, 4000);
    }

    private void setupCategories() {
        List<Category> categories = new ArrayList<>();
        categories.add(new Category("all", "الكل", "All", "🛒", 48));
        categories.add(new Category("fruits_veg", "خضار وفواكه", "Fruits", "🍎", 16));
        categories.add(new Category("dairy", "ألبان وأجبان", "Dairy", "🧀", 12));
        categories.add(new Category("bakery", "مخبوزات", "Bakery", "🥐", 8));
        categories.add(new Category("meat", "لحوم ودواجن", "Meat", "🥩", 10));
        categories.add(new Category("beverages", "مشروبات", "Drinks", "🧃", 14));
        categories.add(new Category("pantry", "معلبات ومؤونة", "Pantry", "🥫", 18));

        categoryAdapter = new CategoryAdapter(this, categories, this);
        binding.rvCategories.setLayoutManager(new LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false));
        binding.rvCategories.setAdapter(categoryAdapter);
    }

    private void setupRecyclers() {
        // الأكثر مبيعاً
        bestSellersAdapter = new ProductAdapter(this, this);
        binding.rvBestSellers.setLayoutManager(new LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false));
        binding.rvBestSellers.setAdapter(bestSellersAdapter);

        // عروض اليوم
        dealsAdapter = new ProductAdapter(this, this);
        binding.rvDailyDeals.setLayoutManager(new LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false));
        binding.rvDailyDeals.setAdapter(dealsAdapter);

        // شبكة كافة المنتجات
        allProductsAdapter = new ProductAdapter(this, this);
        binding.rvAllProducts.setLayoutManager(new GridLayoutManager(this, 2));
        binding.rvAllProducts.setAdapter(allProductsAdapter);
    }

    private void setupSearchAndFilter() {
        binding.etSearch.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {}

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                String query = s.toString().trim();
                if (!query.isEmpty()) {
                    viewModel.search(query);
                    binding.layoutSections.setVisibility(View.GONE);
                    binding.rvSearchResults.setVisibility(View.VISIBLE);
                } else {
                    binding.layoutSections.setVisibility(View.VISIBLE);
                    binding.rvSearchResults.setVisibility(View.GONE);
                }
            }

            @Override
            public void afterTextChanged(Editable s) {}
        });

        binding.btnCartBadge.setOnClickListener(v -> {
            Intent intent = new Intent(MainActivity.this, CartActivity.class);
            startActivity(intent);
        });
    }

    private void setupBottomNavigation() {
        binding.bottomNav.setOnItemSelectedListener(item -> {
            int itemId = item.getItemId();
            if (itemId == R.id.nav_home) {
                binding.scrollViewMain.smoothScrollTo(0, 0);
                return true;
            } else if (itemId == R.id.nav_cart) {
                startActivity(new Intent(this, CartActivity.class));
                return false;
            } else if (itemId == R.id.nav_orders) {
                startActivity(new Intent(this, OrderTrackingActivity.class));
                return false;
            } else if (itemId == R.id.nav_profile) {
                Toast.makeText(this, "الملف الشخصي وقائمة الرغبات", Toast.LENGTH_SHORT).show();
                return true;
            }
            return false;
        });
    }

    private void observeData() {
        viewModel.getProducts().observe(this, products -> allProductsAdapter.setProducts(products));
        viewModel.getBestSellers().observe(this, products -> bestSellersAdapter.setProducts(products));
        viewModel.getDailyDeals().observe(this, products -> dealsAdapter.setProducts(products));

        viewModel.getCartCount().observe(this, count -> {
            if (count != null && count > 0) {
                binding.tvCartBadge.setVisibility(View.VISIBLE);
                binding.tvCartBadge.setText(String.valueOf(count));
            } else {
                binding.tvCartBadge.setVisibility(View.GONE);
            }
        });
    }

    @Override
    public void onProductClick(Product product) {
        Intent intent = new Intent(this, ProductDetailActivity.class);
        intent.putExtra("PRODUCT_EXTRA", product);
        startActivity(intent);
    }

    @Override
    public void onAddToCartClick(Product product) {
        viewModel.addToCart(product, 1);
        Snackbar.make(binding.getRoot(), "تمت إضافة " + product.getNameAr() + " إلى السلة بنجاح!", Snackbar.LENGTH_SHORT)
                .setAction("عرض السلة", v -> startActivity(new Intent(this, CartActivity.class)))
                .show();
    }

    @Override
    public void onFavoriteClick(Product product) {
        viewModel.toggleFavorite(product);
        String msg = product.isFavorite() ? "تمت الإزالة من المفضلة" : "تمت الإضافة للمفضلة ❤️";
        Toast.makeText(this, msg, Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onCategoryClick(Category category) {
        viewModel.selectCategory(category.getId());
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (bannerRunnable != null) {
            bannerHandler.removeCallbacks(bannerRunnable);
        }
    }
}
`
  },
  {
    path: 'app/src/main/java/com/supermarket/app/ui/ProductDetailActivity.java',
    name: 'ProductDetailActivity.java',
    category: 'java',
    description: 'شاشة تفاصيل المنتج مع محدد الكمية والتقييمات وزر الإضافة للسلة',
    content: `package com.supermarket.app.ui;

import android.content.Intent;
import android.graphics.Paint;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;
import com.bumptech.glide.Glide;
import com.google.android.material.snackbar.Snackbar;
import com.supermarket.app.R;
import com.supermarket.app.data.model.Product;
import com.supermarket.app.databinding.ActivityProductDetailBinding;
import com.supermarket.app.viewmodel.MainViewModel;
import java.util.Locale;

public class ProductDetailActivity extends AppCompatActivity {

    private ActivityProductDetailBinding binding;
    private MainViewModel viewModel;
    private Product product;
    private int quantity = 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityProductDetailBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        viewModel = new ViewModelProvider(this).get(MainViewModel.class);

        product = (Product) getIntent().getSerializableExtra("PRODUCT_EXTRA");
        if (product == null) {
            finish();
            return;
        }

        bindProductData();
        setupListeners();
    }

    private void bindProductData() {
        binding.tvProductName.setText(product.getNameAr());
        binding.tvCategoryBadge.setText(product.getCategoryNameAr());
        binding.tvDescription.setText(product.getDescriptionAr());
        binding.tvPrice.setText(String.format(Locale.US, "%.2f ريال", product.getPrice()));
        binding.tvUnit.setText(product.getUnit());
        binding.tvRating.setText(String.format(Locale.US, "★ %.1f (%d تقييم)",
                product.getRating(), product.getReviewsCount()));

        if (product.getOriginalPrice() > product.getPrice()) {
            binding.tvOriginalPrice.setVisibility(View.VISIBLE);
            binding.tvOriginalPrice.setText(String.format(Locale.US, "%.2f ريال", product.getOriginalPrice()));
            binding.tvOriginalPrice.setPaintFlags(binding.tvOriginalPrice.getPaintFlags() | Paint.STRIKE_THRU_TEXT_FLAG);

            binding.tvDiscountBadge.setVisibility(View.VISIBLE);
            binding.tvDiscountBadge.setText(String.format(Locale.US, "-%d%% خصم", product.getDiscountPercentage()));
        } else {
            binding.tvOriginalPrice.setVisibility(View.GONE);
            binding.tvDiscountBadge.setVisibility(View.GONE);
        }

        Glide.with(this)
                .load(product.getImageUrl())
                .centerCrop()
                .placeholder(R.drawable.bg_rounded_card)
                .into(binding.ivProductImage);

        updateQuantityViews();
    }

    private void setupListeners() {
        binding.btnBack.setOnClickListener(v -> finish());

        binding.btnFavorite.setOnClickListener(v -> {
            viewModel.toggleFavorite(product);
            product.setFavorite(!product.isFavorite());
            binding.btnFavorite.setImageResource(product.isFavorite() ?
                    R.drawable.ic_favorite_filled : R.drawable.ic_favorite_border);
            Toast.makeText(this, product.isFavorite() ? "أضيف للمفضلة ❤️" : "حذف من المفضلة", Toast.LENGTH_SHORT).show();
        });

        binding.btnPlus.setOnClickListener(v -> {
            quantity++;
            updateQuantityViews();
        });

        binding.btnMinus.setOnClickListener(v -> {
            if (quantity > 1) {
                quantity--;
                updateQuantityViews();
            }
        });

        binding.btnAddToCart.setOnClickListener(v -> {
            viewModel.addToCart(product, quantity);
            Snackbar.make(binding.getRoot(),
                    "تمت إضافة " + quantity + " من " + product.getNameAr() + " إلى السلة!",
                    Snackbar.LENGTH_LONG)
                    .setAction("عرض السلة", view -> startActivity(new Intent(this, CartActivity.class)))
                    .show();
        });
    }

    private void updateQuantityViews() {
        binding.tvQuantity.setText(String.valueOf(quantity));
        double totalPrice = product.getPrice() * quantity;
        binding.tvTotalPriceBottom.setText(String.format(Locale.US, "%.2f ريال", totalPrice));
    }
}
`
  },
  {
    path: 'app/src/main/java/com/supermarket/app/ui/CartActivity.java',
    name: 'CartActivity.java',
    category: 'java',
    description: 'شاشة سلة المشتريات مع نظام كوبونات الخصم وحساب الضريبة والتوصيل',
    content: `package com.supermarket.app.ui;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import com.supermarket.app.adapter.CartAdapter;
import com.supermarket.app.data.model.CartItem;
import com.supermarket.app.databinding.ActivityCartBinding;
import com.supermarket.app.viewmodel.MainViewModel;
import java.util.List;
import java.util.Locale;

public class CartActivity extends AppCompatActivity implements CartAdapter.OnCartActionClickListener {

    private ActivityCartBinding binding;
    private MainViewModel viewModel;
    private CartAdapter adapter;
    private double currentSubtotal = 0.0;
    private double discountRate = 0.0;
    private static final double DELIVERY_FEE = 12.00;
    private static final double TAX_RATE = 0.15; // ضريبة القيمة المضافة 15%

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityCartBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        viewModel = new ViewModelProvider(this).get(MainViewModel.class);

        setupRecyclerView();
        setupCouponSystem();
        setupListeners();
        observeCart();
    }

    private void setupRecyclerView() {
        adapter = new CartAdapter(this, this);
        binding.rvCartItems.setLayoutManager(new LinearLayoutManager(this));
        binding.rvCartItems.setAdapter(adapter);
    }

    private void setupListeners() {
        binding.btnBack.setOnClickListener(v -> finish());
        binding.btnContinueShopping.setOnClickListener(v -> finish());

        binding.btnCheckout.setOnClickListener(v -> {
            if (currentSubtotal > 0) {
                Intent intent = new Intent(CartActivity.this, CheckoutActivity.class);
                intent.putExtra("SUBTOTAL", currentSubtotal);
                intent.putExtra("DISCOUNT_RATE", discountRate);
                startActivity(intent);
            } else {
                Toast.makeText(this, "سلتك فارغة!", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void setupCouponSystem() {
        binding.btnApplyCoupon.setOnClickListener(v -> {
            String code = binding.etCouponCode.getText().toString().trim().toUpperCase();
            if ("SAVE20".equals(code)) {
                discountRate = 0.20; // خصم 20%
                Toast.makeText(this, "تم تطبيق كود الخصم 20% بنجاح! 🎉", Toast.LENGTH_SHORT).show();
            } else if ("FREESHIP".equals(code)) {
                discountRate = 0.10;
                Toast.makeText(this, "تم تفعيل خصم الشحن! 🚚", Toast.LENGTH_SHORT).show();
            } else {
                Toast.makeText(this, "كود الخصم غير صالح. جرب SAVE20", Toast.LENGTH_SHORT).show();
                discountRate = 0.0;
            }
            calculateSummary();
        });
    }

    private void observeCart() {
        viewModel.getCartItems().observe(this, (List<CartItem> items) -> {
            if (items == null || items.isEmpty()) {
                binding.layoutEmptyCart.setVisibility(View.VISIBLE);
                binding.layoutCartContent.setVisibility(View.GONE);
                binding.layoutBottomSummary.setVisibility(View.GONE);
            } else {
                binding.layoutEmptyCart.setVisibility(View.GONE);
                binding.layoutCartContent.setVisibility(View.VISIBLE);
                binding.layoutBottomSummary.setVisibility(View.VISIBLE);

                adapter.setItems(items);

                // حساب المجموع الإجمالي
                currentSubtotal = 0.0;
                for (CartItem item : items) {
                    currentSubtotal += item.getTotalPrice();
                }
                calculateSummary();
            }
        });
    }

    private void calculateSummary() {
        double discountAmount = currentSubtotal * discountRate;
        double taxableAmount = currentSubtotal - discountAmount;
        double tax = taxableAmount * TAX_RATE;
        double delivery = (currentSubtotal > 150) ? 0.0 : DELIVERY_FEE;
        double grandTotal = taxableAmount + tax + delivery;

        binding.tvSubtotal.setText(String.format(Locale.US, "%.2f ريال", currentSubtotal));
        binding.tvDiscount.setText(String.format(Locale.US, "-%.2f ريال", discountAmount));
        binding.tvDeliveryFee.setText(delivery == 0 ? "مجاناً" : String.format(Locale.US, "%.2f ريال", delivery));
        binding.tvTax.setText(String.format(Locale.US, "%.2f ريال", tax));
        binding.tvGrandTotal.setText(String.format(Locale.US, "%.2f ريال", grandTotal));
    }

    @Override
    public void onQuantityChanged(CartItem item, int newQuantity) {
        viewModel.updateCartQuantity(item, newQuantity);
    }

    @Override
    public void onRemoveItem(CartItem item) {
        viewModel.removeFromCart(item);
        Toast.makeText(this, "تم حذف المنتج من السلة", Toast.LENGTH_SHORT).show();
    }
}
`
  },
  {
    path: 'app/src/main/java/com/supermarket/app/ui/CheckoutActivity.java',
    name: 'CheckoutActivity.java',
    category: 'java',
    description: 'شاشة الدفع وتحديد طريقة السداد وموقع التوصيل',
    content: `package com.supermarket.app.ui;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;
import com.supermarket.app.R;
import com.supermarket.app.databinding.ActivityCheckoutBinding;
import com.supermarket.app.viewmodel.MainViewModel;
import java.util.Locale;

public class CheckoutActivity extends AppCompatActivity {

    private ActivityCheckoutBinding binding;
    private MainViewModel viewModel;
    private double subtotal = 0.0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityCheckoutBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        viewModel = new ViewModelProvider(this).get(MainViewModel.class);
        subtotal = getIntent().getDoubleExtra("SUBTOTAL", 0.0);

        binding.tvOrderTotal.setText(String.format(Locale.US, "%.2f ريال", subtotal * 1.15 + 12.0));

        binding.btnBack.setOnClickListener(v -> finish());

        binding.btnConfirmOrder.setOnClickListener(v -> {
            String address = binding.etDeliveryAddress.getText().toString().trim();
            if (address.isEmpty()) {
                binding.etDeliveryAddress.setError("يرجى إدخال عنوان التوصيل بدقة");
                return;
            }

            // تفريغ السلة بعد إتمام الطلب بنجاح
            viewModel.clearCart();

            Toast.makeText(this, "تم تأكيد طلبك بنجاح! 🎉 جاري نقلك للتتبع...", Toast.LENGTH_LONG).show();

            Intent intent = new Intent(CheckoutActivity.this, OrderTrackingActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
            startActivity(intent);
        });
    }
}
`
  },
  {
    path: 'app/src/main/java/com/supermarket/app/ui/OrderTrackingActivity.java',
    name: 'OrderTrackingActivity.java',
    category: 'java',
    description: 'شاشة تتبع الطلب خطوة بخطوة مع مسار السائق والمراحل',
    content: `package com.supermarket.app.ui;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.View;
import androidx.appcompat.app.AppCompatActivity;
import com.supermarket.app.R;
import com.supermarket.app.databinding.ActivityOrderTrackingBinding;

public class OrderTrackingActivity extends AppCompatActivity {

    private ActivityOrderTrackingBinding binding;
    private int currentStep = 1;
    private final Handler statusHandler = new Handler(Looper.getMainLooper());

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityOrderTrackingBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        binding.btnBackHome.setOnClickListener(v -> {
            Intent intent = new Intent(OrderTrackingActivity.this, MainActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
            startActivity(intent);
            finish();
        });

        // محاكاة مراحل تحضير وتوصيل الطلب واقعياً
        simulateOrderProgress();
    }

    private void simulateOrderProgress() {
        // الخطوة 1: تم استلام وتأكيد الطلب
        updateStepUI(1, "تم استلام الطلب وتأكيده بنجاح", "يتم مراجعة الأصناف الآن");

        // الخطوة 2: بعد 5 ثوانٍ
        statusHandler.postDelayed(() -> {
            updateStepUI(2, "جاري تحضير وتغليف المنتجات 📦", "مندوب السوبرماركت يجمع الطلبات الطازجة");
        }, 5000);

        // الخطوة 3: بعد 10 ثوانٍ
        statusHandler.postDelayed(() -> {
            updateStepUI(3, "الطلب في الطريق إليك 🛵", "الكابتن أحمد في الطريق إلى عنوانك");
            binding.layoutRiderInfo.setVisibility(View.VISIBLE);
        }, 10000);
    }

    private void updateStepUI(int step, String title, String subtitle) {
        currentStep = step;
        binding.tvStatusTitle.setText(title);
        binding.tvStatusSubtitle.setText(subtitle);

        if (step >= 1) {
            binding.step1Indicator.setBackgroundResource(R.drawable.bg_step_active);
        }
        if (step >= 2) {
            binding.step2Indicator.setBackgroundResource(R.drawable.bg_step_active);
            binding.line1.setBackgroundColor(getResources().getColor(R.color.emerald_primary));
        }
        if (step >= 3) {
            binding.step3Indicator.setBackgroundResource(R.drawable.bg_step_active);
            binding.line2.setBackgroundColor(getResources().getColor(R.color.emerald_primary));
        }
    }
}
`
  },

  // ----------------------------------------------------
  // XML Layouts
  // ----------------------------------------------------
  {
    path: 'app/src/main/res/layout/activity_splash.xml',
    name: 'activity_splash.xml',
    category: 'xml',
    description: 'واجهة الشاشة الافتتاحية الماتيريال مع التدرج اللوني والشعار',
    content: `<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@drawable/bg_splash_gradient">

    <LinearLayout
        android:id="@+id/layoutLogoContainer"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:gravity="center"
        android:orientation="vertical"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent">

        <!-- أيقونة السوبرماركت الفاخرة -->
        <com.google.android.material.card.MaterialCardView
            android:layout_width="110dp"
            android:layout_height="110dp"
            app:cardCornerRadius="28dp"
            app:cardElevation="12dp"
            app:cardBackgroundColor="@color/white">

            <ImageView
                android:layout_width="70dp"
                android:layout_height="70dp"
                android:layout_gravity="center"
                android:src="@drawable/ic_shopping_cart"
                app:tint="@color/emerald_primary" />

        </com.google.android.material.card.MaterialCardView>

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="20dp"
            android:text="@string/app_name"
            android:textColor="@color/white"
            android:textSize="26sp"
            android:textStyle="bold" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="6dp"
            android:text="كل ما تحتاجه لباب بيتك طازجاً وسريعاً"
            android:textColor="#E0F2FE"
            android:textSize="14sp" />

    </LinearLayout>

    <ProgressBar
        android:layout_width="36dp"
        android:layout_height="36dp"
        android:layout_marginBottom="40dp"
        android:indeterminateTint="@color/white"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
`
  },
  {
    path: 'app/src/main/res/layout/activity_main.xml',
    name: 'activity_main.xml',
    category: 'xml',
    description: 'واجهة الشاشة الرئيسية الشاملة مع شريط البحث والبنر والأقسام وشبكة المنتجات',
    content: `<?xml version="1.0" encoding="utf-8"?>
<androidx.coordinatorlayout.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/window_background">

    <com.google.android.material.appbar.AppBarLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="@color/emerald_primary"
        app:elevation="0dp">

        <!-- شريط الرأس مع العنوان وأيقونة السلة -->
        <androidx.appcompat.widget.Toolbar
            android:id="@+id/toolbar"
            android:layout_width="match_parent"
            android:layout_height="?attr/actionBarSize">

            <RelativeLayout
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:paddingEnd="16dp">

                <LinearLayout
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_centerVertical="true"
                    android:orientation="vertical">

                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="التوصيل إلى:"
                        android:textColor="#D1FAE5"
                        android:textSize="11sp" />

                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="الرياض، حي العليا 📍"
                        android:textColor="@color/white"
                        android:textSize="14sp"
                        android:textStyle="bold" />

                </LinearLayout>

                <FrameLayout
                    android:id="@+id/btnCartBadge"
                    android:layout_width="48dp"
                    android:layout_height="48dp"
                    android:layout_alignParentEnd="true"
                    android:layout_centerVertical="true">

                    <ImageView
                        android:layout_width="26dp"
                        android:layout_height="26dp"
                        android:layout_gravity="center"
                        android:src="@drawable/ic_shopping_bag"
                        app:tint="@color/white" />

                    <TextView
                        android:id="@+id/tvCartBadge"
                        android:layout_width="20dp"
                        android:layout_height="20dp"
                        android:layout_gravity="top|end"
                        android:background="@drawable/bg_badge_circle"
                        android:gravity="center"
                        android:text="3"
                        android:textColor="@color/white"
                        android:textSize="11sp"
                        android:textStyle="bold"
                        android:visibility="gone" />

                </FrameLayout>

            </RelativeLayout>

        </androidx.appcompat.widget.Toolbar>

        <!-- حقل البحث الذكي -->
        <com.google.android.material.card.MaterialCardView
            android:layout_width="match_parent"
            android:layout_height="48dp"
            android:layout_marginHorizontal="16dp"
            android:layout_marginBottom="12dp"
            app:cardCornerRadius="24dp"
            app:cardElevation="3dp"
            app:cardBackgroundColor="@color/white">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:gravity="center_vertical"
                android:paddingHorizontal="16dp">

                <ImageView
                    android:layout_width="22dp"
                    android:layout_height="22dp"
                    android:src="@drawable/ic_search"
                    app:tint="@color/text_secondary" />

                <EditText
                    android:id="@+id/etSearch"
                    android:layout_width="0dp"
                    android:layout_height="match_parent"
                    android:layout_weight="1"
                    android:background="@null"
                    android:hint="ابحث عن خضار، لحوم، ألبان، عروض..."
                    android:paddingHorizontal="10dp"
                    android:textColor="@color/text_primary"
                    android:textColorHint="@color/text_secondary"
                    android:textSize="14sp" />

            </LinearLayout>

        </com.google.android.material.card.MaterialCardView>

    </com.google.android.material.appbar.AppBarLayout>

    <!-- المحتوى القابل للتمرير -->
    <androidx.core.widget.NestedScrollView
        android:id="@+id/scrollViewMain"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:fillViewport="true"
        app:layout_behavior="@string/appbar_scrolling_view_behavior">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="vertical"
            android:paddingBottom="80dp">

            <!-- نتائج البحث السريع -->
            <androidx.recyclerview.widget.RecyclerView
                android:id="@+id/rvSearchResults"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:padding="8dp"
                android:visibility="gone" />

            <LinearLayout
                android:id="@+id/layoutSections"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:orientation="vertical">

                <!-- شريط البنرات الإعلانية المتحركة -->
                <androidx.viewpager2.widget.ViewPager2
                    android:id="@+id/viewPagerBanners"
                    android:layout_width="match_parent"
                    android:layout_height="170dp"
                    android:layout_marginTop="12dp" />

                <!-- الأقسام والتصنيفات -->
                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginStart="16dp"
                    android:layout_marginTop="16dp"
                    android:text="الأقسام والتصنيفات"
                    android:textColor="@color/text_primary"
                    android:textSize="17sp"
                    android:textStyle="bold" />

                <androidx.recyclerview.widget.RecyclerView
                    android:id="@+id/rvCategories"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="8dp"
                    android:clipToPadding="false"
                    android:paddingHorizontal="12dp" />

                <!-- عروض اليوم الحصرية -->
                <RelativeLayout
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:layout_marginHorizontal="16dp"
                    android:layout_marginTop="20dp">

                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="عروض اليوم الحصرية 🔥"
                        android:textColor="@color/text_primary"
                        android:textSize="17sp"
                        android:textStyle="bold" />

                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:layout_alignParentEnd="true"
                        android:text="مشاهدة الكل"
                        android:textColor="@color/emerald_primary"
                        android:textSize="13sp"
                        android:textStyle="bold" />

                </RelativeLayout>

                <androidx.recyclerview.widget.RecyclerView
                    android:id="@+id/rvDailyDeals"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="8dp"
                    android:clipToPadding="false"
                    android:paddingHorizontal="12dp" />

                <!-- المنتجات الأكثر طلباً ومبيعاً -->
                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginStart="16dp"
                    android:layout_marginTop="20dp"
                    android:text="الأكثر طلباً ومبيعاً ⭐"
                    android:textColor="@color/text_primary"
                    android:textSize="17sp"
                    android:textStyle="bold" />

                <androidx.recyclerview.widget.RecyclerView
                    android:id="@+id/rvBestSellers"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="8dp"
                    android:clipToPadding="false"
                    android:paddingHorizontal="12dp" />

                <!-- كافة المنتجات -->
                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginStart="16dp"
                    android:layout_marginTop="20dp"
                    android:text="جميع المنتجات الطازجة"
                    android:textColor="@color/text_primary"
                    android:textSize="17sp"
                    android:textStyle="bold" />

                <androidx.recyclerview.widget.RecyclerView
                    android:id="@+id/rvAllProducts"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="8dp"
                    android:nestedScrollingEnabled="false"
                    android:paddingHorizontal="8dp" />

            </LinearLayout>

        </LinearLayout>

    </androidx.core.widget.NestedScrollView>

    <!-- شريط التنقل السفلي -->
    <com.google.android.material.bottomnavigation.BottomNavigationView
        android:id="@+id/bottomNav"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_gravity="bottom"
        android:background="@color/card_background"
        app:itemIconTint="@color/selector_nav_color"
        app:itemTextColor="@color/selector_nav_color"
        app:menu="@menu/bottom_nav_menu" />

</androidx.coordinatorlayout.widget.CoordinatorLayout>
`
  },
  {
    path: 'app/src/main/res/layout/item_product.xml',
    name: 'item_product.xml',
    category: 'xml',
    description: 'تصميم كارت المنتج الماتيريال المودرن مع شارة الخصم والتقييم',
    content: `<?xml version="1.0" encoding="utf-8"?>
<com.google.android.material.card.MaterialCardView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="170dp"
    android:layout_height="wrap_content"
    android:layout_margin="6dp"
    app:cardCornerRadius="16dp"
    app:cardElevation="2dp"
    app:strokeWidth="1dp"
    app:strokeColor="#E2E8F0"
    app:cardBackgroundColor="@color/card_background">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:padding="8dp">

        <FrameLayout
            android:layout_width="match_parent"
            android:layout_height="120dp">

            <ImageView
                android:id="@+id/ivProduct"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:scaleType="centerCrop"
                tools:src="@drawable/bg_rounded_card" />

            <TextView
                android:id="@+id/tvDiscountBadge"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_gravity="top|start"
                android:background="@drawable/bg_discount_tag"
                android:paddingHorizontal="8dp"
                android:paddingVertical="3dp"
                android:text="-20%"
                android:textColor="@color/white"
                android:textSize="11sp"
                android:textStyle="bold" />

            <ImageView
                android:id="@+id/ivFavorite"
                android:layout_width="32dp"
                android:layout_height="32dp"
                android:layout_gravity="top|end"
                android:background="@drawable/bg_circle_trans"
                android:padding="6dp"
                android:src="@drawable/ic_favorite_border"
                app:tint="@color/red_accent" />

        </FrameLayout>

        <TextView
            android:id="@+id/tvTitle"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="8dp"
            android:ellipsize="end"
            android:maxLines="2"
            android:textColor="@color/text_primary"
            android:textSize="13sp"
            android:textStyle="bold"
            tools:text="تفاح أحمر إيطالي فاخر" />

        <TextView
            android:id="@+id/tvUnit"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="2dp"
            android:textColor="@color/text_secondary"
            android:textSize="11sp"
            tools:text="1 كجم" />

        <TextView
            android:id="@+id/tvRating"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="3dp"
            android:textColor="#F59E0B"
            android:textSize="11sp"
            android:textStyle="bold"
            tools:text="★ 4.8" />

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="6dp"
            android:gravity="center_vertical"
            android:orientation="horizontal">

            <TextView
                android:id="@+id/tvPrice"
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:layout_weight="1"
                android:textColor="@color/emerald_primary"
                android:textSize="14sp"
                android:textStyle="bold"
                tools:text="8.50 ريال" />

            <TextView
                android:id="@+id/tvOriginalPrice"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:textColor="@color/text_secondary"
                android:textSize="11sp"
                tools:text="11.00" />

        </LinearLayout>

        <com.google.android.material.button.MaterialButton
            android:id="@+id/btnAddToCart"
            android:layout_width="match_parent"
            android:layout_height="38dp"
            android:layout_marginTop="8dp"
            android:insetTop="0dp"
            android:insetBottom="0dp"
            android:text="أضف للسلة"
            android:textSize="12sp"
            app:cornerRadius="10dp"
            app:icon="@drawable/ic_plus"
            app:iconSize="14dp"
            app:iconGravity="textStart"
            android:backgroundTint="@color/emerald_primary" />

    </LinearLayout>

</com.google.android.material.card.MaterialCardView>
`
  },
  {
    path: 'app/src/main/res/values/strings.xml',
    name: 'values/strings.xml',
    category: 'xml',
    description: 'ملف النصوص والترجمات العربية والإنجليزية للتطبيق',
    content: `<resources>
    <string name="app_name">سوبر ماركت إكسبريس</string>
    <string name="slogan">تسوق كل طلباتك الطازجة في دقائق</string>

    <!-- Navigation -->
    <string name="nav_home">الرئيسية</string>
    <string name="nav_cart">السلة</string>
    <string name="nav_orders">طلباتي</string>
    <string name="nav_profile">حسابي</string>

    <!-- General -->
    <string name="search_hint">ابحث عن منتج، قسم، أو عرض...</string>
    <string name="add_to_cart">إضافة إلى السلة</string>
    <string name="checkout">متابعة الشراء</string>
    <string name="currency">ريال</string>
    <string name="empty_cart">سلة المشتريات فارغة حالياً</string>
    <string name="start_shopping">ابدأ التسوق الآن</string>
    <string name="order_placed_success">تم تأكيد طلبك بنجاح!</string>
    <string name="apply_coupon">تطبيق الكوبون</string>
</resources>
`
  },
  {
    path: 'app/src/main/res/values/colors.xml',
    name: 'values/colors.xml',
    category: 'xml',
    description: 'ألوان Material Design 3 الفاخرة للوضع النهاري والليلي',
    content: `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <!-- Emerald Palette -->
    <color name="emerald_primary">#059669</color>
    <color name="emerald_light">#10B981</color>
    <color name="emerald_dark">#047857</color>
    <color name="emerald_container">#D1FAE5</color>

    <!-- Accents -->
    <color name="amber_accent">#F59E0B</color>
    <color name="red_accent">#EF4444</color>

    <!-- Backgrounds & Surfaces -->
    <color name="white">#FFFFFF</color>
    <color name="window_background">#F8FAFC</color>
    <color name="card_background">#FFFFFF</color>

    <!-- Typography -->
    <color name="text_primary">#0F172A</color>
    <color name="text_secondary">#64748B</color>
    <color name="divider_color">#E2E8F0</color>
</resources>
`
  },
  {
    path: 'app/src/main/res/values/themes.xml',
    name: 'values/themes.xml',
    category: 'xml',
    description: 'ثيم التطبيق العام Material Design 3 للوضع النهاري',
    content: `<resources xmlns:tools="http://schemas.android.com/tools">
    <!-- Base application theme -->
    <style name="Theme.SupermarketApp" parent="Theme.Material3.DayNight.NoActionBar">
        <item name="colorPrimary">@color/emerald_primary</item>
        <item name="colorPrimaryVariant">@color/emerald_dark</item>
        <item name="colorOnPrimary">@color/white</item>
        <item name="colorSecondary">@color/amber_accent</item>
        <item name="android:statusBarColor">@color/emerald_primary</item>
        <item name="android:navigationBarColor">@color/card_background</item>
        <item name="android:windowLightStatusBar" tools:targetApi="m">false</item>
    </style>

    <!-- Splash Screen Theme -->
    <style name="Theme.SupermarketApp.Splash" parent="Theme.Material3.DayNight.NoActionBar">
        <item name="android:statusBarColor">@color/emerald_primary</item>
        <item name="android:windowBackground">@drawable/bg_splash_gradient</item>
    </style>
</resources>
`
  },
  {
    path: 'app/src/main/res/values-night/themes.xml',
    name: 'values-night/themes.xml',
    category: 'xml',
    description: 'ثيم التطبيق للوضع الليلي (Dark Mode)',
    content: `<resources xmlns:tools="http://schemas.android.com/tools">
    <style name="Theme.SupermarketApp" parent="Theme.Material3.DayNight.NoActionBar">
        <item name="colorPrimary">@color/emerald_light</item>
        <item name="colorPrimaryVariant">@color/emerald_dark</item>
        <item name="colorOnPrimary">#000000</item>
        <item name="android:statusBarColor">#0F172A</item>
        <item name="android:navigationBarColor">#1E293B</item>
        <item name="android:windowBackground">#0F172A</item>
        <item name="android:windowLightStatusBar" tools:targetApi="m">false</item>
    </style>
</resources>
`
  },
  {
    path: 'app/src/main/java/com/supermarket/app/adapter/BannerAdapter.java',
    name: 'BannerAdapter.java',
    category: 'java',
    description: 'محول سلايدر البنرات والعروض الترويجية في الصفحة الرئيسية',
    content: `package com.supermarket.app.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.supermarket.app.R;

public class BannerAdapter extends RecyclerView.Adapter<BannerAdapter.BannerViewHolder> {

    private final Context context;
    private final String[] titles = {
        "عروض السوبر ماركت الكبرى 🛒",
        "منتجات الألبان والأجبان الطازجة 🥛",
        "توصيل مجاني لطلبك الأول ⚡"
    };
    private final String[] subtitles = {
        "خصومات تصل إلى 50% على الخضار والفواكه",
        "اشترِ 2 واحصل على 1 مجاناً طوال الأسبوع",
        "استخدم كود التخفيض: FREESHIP عند الدفع"
    };

    public BannerAdapter(Context context) {
        this.context = context;
    }

    @NonNull
    @Override
    public BannerViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.item_banner, parent, false);
        return new BannerViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull BannerViewHolder holder, int position) {
        holder.tvTitle.setText(titles[position]);
        holder.tvSubtitle.setText(subtitles[position]);
    }

    @Override
    public int getItemCount() {
        return titles.length;
    }

    public static class BannerViewHolder extends RecyclerView.ViewHolder {
        TextView tvTitle, tvSubtitle;
        public BannerViewHolder(@NonNull View itemView) {
            super(itemView);
            tvTitle = itemView.findViewById(R.id.tvBannerTitle);
            tvSubtitle = itemView.findViewById(R.id.tvBannerSubtitle);
        }
    }
}
`
  },
  {
    path: 'app/src/main/java/com/supermarket/app/ui/AuthActivity.java',
    name: 'AuthActivity.java',
    category: 'java',
    description: 'شاشة تسجيل الدخول وإنشاء حساب والتسوق كزائر (Guest Mode)',
    content: `package com.supermarket.app.ui;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.supermarket.app.databinding.ActivityAuthBinding;

public class AuthActivity extends AppCompatActivity {

    private ActivityAuthBinding binding;
    private boolean isSignUpMode = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityAuthBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        binding.btnToggleAuthMode.setOnClickListener(v -> {
            isSignUpMode = !isSignUpMode;
            if (isSignUpMode) {
                binding.layoutFullName.setVisibility(View.VISIBLE);
                binding.btnSubmitAuth.setText("إنشاء حساب جديد");
                binding.btnToggleAuthMode.setText("لديك حساب بالفعل؟ تسجيل الدخول");
                binding.tvAuthTitle.setText("انضم إلى عائلة سوبر ماركت إكسبريس");
            } else {
                binding.layoutFullName.setVisibility(View.GONE);
                binding.btnSubmitAuth.setText("تسجيل الدخول");
                binding.btnToggleAuthMode.setText("ليس لديك حساب؟ اشترك مجاناً");
                binding.tvAuthTitle.setText("أهلاً بك مجدداً في سوبر ماركت إكسبريس");
            }
        });

        binding.btnSubmitAuth.setOnClickListener(v -> {
            String email = binding.etEmail.getText().toString().trim();
            String password = binding.etPassword.getText().toString().trim();

            if (email.isEmpty() || !email.contains("@")) {
                binding.etEmail.setError("يرجى إدخال بريد إلكتروني صحيح");
                return;
            }
            if (password.length() < 6) {
                binding.etPassword.setError("كلمة المرور يجب ألا تقل عن 6 خانات");
                return;
            }

            Toast.makeText(this, isSignUpMode ? "تم إنشاء الحساب بنجاح!" : "تم تسجيل الدخول بنجاح!", Toast.LENGTH_SHORT).show();
            proceedToHome();
        });

        binding.btnGuestMode.setOnClickListener(v -> {
            Toast.makeText(this, "الدخول كزائر - يمكنك التسوق بحرية", Toast.LENGTH_SHORT).show();
            proceedToHome();
        });
    }

    private void proceedToHome() {
        Intent intent = new Intent(this, MainActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
    }
}
`
  },
  {
    path: 'app/src/main/res/layout/activity_auth.xml',
    name: 'activity_auth.xml',
    category: 'xml',
    description: 'واجهة تسجيل الدخول وحساب جديد ووضع الزائر',
    content: `<?xml version="1.0" encoding="utf-8"?>
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fillViewport="true"
    android:background="@color/window_background">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:padding="24dp"
        android:gravity="center_horizontal">

        <ImageView
            android:layout_width="80dp"
            android:layout_height="80dp"
            android:layout_marginTop="32dp"
            android:src="@drawable/ic_shopping_cart"
            app:tint="@color/emerald_primary" />

        <TextView
            android:id="@+id/tvAuthTitle"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="20dp"
            android:text="أهلاً بك مجدداً في سوبر ماركت إكسبريس"
            android:textColor="@color/text_primary"
            android:textSize="20sp"
            android:textStyle="bold"
            android:textAlignment="center" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="8dp"
            android:text="سجل دخولك لتتمتع بخصومات حصرية وتتبع طلباتك"
            android:textColor="@color/text_secondary"
            android:textSize="13sp"
            android:textAlignment="center" />

        <com.google.android.material.card.MaterialCardView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="28dp"
            app:cardCornerRadius="20dp"
            app:cardElevation="3dp"
            app:cardBackgroundColor="@color/card_background"
            app:strokeWidth="1dp"
            app:strokeColor="#E2E8F0">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:orientation="vertical"
                android:padding="20dp">

                <com.google.android.material.textfield.TextInputLayout
                    android:id="@+id/layoutFullName"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:hint="الاسم الكامل"
                    android:visibility="gone"
                    style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox">

                    <com.google.android.material.textfield.TextInputEditText
                        android:id="@+id/etFullName"
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:inputType="textPersonName" />

                </com.google.android.material.textfield.TextInputLayout>

                <com.google.android.material.textfield.TextInputLayout
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="12dp"
                    android:hint="البريد الإلكتروني"
                    style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox">

                    <com.google.android.material.textfield.TextInputEditText
                        android:id="@+id/etEmail"
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:inputType="textEmailAddress" />

                </com.google.android.material.textfield.TextInputLayout>

                <com.google.android.material.textfield.TextInputLayout
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="12dp"
                    android:hint="كلمة المرور"
                    app:passwordToggleEnabled="true"
                    style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox">

                    <com.google.android.material.textfield.TextInputEditText
                        android:id="@+id/etPassword"
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:inputType="textPassword" />

                </com.google.android.material.textfield.TextInputLayout>

                <com.google.android.material.button.MaterialButton
                    android:id="@+id/btnSubmitAuth"
                    android:layout_width="match_parent"
                    android:layout_height="52dp"
                    android:layout_marginTop="20dp"
                    android:text="تسجيل الدخول"
                    android:textSize="15sp"
                    android:textStyle="bold"
                    app:cornerRadius="14dp"
                    android:backgroundTint="@color/emerald_primary" />

            </LinearLayout>

        </com.google.android.material.card.MaterialCardView>

        <TextView
            android:id="@+id/btnToggleAuthMode"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="18dp"
            android:padding="8dp"
            android:text="ليس لديك حساب؟ اشترك مجاناً"
            android:textColor="@color/emerald_primary"
            android:textSize="14sp"
            android:textStyle="bold" />

        <TextView
            android:id="@+id/btnGuestMode"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="8dp"
            android:padding="8dp"
            android:text="متابعة كزائر دون تسجيل دخول ←"
            android:textColor="@color/text_secondary"
            android:textSize="13sp" />

    </LinearLayout>

</ScrollView>
`
  },
  {
    path: 'app/src/main/res/layout/activity_product_detail.xml',
    name: 'activity_product_detail.xml',
    category: 'xml',
    description: 'واجهة تفاصيل المنتج مع شريط سفلي ثابت وإمكانية اختيار الكمية',
    content: `<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/window_background">

    <androidx.core.widget.NestedScrollView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_above="@id/bottomBar"
        android:fillViewport="true">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="vertical">

            <!-- الرأس مع صورة المنتج وأزرار الرجوع والمفضلة -->
            <FrameLayout
                android:layout_width="match_parent"
                android:layout_height="320dp"
                android:background="#F1F5F9">

                <ImageView
                    android:id="@+id/ivProductImage"
                    android:layout_width="match_parent"
                    android:layout_height="match_parent"
                    android:scaleType="centerCrop" />

                <!-- زر الرجوع -->
                <ImageView
                    android:id="@+id/btnBack"
                    android:layout_width="42dp"
                    android:layout_height="42dp"
                    android:layout_margin="16dp"
                    android:background="@drawable/bg_circle_trans"
                    android:padding="10dp"
                    android:src="@drawable/ic_arrow_back"
                    app:tint="@color/text_primary" />

                <!-- زر المفضلة -->
                <ImageView
                    android:id="@+id/btnFavorite"
                    android:layout_width="42dp"
                    android:layout_height="42dp"
                    android:layout_gravity="end"
                    android:layout_margin="16dp"
                    android:background="@drawable/bg_circle_trans"
                    android:padding="10dp"
                    android:src="@drawable/ic_favorite_border"
                    app:tint="@color/red_accent" />

                <!-- شارة الخصم -->
                <TextView
                    android:id="@+id/tvDiscountBadge"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_gravity="bottom|start"
                    android:layout_margin="16dp"
                    android:background="@drawable/bg_discount_tag"
                    android:paddingHorizontal="12dp"
                    android:paddingVertical="5dp"
                    android:text="-20% خصم"
                    android:textColor="@color/white"
                    android:textSize="13sp"
                    android:textStyle="bold" />

            </FrameLayout>

            <!-- معلومات وتفاصيل المنتج -->
            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:orientation="vertical"
                android:padding="20dp">

                <TextView
                    android:id="@+id/tvCategoryBadge"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:background="@drawable/bg_category_chip"
                    android:paddingHorizontal="10dp"
                    android:paddingVertical="4dp"
                    android:textColor="@color/emerald_primary"
                    android:textSize="12sp"
                    android:textStyle="bold"
                    tools:text="خضار وفواكه" />

                <TextView
                    android:id="@+id/tvProductName"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="10dp"
                    android:textColor="@color/text_primary"
                    android:textSize="22sp"
                    android:textStyle="bold"
                    tools:text="تفاح أحمر إيطالي طازج فاخر" />

                <LinearLayout
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="8dp"
                    android:gravity="center_vertical">

                    <TextView
                        android:id="@+id/tvRating"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:textColor="#F59E0B"
                        android:textSize="14sp"
                        android:textStyle="bold"
                        tools:text="★ 4.8 (142 تقييم)" />

                    <View
                        android:layout_width="4dp"
                        android:layout_height="4dp"
                        android:layout_marginHorizontal="8dp"
                        android:background="@drawable/bg_badge_circle" />

                    <TextView
                        android:id="@+id/tvUnit"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:textColor="@color/text_secondary"
                        android:textSize="13sp"
                        tools:text="الوزن التقريبي: 1 كجم" />

                </LinearLayout>

                <LinearLayout
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="16dp"
                    android:gravity="center_vertical">

                    <TextView
                        android:id="@+id/tvPrice"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:textColor="@color/emerald_primary"
                        android:textSize="24sp"
                        android:textStyle="bold"
                        tools:text="8.50 ريال" />

                    <TextView
                        android:id="@+id/tvOriginalPrice"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:layout_marginStart="10dp"
                        android:textColor="@color/text_secondary"
                        android:textSize="16sp"
                        tools:text="11.00 ريال" />

                </LinearLayout>

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="20dp"
                    android:text="عن المنتج"
                    android:textColor="@color/text_primary"
                    android:textSize="16sp"
                    android:textStyle="bold" />

                <TextView
                    android:id="@+id/tvDescription"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="8dp"
                    android:lineSpacingExtra="4dp"
                    android:textColor="@color/text_secondary"
                    android:textSize="14sp"
                    tools:text="تفاح أحمر طازج ومقرمش مستورد مباشرة من مزارع إيطاليا..." />

                <!-- محدد الكمية -->
                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="24dp"
                    android:text="الكمية المطلوبة"
                    android:textColor="@color/text_primary"
                    android:textSize="15sp"
                    android:textStyle="bold" />

                <LinearLayout
                    android:layout_width="wrap_content"
                    android:layout_height="48dp"
                    android:layout_marginTop="8dp"
                    android:background="@drawable/bg_quantity_selector"
                    android:gravity="center_vertical"
                    android:paddingHorizontal="8dp">

                    <ImageView
                        android:id="@+id/btnMinus"
                        android:layout_width="36dp"
                        android:layout_height="36dp"
                        android:padding="8dp"
                        android:src="@drawable/ic_minus"
                        app:tint="@color/emerald_primary" />

                    <TextView
                        android:id="@+id/tvQuantity"
                        android:layout_width="48dp"
                        android:layout_height="wrap_content"
                        android:gravity="center"
                        android:text="1"
                        android:textColor="@color/text_primary"
                        android:textSize="16sp"
                        android:textStyle="bold" />

                    <ImageView
                        android:id="@+id/btnPlus"
                        android:layout_width="36dp"
                        android:layout_height="36dp"
                        android:padding="8dp"
                        android:src="@drawable/ic_plus"
                        app:tint="@color/emerald_primary" />

                </LinearLayout>

            </LinearLayout>

        </LinearLayout>

    </androidx.core.widget.NestedScrollView>

    <!-- الشريط السفلي الثابت مع زر الإضافة والسعر الإجمالي -->
    <LinearLayout
        android:id="@+id/bottomBar"
        android:layout_width="match_parent"
        android:layout_height="76dp"
        android:layout_alignParentBottom="true"
        android:background="@color/card_background"
        android:elevation="12dp"
        android:gravity="center_vertical"
        android:orientation="horizontal"
        android:paddingHorizontal="20dp">

        <LinearLayout
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:orientation="vertical">

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="الإجمالي"
                android:textColor="@color/text_secondary"
                android:textSize="12sp" />

            <TextView
                android:id="@+id/tvTotalPriceBottom"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:textColor="@color/text_primary"
                android:textSize="18sp"
                android:textStyle="bold"
                tools:text="8.50 ريال" />

        </LinearLayout>

        <com.google.android.material.button.MaterialButton
            android:id="@+id/btnAddToCart"
            android:layout_width="wrap_content"
            android:layout_height="50dp"
            android:text="أضف إلى السلة 🛒"
            android:textSize="15sp"
            android:textStyle="bold"
            app:cornerRadius="14dp"
            android:backgroundTint="@color/emerald_primary" />

    </LinearLayout>

</RelativeLayout>
`
  },
  {
    path: 'app/src/main/res/layout/activity_cart.xml',
    name: 'activity_cart.xml',
    category: 'xml',
    description: 'واجهة سلة المشتريات مع تفقيط الضرائب والتوصيل وكوبون التخفيض',
    content: `<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/window_background">

    <!-- شريط الرأس -->
    <androidx.appcompat.widget.Toolbar
        android:id="@+id/toolbarCart"
        android:layout_width="match_parent"
        android:layout_height="?attr/actionBarSize"
        android:background="@color/card_background"
        app:elevation="2dp">

        <RelativeLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:paddingEnd="16dp">

            <ImageView
                android:id="@+id/btnBack"
                android:layout_width="36dp"
                android:layout_height="36dp"
                android:layout_centerVertical="true"
                android:padding="6dp"
                android:src="@drawable/ic_arrow_back"
                app:tint="@color/text_primary" />

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_centerInParent="true"
                android:text="سلة المشتريات"
                android:textColor="@color/text_primary"
                android:textSize="18sp"
                android:textStyle="bold" />

        </RelativeLayout>

    </androidx.appcompat.widget.Toolbar>

    <!-- الحالة الفارغة -->
    <LinearLayout
        android:id="@+id/layoutEmptyCart"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_below="@id/toolbarCart"
        android:gravity="center"
        android:orientation="vertical"
        android:padding="24dp"
        android:visibility="gone">

        <ImageView
            android:layout_width="100dp"
            android:layout_height="100dp"
            android:src="@drawable/ic_shopping_bag"
            app:tint="@color/text_secondary" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="16dp"
            android:text="سلة المشتريات فارغة"
            android:textColor="@color/text_primary"
            android:textSize="18sp"
            android:textStyle="bold" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="6dp"
            android:text="تصفح العروض والأقسام وأضف منتجاتك المفضلة الآن"
            android:textColor="@color/text_secondary"
            android:textSize="13sp" />

        <com.google.android.material.button.MaterialButton
            android:id="@+id/btnContinueShopping"
            android:layout_width="wrap_content"
            android:layout_height="48dp"
            android:layout_marginTop="20dp"
            android:text="ابدأ التسوق الآن"
            android:backgroundTint="@color/emerald_primary"
            app:cornerRadius="12dp" />

    </LinearLayout>

    <!-- محتوى السلة عند وجود عناصر -->
    <androidx.core.widget.NestedScrollView
        android:id="@+id/layoutCartContent"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_above="@id/layoutBottomSummary"
        android:layout_below="@id/toolbarCart"
        android:fillViewport="true">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="vertical"
            android:padding="16dp">

            <!-- قائمة المنتجات -->
            <androidx.recyclerview.widget.RecyclerView
                android:id="@+id/rvCartItems"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:nestedScrollingEnabled="false" />

            <!-- حقل كوبون الخصم -->
            <com.google.android.material.card.MaterialCardView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_marginTop="16dp"
                app:cardCornerRadius="14dp"
                app:cardElevation="1dp"
                app:cardBackgroundColor="@color/card_background">

                <LinearLayout
                    android:layout_width="match_parent"
                    android:layout_height="52dp"
                    android:gravity="center_vertical"
                    android:paddingHorizontal="12dp">

                    <EditText
                        android:id="@+id/etCouponCode"
                        android:layout_width="0dp"
                        android:layout_height="match_parent"
                        android:layout_weight="1"
                        android:background="@null"
                        android:hint="أدخل كود الخصم (مثال: SAVE20)"
                        android:textColor="@color/text_primary"
                        android:textSize="13sp" />

                    <com.google.android.material.button.MaterialButton
                        android:id="@+id/btnApplyCoupon"
                        android:layout_width="wrap_content"
                        android:layout_height="38dp"
                        android:insetTop="0dp"
                        android:insetBottom="0dp"
                        android:text="تطبيق"
                        android:textSize="12sp"
                        app:cornerRadius="8dp"
                        android:backgroundTint="@color/emerald_primary" />

                </LinearLayout>

            </com.google.android.material.card.MaterialCardView>

            <!-- ملخص الفاتورة والحسابات -->
            <com.google.android.material.card.MaterialCardView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_marginTop="16dp"
                app:cardCornerRadius="14dp"
                app:cardElevation="1dp"
                app:cardBackgroundColor="@color/card_background">

                <LinearLayout
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:orientation="vertical"
                    android:padding="16dp">

                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:text="ملخص الطلب"
                        android:textColor="@color/text_primary"
                        android:textSize="15sp"
                        android:textStyle="bold" />

                    <!-- المجموع الفرعي -->
                    <RelativeLayout
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:layout_marginTop="10dp">

                        <TextView
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:text="المجموع الفرعي"
                            android:textColor="@color/text_secondary"
                            android:textSize="13sp" />

                        <TextView
                            android:id="@+id/tvSubtotal"
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:layout_alignParentEnd="true"
                            android:textColor="@color/text_primary"
                            android:textSize="13sp"
                            android:textStyle="bold"
                            tools:text="45.00 ريال" />

                    </RelativeLayout>

                    <!-- الخصم -->
                    <RelativeLayout
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:layout_marginTop="8dp">

                        <TextView
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:text="خصم الكوبون"
                            android:textColor="@color/emerald_primary"
                            android:textSize="13sp" />

                        <TextView
                            android:id="@+id/tvDiscount"
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:layout_alignParentEnd="true"
                            android:textColor="@color/emerald_primary"
                            android:textSize="13sp"
                            android:textStyle="bold"
                            tools:text="-0.00 ريال" />

                    </RelativeLayout>

                    <!-- رسوم التوصيل -->
                    <RelativeLayout
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:layout_marginTop="8dp">

                        <TextView
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:text="رسوم التوصيل"
                            android:textColor="@color/text_secondary"
                            android:textSize="13sp" />

                        <TextView
                            android:id="@+id/tvDeliveryFee"
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:layout_alignParentEnd="true"
                            android:textColor="@color/text_primary"
                            android:textSize="13sp"
                            android:textStyle="bold"
                            tools:text="12.00 ريال" />

                    </RelativeLayout>

                    <!-- الضريبة المضافة -->
                    <RelativeLayout
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:layout_marginTop="8dp">

                        <TextView
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:text="ضريبة القيمة المضافة (15%)"
                            android:textColor="@color/text_secondary"
                            android:textSize="13sp" />

                        <TextView
                            android:id="@+id/tvTax"
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:layout_alignParentEnd="true"
                            android:textColor="@color/text_primary"
                            android:textSize="13sp"
                            android:textStyle="bold"
                            tools:text="6.75 ريال" />

                    </RelativeLayout>

                </LinearLayout>

            </com.google.android.material.card.MaterialCardView>

        </LinearLayout>

    </androidx.core.widget.NestedScrollView>

    <!-- شريط الدفع السفلي -->
    <LinearLayout
        android:id="@+id/layoutBottomSummary"
        android:layout_width="match_parent"
        android:layout_height="76dp"
        android:layout_alignParentBottom="true"
        android:background="@color/card_background"
        android:elevation="12dp"
        android:gravity="center_vertical"
        android:orientation="horizontal"
        android:paddingHorizontal="20dp">

        <LinearLayout
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:orientation="vertical">

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="الإجمالي النهائي"
                android:textColor="@color/text_secondary"
                android:textSize="12sp" />

            <TextView
                android:id="@+id/tvGrandTotal"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:textColor="@color/emerald_primary"
                android:textSize="20sp"
                android:textStyle="bold"
                tools:text="63.75 ريال" />

        </LinearLayout>

        <com.google.android.material.button.MaterialButton
            android:id="@+id/btnCheckout"
            android:layout_width="wrap_content"
            android:layout_height="50dp"
            android:text="متابعة الدفع ←"
            android:textSize="15sp"
            android:textStyle="bold"
            app:cornerRadius="14dp"
            android:backgroundTint="@color/emerald_primary" />

    </LinearLayout>

</RelativeLayout>
`
  },
  {
    path: 'app/src/main/res/layout/item_category.xml',
    name: 'item_category.xml',
    category: 'xml',
    description: 'شريحة القسم الأفقي المتجاوبة مع حالة التحديد',
    content: `<?xml version="1.0" encoding="utf-8"?>
<com.google.android.material.card.MaterialCardView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/cardCategory"
    android:layout_width="wrap_content"
    android:layout_height="42dp"
    android:layout_marginEnd="8dp"
    app:cardCornerRadius="21dp"
    app:cardElevation="1dp"
    app:strokeWidth="1dp"
    app:strokeColor="#E2E8F0"
    app:cardBackgroundColor="@color/card_background">

    <LinearLayout
        android:layout_width="wrap_content"
        android:layout_height="match_parent"
        android:gravity="center_vertical"
        android:orientation="horizontal"
        android:paddingHorizontal="14dp">

        <TextView
            android:id="@+id/tvIcon"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:textSize="16sp"
            tools:text="🍎" />

        <TextView
            android:id="@+id/tvName"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="8dp"
            android:textColor="@color/text_primary"
            android:textSize="13sp"
            android:textStyle="bold"
            tools:text="خضار وفواكه" />

    </LinearLayout>

</com.google.android.material.card.MaterialCardView>
`
  },
  {
    path: 'app/src/main/res/layout/item_cart.xml',
    name: 'item_cart.xml',
    category: 'xml',
    description: 'عنصر سلة الشراء مع أزرار الزيادة والنقصان وصورة المنتج',
    content: `<?xml version="1.0" encoding="utf-8"?>
<com.google.android.material.card.MaterialCardView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_marginBottom="10dp"
    app:cardCornerRadius="16dp"
    app:cardElevation="2dp"
    app:strokeWidth="1dp"
    app:strokeColor="#F1F5F9"
    app:cardBackgroundColor="@color/card_background">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:gravity="center_vertical"
        android:orientation="horizontal"
        android:padding="12dp">

        <ImageView
            android:id="@+id/ivProduct"
            android:layout_width="70dp"
            android:layout_height="70dp"
            android:scaleType="centerCrop"
            tools:src="@drawable/bg_rounded_card" />

        <LinearLayout
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginStart="12dp"
            android:layout_weight="1"
            android:orientation="vertical">

            <TextView
                android:id="@+id/tvTitle"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:ellipsize="end"
                android:maxLines="1"
                android:textColor="@color/text_primary"
                android:textSize="14sp"
                android:textStyle="bold"
                tools:text="تفاح أحمر إيطالي" />

            <TextView
                android:id="@+id/tvUnitPrice"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginTop="2dp"
                android:textColor="@color/text_secondary"
                android:textSize="11sp"
                tools:text="8.50 ريال / كجم" />

            <TextView
                android:id="@+id/tvTotalPrice"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginTop="6dp"
                android:textColor="@color/emerald_primary"
                android:textSize="14sp"
                android:textStyle="bold"
                tools:text="17.00 ريال" />

        </LinearLayout>

        <!-- أزرار التحكم بالكمية وحذف العنصر -->
        <LinearLayout
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:gravity="center"
            android:orientation="vertical">

            <ImageView
                android:id="@+id/btnDelete"
                android:layout_width="28dp"
                android:layout_height="28dp"
                android:layout_gravity="end"
                android:padding="4dp"
                android:src="@drawable/ic_delete"
                app:tint="@color/red_accent" />

            <LinearLayout
                android:layout_width="wrap_content"
                android:layout_height="32dp"
                android:layout_marginTop="6dp"
                android:background="@drawable/bg_quantity_selector"
                android:gravity="center_vertical"
                android:paddingHorizontal="4dp">

                <ImageView
                    android:id="@+id/btnMinus"
                    android:layout_width="24dp"
                    android:layout_height="24dp"
                    android:padding="5dp"
                    android:src="@drawable/ic_minus"
                    app:tint="@color/emerald_primary" />

                <TextView
                    android:id="@+id/tvQuantity"
                    android:layout_width="28dp"
                    android:layout_height="wrap_content"
                    android:gravity="center"
                    android:text="2"
                    android:textColor="@color/text_primary"
                    android:textSize="13sp"
                    android:textStyle="bold" />

                <ImageView
                    android:id="@+id/btnPlus"
                    android:layout_width="24dp"
                    android:layout_height="24dp"
                    android:padding="5dp"
                    android:src="@drawable/ic_plus"
                    app:tint="@color/emerald_primary" />

            </LinearLayout>

        </LinearLayout>

    </LinearLayout>

</com.google.android.material.card.MaterialCardView>
`
  },
  {
    path: 'app/src/main/res/layout/item_banner.xml',
    name: 'item_banner.xml',
    category: 'xml',
    description: 'واجهة شريحة البنر الإعلاني العريض في الصفحة الرئيسية',
    content: `<?xml version="1.0" encoding="utf-8"?>
<com.google.android.material.card.MaterialCardView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:layout_marginHorizontal="16dp"
    android:layout_marginVertical="4dp"
    app:cardCornerRadius="20dp"
    app:cardElevation="4dp"
    app:cardBackgroundColor="@color/emerald_primary">

    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:padding="20dp">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_centerVertical="true"
            android:orientation="vertical">

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:background="#30FFFFFF"
                android:paddingHorizontal="10dp"
                android:paddingVertical="3dp"
                android:text="عرض خاص وحصري ⭐"
                android:textColor="@color/white"
                android:textSize="11sp"
                android:textStyle="bold" />

            <TextView
                android:id="@+id/tvBannerTitle"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginTop="8dp"
                android:textColor="@color/white"
                android:textSize="18sp"
                android:textStyle="bold"
                tools:text="عروض السوبر ماركت الكبرى 🛒" />

            <TextView
                android:id="@+id/tvBannerSubtitle"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginTop="4dp"
                android:textColor="#E0F2FE"
                android:textSize="12sp"
                tools:text="خصومات تصل إلى 50% على الخضار والفواكه الطازجة" />

        </LinearLayout>

    </RelativeLayout>

</com.google.android.material.card.MaterialCardView>
`
  },
  {
    path: 'app/src/main/res/menu/bottom_nav_menu.xml',
    name: 'bottom_nav_menu.xml',
    category: 'xml',
    description: 'قائمة شريط التنقل السفلي الماتيريال',
    content: `<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">
    <item
        android:id="@+id/nav_home"
        android:icon="@drawable/ic_home"
        android:title="الرئيسية" />
    <item
        android:id="@+id/nav_cart"
        android:icon="@drawable/ic_shopping_bag"
        android:title="السلة" />
    <item
        android:id="@+id/nav_orders"
        android:icon="@drawable/ic_orders"
        android:title="طلباتي" />
    <item
        android:id="@+id/nav_profile"
        android:icon="@drawable/ic_profile"
        android:title="حسابي" />
</menu>
`
  },
  {
    path: 'README.md',
    name: 'README.md (دليل التشغيل)',
    category: 'doc',
    description: 'دليل تشغيل المشروع بالكامل على هواتف الأندرويد (AIDE) وعلى Android Studio',
    content: `# تطبيق سوبر ماركت إكسبريس المتكامل (Supermarket Android App)
بتقنية **Java** والواجهات **XML** بمعمارية **MVVM** وقاعدة بيانات **Room Database** المحلية.

---

## 📱 كيفية التشغيل على الهاتف المحمول باستخدام تطبيق AIDE أو Android Code Studio:
1. قم بفك ضغط هذا الملف (\`SupermarketApp.zip\`) في الذاكرة الداخلية للهاتف (مثلاً في مجلد \`AppProjects\` أو \`Download\`).
2. افتح تطبيق **AIDE - IDE for Android Java C++** أو **Android Code Studio**.
3. اضغط على **Open Project** ثم توجه إلى المجلد المفكوك واختر ملف \`settings.gradle\` أو مجلد \`SupermarketApp\`.
4. انتظر لحظات حتى يقوم AIDE بفهرسة المشروع.
5. اضغط على زر **Run ▶️** أعلى الشاشة، سيقوم التطبيق بتجميع الـ APK وتثبيته فوراً على هاتفك!

---

## 💻 كيفية التشغيل على الكمبيوتر باستخدام Android Studio:
1. افتح **Android Studio**.
2. اختر **Open an Existing Project**.
3. حدد مجلد \`SupermarketApp\`.
4. سيبدأ Gradle Sync تلقائياً بتنزيل المكتبات (Room, Glide, Material3).
5. اضغط على زر **Run 'app'** لتشغيل التطبيق على المحاكي أو هاتفك عبر USB Debugging.

---

## 🏗️ هيكلية المشروع (Project Architecture):
- **MVVM Pattern**: فصل تام للمسؤوليات بين البيانات (Model)، ومستودع العمليات (Repository)، ومنطق الأعمال (ViewModel)، وعناصر التحكم والواجهات (Views & Adapters).
- **Room SQLite Database**: تخزين الكتالوج والمنتجات وسلة التسوق محلياً لدعم وضع عدم الاتصال (Offline Mode).
- **ViewBinding**: للوصول الآمن لعناصر الـ XML دون \`findViewById\`.
- **Material 3 Design**: واجهات تفاعلية تدعم الوضع الليلي والنهاري (Dark/Light Mode).
`
  }
];
