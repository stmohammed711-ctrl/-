import React, { useState, useEffect } from 'react';
import {
  ShoppingCart,
  Heart,
  Search,
  ArrowRight,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  Clock,
  MapPin,
  CreditCard,
  Banknote,
  Truck,
  RotateCcw,
  Sun,
  Moon,
  ChevronRight,
  PackageCheck,
  Phone,
  Tag,
  Star,
  User,
  SlidersHorizontal
} from 'lucide-react';
import { Product, Category, CartItem, Order } from '../types/androidApp';
import { PRODUCTS, CATEGORIES, BANNERS } from '../data/mockData';

interface PhoneSimulatorProps {
  onOpenCodeForFile?: (path: string) => void;
}

export const PhoneSimulator: React.FC<PhoneSimulatorProps> = ({ onOpenCodeForFile }) => {
  // Simulator state
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'auth' | 'home' | 'product_detail' | 'cart' | 'checkout' | 'tracking' | 'profile'>('home');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  
  // App data state
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 2 },
    { product: PRODUCTS[1], quantity: 1 }
  ]);
  const [favorites, setFavorites] = useState<number[]>([1, 4]);
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [deliveryAddress, setDeliveryAddress] = useState<string>('الرياض، حي النخيل، شارع الأمير تركي');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'credit_card' | 'apple_pay'>('cash');
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [trackingStep, setTrackingStep] = useState<number>(2); // 1 to 4
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [currentBannerIndex, setCurrentBannerIndex] = useState<number>(0);

  // Auto banner rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % BANNERS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Toast notification helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2600);
  };

  // Cart calculations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const deliveryFee = subtotal > 120 || discountPercent === 100 ? 0 : 12;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = taxableAmount * 0.15;
  const total = taxableAmount + tax + deliveryFee;
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Handlers
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`تمت إضافة ${product.nameAr} إلى السلة 🛒`);
  };

  const handleUpdateQuantity = (productId: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('تم حذف المنتج من السلة');
  };

  const handleToggleFavorite = (productId: number) => {
    setFavorites((prev) => {
      const isFav = prev.includes(productId);
      const updated = isFav ? prev.filter((id) => id !== productId) : [...prev, productId];
      showToast(isFav ? 'تمت الإزالة من المفضلة' : 'تمت الإضافة للمفضلة ❤️');
      return updated;
    });
  };

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'SAVE20') {
      setDiscountPercent(20);
      setCouponMessage({ text: 'تم تطبيق كود الخصم (20%) بنجاح! 🎉', isError: false });
    } else if (code === 'FREESHIP') {
      setDiscountPercent(10);
      setCouponMessage({ text: 'تم تطبيق خصم الشحن والطلب! 🚚', isError: false });
    } else {
      setDiscountPercent(0);
      setCouponMessage({ text: 'كود غير صحيح. جرب SAVE20 أو FREESHIP', isError: true });
    }
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    const newOrder: Order = {
      id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      date: 'اليوم، ' + new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
      items: [...cart],
      subtotal,
      deliveryFee,
      tax,
      discount: discountAmount,
      total,
      paymentMethod,
      status: 'confirmed',
      deliveryAddress,
      estimatedDelivery: '25 - 35 دقيقة'
    };
    setCurrentOrder(newOrder);
    setCart([]);
    setTrackingStep(1);
    setCurrentScreen('tracking');

    // Simulate order progression
    setTimeout(() => setTrackingStep(2), 4000);
    setTimeout(() => setTrackingStep(3), 9000);
  };

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchQuery =
      searchQuery === '' ||
      p.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryNameAr.includes(searchQuery);
    return matchCategory && matchQuery;
  });

  const dailyDeals = products.filter((p) => p.isDailyDeal);
  const bestSellers = products.filter((p) => p.isBestSeller);

  return (
    <div className="flex flex-col items-center">
      {/* Controls above simulator */}
      <div className="w-full max-w-[420px] mb-3 flex items-center justify-between px-2 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors ${
              isDarkMode ? 'bg-indigo-900/60 text-indigo-200 border border-indigo-700' : 'bg-slate-800 text-slate-300'
            }`}
            title="تبديل الثيم الليلي والنهاري (Material 3 Dark/Light Mode)"
          >
            {isDarkMode ? <Moon className="w-3.5 h-3.5 text-amber-300" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
            <span>{isDarkMode ? 'الوضع الليلي' : 'الوضع النهاري'}</span>
          </button>

          <button
            onClick={() => setCurrentScreen('splash')}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 transition-colors"
            title="إعادة تشغيل شاشة البداية (Splash Screen)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة تشغيل Splash</span>
          </button>
        </div>

        <div className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/50">
          Android 14 • Pixel 8 Pro
        </div>
      </div>

      {/* Phone Case Frame */}
      <div className={`relative w-[360px] sm:w-[390px] h-[780px] rounded-[50px] p-3 shadow-2xl border-4 transition-all duration-300 ${
        isDarkMode ? 'bg-slate-900 border-slate-700 shadow-emerald-950/30' : 'bg-slate-800 border-slate-600 shadow-2xl'
      }`}>
        {/* Physical Camera Notch / Dynamic Island */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-50 flex items-center justify-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-blue-900/60"></div>
        </div>

        {/* Screen Container */}
        <div className={`relative w-full h-full rounded-[40px] overflow-hidden flex flex-col font-['Cairo',sans-serif] select-none transition-colors duration-200 ${
          isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
        }`}>
          
          {/* Status Bar */}
          <div className={`pt-3 pb-1 px-6 flex items-center justify-between text-[11px] font-semibold z-40 ${
            currentScreen === 'splash' ? 'text-white' : isDarkMode ? 'text-slate-300' : 'text-slate-700'
          }`}>
            <span>9:41</span>
            <div className="flex items-center gap-1.5 text-[10px]">
              <span>5G</span>
              <span>📶</span>
              <span>🔋 98%</span>
            </div>
          </div>

          {/* Toast Notification */}
          {toastMessage && (
            <div className="absolute top-12 left-4 right-4 z-50 bg-slate-900/95 text-white text-xs py-2 px-3 rounded-xl shadow-xl border border-emerald-500/40 text-center animate-bounce">
              {toastMessage}
            </div>
          )}

          {/* SCREEN: SPLASH SCREEN */}
          {currentScreen === 'splash' && (
            <div className="flex-1 bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900 flex flex-col items-center justify-center p-6 text-white text-center">
              <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center shadow-2xl border border-white/20 mb-6 animate-pulse">
                <ShoppingCart className="w-12 h-12 text-emerald-200" />
              </div>
              <h1 className="text-2xl font-black tracking-wide mb-1">سوبر ماركت إكسبريس</h1>
              <p className="text-xs text-emerald-100/90 font-medium mb-8">تسوق كل مقاضيك الطازجة في دقائق</p>
              
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mb-10"></div>

              <div className="flex flex-col gap-2 w-full max-w-[200px]">
                <button
                  onClick={() => setCurrentScreen('home')}
                  className="w-full py-2.5 bg-white text-emerald-800 text-xs font-bold rounded-xl shadow hover:bg-emerald-50 active:scale-95 transition-all"
                >
                  دخول المتجر مباشرة ←
                </button>
                <button
                  onClick={() => setCurrentScreen('auth')}
                  className="w-full py-2 bg-emerald-800/60 border border-white/20 text-white text-xs font-medium rounded-xl hover:bg-emerald-800 active:scale-95 transition-all"
                >
                  تسجيل دخول / حساب
                </button>
              </div>
            </div>
          )}

          {/* SCREEN: AUTH (LOGIN / REGISTER) */}
          {currentScreen === 'auth' && (
            <div className="flex-1 flex flex-col p-5 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setCurrentScreen('home')}
                  className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
                <span className="text-xs font-semibold text-emerald-600">تسجيل الدخول</span>
              </div>

              <div className="text-center my-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <h2 className="text-lg font-bold">أهلاً بك في سوبر ماركت إكسبريس</h2>
                <p className="text-xs text-slate-500 mt-1">سجل حسابك لتتبع طلباتك والحصول على نقاط المكافآت</p>
              </div>

              <div className="space-y-3 my-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 block mb-1">البريد الإلكتروني أو رقم الهاتف</label>
                  <input
                    type="text"
                    defaultValue="user@supermarket.sa"
                    className={`w-full text-xs p-2.5 rounded-xl border outline-none focus:border-emerald-500 ${
                      isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 block mb-1">كلمة المرور</label>
                  <input
                    type="password"
                    defaultValue="••••••••"
                    className={`w-full text-xs p-2.5 rounded-xl border outline-none focus:border-emerald-500 ${
                      isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
                    }`}
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  showToast('تم تسجيل الدخول بنجاح! أهلاً بك');
                  setCurrentScreen('home');
                }}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 mt-4 active:scale-98 transition-all"
              >
                تسجيل الدخول
              </button>

              <button
                onClick={() => {
                  showToast('تصفح المتجر كزائر');
                  setCurrentScreen('home');
                }}
                className="w-full py-2.5 mt-2 text-slate-500 hover:text-emerald-600 text-xs font-semibold"
              >
                المتابعة كزائر دون تسجيل ←
              </button>
            </div>
          )}

          {/* SCREEN: HOME */}
          {currentScreen === 'home' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Header */}
              <div className={`px-4 pt-2 pb-3 border-b ${
                isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-emerald-600 text-white border-emerald-700'
              }`}>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm">
                      📍
                    </div>
                    <div>
                      <div className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-emerald-100'}`}>موقع التوصيل الحالي</div>
                      <div className="text-xs font-bold truncate max-w-[170px]">الرياض، حي العليا</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentScreen('cart')}
                      className="relative p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                      title="سلة المشتريات"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {cartItemsCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                          {cartItemsCount}
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Search Input */}
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث عن خضار، ألبان، مخبوزات..."
                    className={`w-full py-2 pr-9 pl-4 text-xs rounded-xl border outline-none shadow-sm transition-all ${
                      isDarkMode
                        ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:border-emerald-500'
                        : 'bg-white border-slate-100 text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-emerald-400'
                    }`}
                  />
                  <Search className={`absolute right-3 top-2.5 w-3.5 h-3.5 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-400'
                  }`} />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute left-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto pb-16 space-y-4">
                {/* Banner Carousel */}
                {!searchQuery && (
                  <div className="px-3 pt-3">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${BANNERS[currentBannerIndex].bgGradient} text-white shadow-lg relative overflow-hidden transition-all duration-500`}>
                      <span className="inline-block px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold mb-1">
                        {BANNERS[currentBannerIndex].badgeAr}
                      </span>
                      <h3 className="text-sm font-bold leading-snug mb-1">{BANNERS[currentBannerIndex].titleAr}</h3>
                      <p className="text-[11px] text-emerald-100 mb-3">{BANNERS[currentBannerIndex].subtitleAr}</p>
                      
                      <button
                        onClick={() => setSelectedCategory('fruits_veg')}
                        className="px-3 py-1 bg-white text-emerald-800 font-bold text-[11px] rounded-lg shadow active:scale-95 transition-transform"
                      >
                        {BANNERS[currentBannerIndex].buttonTextAr}
                      </button>

                      {/* Dots */}
                      <div className="absolute bottom-2 left-4 flex gap-1">
                        {BANNERS.map((_, i) => (
                          <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${
                              i === currentBannerIndex ? 'w-4 bg-white' : 'bg-white/40'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Categories Horizontal Bar */}
                <div className="px-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200">الأقسام والتصنيفات</h4>
                    <span className="text-[10px] text-emerald-600 font-semibold">{CATEGORIES.length} قسم</span>
                  </div>
                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                    {CATEGORIES.map((cat) => {
                      const isSelected = selectedCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                            isSelected
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20'
                              : isDarkMode
                              ? 'bg-slate-800/80 text-slate-300 border-slate-700/60 hover:bg-slate-800'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <span className="text-sm">{cat.icon}</span>
                          <span>{cat.nameAr}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Daily Deals Section */}
                {!searchQuery && selectedCategory === 'all' && (
                  <div className="px-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-red-500 font-bold text-xs">🔥 عروض اليوم الحصرية</span>
                        <span className="bg-red-500/10 text-red-600 text-[10px] font-mono px-1.5 py-0.5 rounded">
                          ينتهي خلال 04:32:15
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedCategory('fruits_veg')}
                        className="text-[11px] text-emerald-600 font-semibold"
                      >
                        عرض الكل
                      </button>
                    </div>

                    <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
                      {dailyDeals.map((prod) => (
                        <div
                          key={prod.id}
                          className={`w-[136px] flex-shrink-0 rounded-2xl border p-2 flex flex-col justify-between transition-all ${
                            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                          }`}
                        >
                          <div className="relative mb-1.5">
                            <img
                              src={prod.image}
                              alt={prod.nameAr}
                              className="w-full h-24 object-cover rounded-xl"
                            />
                            {prod.originalPrice && (
                              <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                                -{Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100)}%
                              </span>
                            )}
                            <button
                              onClick={() => handleToggleFavorite(prod.id)}
                              className="absolute top-1.5 left-1.5 p-1 rounded-full bg-white/80 dark:bg-slate-800/80 shadow"
                            >
                              <Heart
                                className={`w-3 h-3 ${
                                  favorites.includes(prod.id) ? 'fill-red-500 text-red-500' : 'text-slate-400'
                                }`}
                              />
                            </button>
                          </div>

                          <div>
                            <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                              <span>{prod.unit}</span>
                              <span className="text-amber-500 flex items-center gap-0.5">★ {prod.rating}</span>
                            </div>
                            <h5
                              onClick={() => {
                                setSelectedProduct(prod);
                                setCurrentScreen('product_detail');
                              }}
                              className="text-xs font-bold line-clamp-1 cursor-pointer hover:text-emerald-600"
                            >
                              {prod.nameAr}
                            </h5>
                            <div className="flex items-baseline gap-1 my-1">
                              <span className="text-xs font-bold text-emerald-600">{prod.price.toFixed(2)} ر.س</span>
                              {prod.originalPrice && (
                                <span className="text-[10px] text-slate-400 line-through">
                                  {prod.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>

                          <button
                            onClick={() => handleAddToCart(prod)}
                            className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 active:scale-95 transition-transform"
                          >
                            <Plus className="w-3 h-3" />
                            <span>أضف</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Best Sellers or Filtered Grid */}
                <div className="px-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200">
                      {searchQuery
                        ? `نتائج البحث عن: "${searchQuery}" (${filteredProducts.length})`
                        : selectedCategory === 'all'
                        ? 'المنتجات الأكثر طلباً ⭐'
                        : `منتجات قسم: ${CATEGORIES.find((c) => c.id === selectedCategory)?.nameAr}`}
                    </h4>
                  </div>

                  {filteredProducts.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 text-xs">
                      لا توجد منتجات مطابقة لبحثك
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2.5">
                      {filteredProducts.map((prod) => (
                        <div
                          key={prod.id}
                          className={`rounded-2xl border p-2.5 flex flex-col justify-between transition-all ${
                            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                          }`}
                        >
                          <div className="relative mb-2">
                            <img
                              src={prod.image}
                              alt={prod.nameAr}
                              className="w-full h-28 object-cover rounded-xl cursor-pointer"
                              onClick={() => {
                                setSelectedProduct(prod);
                                setCurrentScreen('product_detail');
                              }}
                            />
                            {prod.originalPrice && (
                              <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                                خصم
                              </span>
                            )}
                            <button
                              onClick={() => handleToggleFavorite(prod.id)}
                              className="absolute top-1.5 left-1.5 p-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 shadow"
                            >
                              <Heart
                                className={`w-3.5 h-3.5 ${
                                  favorites.includes(prod.id) ? 'fill-red-500 text-red-500' : 'text-slate-400'
                                }`}
                              />
                            </button>
                          </div>

                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                                <span className="text-emerald-600 font-semibold">{prod.categoryNameAr}</span>
                                <span className="text-amber-500">★ {prod.rating}</span>
                              </div>
                              <h5
                                onClick={() => {
                                  setSelectedProduct(prod);
                                  setCurrentScreen('product_detail');
                                }}
                                className="text-xs font-bold line-clamp-1 cursor-pointer hover:text-emerald-600"
                              >
                                {prod.nameAr}
                              </h5>
                              <p className="text-[10px] text-slate-400">{prod.unit}</p>
                            </div>

                            <div className="mt-2 pt-1 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                              <div>
                                <div className="text-xs font-black text-emerald-600">{prod.price.toFixed(2)} ر.س</div>
                                {prod.originalPrice && (
                                  <div className="text-[9px] text-slate-400 line-through">
                                    {prod.originalPrice.toFixed(2)}
                                  </div>
                                )}
                              </div>

                              <button
                                onClick={() => handleAddToCart(prod)}
                                className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg active:scale-90 transition-transform shadow"
                                title="إضافة للسلة"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Material Bottom Navigation Bar */}
              <div className={`absolute bottom-0 left-0 right-0 h-14 border-t flex items-center justify-around px-2 z-30 ${
                isDarkMode ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'
              } backdrop-blur-md`}>
                <button
                  onClick={() => setCurrentScreen('home')}
                  className="flex flex-col items-center gap-0.5 text-emerald-600 font-bold"
                >
                  <span className="text-base">🏠</span>
                  <span className="text-[10px]">الرئيسية</span>
                </button>

                <button
                  onClick={() => setCurrentScreen('cart')}
                  className="relative flex flex-col items-center gap-0.5 text-slate-500 hover:text-emerald-600 font-medium"
                >
                  <div className="relative">
                    <ShoppingCart className="w-4 h-4" />
                    {cartItemsCount > 0 && (
                      <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-red-500 text-white rounded-full text-[8px] font-bold flex items-center justify-center">
                        {cartItemsCount}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px]">السلة</span>
                </button>

                <button
                  onClick={() => {
                    if (currentOrder) {
                      setCurrentScreen('tracking');
                    } else {
                      showToast('لا توجد طلبات جارية للتتبع حالياً');
                    }
                  }}
                  className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-emerald-600 font-medium"
                >
                  <Truck className="w-4 h-4" />
                  <span className="text-[10px]">طلباتي</span>
                </button>

                <button
                  onClick={() => setCurrentScreen('profile')}
                  className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-emerald-600 font-medium"
                >
                  <User className="w-4 h-4" />
                  <span className="text-[10px]">حسابي</span>
                </button>
              </div>
            </div>
          )}

          {/* SCREEN: PRODUCT DETAIL */}
          {currentScreen === 'product_detail' && selectedProduct && (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="relative h-60 bg-slate-100 dark:bg-slate-800">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.nameAr}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setCurrentScreen('home')}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-slate-900/80 shadow backdrop-blur-sm"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleToggleFavorite(selectedProduct.id)}
                  className="absolute top-3 left-3 p-2 rounded-full bg-white/80 dark:bg-slate-900/80 shadow backdrop-blur-sm"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      favorites.includes(selectedProduct.id) ? 'fill-red-500 text-red-500' : 'text-slate-500'
                    }`}
                  />
                </button>
                {selectedProduct.originalPrice && (
                  <span className="absolute bottom-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-lg shadow">
                    خصم {Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)}%
                  </span>
                )}
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-20">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-emerald-600 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-lg">
                    {selectedProduct.categoryNameAr}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{selectedProduct.rating}</span>
                    <span className="text-slate-400 text-[10px]">({selectedProduct.reviewsCount} تقييم)</span>
                  </div>
                </div>

                <h2 className="text-base font-bold leading-snug">{selectedProduct.nameAr}</h2>
                <div className="text-xs text-slate-500">{selectedProduct.unit} • {selectedProduct.origin || 'طازج يومياً'}</div>

                <div className="flex items-baseline gap-2 py-1">
                  <span className="text-xl font-black text-emerald-600">{selectedProduct.price.toFixed(2)} ر.س</span>
                  {selectedProduct.originalPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      {selectedProduct.originalPrice.toFixed(2)} ر.س
                    </span>
                  )}
                </div>

                <div className="border-t border-b border-slate-200 dark:border-slate-800 py-3">
                  <h4 className="text-xs font-bold mb-1">وصف المنتج</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{selectedProduct.descriptionAr}</p>
                </div>

                {selectedProduct.calories && (
                  <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-slate-100 dark:bg-slate-900">
                    <span className="text-slate-500">القيمة الغذائية التقريبية:</span>
                    <span className="font-semibold text-emerald-600">{selectedProduct.calories}</span>
                  </div>
                )}
              </div>

              {/* Bottom Sticky Action Bar */}
              <div className={`absolute bottom-0 left-0 right-0 p-3 border-t flex items-center justify-between gap-3 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              } shadow-lg`}>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400">السعر الإجمالي</span>
                  <span className="text-sm font-black text-emerald-600">{selectedProduct.price.toFixed(2)} ر.س</span>
                </div>

                <button
                  onClick={() => {
                    handleAddToCart(selectedProduct, 1);
                    setCurrentScreen('cart');
                  }}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>إضافة للسلة والذهاب للشراء</span>
                </button>
              </div>
            </div>
          )}

          {/* SCREEN: CART */}
          {currentScreen === 'cart' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className={`p-3.5 border-b flex items-center justify-between ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentScreen('home')}
                    className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <h3 className="text-sm font-bold">سلة المشتريات ({cartItemsCount})</h3>
                </div>
                {cart.length > 0 && (
                  <button
                    onClick={() => {
                      setCart([]);
                      showToast('تم تفريغ السلة');
                    }}
                    className="text-[11px] text-red-500 font-semibold"
                  >
                    تفريغ
                  </button>
                )}
              </div>

              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-3xl mb-3 text-slate-400">
                    🛒
                  </div>
                  <h4 className="text-sm font-bold mb-1">سلة المشتريات فارغة حالياً</h4>
                  <p className="text-xs text-slate-400 mb-5">تصفح الأقسام وأضف ما يعجبك من المنتجات الطازجة</p>
                  <button
                    onClick={() => setCurrentScreen('home')}
                    className="px-5 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow active:scale-95 transition-transform"
                  >
                    العودة للتسوق
                  </button>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto p-3 space-y-3 pb-24">
                  {/* Cart Items List */}
                  <div className="space-y-2">
                    {cart.map((item) => (
                      <div
                        key={item.product.id}
                        className={`p-2.5 rounded-xl border flex items-center justify-between gap-2.5 ${
                          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                        }`}
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.nameAr}
                          className="w-14 h-14 rounded-lg object-cover"
                        />

                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-bold truncate">{item.product.nameAr}</h5>
                          <p className="text-[10px] text-slate-400">{item.product.unit}</p>
                          <div className="text-xs font-bold text-emerald-600 mt-0.5">
                            {(item.product.price * item.quantity).toFixed(2)} ر.س
                          </div>
                        </div>

                        {/* Counter +/- */}
                        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-1.5 py-1 rounded-lg">
                          <button
                            onClick={() => handleUpdateQuantity(item.product.id, -1)}
                            className="p-1 hover:text-red-500 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.product.id, 1)}
                            className="p-1 hover:text-emerald-600 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemoveFromCart(item.product.id)}
                          className="p-1 text-slate-400 hover:text-red-500"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Coupon Code Card */}
                  <div className={`p-3 rounded-xl border ${
                    isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                  }`}>
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1.5">
                      كوبون الخصم (جرب: SAVE20)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="أدخل كود الخصم..."
                        className={`flex-1 text-xs p-2 rounded-lg border outline-none ${
                          isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                        }`}
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg active:scale-95"
                      >
                        تطبيق
                      </button>
                    </div>
                    {couponMessage && (
                      <p className={`text-[10px] mt-1.5 font-semibold ${
                        couponMessage.isError ? 'text-red-500' : 'text-emerald-600'
                      }`}>
                        {couponMessage.text}
                      </p>
                    )}
                  </div>

                  {/* Price Summary Breakdown */}
                  <div className={`p-3.5 rounded-xl border space-y-2 text-xs ${
                    isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                  }`}>
                    <div className="flex justify-between text-slate-500">
                      <span>المجموع الفرعي</span>
                      <span>{subtotal.toFixed(2)} ر.س</span>
                    </div>

                    {discountPercent > 0 && (
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span>خصم الكوبون ({discountPercent}%)</span>
                        <span>-{discountAmount.toFixed(2)} ر.س</span>
                      </div>
                    )}

                    <div className="flex justify-between text-slate-500">
                      <span>رسوم التوصيل السريع</span>
                      <span>{deliveryFee === 0 ? 'مجاناً ⚡' : `${deliveryFee.toFixed(2)} ر.س`}</span>
                    </div>

                    <div className="flex justify-between text-slate-500">
                      <span>ضريبة القيمة المضافة (15%)</span>
                      <span>{tax.toFixed(2)} ر.س</span>
                    </div>

                    <div className="border-t border-slate-200 dark:border-slate-800 pt-2 flex justify-between font-black text-sm text-slate-900 dark:text-white">
                      <span>الإجمالي النهائي</span>
                      <span className="text-emerald-600">{total.toFixed(2)} ر.س</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Checkout Button */}
              {cart.length > 0 && (
                <div className={`absolute bottom-0 left-0 right-0 p-3 border-t flex items-center justify-between gap-3 ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                } shadow-lg`}>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400">الإجمالي النهائي</span>
                    <span className="text-sm font-black text-emerald-600">{total.toFixed(2)} ر.س</span>
                  </div>

                  <button
                    onClick={() => setCurrentScreen('checkout')}
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
                  >
                    <span>متابعة الدفع</span>
                    <ChevronRight className="w-4 h-4 rotate-180" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* SCREEN: CHECKOUT */}
          {currentScreen === 'checkout' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className={`p-3.5 border-b flex items-center gap-2 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <button
                  onClick={() => setCurrentScreen('cart')}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
                <h3 className="text-sm font-bold">إتمام الطلب وتحديد الدفع</h3>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-3 pb-20">
                {/* Delivery Address */}
                <div className={`p-3 rounded-xl border ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>عنوان التوصيل</span>
                    </div>
                    <span className="text-[10px] text-slate-400">المنزل</span>
                  </div>
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className={`w-full text-xs p-2 rounded-lg border outline-none font-medium ${
                      isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                  <p className="text-[10px] text-slate-400 mt-1">وقت التوصيل التقديري: 25 - 35 دقيقة ⚡</p>
                </div>

                {/* Payment Methods */}
                <div className={`p-3 rounded-xl border ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <h4 className="text-xs font-bold mb-2.5">طريقة الدفع</h4>
                  <div className="space-y-2">
                    {[
                      { id: 'cash', label: 'الدفع عند الاستلام (كاش أو مدى)', icon: Banknote, desc: 'سداد المبلغ للمندوب عند وصول الطلب' },
                      { id: 'credit_card', label: 'بطاقة ائتمان / مدى / فيزا', icon: CreditCard, desc: 'دفع إلكتروني آمن ومشفر 100%' },
                      { id: 'apple_pay', label: 'Apple Pay / Google Pay', icon: Tag, desc: 'دفع سريع بلمسة واحدة' },
                    ].map((method) => {
                      const isSelected = paymentMethod === method.id;
                      const Icon = method.icon;
                      return (
                        <div
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id as any)}
                          className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                            isSelected
                              ? 'border-emerald-500 bg-emerald-500/10'
                              : isDarkMode
                              ? 'border-slate-800 bg-slate-800/40'
                              : 'border-slate-200 bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className={`p-2 rounded-lg ${isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600'}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold">{method.label}</div>
                              <div className="text-[10px] text-slate-400">{method.desc}</div>
                            </div>
                          </div>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-emerald-600 bg-emerald-600' : 'border-slate-400'
                          }`}>
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Final Order Summary Box */}
                <div className={`p-3 rounded-xl border ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                } text-xs space-y-1.5`}>
                  <div className="flex justify-between text-slate-500">
                    <span>عدد الأصناف</span>
                    <span>{cartItemsCount} عنصر</span>
                  </div>
                  <div className="flex justify-between font-black text-sm pt-1 border-t border-slate-200 dark:border-slate-800">
                    <span>المبلغ المستحق للدفع</span>
                    <span className="text-emerald-600">{total.toFixed(2)} ر.س</span>
                  </div>
                </div>
              </div>

              {/* Confirm Order Button */}
              <div className={`absolute bottom-0 left-0 right-0 p-3 border-t ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>تأكيد الطلب نهائياً ({total.toFixed(2)} ر.س)</span>
                </button>
              </div>
            </div>
          )}

          {/* SCREEN: ORDER TRACKING */}
          {currentScreen === 'tracking' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className={`p-3.5 border-b flex items-center justify-between ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <h3 className="text-sm font-bold">تتبع حالة الطلب 🛵</h3>
                <button
                  onClick={() => setCurrentScreen('home')}
                  className="text-xs text-emerald-600 font-bold"
                >
                  الرئيسية
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-12">
                {/* Order Status Hero Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-lg">
                  <div className="flex items-center justify-between mb-1 text-[11px] text-emerald-100">
                    <span>رقم الطلب: {currentOrder?.id || 'ORD-849201'}</span>
                    <span>الوصول: 25 دقيقة</span>
                  </div>
                  <h3 className="text-base font-bold mb-1">
                    {trackingStep === 1 && 'تم تأكيد طلبك بنجاح! 🎉'}
                    {trackingStep === 2 && 'جاري تجهيز وتغليف المنتجات 📦'}
                    {trackingStep === 3 && 'المندوب في الطريق إليك 🛵'}
                    {trackingStep === 4 && 'تم توصيل الطلب بنجاح! 🌟'}
                  </h3>
                  <p className="text-xs text-emerald-100">
                    {trackingStep === 1 && 'تم إرسال الطلب لفرع السوبرماركت الأقرب لك'}
                    {trackingStep === 2 && 'يقوم فريق السوبرماركت باختيار أفضل الخضار والمنتجات الطازجة'}
                    {trackingStep === 3 && 'الكابتن أحمد في طريقه إلى موقعك المسجل'}
                    {trackingStep === 4 && 'نتمنى أن تنال المنتجات إعجابك!'}
                  </p>
                </div>

                {/* Tracking Stepper Timeline */}
                <div className={`p-4 rounded-xl border ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <h4 className="text-xs font-bold mb-4">مراحل سير الطلب خطوة بخطوة</h4>
                  <div className="space-y-4 relative">
                    {[
                      { step: 1, title: 'تم استلام وتأكيد الطلب', desc: 'تم قبول طلبك آلياً من النظام', time: '09:41' },
                      { step: 2, title: 'تجهيز وتعبئة الأغراض', desc: 'فحص الجودة والتغليف المبرد', time: '09:43' },
                      { step: 3, title: 'الطلب في الطريق', desc: 'استلم المندوب شحنتك وبدأ التحرك', time: '09:48' },
                      { step: 4, title: 'تم التوصيل بنجاح', desc: 'تم تسليم الطلب للعميل', time: '10:05' },
                    ].map((s, idx) => {
                      const isCompleted = trackingStep >= s.step;
                      const isCurrent = trackingStep === s.step;
                      return (
                        <div key={s.step} className="flex items-start gap-3 relative">
                          {idx < 3 && (
                            <div className={`absolute right-3.5 top-6 w-0.5 h-8 ${
                              trackingStep > s.step ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'
                            }`} />
                          )}
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold z-10 ${
                            isCompleted
                              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                              : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                          }`}>
                            {isCompleted ? '✓' : s.step}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className={`text-xs font-bold ${isCurrent ? 'text-emerald-600' : ''}`}>
                                {s.title}
                              </span>
                              <span className="text-[10px] text-slate-400">{s.time}</span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-0.5">{s.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Delivery Driver Info */}
                {trackingStep >= 2 && (
                  <div className={`p-3 rounded-xl border flex items-center justify-between ${
                    isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold text-sm">
                        👨🏻‍✈️
                      </div>
                      <div>
                        <h5 className="text-xs font-bold">الكابتن أحمد الشهري</h5>
                        <p className="text-[10px] text-slate-400">مندوب التوصيل السريع • تقييم 4.9 ★</p>
                      </div>
                    </div>
                    <button
                      onClick={() => showToast('جاري الاتصال بالكابتن أحمد... 📞')}
                      className="p-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 shadow"
                    >
                      <Phone className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SCREEN: PROFILE */}
          {currentScreen === 'profile' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className={`p-3.5 border-b flex items-center justify-between ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <h3 className="text-sm font-bold">الملف الشخصي</h3>
                <button
                  onClick={() => setCurrentScreen('home')}
                  className="text-xs text-emerald-600 font-bold"
                >
                  الرئيسية
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-12">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-emerald-500/10">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg">
                    ع
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">عبدالله محمد</h4>
                    <p className="text-xs text-slate-500">0501234567 • عضو فضي</p>
                  </div>
                </div>

                <div className={`rounded-xl border divide-y ${
                  isDarkMode ? 'bg-slate-900 border-slate-800 divide-slate-800' : 'bg-white border-slate-200 divide-slate-100 shadow-sm'
                }`}>
                  <div
                    onClick={() => {
                      showToast(`لديك ${favorites.length} منتجات في قائمة الرغبات`);
                    }}
                    className="p-3 flex items-center justify-between text-xs cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="font-semibold">قائمة الرغبات (المفضلة)</span>
                    </div>
                    <span className="text-slate-400 font-bold">{favorites.length}</span>
                  </div>

                  <div
                    onClick={() => {
                      if (currentOrder) setCurrentScreen('tracking');
                      else showToast('لا توجد طلبات مسجلة بعد');
                    }}
                    className="p-3 flex items-center justify-between text-xs cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <div className="flex items-center gap-2">
                      <PackageCheck className="w-4 h-4 text-emerald-500" />
                      <span className="font-semibold">تاريخ الطلبات السابقة</span>
                    </div>
                    <span className="text-slate-400">1 طلب</span>
                  </div>

                  <div
                    onClick={() => showToast('العنوان الحالي: الرياض، حي النخيل')}
                    className="p-3 flex items-center justify-between text-xs cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      <span className="font-semibold">العناوين المحفوظة</span>
                    </div>
                    <span className="text-slate-400">2 عنوان</span>
                  </div>

                  <div
                    onClick={() => {
                      setIsDarkMode(!isDarkMode);
                      showToast(isDarkMode ? 'تم تفعيل الوضع النهاري' : 'تم تفعيل الوضع الليلي');
                    }}
                    className="p-3 flex items-center justify-between text-xs cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <div className="flex items-center gap-2">
                      {isDarkMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
                      <span className="font-semibold">مظهر التطبيق (Dark / Light)</span>
                    </div>
                    <span className="text-slate-400">{isDarkMode ? 'داكن' : 'فاتح'}</span>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentScreen('auth')}
                  className="w-full py-2.5 text-xs text-red-500 font-bold rounded-xl border border-red-200 dark:border-red-900/40 hover:bg-red-50 dark:hover:bg-red-950/20"
                >
                  تسجيل الخروج
                </button>
              </div>
            </div>
          )}

          {/* Android System Navigation Gesture Bar */}
          <div className="h-4 flex items-center justify-center pb-1">
            <div className={`w-28 h-1 rounded-full ${isDarkMode ? 'bg-slate-600' : 'bg-slate-400'}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
