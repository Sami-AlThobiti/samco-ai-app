import React, { useState, useEffect, useRef } from 'react';
import { Camera, Video, Share2, ArrowLeft, Download, Check, Sparkles, Image as ImageIcon, Film, UserPlus, Loader2, Copy, Menu, Play } from 'lucide-react';

// --- Utility Functions ---

// دالة لترجمة النص من العربية للإنجليزية لضمان دقة النتائج
async function translateToEnglish(text) {
  try {
    // التحقق مما إذا كان النص يحتوي على أحرف عربية
    const hasArabic = /[\u0600-\u06FF]/.test(text);
    if (!hasArabic) return text;

    // استخدام API مجاني للترجمة (MyMemory API)
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=ar|en`);
    const data = await response.json();
    
    if (data.responseData && data.responseData.translatedText) {
      return data.responseData.translatedText;
    }
    return text;
  } catch (error) {
    console.error("Translation failed", error);
    return text; // في حال الفشل نستخدم النص كما هو
  }
}

// --- Components ---

// 1. Splash Screen
const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0E0E13] text-white animate-fade-in">
      <div className="relative mb-6">
        <div className="w-24 h-24 bg-gradient-to-br from-[#6A5CFF] to-[#00E5FF] rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(106,92,255,0.4)] animate-pulse">
          <span className="text-4xl font-bold">س</span>
        </div>
        <div className="absolute -bottom-2 -right-2 bg-[#0E0E13] rounded-full p-1">
          <Sparkles className="w-6 h-6 text-[#00E5FF]" />
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-2 font-cairo">سامكو Ai</h1>
      <p className="text-[#B5B5C3] text-sm font-cairo">اصنع محتواك بالذكاء الاصطناعي</p>
    </div>
  );
};

// 2. Follow Gate
const FollowGate = ({ onUnlock }) => {
  const [hasFollowed, setHasFollowed] = useState(false);

  const handleFollowClick = () => {
    window.open('https://www.tiktok.com/@samco_designer', '_blank');
    setHasFollowed(true);
  };

  const handleUnlock = () => {
    if (hasFollowed) {
      localStorage.setItem('samco_user_followed', 'true');
      onUnlock();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0E0E13] px-6 text-center font-cairo">
      <div className="w-20 h-20 bg-[#1A1A23] rounded-2xl flex items-center justify-center mb-8 border border-[#2A2A35]">
         <UserPlus className="w-10 h-10 text-[#6A5CFF]" />
      </div>
      
      <h2 className="text-2xl font-bold text-white mb-4">خطوة واحدة للبدء 🔓</h2>
      <p className="text-[#B5B5C3] mb-8 max-w-xs leading-relaxed">
        لفتح الاستخدام المجاني للتطبيق، يرجى متابعة حساب سامكو الرسمي على تيك توك.
      </p>

      <button 
        onClick={handleFollowClick}
        className="w-full max-w-sm bg-[#FF0050] hover:bg-[#D60045] text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] mb-4 shadow-lg shadow-[#FF0050]/20"
      >
        <span className="text-xl">🎵</span>
        <span>تابع @samco_designer</span>
      </button>

      {hasFollowed && (
        <button 
          onClick={handleUnlock}
          className="w-full max-w-sm bg-[#1A1A23] border border-[#6A5CFF] text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 animate-bounce-in"
        >
          <Check className="w-5 h-5 text-[#00E5FF]" />
          <span>لقد تابعت، افتح التطبيق</span>
        </button>
      )}
    </div>
  );
};

// 3. Home Screen
const HomeScreen = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#0E0E13] text-white font-cairo pb-10">
      <header className="p-6 flex justify-between items-center bg-[#0E0E13]/90 backdrop-blur-md sticky top-0 z-10 border-b border-[#1A1A23]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#6A5CFF] to-[#00E5FF] rounded-lg flex items-center justify-center">
            <span className="font-bold text-lg">س</span>
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">سامكو Ai</h1>
            <p className="text-[10px] text-[#00E5FF]">PRO VERSION</p>
          </div>
        </div>
        <button className="p-2 bg-[#1A1A23] rounded-full border border-[#2A2A35]">
          <Menu className="w-5 h-5 text-[#B5B5C3]" />
        </button>
      </header>

      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">مرحباً 👋</h2>
          <p className="text-[#B5B5C3]">ماذا تريد أن تصنع اليوم؟</p>
        </div>

        <div className="grid gap-4">
          <button 
            onClick={() => onNavigate('imageGen')}
            className="group relative overflow-hidden bg-[#1A1A23] p-6 rounded-2xl border border-[#2A2A35] text-right transition-all hover:border-[#6A5CFF] hover:shadow-[0_0_20px_rgba(106,92,255,0.15)]"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6A5CFF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-12 h-12 bg-[#6A5CFF]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#6A5CFF] transition-colors">
              <Camera className="w-6 h-6 text-[#6A5CFF] group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold mb-1">إنشاء صور AI</h3>
            <p className="text-sm text-[#B5B5C3] mb-4">Nano Banana Pro</p>
            <div className="flex justify-end">
              <span className="text-xs bg-[#2A2A35] px-3 py-1 rounded-full text-[#00E5FF]">مجاني</span>
            </div>
          </button>

          <button 
            onClick={() => onNavigate('videoGen')}
            className="group relative overflow-hidden bg-[#1A1A23] p-6 rounded-2xl border border-[#2A2A35] text-right transition-all hover:border-[#00E5FF] hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00E5FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-12 h-12 bg-[#00E5FF]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#00E5FF] transition-colors">
              <Video className="w-6 h-6 text-[#00E5FF] group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold mb-1">إنشاء فيديو AI</h3>
            <p className="text-sm text-[#B5B5C3] mb-4">Google Veo 3</p>
            <div className="flex justify-end">
               <span className="text-xs bg-[#2A2A35] px-3 py-1 rounded-full text-[#00E5FF]">تجريبي</span>
            </div>
          </button>
          
          <button 
             onClick={() => {
                if (navigator.share) {
                    navigator.share({
                        title: 'سامكو لصناعة المحتوى Ai',
                        text: 'جرب تطبيق سامكو لصناعة الصور والفيديو بالذكاء الاصطناعي مجاناً!',
                        url: 'https://www.tiktok.com/@samco_designer',
                    })
                    .catch((error) => console.log('Error sharing', error));
                } else {
                    alert("المشاركة غير مدعومة في هذا المتصفح");
                }
             }}
            className="bg-gradient-to-r from-[#1A1A23] to-[#15151c] p-4 rounded-xl border border-[#2A2A35] flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#2A2A35] rounded-full flex items-center justify-center">
                <Share2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-sm">شارك التطبيق</span>
            </div>
            <ArrowLeft className="w-5 h-5 text-[#B5B5C3] rotate-180" />
          </button>
        </div>
      </div>
      
      <div className="fixed bottom-6 left-6 right-6">
        <a href="https://www.tiktok.com/@samco_designer" target="_blank" rel="noreferrer" className="block w-full bg-[#1A1A23]/80 backdrop-blur border border-[#FF0050]/30 text-white text-center py-3 rounded-full text-sm hover:bg-[#FF0050]/20 transition-colors flex items-center justify-center gap-2">
           <span className="w-2 h-2 bg-[#FF0050] rounded-full animate-ping"></span>
           تابعنا على TikTok للتحديثات
        </a>
      </div>
    </div>
  );
};

// 4. Generator Screen
const GeneratorScreen = ({ type, onBack }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedSize, setSelectedSize] = useState(type === 'video' ? '9:16' : '1:1');
  const [statusText, setStatusText] = useState('');
  const fileInputRef = useRef(null);
  const [refImage, setRefImage] = useState(null);

  const isVideo = type === 'video';
  const title = isVideo ? 'إنشاء فيديو' : 'إنشاء صور';
  const modelName = isVideo ? 'Google Veo 3' : 'Nano Banana Pro';
  const icon = isVideo ? <Video className="w-6 h-6 text-[#00E5FF]" /> : <Camera className="w-6 h-6 text-[#6A5CFF]" />;
  const buttonColor = isVideo ? 'bg-[#00E5FF] hover:bg-[#00c4d9]' : 'bg-[#6A5CFF] hover:bg-[#584cf5]';

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      // 1. ترجمة النص أولاً لضمان الفهم الصحيح
      setStatusText('جاري تحليل النص...');
      const translatedPrompt = await translateToEnglish(prompt);
      
      // إضافة تحسينات على البرومبت لضمان الجودة
      const enhancedPrompt = `${translatedPrompt}, highly detailed, 8k resolution, cinematic lighting, hyper realistic`;
      const encodedPrompt = encodeURIComponent(enhancedPrompt);
      const randomSeed = Math.floor(Math.random() * 999999);

      // تحديد الأبعاد
      let width = 1024;
      let height = 1024;
      if (selectedSize === '9:16') { width = 720; height = 1280; }
      if (selectedSize === '16:9') { width = 1280; height = 720; }
      if (selectedSize === '4:5') { width = 1080; height = 1350; }

      setStatusText('جاري التوليد بالذكاء الاصطناعي...');
      
      if (!isVideo) {
        // --- توليد الصور ---
        const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${randomSeed}&nologo=true&model=flux`;
        
        // تحميل مسبق للصورة
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
          setLoading(false);
          setResult(imageUrl);
        };
        img.onerror = () => {
          setLoading(false);
          alert("حدث خطأ أثناء التوليد، حاول مرة أخرى.");
        };

      } else {
        // --- توليد الفيديو (محاكاة ذكية) ---
        // بما أن APIs الفيديو غير مجانية، سنولد "صورة سينمائية" بناءً على وصف المستخدم تماماً
        // ونعرضها بتأثير حركي (Ken Burns) لتبدو كفيديو.
        
        const videoFrameUrl = `https://image.pollinations.ai/prompt/cinematic shot from a movie, ${encodedPrompt}?width=${width}&height=${height}&seed=${randomSeed}&nologo=true&model=flux-pro`;
        
        // تأخير بسيط لمحاكاة معالجة الفيديو
        await new Promise(r => setTimeout(r, 3000));
        
        const img = new Image();
        img.src = videoFrameUrl;
        img.onload = () => {
          setLoading(false);
          setResult(videoFrameUrl); // نستخدم الصورة لكن سنعرضها كفيديو
        };
      }

    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("حدث خطأ في الاتصال");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRefImage(URL.createObjectURL(file));
    }
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    alert("تم نسخ النص!");
  };

  return (
    <div className="min-h-screen bg-[#0E0E13] text-white font-cairo flex flex-col">
      <div className="p-4 flex items-center gap-4 border-b border-[#1A1A23] bg-[#0E0E13]">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-[#1A1A23]">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
           {icon}
           <h2 className="font-bold text-lg">{title}</h2>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        <div 
          onClick={() => fileInputRef.current.click()}
          className="mb-6 border-2 border-dashed border-[#2A2A35] rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-[#6A5CFF] transition-colors min-h-[120px]"
        >
          {refImage ? (
            <div className="relative w-full h-40">
                <img src={refImage} alt="Ref" className="w-full h-full object-contain rounded-lg" />
                <button 
                  onClick={(e) => { e.stopPropagation(); setRefImage(null); }}
                  className="absolute top-2 right-2 bg-red-500/80 p-1 rounded-full"
                >
                    <ArrowLeft className="w-4 h-4 rotate-45" />
                </button>
            </div>
          ) : (
            <>
              <div className="w-10 h-10 bg-[#1A1A23] rounded-full flex items-center justify-center mb-2">
                 <ImageIcon className="w-5 h-5 text-[#B5B5C3]" />
              </div>
              <p className="text-sm text-[#B5B5C3]">تحميل صورة مرجعية (اختياري)</p>
            </>
          )}
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold mb-2 text-[#B5B5C3]">الوصف (Prompt)</label>
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={isVideo ? `صف الفيديو بدقة...\nمثال: "سيارة فيراري حمراء تسير بسرعة في شوارع طوكيو ليلاً مع أمطار خفيفة"` : `اكتب وصفاً دقيقاً...\nمثال: "صورة مقربة لعين قطة تعكس المجرة، دقة عالية"`}
              className="w-full bg-[#1A1A23] border border-[#2A2A35] rounded-xl p-4 text-white focus:border-[#6A5CFF] outline-none min-h-[160px] resize-none text-right"
              maxLength={4000}
            />
            <div className="absolute bottom-4 left-4 text-xs text-[#555]">
              {prompt.length} / 4000
            </div>
            <button onClick={copyPrompt} className="absolute top-4 left-4 p-2 bg-[#2A2A35] rounded-lg hover:bg-[#333]">
                <Copy className="w-4 h-4 text-[#B5B5C3]" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
           <div>
             <label className="block text-xs font-bold mb-2 text-[#B5B5C3]">المقاس</label>
             <select 
               value={selectedSize}
               onChange={(e) => setSelectedSize(e.target.value)}
               className="w-full bg-[#1A1A23] border border-[#2A2A35] rounded-lg p-3 text-sm outline-none focus:border-[#6A5CFF]"
             >
                <option value="1:1">1:1 (مربع)</option>
                <option value="9:16">9:16 (تيك توك)</option>
                <option value="16:9">16:9 (يوتيوب)</option>
                <option value="4:5">4:5 (بوست)</option>
             </select>
           </div>
           <div>
             <label className="block text-xs font-bold mb-2 text-[#B5B5C3]">الموديل</label>
             <div className="w-full bg-[#1A1A23] border border-[#2A2A35] rounded-lg p-3 text-sm text-[#777] cursor-not-allowed flex items-center justify-between">
                <span>{modelName}</span>
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
             </div>
           </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !prompt}
          className={`w-full py-4 rounded-xl font-bold text-lg text-black transition-all flex items-center justify-center gap-2 ${loading || !prompt ? 'bg-[#2A2A35] text-[#777] cursor-not-allowed' : buttonColor}`}
        >
          {loading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>{statusText || 'جاري المعالجة...'}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-6 h-6" />
              <span>توليد الآن</span>
            </>
          )}
        </button>

        {result && (
            <div className="mt-8 bg-[#1A1A23] rounded-2xl p-4 border border-[#2A2A35] animate-fade-in">
                <h3 className="font-bold mb-4 text-center">النتيجة:</h3>
                <div className="rounded-lg overflow-hidden mb-4 border border-[#2A2A35] bg-black flex items-center justify-center min-h-[300px] relative group">
                    {isVideo ? (
                        /* Smart Video Simulation: Ken Burns Effect */
                        <div className="relative w-full overflow-hidden h-[400px]">
                           <div 
                             className="w-full h-full bg-cover bg-center absolute top-0 left-0 transition-transform duration-[10s] ease-linear transform scale-100 group-hover:scale-125"
                             style={{ 
                               backgroundImage: `url(${result})`,
                               animation: 'kenburns 15s infinite alternate' 
                             }}
                           ></div>
                           {/* Fake UI Overlay */}
                           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                 <Play className="w-8 h-8 text-white fill-white" />
                              </div>
                           </div>
                           <div className="absolute top-2 left-2 bg-black/60 px-2 py-1 rounded text-[10px] text-white z-10">AI Preview Clip</div>
                           
                           {/* CSS for Animation */}
                           <style>{`
                             @keyframes kenburns {
                               0% { transform: scale(1.0); }
                               100% { transform: scale(1.2) translate(-2%, -2%); }
                             }
                           `}</style>
                        </div>
                    ) : (
                        <img src={result} alt="Generated" className="w-full h-auto max-h-[500px] object-contain" />
                    )}
                </div>
                
                <div className="flex gap-3">
                    <a 
                      href={result} 
                      download={`samco_ai_${Date.now()}.${isVideo ? 'jpg' : 'jpg'}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 bg-[#2A2A35] py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#333] transition-colors text-white no-underline"
                    >
                        <Download className="w-4 h-4" /> تحميل
                    </a>
                    <button className="flex-1 bg-[#2A2A35] py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#333] transition-colors text-white">
                        <Share2 className="w-4 h-4" /> مشاركة
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState('splash');
  
  useEffect(() => {}, []);

  const handleSplashFinish = () => {
    const isFollowed = localStorage.getItem('samco_user_followed');
    setView(isFollowed ? 'home' : 'followGate');
  };

  const handleFollowUnlock = () => {
    setView('home');
  };

  const renderView = () => {
    switch(view) {
      case 'splash': return <SplashScreen onFinish={handleSplashFinish} />;
      case 'followGate': return <FollowGate onUnlock={handleFollowUnlock} />;
      case 'home': return <HomeScreen onNavigate={(screen) => setView(screen)} />;
      case 'imageGen': return <GeneratorScreen type="image" onBack={() => setView('home')} />;
      case 'videoGen': return <GeneratorScreen type="video" onBack={() => setView('home')} />;
      default: return <div className="text-white">Error</div>;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#0E0E13] shadow-2xl overflow-hidden relative font-sans" dir="rtl">
        {renderView()}
    </div>
  );
}
