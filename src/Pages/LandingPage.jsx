import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import ValentineView from "./ValentineView";

const hearts = Array.from({ length: 12 });

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const LandingPage = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");

  const location = useLocation();
  const [receivedData, setReceivedData] = useState(null);

  const formatKenyanNumber = (number) => {
    const cleaned = number.replace(/\D/g, "");
  
    if (cleaned.length === 10 && cleaned.startsWith("07")) {
      return "254" + cleaned.slice(1);
    }
  
    return null;
  };
  

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const data = params.get("data");

    if (data) {
      try {
        const decoded = JSON.parse(atob(data));
        setReceivedData(decoded);
      } catch (error) {
        console.error("Invalid link");
      }
    }
  }, [location]);

  const generateLink = () => {
    if (!name || !message || !contact) {
      alert("Please fill all fields 💖");
      return;
    }
  
    const formattedNumber = formatKenyanNumber(contact);
  
    if (!formattedNumber) {
      alert("Please enter a valid Kenyan number (07XXXXXXXX) 💕");
      return;
    }
  
    const payload = {
      name,
      message,
      contact: formattedNumber,
    };
  
    const encoded = btoa(JSON.stringify(payload));
    const link = `${window.location.origin}/?data=${encoded}`;
  
    setGeneratedLink(link);
  
    
    setName("");
    setMessage("");
    setContact("");
  };
  
  const copyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    alert("Link copied 💌");
  };

  if (receivedData) {
    return <ValentineView data={receivedData} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-rose-400 to-red-400 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Floating Hearts Background */}
      <motion.div
        className="absolute opacity-20"
        animate={{ y: [0, 0, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ top: "10%", left: "10%" }}
      >
        <Heart size={80} className="text-white fill-white" />
      </motion.div>

      {/* Floating Hearts Background */}
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          className="absolute z-0"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
            opacity: Math.random() * 0.4 + 0.3,
            scale: Math.random() * 0.6 + 0.4,
          }}
          animate={{
            y: -100,
            x: Math.random() * window.innerWidth,
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 6 + 6,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        >
          <Heart className="text-white fill-white" size={30} />
        </motion.div>
      ))}

      {/* Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md p-8 rounded-3xl 
                   bg-white/20 backdrop-blur-xl 
                   border border-white/30 
                   shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-center text-white mb-2 drop-shadow-lg">
          💘 Create Your Valentine Link
        </h1>

        <p className="text-center text-white/80 mb-6">
          Send a magical message to someone special 💖
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 rounded-xl bg-white/30 text-white placeholder-white/70 
                       focus:outline-none focus:ring-2 focus:ring-white/60"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            placeholder="Your Valentine Message..."
            rows="4"
            className="w-full p-3 rounded-xl bg-white/30 text-white placeholder-white/70 
                       focus:outline-none focus:ring-2 focus:ring-white/60"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Your WhatsApp number (e.g. 0712345678)"
            className="w-full p-3 rounded-xl bg-white/30 text-white placeholder-white/70 
             focus:outline-none focus:ring-2 focus:ring-white/60"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            maxLength={10}
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateLink}
            className="w-full bg-white text-pink-600 py-3 rounded-xl font-semibold shadow-lg"
          >
            Generate Love Link 💌
          </motion.button>
        </div>

        {generatedLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 space-y-3"
          >
            <input
              type="text"
              value={generatedLink}
              readOnly
              className="w-full p-2 rounded-lg bg-white/30 text-white text-sm"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyLink}
              className="w-full bg-pink-700 text-white py-2 rounded-lg"
            >
              Copy Link 💖 (send to someone special)
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default LandingPage;
