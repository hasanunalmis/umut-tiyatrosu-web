import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { collection, addDoc } from 'firebase/firestore'; 
import { db } from '../firebaseConfig'; 
import emailjs from '@emailjs/browser';
import bgDokusu from '../assets/tiyatrologo.png'; 
import logo1 from '../assets/hussatlogo.jpg'
import logo2 from '../assets/ksklogo.jpg'
import logo3 from '../assets/thklogo.png'
import logo4 from '../assets/hflogo.jpg'
import logo5 from '../assets/logoo.jpg'
import logo6 from '../assets/hktlogo.jpg'

interface FormData {
  type: 'katilimci' | 'bagisci';
  name: string;
  surname: string;
  phone: string;
  email: string;
  school: string;
}

const schools = ["Necmettin Erbakan Üniversitesi", "Selçuk Üniversitesi", "KTO Karatay Üniversitesi","Konya Teknik Üniversitesi", "Diğer"];

function Hero() {
  const [formData, setFormData] = useState<FormData>({
    type: 'katilimci', name: '', surname: '', phone: '', email: '', school: schools[0]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (type: 'katilimci' | 'bagisci') => {
    setFormData({ ...formData, type });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      
      
      await addDoc(collection(db, "basvurular"), {
        ...formData, 
        createdAt: new Date(), 
        paymentStatus: "beklemede" 
      });

      await emailjs.send(
        "service_9elvzqb",     
        "template_uzayglc",    
        {
          name: formData.name,
          surname: formData.surname,
          phone: formData.phone,
          school: formData.school,
          type: formData.type,
          email: formData.email, 
        },
        "s7XAKK5_LLVWTJf-z"      
      );

      setTimeout(() => {
          setIsSubmitting(false);
          setIsSuccess(true);
      }, 1000);

    } catch (error) {
      console.error("Hata oluştu: ", error);
      alert("Bir hata oluştu. Lütfen internet bağlantınızı kontrol edip tekrar deneyin.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 font-text overflow-x-hidden relative bg-[#b6b6b6]">
      
      {/* --- ARKAPLAN DOKUSU --- */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-10 pointer-events-none flex flex-wrap justify-center content-start gap-12 p-10">
          {[...Array(108)].map((_, i) => (
             <img key={i} src={bgDokusu} alt="doku" className="w-24 h-24 object-contain opacity-50" />
          ))}
      </div>
      
      {/* --- İÇERİK KAPSAYICISI --- */}
      <div className="w-full flex flex-col items-center relative z-10">
        
        {/* BAŞLIK ALANI */}
        <div className="text-center mt-6 md:mt-10 mb-8 max-w-3xl px-4 relative">
          <h1 className="text-4xl md:text-6xl font-heading text-main-red mb-4 tracking-wide drop-shadow-sm uppercase">
            UMUT TİYATROSU
          </h1>
          <p className="text-main-blue text-sm md:text-lg font-medium leading-relaxed bg-white/40 backdrop-blur-sm p-2 rounded-lg inline-block">
            Aşağıdaki formu doldurduktan sonra ödeme işlemini gerçekleştirebilirsiniz. <br className="hidden md:block"/>
            Ödeme işleminden sonra fiziki bileti fakültemizden temin edebilirsiniz.
          </p>
        </div>

        {/* --- BİLET ALANI --- */}
        <div className="relative w-full max-w-[1000px] flex flex-col md:flex-row drop-shadow-2xl my-auto">
          
          {/* 1. SOL KISIM (ANA GÖVDE) */}
          <div className="relative flex-1 bg-main-white p-4 md:p-8 flex flex-col z-20
            /* Mobil Kenarlıklar: Üst, Sol, Sağ dolu; Alt boş */
            rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none 
            border-t-8 border-l-8 border-r-8 border-b-0 
            /* Desktop Kenarlıklar: Üst, Alt, Sol dolu; Sağ boş */
            md:border-b-8 md:border-r-0
            border-main-red"
          >
            {/* Köşe Süsleri */}
            <div className="absolute top-0 left-0 w-8 h-8 bg-main-red rounded-br-full z-10"></div>
            {/* Mobilde sağ üst köşe süsü */}
            <div className="absolute top-0 right-0 w-8 h-8 bg-main-red rounded-bl-full z-10 md:hidden"></div>
            {/* Desktop sol alt köşe süsü */}
            <div className="absolute bottom-0 left-0 w-8 h-8 bg-main-red rounded-tr-full z-10 hidden md:block"></div>
            
            {/* Sol/Üst Kenar Delikleri */}
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-30 hidden md:flex">
                  {[...Array(8)].map((_, i) => (
                      <div key={i} className="w-3 h-3 rounded-full border-2 border-main-blue bg-[#fafafa]"></div>
                  ))}
            </div>

            <div className="flex flex-col h-full justify-between relative z-20 md:pl-4">
              
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto bg-white/50 p-4 md:p-6 rounded-xl border border-main-blue/20 backdrop-blur-sm shadow-sm">
                   <div className="flex gap-2 md:gap-4 mb-6">
                      <button type="button" onClick={() => handleTypeChange('katilimci')} className={`flex-1 py-2 text-xs md:text-base text-center rounded-lg border-2 font-bold transition-all ${formData.type === 'katilimci' ? 'bg-main-red text-main-white border-main-red' : 'bg-transparent text-main-blue border-main-blue/30 hover:border-main-blue'}`}>KATILIMCI</button>
                      <button type="button" onClick={() => handleTypeChange('bagisci')} className={`flex-1 py-2 text-xs md:text-base text-center rounded-lg border-2 font-bold transition-all ${formData.type === 'bagisci' ? 'bg-main-red text-main-white border-main-red' : 'bg-transparent text-main-blue border-main-blue/30 hover:border-main-blue'}`}>BAĞIŞÇI</button>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-4">
                      <div className="flex flex-col">
                          <label className="text-xs font-bold text-main-red uppercase mb-1 tracking-wider">Ad</label>
                          <input required name="name" onChange={handleChange} className="bg-transparent border-b-2 border-main-blue text-neutral-800 focus:outline-none py-1 placeholder-gray-400 font-bold" placeholder="Adınız" />
                      </div>
                      <div className="flex flex-col">
                          <label className="text-xs font-bold text-main-red uppercase mb-1 tracking-wider">Soyad</label>
                          <input required name="surname" onChange={handleChange} className="bg-transparent border-b-2 border-main-blue text-neutral-800 focus:outline-none py-1 placeholder-gray-400 font-bold" placeholder="Soyadınız" />
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-4">
                      <div className="flex flex-col">
                          <label className="text-xs font-bold text-main-red uppercase mb-1 tracking-wider">Telefon</label>
                          <input required name="phone" type="tel" onChange={handleChange} className="bg-transparent border-b-2 border-main-blue text-neutral-800 focus:outline-none py-1 placeholder-gray-400 font-bold" placeholder="0555..." />
                      </div>
                      <div className="flex flex-col">
                          <label className="text-xs font-bold text-main-red uppercase mb-1 tracking-wider">E-Mail</label>
                          <input required name="email" type="email" onChange={handleChange} className="bg-transparent border-b-2 border-main-blue text-neutral-800 focus:outline-none py-1 placeholder-gray-400 font-bold" placeholder="mail@ornek.com" />
                      </div>
                   </div>

                   <div className="flex flex-col mb-6">
                      <label className="text-xs font-bold text-main-red uppercase mb-1 tracking-wider">Okul / Bölüm</label>
                      <select name="school" onChange={handleChange} className="bg-transparent border-b-2 border-main-blue text-neutral-800 focus:outline-none py-1 cursor-pointer font-bold text-sm md:text-base">
                          {schools.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                   </div>

                   <button disabled={isSubmitting} className="w-full bg-main-red hover:opacity-90 text-main-white font-heading text-lg md:text-xl py-3 rounded-lg shadow-md transition-all transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed tracking-widest uppercase">
                     {isSubmitting ? 'KAYDEDİLİYOR...' : (formData.type === 'bagisci' ? 'BAĞIŞ YAP' : 'BİLETİ OLUŞTUR')}
                   </button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 animate-pulse">
                  <span className="text-6xl mb-4">✨</span>
                  <h2 className="text-4xl font-bold text-main-red font-heading">TEŞEKKÜRLER!</h2>
                  <p className="text-main-blue font-bold mt-2 text-xl text-center">{formData.type === 'bagisci' ? 'Bağış kaydınız alındı.' : 'Bilet kaydınız başarıyla oluşturuldu.'}</p>
                </div>
              )}

              <div className="text-center mt-8 pb-2">
                 <p className="text-main-red font-bold text-xs md:text-lg uppercase tracking-tight leading-tight">
                   27 KASIM PERŞEMBE SAAT 19.00 <br className="hidden md:block" /> 
                   NECMETTİN ERBAKAN ÜNİVERSİTESİ HUKUK FAKÜLTESİ KONFERANS SALONU
                 </p>
              </div>
            </div>
          </div>

          {/* 2. MENTEŞE (KESİK ÇİZGİ) */}
          <div className="relative flex items-center justify-center z-10 bg-main-white
              /* Mobil Boyut */
              w-full h-4 
              /* Desktop Boyut */
              md:w-4 md:h-auto"
          >
             {/* Çizgi: Mobilde Yatay (border-t), Desktopta Dikey (border-l) */}
             <div className="w-full h-0 border-t-4 md:w-0 md:h-full md:border-t-0 md:border-l-4 border-dashed border-main-blue opacity-40"></div>
             
             {/* DESKTOP ÇENTİKLER (Üst ve Alt) */}
             <div className="absolute -top-2 left-[-10px] w-6 h-6 bg-[#b6b6b6] rounded-full hidden md:block z-30"></div>
             <div className="absolute -bottom-2 left-[-10px] w-6 h-6 bg-[#b6b6b6] rounded-full hidden md:block z-30"></div>
             
             {/* MOBİL ÇENTİKLER (Sol ve Sağ) */}
             <div className="absolute top-[-10px] -left-2 w-6 h-6 bg-[#b6b6b6] rounded-full md:hidden z-30"></div>
             <div className="absolute top-[-10px] -right-2 w-6 h-6 bg-[#b6b6b6] rounded-full md:hidden z-30"></div>
          </div>

          {/* 3. SAĞ KISIM (KOÇAN) */}
          <motion.div 
              initial={{ opacity: 1, x: 0, rotate: 0 }}
              animate={isSuccess ? { 
                  x: window.innerWidth > 768 ? 200 : 0, 
                  y: window.innerWidth > 768 ? 100 : 200, 
                  rotate: 45, 
                  opacity: 0, 
                  transition: { duration: 1.2, ease: "anticipate" } 
              } : {}}
              className="bg-main-white relative flex flex-col items-center justify-center p-4 min-h-[150px] md:min-h-[250px] z-20
                /* Mobil Kenarlıklar: Alt, Sol, Sağ dolu; Üst boş */
                rounded-b-3xl md:rounded-r-3xl md:rounded-tl-none 
                border-b-8 border-l-8 border-r-8 border-t-0
                /* Desktop Kenarlıklar: Alt, Üst, Sağ dolu; Sol boş */
                md:border-t-8 md:border-l-0
                border-main-red md:w-56"
          >
              {/* Desktop Köşe Süsleri */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-main-red rounded-bl-full z-10 hidden md:block"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-main-red rounded-tl-full z-10 hidden md:block"></div>
              
              {/* Mobil Köşe Süsleri (Alt köşeler) */}
              <div className="absolute bottom-0 left-0 w-8 h-8 bg-main-red rounded-tr-full z-10 md:hidden"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-main-red rounded-tl-full z-10 md:hidden"></div>

              {/* Sağ Kenar Delikleri (Sadece Desktop) */}
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 hidden md:flex">
                  {[...Array(8)].map((_, i) => (
                      <div key={i} className="w-3 h-3 rounded-full border-2 border-main-blue bg-[#fafafa]"></div>
                  ))}
              </div>

              <div className="h-full flex flex-row items-center justify-center gap-5 relative z-20">
                  <div className="h-[80px] md:h-[160px] w-1.5 bg-main-blue rounded-full opacity-80"></div>
                  <div className="flex flex-col items-center justify-center gap-2">
                      <h2 className="text-2xl md:text-3xl font-heading text-main-blue [writing-mode:vertical-lr] rotate-180 tracking-widest whitespace-nowrap">TEK KİŞİLİK</h2>
                      <h2 className="text-2xl md:text-3xl font-heading text-main-red [writing-mode:vertical-lr] rotate-180 font-bold mt-2 whitespace-nowrap">100 TL</h2>
                  </div>
                  <div className="h-[80px] md:h-[160px] w-1.5 bg-main-blue rounded-full opacity-80"></div>
              </div>
          </motion.div>
        </div>

        {/* BİLET ALTI UYARI */}
        <div className="text-center mt-12 px-4 relative z-10">
          <div className="inline-block bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-200 max-w-2xl">
              <h3 className="text-lg md:text-2xl font-bold text-main-red">
                  TÜM GELİRLER KİMSESİZ ÇOCUKLARA BAĞIŞLANACAKTIR.
              </h3>
          </div>
        </div>

        {/* LOGOLAR */}
        <div className="w-full mt-8 mb-8 relative z-10 pb-8">
          <div className="flex justify-center items-center gap-4 md:gap-10 flex-wrap opacity-100">
              {[logo1, logo2, logo3, logo4, logo5, logo6].map((logo, index) => (
                 <div key={index} className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white border border-gray-300 flex items-center justify-center shadow-md hover:scale-110 transition-transform overflow-hidden">
                    <img src={logo} alt={`logo-${index}`} className="w-full h-full object-contain" />
                 </div>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Hero;



