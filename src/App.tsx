/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Mail, Compass, Users, Map, TreePine, ChevronDown, Calendar, Globe, Sparkles, Instagram, ExternalLink, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TARGET_DATE = new Date('2026-05-16T00:00:00').getTime();

export default function App() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isClient, setIsClient] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeMessageIndex, setActiveMessageIndex] = useState<number | null>(null);

  useEffect(() => {
    setIsClient(true);
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = TARGET_DATE - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft(); // Initial call
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const activities = [
    { name: '5月寵物露營', status: '可報名', color: 'text-green-700 bg-green-100 border-green-200', active: true, url: 'https://forms.gle/j2tJvhZNpHd7FXZG8', note: '參加過的朋朋請找JoJo領正式報名表' },
    { name: '6月三鐵', status: '已額滿，可蹭車', color: 'text-yellow-700 bg-yellow-100 border-yellow-200', active: false },
    { name: '7月水球大戰', status: '尚未開始報名', color: 'text-gray-500 bg-gray-100 border-gray-200', active: false },
    { name: '9月西藏健行', status: '缺1', color: 'text-red-700 bg-red-100 border-red-200 font-bold', active: false },
    { name: '12月比爾王', status: '尚未開始報名', color: 'text-gray-500 bg-gray-100 border-gray-200', active: false },
    { name: '12月河口湖揪團', status: '已額滿', color: 'text-slate-600 bg-slate-200 border-slate-300', active: false },
  ];

  const sections = [
    {
      id: 'activities',
      title: '活動報名',
      desc: '參加我的戶外探險活動',
      icon: <Compass className="w-5 h-5" />,
      content: (
        <div className="pt-2 pb-4">
          <div className="bg-sand-100/50 rounded-xl p-2 space-y-1">
            {activities.map((act, i) => {
              const isOpen = activeMessageIndex === i;

              return (
                <div key={i} className="flex flex-col border-b border-sand-200/60 last:border-0 rounded-lg group">
                  {act.active ? (
                    <a 
                      href={act.url}
                      target="_blank"
                      className="flex justify-between items-center py-3 px-3 hover:bg-white/60 transition-colors cursor-pointer focus:outline-none"
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <span className="font-medium text-sm md:text-base text-forest-900 group-hover:text-forest-700 transition-colors">
                            {act.name}
                          </span>
                          <ExternalLink className="w-3.5 h-3.5 ml-2 text-forest-700/0 group-hover:text-forest-700/60 transition-opacity" />
                        </div>
                        {act.note && (
                          <span className="text-xs text-forest-700/80 mt-1 font-medium">{act.note}</span>
                        )}
                      </div>
                      <span className={`text-[10px] md:text-xs px-2.5 py-1 rounded-full border whitespace-nowrap h-max ${act.color}`}>
                        {act.status}
                      </span>
                    </a>
                  ) : (
                    <button 
                      onClick={() => setActiveMessageIndex(isOpen ? null : i)}
                      className="flex justify-between items-center py-3 px-3 hover:bg-white/60 transition-colors cursor-pointer text-left focus:outline-none w-full"
                    >
                      <div className="flex items-center">
                        <span className="font-medium text-sm md:text-base text-earth transition-colors">
                          {act.name}
                        </span>
                      </div>
                      <span className={`text-[10px] md:text-xs px-2.5 py-1 rounded-full border whitespace-nowrap ${act.color}`}>
                        {act.status}
                      </span>
                    </button>
                  )}
                  <AnimatePresence>
                    {!act.active && isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-3 pb-3 text-xs text-forest-700/90 font-medium flex items-center">
                          <MessageCircle className="w-3 h-3 mr-1.5" /> 
                          想了解詳情？請私訊 JoJo 詢問！
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      )
    },
    {
      id: 'esim',
      title: 'Esim 合作',
      desc: '專屬網卡 9 折優惠與推薦',
      icon: <Globe className="w-5 h-5" />,
      content: (
        <div className="pt-2 pb-4 px-2">
          <p className="text-sm text-earth leading-relaxed mb-4 font-medium">
            出國上網不斷線！支援多國漫遊，透過我的專屬連結結帳可享 9 折優惠。
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {['🇯🇵 日本', '🇰🇷 韓國', '🇹🇭 泰國', '🇻🇳 越南', '🇪🇺 歐洲', '🇺🇸 美國'].map(country => (
              <div key={country} className="bg-white/70 rounded-lg py-2 text-center text-sm font-medium text-forest-800 border border-sand-200 shadow-sm">{country}</div>
            ))}
          </div>
          <div className="mt-5 flex flex-col items-center">
            <span className="text-[11px] font-bold text-red-600 mb-2 px-3 py-1 bg-red-50 rounded-full border border-red-100 shadow-sm w-full text-center">
              結帳時填寫代碼 jojo 並按套用享9折唷!!
            </span>
            <span className="text-xs text-earth/80 mb-2">及其他全球 100+ 個國家通用</span>
            <a href="https://esimconnect.com.tw/#/access/esimbuy?region=%E5%9C%B0%E5%8D%80%E7%B8%BD%E8%A6%BD" target="_blank" className="text-center text-sm bg-forest-700 hover:bg-forest-800 text-sand-100 px-6 py-3 rounded-full font-medium transition-colors w-full shadow-sm hover:shadow-md flex justify-center items-center">
              領取網卡優惠 <ExternalLink className="w-4 h-4 ml-2 opacity-80" />
            </a>
          </div>
        </div>
      )
    },
    {
      id: 'wishlist',
      title: '行程許願 / 客製包團',
      desc: '沒看到想去的？或想親友獨立包團',
      icon: <Sparkles className="w-5 h-5" />,
      content: (
        <div className="pt-2 pb-4 px-2">
          <div className="text-sm text-earth leading-relaxed bg-white/40 p-4 rounded-xl border border-sand-200">
            <p className="mb-2 text-forest-900 font-medium">上面沒有你想去的行程嗎？</p>
            <p className="mb-4">
              還是想跟親朋好友獨立包團出去玩？把你的夢想目的地告訴我！不論是國內百岳、野溪溫泉，還是海外各種健行，只要人數夠，我們就有機會為你專屬策劃出發！
            </p>
            <a href="https://line.me/R/oaMessage/@690tjfnr/?我想許願/客製包團" target="_blank" className="block text-center w-full py-3 bg-sand-300 hover:bg-earth text-forest-900 hover:text-sand-100 font-semibold rounded-xl transition-all shadow-sm flex justify-center items-center">
              ✨ 偷偷把願望丟進許願池
            </a>
          </div>
        </div>
      )
    },
  ];

  const toggleSection = (id: string) => {
    setActiveSection(prev => prev === id ? null : id);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 flex justify-center items-start">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* Header Section */}
        <div className="text-center mb-10">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="inline-block relative mb-4"
          >
            <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-sand-200 shadow-xl">
              <img 
                src="https://instagram.ftpe7-3.fna.fbcdn.net/v/t51.82787-15/658356846_18315904714275341_5689939043400144247_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&ig_cache_key=Mzg2Njg5NjMwNDgyODI3OTg1OA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTkyMC5zZHIuQzMifQ%3D%3D&_nc_ohc=_WZXkmsX6QEQ7kNvwH4TMwP&_nc_oc=Ado-grnNXID-YP_npIesCvFYur0gh7ObE4ErsDhBiEQJERtLjJDx1tzrm4vUiZ-7M20&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.ftpe7-3.fna&_nc_gid=4fBRvb-y_Zg59Xa3LfyK9w&_nc_ss=7a22e&oh=00_Af0XTVtTMhbk5jL4aDKSNztdxO0BH5GEj1w3cImdQJoCXg&oe=69F624FA" 
                alt="JoJo Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-forest-800 text-white p-2 rounded-full shadow-lg">
              <TreePine className="w-5 h-5" />
            </div>
          </motion.div>
          <h1 className="text-3xl font-bold text-forest-900 tracking-tight mb-2">JoJo</h1>
          
          {/* Social Icons */}
          <div className="flex justify-center gap-3 mb-4">
            <motion.a whileHover={{ scale: 1.1, y: -2 }} href="https://www.instagram.com/jojo880714/" target="_blank" className="p-2 bg-wind-100 text-forest-700 hover:bg-forest-700 hover:text-white rounded-full transition-colors border border-forest-700/20">
              <Instagram className="w-4 h-4" />
            </motion.a>
            <motion.a whileHover={{ scale: 1.1, y: -2 }} href="https://line.me/ti/p/Da9BhH2TdY" target="_blank" className="p-2 bg-wind-100 text-forest-700 hover:bg-forest-700 hover:text-white rounded-full transition-colors border border-forest-700/20">
              <MessageCircle className="w-4 h-4" />
            </motion.a>
          </div>

          <p className="text-earth text-base opacity-95 max-w-sm mx-auto leading-relaxed font-medium">
            大家安安～我是JoJo<br />
            熱愛山林，挑戰自己的極限<br />
            希望帶領大家探索世界，發現生活未知的精彩!!
          </p>
        </div>

        {/* Countdown Section */}
        {isClient && (
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white/60 backdrop-blur-sm border border-sand-200 rounded-3xl p-6 mb-10 shadow-sm text-center"
          >
            <h2 className="text-sm font-bold text-forest-800 tracking-widest mb-4 flex items-center justify-center">
              <Calendar className="w-4 h-4 mr-2" />
              下一趟活動倒數：🏕️ 5月寵物露營
            </h2>
            <div className="flex justify-center gap-3 md:gap-4">
              {[
                { label: '天', value: timeLeft.days },
                { label: '時', value: timeLeft.hours },
                { label: '分', value: timeLeft.minutes },
                { label: '秒', value: timeLeft.seconds },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-14 h-16 sm:w-16 sm:h-18 bg-forest-900 text-sand-100 rounded-xl flex items-center justify-center text-2xl sm:text-3xl font-bold shadow-inner">
                    {item.value.toString().padStart(2, '0')}
                  </div>
                  <span className="text-xs font-medium mt-2 text-earth opacity-75">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="inline-block mt-5 px-4 py-1.5 bg-red-100 text-red-700 text-xs font-bold rounded-full animate-pulse border border-red-200">
              名額倒數中，要盡快填單 🔥
            </div>
          </motion.div>
        )}

        {/* Links Area (Accordion) */}
        <div className="space-y-4 mb-12">
          {sections.map((section, index) => {
            const isActive = activeSection === section.id;
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                className={`bg-white/80 backdrop-blur-sm border-2 rounded-2xl shadow-sm transition-all overflow-hidden ${
                  isActive ? 'border-forest-700/50 shadow-md' : 'border-transparent hover:border-forest-700/30 hover:shadow-md'
                }`}
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center p-4 group relative text-left"
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-forest-700 transform transition-transform origin-left ${isActive ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'}`}></div>
                  
                  <div className={`flex items-center justify-center shrink-0 w-12 h-12 rounded-xl mr-4 transition-colors ${
                    isActive ? 'bg-forest-800 text-sand-100' : 'text-forest-800 bg-sand-200/50 group-hover:bg-forest-800 group-hover:text-sand-100'
                  }`}>
                    {section.icon}
                  </div>
                  
                  <div className="flex-1 pr-4">
                    <h3 className={`font-semibold text-lg transition-colors ${isActive ? 'text-forest-800' : 'text-forest-900 group-hover:text-forest-800'}`}>
                      {section.title}
                    </h3>
                    <p className="text-sm text-earth/70">{section.desc}</p>
                  </div>
                  
                  <div className={`text-forest-800 transform transition-transform duration-300 ${isActive ? 'rotate-180' : 'rotate-0'}`}>
                    <ChevronDown className="w-5 h-5 opacity-60" />
                  </div>
                </button>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-4 pb-2">
                        {section.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Button */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.a
            href="mailto:jojo880714@gmail.com"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center w-full py-5 bg-forest-800 hover:bg-forest-900 text-sand-100 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all group"
          >
            <Mail className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
            商業合作洽談
          </motion.a>
          <p className="text-center text-xs text-earth/60 mt-6">
            © {new Date().getFullYear()} JoJo880714. All rights reserved.
          </p>
        </motion.div>

      </motion.div>
    </div>
  );
}
