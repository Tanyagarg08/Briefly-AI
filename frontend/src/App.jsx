import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  // WORD COUNTS
  const originalWords = text.trim()
    ? text.trim().split(/\s+/).length
    : 0;

  const summaryWords = summary.trim()
    ? summary.trim().split(/\s+/).length
    : 0;

  // COPY SUMMARY
  const copySummary = () => {
    navigator.clipboard.writeText(summary);
    toast.success("Summary copied");
  };

  // DOWNLOAD SUMMARY
  const downloadSummary = () => {
    const element = document.createElement("a");

    const file = new Blob([summary], {
      type: "text/plain",
    });

    element.href = URL.createObjectURL(file);
    element.download = "summary.txt";

    document.body.appendChild(element);
    element.click();

    toast.success("Summary downloaded");
  };

  // TEXT SUMMARY
  const handleSummarize = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/summarize",
        {
          text,
        }
      );

      setSummary(response.data.summary);

      toast.success("Summary generated");

    } catch (error) {
      console.log(error);

      toast.error("Failed to generate summary");

    } finally {
      setLoading(false);
    }
  };

  // PDF UPLOAD
  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFileName(file.name);

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/upload-pdf",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSummary(response.data.summary);

      toast.success("PDF summarized");

    } catch (error) {
      console.log(error);

      toast.error("PDF upload failed");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* TOASTER */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#18181b",
            color: "#fff",
            border: "1px solid #27272a",
          },
        }}
      />

      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-100px] left-[-100px] w-[320px] h-[320px] bg-purple-600 opacity-20 blur-[120px]" />

      <div className="absolute bottom-[-100px] right-[-100px] w-[320px] h-[320px] bg-blue-600 opacity-20 blur-[120px]" />

      {/* NAVBAR */}
      <div className="relative z-10 flex items-center justify-between px-8 lg:px-20 py-6 border-b border-purple-500/10 backdrop-blur-xl">

        <h1 className="text-2xl font-bold tracking-wide">
          Briefly AI
        </h1>

        <div className="hidden md:flex gap-8 text-zinc-400 text-sm">

          <p className="hover:text-white transition cursor-pointer">
            Smart Summaries
          </p>

          <p className="hover:text-white transition cursor-pointer">
            PDF Intelligence
          </p>

          <p className="hover:text-white transition cursor-pointer">
            Fast Processing
          </p>

        </div>

      </div>

      {/* MAIN SECTION */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-8">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-4xl"
        >

          <div className="inline-block px-3 py-2 rounded-full border border-zinc-700 bg-zinc-900 text-sm text-zinc-400 mb-6">

            AI Powered Document Summarizer

          </div>

          <h1 className="text-3xl lg:text-4xl font-bold leading-tight">

            Transform Long Documents
            <br />

            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Into Smart Summaries
            </span>

          </h1>

          <p className="text-zinc-400 text-lg mt-6 leading-8 max-w-2xl mx-auto">

            Upload PDFs or paste large text and generate concise,
            readable summaries instantly with a modern AI-powered workflow.

          </p>

        </motion.div>

        {/* MAIN CARD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl mt-12 bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-[32px] p-8 shadow-2xl"
        >

          {/* TOP INFO */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">

            <div>

              <h2 className="text-3xl font-semibold">
                Generate Summary
              </h2>

              <p className="text-zinc-400 mt-2">
                Paste text or upload a PDF document to begin.
              </p>

            </div>

            <div className="flex gap-4">

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 text-center min-w-[120px]"
              >

                <p className="text-zinc-400 text-sm">
                  Original
                </p>

                <h3 className="text-2xl font-bold mt-1">
                  {originalWords}
                </h3>

              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 text-center min-w-[120px]"
              >

                <p className="text-zinc-400 text-sm">
                  Summary
                </p>

                <h3 className="text-2xl font-bold mt-1">
                  {summaryWords}
                </h3>

              </motion.div>

            </div>

          </div>

          {/* TEXTAREA */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your article, report, research paper, or document text here..."
            className="w-full h-64 bg-zinc-950 border border-zinc-800 rounded-3xl p-6 text-white outline-none resize-none text-[15px] leading-7 focus:border-purple-500 transition"
          />

          {/* BUTTONS */}
          <div className="flex flex-col md:flex-row gap-4 mt-6">

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSummarize}
              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 rounded-2xl font-semibold transition duration-300 shadow-lg shadow-purple-500/20"
            >

              Generate Summary

            </motion.button>

            <motion.label
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-zinc-900 border border-zinc-800 py-4 rounded-2xl text-center cursor-pointer hover:bg-zinc-800 transition duration-300 font-medium"
            >

              Upload PDF

              <input
                type="file"
                accept="application/pdf"
                onChange={handlePdfUpload}
                className="hidden"
              />

            </motion.label>

          </div>

          {/* FILE NAME */}
          {fileName && (
            <div className="mt-4 text-sm text-zinc-400">
              Uploaded File: {fileName}
            </div>
          )}

          {/* LOADING */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 bg-zinc-900 border border-zinc-800 rounded-2xl py-4 px-5 text-zinc-300 flex items-center gap-3"
            >

              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />

              Generating intelligent summary...

            </motion.div>
          )}

          {/* SUMMARY CARD */}
          {summary && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-8 bg-gradient-to-br from-zinc-950 to-zinc-900 border border-zinc-800 rounded-3xl p-7"
            >

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-6">

                <div>

                  <h2 className="text-2xl font-semibold">
                    Summary Output
                  </h2>

                  <p className="text-zinc-400 text-sm mt-1">
                    Optimized concise summary generated successfully.
                  </p>

                </div>

                <div className="flex gap-3">

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={copySummary}
                    className="bg-white text-black px-5 py-3 rounded-2xl font-medium"
                  >

                    Copy

                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={downloadSummary}
                    className="bg-zinc-900 border border-zinc-700 px-5 py-3 rounded-2xl font-medium"
                  >

                    Download

                  </motion.button>

                </div>

              </div>

              <div className="border-t border-zinc-800 pt-6">

                <p className="text-blue-100 leading-8 text-[15px]">
                  {summary}
                </p>

              </div>

            </motion.div>
          )}

        </motion.div>

      </div>
    </div>
  );
}

export default App;