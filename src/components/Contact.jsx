import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: "", message: "" });

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const serviceId = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID || "service_wpw24di";
    const templateId = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID || "template_ckjlp0z";
    const publicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY || "054FN52sVs08EjKgT";

    emailjs
      .send(
        serviceId,
        templateId,
        {
          name: form.name,
          from_name: form.name,
          to_name: "abielll",
          email: form.email,
          from_email: form.email,
          to_email: "abilla86goodboy@gmail.com",
          message: form.message,
        },
        publicKey
      )
      .then(
        (response) => {
          setLoading(false);
          console.log("SUCCESS!", response.status, response.text);
          setPopup({
            show: true,
            type: "success",
            message: "Pesanmu berhasil terkirim ke email pribadi abielll! Terima kasih sudah menghubungi.",
          });

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error("FAILED...", error);
          setPopup({
            show: true,
            type: "error",
            message: `Gagal mengirim pesan: ${error.text || error.message || "Silakan cek kembali koneksi atau kuota EmailJS."}`,
          });
        }
      );
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden relative`}
    >
      {/* Modern Pop-up Modal */}
      {popup.show && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4'>
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85 }}
            className='bg-[#161616] border border-[#2e2e2e] text-white p-7 rounded-2xl max-w-md w-full shadow-2xl relative text-center flex flex-col items-center'
          >
            {popup.type === "success" ? (
              <div className='w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-3xl mb-4 text-white border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.2)]'>
                ✓
              </div>
            ) : (
              <div className='w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-3xl mb-4 text-red-400 border border-red-500/30'>
                ✕
              </div>
            )}

            <h3 className='text-2xl font-bold mb-2'>
              {popup.type === "success" ? "Berhasil Terkirim!" : "Pengiriman Gagal"}
            </h3>

            <p className='text-secondary text-sm mb-6 leading-relaxed'>
              {popup.message}
            </p>

            <button
              onClick={() => setPopup({ show: false, type: "", message: "" })}
              className='bg-white text-black font-bold py-2.5 px-8 rounded-xl hover:bg-neutral-200 transition-all shadow-md'
            >
              Tutup
            </button>
          </motion.div>
        </div>
      )}

      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your web address?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What you want to say?'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>

          <button
            type='submit'
            className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary disabled:opacity-50'
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
