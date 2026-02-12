import confetti from "canvas-confetti";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const noMessages = [
  "No 😢",
  "Are you sure? 🥺",
  "Pretty please? 💔",
  "Don't break my heart 😭",
  "Last chance 😩",
];

const ValentineView = ({ data }) => {
  const [noCount, setNoCount] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const [noScale, setNoScale] = useState(1);
  const [hideNo, setHideNo] = useState(false);
  const [opened, setOpened] = useState(false);

  const handleYes = () => {
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
    });

    const whatsappLink = `https://wa.me/${
      data.contact
    }?text=${encodeURIComponent(
      `I said YES to your Valentine message 💖`
    )}`;

    setTimeout(() => {
      window.location.href = whatsappLink;
    }, 1500);
  };

  const handleNo = () => {
    if (noCount < noMessages.length - 1) {
      setNoCount(noCount + 1);
      setYesScale((prev) => prev + 0.15);
      setNoScale((prev) => Math.max(prev - 0.15, 0.4));
    } else {
      setHideNo(true);
      setYesScale((prev) => prev + 0.5);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-500 via-pink-500 to-red-500 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/20 backdrop-blur-xl border border-white/30 p-8 rounded-3xl text-center text-white shadow-2xl max-w-md w-full"
      >
        {/* Header */}
        <h2 className="text-2xl font-bold mb-6">
          💌 A special message from {data.name}
        </h2>

        {/* Envelope Section */}
        {!opened ? (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpened(true)}
            className="cursor-pointer flex flex-col items-center"
          >
            <motion.div
              initial={{ rotateX: 0 }}
              animate={{ rotateX: 0 }}
              className="w-40 h-28 bg-white rounded-lg shadow-lg relative"
            >
              {/* Envelope flap */}
              <motion.div
                initial={{ rotateX: 0 }}
                animate={{ rotateX: opened ? -180 : 0 }}
                transition={{ duration: 0.8 }}
                className="absolute top-0 left-0 w-full h-14 bg-pink-400 origin-top rounded-t-lg"
              />
            </motion.div>

            <p className="mt-4 text-sm text-white/80">
              Tap to open 💕
            </p>
          </motion.div>
        ) : (
          <AnimatePresence>
            <motion.div
              key="message"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              {/* Styled Message */}
              <div className="bg-white text-pink-700 rounded-2xl p-6 shadow-inner">
                <p className="text-lg italic font-medium leading-relaxed">
                  “{data.message}”
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Question + Buttons */}
        {opened && (
          <>
            <p className="text-xl font-semibold mb-6">
              So... will you be my Valentine? 💖
            </p>

            <div className="flex justify-center gap-6 items-center">
              <motion.button
                animate={{ scale: yesScale }}
                whileTap={{ scale: yesScale - 0.1 }}
                onClick={handleYes}
                className="bg-white text-pink-600 px-6 py-3 rounded-xl font-bold shadow-lg transition"
              >
                YES 💖
              </motion.button>

              <AnimatePresence>
                {!hideNo && (
                  <motion.button
                    key="no-button"
                    initial={{ opacity: 1, scale: noScale }}
                    animate={{ scale: noScale }}
                    exit={{ opacity: 0, scale: 0, y: 50 }}
                    transition={{ duration: 0.4 }}
                    whileTap={{ scale: noScale - 0.05 }}
                    onClick={handleNo}
                    className="bg-red-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition"
                  >
                    {noMessages[noCount]}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ValentineView;
