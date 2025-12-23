import React, { useState, useEffect, useRef } from 'react';
import { Camera, Video, Share2, ArrowLeft, Download, Check, Sparkles, Image as ImageIcon, Film, UserPlus, Loader2, Copy, Menu, Play, AlertCircle } from 'lucide-react';

// --- Utility Functions ---

// 1. نظام تحسين البرومبت (Prompt Engineering System)
// هذه الدالة هي "العقل المدبر" الذي يحول كلام المستخدم البسيط إلى وصف احترافي
async function enhancePrompt(userPrompt, type) {
  try {
    // ترجمة النص أولاً (لأن النماذج تفهم الإنجليزية بدقة 100%)
    const hasArabic = /[\u0600-\u06FF]/.test(userPrompt);
    let translatedText = userPrompt;

    if (hasArabic) {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(userPrompt)}&langpair=ar|en`);
      const data = await response.json();
      if (data.responseData?.translatedText) {
        translatedText = data.responseData.translatedText;
      }
    }

    // إضافة "بهارات" الواقعية حسب نوع الطلب
    let magicSuffix = "";
    if (type === 'image') {
      // كلمات مفتاحية للصورة الواقعية جداً
      magicSuffix = ", hyper-realistic, 8k resolution, shot on Sony A7R IV, 85mm lens, f/1.8, cinematic lighting, detailed skin texture, ultra-detailed, photorealistic, blurred background";
    } else {
      // كلمات مفتاحية للفيديو/الحركة
      magicSuffix = ", cinematic movie shot, motion blur, dynamic angle, action scene, 4k, wide angle, dramatic atmosphere, trending on artstation";
    }

    // دمج النص المترجم مع الكلمات السحرية
    return `${translatedText}${magicSuffix}`;

  } catch (error) {
    console.error("Translation failed", error);
    return userPrompt + ", high quality, realistic";
  }
}

// --- Components ---

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
      <p className="text-[#B5B5C3] text-sm font-cairo">الجيل الجديد من صناعة المحتوى</p>
    </div>
  );
};

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
      <p className="text-[#B5B5C3] mb-8 max-w-xs leading-relaxed">لفتح الاستخدام المجاني، يرجى متابعة حساب سامكو الرسمي.</p>
      <button onClick={handleFollowClick} className="w-full max-w-sm bg-[#FF0050] hover:bg-[#D60045] text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 mb-4 shadow-lg shadow-[#FF0050]/20"><span className="text-xl">🎵</span><span>تابع @samco_designer</span></button>
      {hasFollowed && (
        <button onClick={handleUnlock} className="w-full max-w-sm bg-[#1A1A23] border border-[#6A5CFF] text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 animate-bounce-in"><Check className="w-5 h-5 text-[#00E5FF]" /><span>لقد تابعت، افتح التطبيق</span></button>
      )}
    </div>
  );
};

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
        <button className="p-2 bg-[#1A1A23] rounded-full border border-[#2A2A35]"><Menu className="w-5 h-5 text-[#B5B5C3]" /></button>
      </header>

      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">مرحباً 👋</h2>
          <p className="text-[#B5B5C3]">أطلق العنان لإبداعك اليوم</p>
        </div>

        <div className="grid gap-4">
          <button onClick={() => onNavigate('imageGen')} className="group relative overflow-hidden bg-[#1A1A23] p-6 rounded-2xl border border-[#2A2A35] text-right transition-all hover:border-[#6A5CFF] hover:shadow-[0_0_20px_rgba(106,92,255,0.15)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6A5CFF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-12 h-12 bg-[#6A5CFF]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#6A5CFF] transition-colors"><Camera className="w-6 h-6 text-[#6A5CFF] group-hover:text-white" /></div>
            <h3 className="text-xl font-bold mb-1">إنشاء صور واقعية</h3>
            <p className="text-sm text-[#B5B5C3] mb-4">Nano Banana Pro (Flux)</p>
            <div className="flex justify-end"><span className="text-xs bg-[#2A2A35] px-3 py-1 rounded-full text-[#00E5FF]">مجاني</span></div>
          </button>

          <button onClick={() => onNavigate('videoGen')} className="group relative overflow-hidden bg-[#1A1A23] p-6 rounded-2xl border border-[#2A2A35] text-right transition-all hover:border-[#00E5FF] hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00E5FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-12 h-12 bg-[#00E5FF]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#00E5FF] transition-colors"><Video className="w-6 h-6 text-[#00E5FF] group-hover:text-white" /></div>
            <h3 className="text-xl font-bold mb-1">إنشاء فيديو سينمائي</h3>
            <p className="text-sm text-[#B5B5C3] mb-4">Google Veo 3 (Simulation)</p>
            <div className="flex justify-end"><span className="text-xs bg-[#2A2A35] px-3 py-1 rounded-full text-[#00E5FF]">تجريبي</span></div>
          </button>

          <button onClick={() => { if (navigator.share) { navigator.share({ title: 'سامكو Ai', text: 'جرب تطبيق سامكو للذكاء الاصطناعي', url: 'https://www.tiktok.com/@samco_designer' }); } else { alert("المشاركة غير مدعومة"); } }} className="bg-gradient-to-r from-[#1A1A23] to-[#15151c] p-4 rounded-xl border border-[#2A2A35] flex items-center justify-between">
            <div className="flex items-center gap-3"><div className="w-10 h-10 bg-[#2A2A35] rounded-full flex items-center justify-center"><Share2 className="w-5 h-5 text-white" /></div><span className="font-bold text-sm">شارك التطبيق</span></div>
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

const GeneratorScreen = ({ type, onBack }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [statusText, setStatusText] = useState('');
  const [selectedSize, setSelectedSize] = useState(type === 'video' ? '9:16' : '1:1');
  const fileInputRef = useRef(null);
  const [refImage, setRefImage] = useState(null);
  const [imageDescription, setImageDescription] = useState('');

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
      setStatusText('جاري تحليل البرومبت...');
      
      // 1. هندسة البرومبت الذكية
      // نقوم بدمج وصف الشخص (إذا وجد) مع وصف المشهد
      let finalUserPrompt = prompt;
      if (refImage && imageDescription) {
          finalUserPrompt = `(Subject: ${imageDescription}), ${prompt}`;
      } else if (refImage && !imageDescription) {
          alert("تنبيه: لقد قمت برفع صورة ولكن لم تصف الشخص! للحصول على أفضل نتيجة، أضف وصفاً للشخص في مربع النص (مثال: شاب بشعر أسود قصير).");
      }

      const enhancedPrompt = await enhancePrompt(finalUserPrompt, type ? 'video' : 'image');
      const encodedPrompt = encodeURIComponent(enhancedPrompt);
      const randomSeed = Math.floor(Math.random() * 999999);

      // 2. إعدادات الأبعاد
      let width = 1024;
      let height = 1024;
      if (selectedSize === '9:16') { width = 720; height = 1280; }
      if (selectedSize === '16:9') { width = 1280; height = 720; }
      if (selectedSize === '4:5') { width = 1080; height = 1350; }

      // 3. التوليد الفعلي
      setStatusText('جاري الاتصال بالمحرك...');

      // نستخدم نموذج flux-realism لأنه الأقوى حالياً في الواقعية وفهم التفاصيل
      // نضيف negative_prompt لمنع التشوهات
      const negative = "cartoon, anime, drawing, painting, ugly, deformed, blur, watermark";
      const baseUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${randomSeed}&nologo=true&model=flux-realism&enhance=true&negative_prompt=${negative}`;

      if (!isVideo) {
        // --- صورة ---
        // تحميل مسبق للصورة للتأكد من نجاحها قبل عرضها
        const img = new Image();
        img.src = baseUrl;
        img.onload = () => {
          setLoading(false);
          setResult(baseUrl);
        };
        img.onerror = () => {
          setLoading(false);
          // محاولة ثانية بنموذج مختلف في حال الفشل
          const retryUrl = baseUrl.replace('flux-realism', 'any-dark');
          setResult(retryUrl); // عرض المحاولة الثانية مباشرة
        };
      } else {
        // --- فيديو (محاكاة الحركة) ---
        // في النسخة المجانية، نستخدم "Motion Image" (صورة حركية)
        // لأن توليد فيديو حقيقي (MP4) يتطلب اشتراكاً مدفوعاً في APIs.
        // الحل: نولد صورة سينمائية جداً، ونحركها بالكود (CSS Animation)
        
        // تأخير بسيط لمحاكاة المعالجة
        await new Promise(r => setTimeout(r, 2000));
        
        const img = new Image();
        img.src = baseUrl;
        img.onload = () => {
          setLoading(false);
          setResult(baseUrl);
        };
        img.onerror = () => {
          setLoading(false);
          // Fallback image if prompt was too complex
          setResult('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop');
          alert("كان الوصف معقداً جداً للفيديو، تم عرض مشهد افتراضي.");
        };
      }

    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("حدث خطأ، حاول مرة أخرى.");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRefImage(URL.createObjectURL(file));
      // نقترح على المستخدم إضافة وصف للصورة
      if (!prompt.includes('وصف الشخص:')) {
         setPrompt(prev => "وصف الشخص: (اكتب هنا مواصفات الشخص في الصورة مثل لون الشعر والبشرة) \n" + prev);
      }
    }
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    alert("تم النسخ!");
  };

  return (
    <div className="min-h-screen bg-[#0E0E13] text-white font-cairo flex flex-col">
      <div className="p-4 flex items-center gap-4 border-b border-[#1A1A23] bg-[#0E0E13]">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-[#1A1A23]"><ArrowLeft className="w-6 h-6" /></button>
        <div className="flex items-center gap-2">{icon}<h2 className="font-bold text-lg">{title}</h2></div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        
        {/* قسم رفع الصورة المرجعية المطور */}
        <div onClick={() => fileInputRef.current.click()} className={`mb-4 border-2 border-dashed ${refImage ? 'border-[#6A5CFF] bg-[#6A5CFF]/10' : 'border-[#2A2A35]'} rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-[#6A5CFF] transition-colors min-h-[100px]`}>
          {refImage ? (
            <div className="flex items-center gap-4 w-full">
                <img src={refImage} alt="Ref" className="w-16 h-16 object-cover rounded-lg border border-white/20" />
                <div className="text-right flex-1">
                    <p className="text-sm font-bold text-white">تم رفع الصورة</p>
                    <p className="text-xs text-[#00E5FF] mt-1">هام: تأكد من وصف ملامح الشخص في مربع النص أدناه لضمان التطابق!</p>
                </div>
                <button onClick={(e) => { e.stopPropagation(); setRefImage(null); }} className="bg-red-500/20 p-2 rounded-full text-red-500"><ArrowLeft className="w-4 h-4 rotate-45" /></button>
            </div>
          ) : (
            <>
              <div className="w-10 h-10 bg-[#1A1A23] rounded-full flex items-center justify-center mb-2"><ImageIcon className="w-5 h-5 text-[#B5B5C3]" /></div>
              <p className="text-sm text-[#B5B5C3]">اضغط لرفع صورة شخصية (مرجع)</p>
            </>
          )}
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
        </div>

        {/* تنبيه ذكي للمستخدم */}
        {refImage && (
            <div className="mb-4 bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                <p className="text-xs text-yellow-200/80 leading-relaxed">
                    نصيحة احترافية: الذكاء الاصطناعي لا "يرى" صورتك المرفقة بشكل مباشر في النسخة المجانية. 
                    <br/>
                    <span className="font-bold text-yellow-500">الحل:</span> اكتب وصفاً دقيقاً للشخص في مربع النص (مثال: رجل بشعر أسود ولحية خفيفة يرتدي قميصاً أبيض).
                </p>
            </div>
        )}

        <div className="mb-6">
          <label className="block text-sm font-bold mb-2 text-[#B5B5C3]">الوصف (Prompt)</label>
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={isVideo 
                ? `اكتب وصف المشهد الحركي...\nمثال: "شخص يرقص بحماس وسط حفلة، إضاءة ليزر، حركة سريعة، زاوية واسعة"` 
                : `اكتب وصف الصورة...\nمثال: "سيلفي لشاب (وصفه هنا) مع سوبرمان في مدينة الرياض، برج المملكة في الخلفية، واقعية جداً"`
              }
              className="w-full bg-[#1A1A23] border border-[#2A2A35] rounded-xl p-4 text-white focus:border-[#6A5CFF] outline-none min-h-[160px] resize-none text-right placeholder:text-gray-600"
              maxLength={4000}
            />
            <div className="absolute bottom-4 left-4 text-xs text-[#555]">{prompt.length} / 4000</div>
            <button onClick={copyPrompt} className="absolute top-4 left-4 p-2 bg-[#2A2A35] rounded-lg hover:bg-[#333]"><Copy className="w-4 h-4 text-[#B5B5C3]" /></button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
           <div>
             <label className="block text-xs font-bold mb-2 text-[#B5B5C3]">المقاس</label>
             <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="w-full bg-[#1A1A23] border border-[#2A2A35] rounded-lg p-3 text-sm outline-none focus:border-[#6A5CFF]">
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

        <button onClick={handleGenerate} disabled={loading || !prompt} className={`w-full py-4 rounded-xl font-bold text-lg text-black transition-all flex items-center justify-center gap-2 ${loading || !prompt ? 'bg-[#2A2A35] text-[#777] cursor-not-allowed' : buttonColor}`}>
          {loading ? <><Loader2 className="w-6 h-6 animate-spin" /><span>{statusText || 'جاري المعالجة...'}</span></> : <><Sparkles className="w-6 h-6" /><span>توليد الآن</span></>}
        </button>

        {result && (
            <div className="mt-8 bg-[#1A1A23] rounded-2xl p-4 border border-[#2A2A35] animate-fade-in">
                <h3 className="font-bold mb-4 text-center">النتيجة:</h3>
                <div className="rounded-lg overflow-hidden mb-4 border border-[#2A2A35] bg-black flex items-center justify-center min-h-[300px] relative group overflow-hidden">
                    {isVideo ? (
                        <div className="relative w-full overflow-hidden h-[450px]">
                           {/* محاكاة الحركة الذكية (Advanced CSS Animation) */}
                           <div className="w-full h-full bg-cover bg-center absolute top-0 left-0" 
                                style={{ 
                                   backgroundImage: `url(${result})`, 
                                   animation: 'panZoom 15s infinite alternate ease-in-out',
                                   transformOrigin: 'center center'
                                }}>
                           </div>
                           
                           {/* تأثيرات بصرية فوق الفيديو */}
                           <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                           
                           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                                 <Play className="w-8 h-8 text-white fill-white opacity-80" />
                              </div>
                           </div>
                           <div className="absolute top-3 left-3 bg-red-600/80 px-2 py-1 rounded text-[10px] text-white z-10 font-bold uppercase tracking-wider flex items-center gap-1">
                               <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div> Live Render
                           </div>

                           <style>{`
                             @keyframes panZoom {
                               0% { transform: scale(1.0) translate(0, 0); filter: brightness(1); }
                               50% { transform: scale(1.15) translate(-2%, 1%); filter: brightness(1.1); }
                               100% { transform: scale(1.0) translate(2%, -2%); filter: brightness(1); }
                             }
                           `}</style>
                        </div>
                    ) : (
                        <img src={result} alt="Generated" className="w-full h-auto max-h-[500px] object-contain shadow-2xl" />
                    )}
                </div>
                
                <div className="flex gap-3">
                    <a href={result} download={`samco_ai_${Date.now()}.${isVideo ? 'jpg' : 'jpg'}`} target="_blank" rel="noreferrer" className="flex-1 bg-[#2A2A35] py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#333] transition-colors text-white no-underline"><Download className="w-4 h-4" /> تحميل</a>
                    <button className="flex-1 bg-[#2A2A35] py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#333] transition-colors text-white"><Share2 className="w-4 h-4" /> مشاركة</button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState('splash');
  const handleSplashFinish = () => setView(localStorage.getItem('samco_user_followed') ? 'home' : 'followGate');
  const handleFollowUnlock = () => setView('home');
  const renderView = () => {
    switch(view) {
      case 'splash': return <SplashScreen onFinish={handleSplashFinish} />;
      case 'followGate': return <FollowGate onUnlock={handleFollowUnlock} />;
      case 'home': return <HomeScreen onNavigate={setView} />;
      case 'imageGen': return <GeneratorScreen type="image" onBack={() => setView('home')} />;
      case 'videoGen': return <GeneratorScreen type="video" onBack={() => setView('home')} />;
      default: return <div className="text-white">Error</div>;
    }
  };
  return <div className="max-w-md mx-auto min-h-screen bg-[#0E0E13] shadow-2xl overflow-hidden relative font-sans" dir="rtl">{renderView()}</div>;
}
