// app/tools/pdf/page.tsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FaCompressArrowsAlt, FaObjectGroup, FaCut, FaSearch, FaTint } from 'react-icons/fa';

export default function PDFToolsPage() {
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTool, setActiveTool] = useState('compress');

  const tools = [
    { id: 'compress', name: 'Compress PDF', icon: <FaCompressArrowsAlt className="text-2xl" />, color: 'from-teal-500 to-teal-600' },
    { id: 'merge', name: 'Merge PDF', icon: <FaObjectGroup className="text-2xl" />, color: 'from-blue-500 to-blue-600' },
    { id: 'split', name: 'Split PDF', icon: <FaCut className="text-2xl" />, color: 'from-purple-500 to-purple-600' },
    { id: 'ocr', name: 'OCR PDF', icon: <FaSearch className="text-2xl" />, color: 'from-amber-500 to-amber-600' },
    { id: 'watermark', name: 'Watermark PDF', icon: <FaTint className="text-2xl" />, color: 'from-pink-500 to-pink-600' }
  ];

  const fetchAIResponse = async (tool: string) => {
    setIsLoading(true);
    setActiveTool(tool);
    
    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAP27J27R0lO9mqoYqoc_aKtyXNwTYEP-w', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Explain in 3 sentences how ${tool} PDF tool works technically, focusing on its benefits for professionals. Use technical terms like compression algorithms, OCR technology, or PDF manipulation libraries.`
            }]
          }]
        })
      });

      const data = await response.json();
      setAiResponse(data.candidates[0].content.parts[0].text);
    } catch (error) {
      setAiResponse("AI explanation unavailable. Our PDF tools use advanced algorithms for professional document processing.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAIResponse('compress');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12 py-12 bg-gradient-to-r from-teal-900/30 to-blue-900/30 rounded-3xl border border-teal-500/30 backdrop-blur-sm">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-blue-500 text-transparent bg-clip-text">
            Advanced PDF Tools
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Professional PDF manipulation tools powered by AI. Compress, merge, split, OCR, and watermark PDFs with enterprise-grade technology.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="px-4 py-2 bg-teal-800/50 text-teal-300 rounded-full text-sm font-medium border border-teal-500/30">
              Lossless Compression
            </span>
            <span className="px-4 py-2 bg-blue-800/50 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30">
              Batch Processing
            </span>
            <span className="px-4 py-2 bg-purple-800/50 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30">
              AES-256 Encryption
            </span>
          </div>
          <button className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40">
            Start Processing PDFs
          </button>
        </section>

        {/* Tools Grid */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => fetchAIResponse(tool.name)}
              className={`p-6 rounded-2xl transition-all duration-300 border ${
                activeTool === tool.id
                  ? `bg-gradient-to-br ${tool.color} border-transparent shadow-lg shadow-${tool.color.split(' ')[0].replace('from-', '')}/30`
                  : 'bg-gray-800/50 border-gray-700 hover:bg-gray-800'
              }`}
            >
              <div className={`mb-4 p-3 rounded-full w-14 h-14 flex items-center justify-center ${
                activeTool === tool.id 
                  ? 'bg-white text-gray-900' 
                  : `bg-gradient-to-br ${tool.color} text-white`
              }`}>
                {tool.icon}
              </div>
              <h3 className="font-bold text-lg">{tool.name}</h3>
            </button>
          ))}
        </section>

        {/* AI Explanation */}
        <section className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-teal-500/30 p-8 mb-16">
          <div className="flex items-center mb-4">
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-2 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold ml-3 bg-gradient-to-r from-amber-400 to-amber-500 text-transparent bg-clip-text">
              AI-Powered Explanation
            </h2>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-amber-500"></div>
            </div>
          ) : (
            <div className="prose prose-invert max-w-none text-gray-300">
              <p>{aiResponse}</p>
            </div>
          )}
        </section>

        {/* Tool Cards with Drag & Drop */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Compress PDF Card */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-teal-500/30 p-8">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-3 rounded-lg">
                <FaCompressArrowsAlt className="text-2xl" />
              </div>
              <h2 className="text-2xl font-bold ml-3">Compress PDF</h2>
            </div>
            
            <p className="text-gray-400 mb-6">
              Reduce PDF file size without quality loss using advanced compression algorithms. Ideal for email attachments and web uploads.
            </p>
            
            <div className="border-2 border-dashed border-teal-500/50 rounded-xl p-8 text-center mb-6 cursor-pointer hover:bg-gray-800/20 transition-colors">
              <svg className="w-12 h-12 mx-auto text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p className="mt-4 text-teal-400 font-medium">Drag & drop your PDF here</p>
              <p className="text-gray-500 text-sm mt-2">or click to browse files</p>
              <input type="file" className="hidden" accept=".pdf" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-400 mb-2">Compression Level</label>
                <select className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-teal-500">
                  <option>High (Smaller file)</option>
                  <option selected>Medium (Recommended)</option>
                  <option>Low (Better quality)</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Optimize For</label>
                <select className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-teal-500">
                  <option>Web Display</option>
                  <option selected>Print Quality</option>
                  <option>Mobile Devices</option>
                </select>
              </div>
            </div>
            
            <button className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white py-4 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40">
              Compress PDF
            </button>
          </div>

          {/* Merge PDF Card */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-blue-500/30 p-8">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-lg">
                <FaObjectGroup className="text-2xl" />
              </div>
              <h2 className="text-2xl font-bold ml-3">Merge PDF</h2>
            </div>
            
            <p className="text-gray-400 mb-6">
              Combine multiple PDF files into a single document. Preserve all formatting and quality during the merge process.
            </p>
            
            <div className="border-2 border-dashed border-blue-500/50 rounded-xl p-8 text-center mb-6 cursor-pointer hover:bg-gray-800/20 transition-colors">
              <svg className="w-12 h-12 mx-auto text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              <p className="mt-4 text-blue-400 font-medium">Drag & drop multiple PDFs</p>
              <p className="text-gray-500 text-sm mt-2">or click to select files</p>
              <input type="file" className="hidden" accept=".pdf" multiple />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-400 mb-2">Merge Order</label>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <span>document-1.pdf</span>
                  </div>
                  <button className="text-gray-500 hover:text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <span>report-2023.pdf</span>
                  </div>
                  <button className="text-gray-500 hover:text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-4 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40">
              Merge PDFs
            </button>
          </div>
        </section>

        {/* SEO-Optimized Content */}
        <section className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-purple-500 text-transparent bg-clip-text">
            Professional PDF Tools for Businesses
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-teal-400">PDF Compression</h3>
              <p className="text-gray-400">
                Reduce PDF file sizes by up to 90% without compromising quality. Our advanced algorithms maintain document integrity while significantly decreasing file size for easier sharing and storage.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-400">PDF Merging</h3>
              <p className="text-gray-400">
                Combine multiple PDF documents into a single file with precise control over page order. Perfect for creating comprehensive reports, presentations, or portfolios from various sources.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-amber-400">OCR Technology</h3>
              <p className="text-gray-400">
                Convert scanned documents into searchable and editable text with industry-leading OCR accuracy. Extract text from images, PDFs, and documents while preserving original formatting.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-teal-700 to-blue-700 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Enhance Your PDF Workflow?</h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who trust our PDF tools for their document processing needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-800 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg shadow-teal-900/50">
              Get Started Free
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-colors">
              View All Tools
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}