// pages/index.js
import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ShortenerForm from '../components/ShortenerForm';
import ResultBox from '../components/ResultBox';
import FeatureCard from '../components/FeatureCard';
import { Shield, Clock } from 'lucide-react'; // Trash2 removed

export default function Home() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async ({ longUrl, customAlias }) => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ longUrl, customAlias }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to shorten URL');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("API Error:", err);
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // handleDelete function removed

  const handleCopySuccess = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Head>
        <title>URLFirm - Private, Fast, Zero Tracking URL Shortener</title>
        <meta
          name="description"
          content="Shorten your links without compromising your privacy. No cookies, no tracking, no data collection."
        />
      </Head>
      <Header />
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Private, fast, and zero tracking.<br />
            <span className="text-indigo-600">Your links — your rules.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Shorten your links without compromising your privacy. No cookies, no tracking, no data collection.
          </p>
          <ShortenerForm onSubmit={handleSubmit} loading={loading} />
          {/* onDelete prop removed */}
          <ResultBox result={result} onCopy={handleCopySuccess} />
        </div>
      </section>
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto animate-fade-in">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why choose URLFirm?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Privacy-first link shortening with powerful features
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield />}
              title="Zero Tracking"
              description="We don't collect any personal data. No cookies, no analytics, no tracking of any kind."
              bgColorClass="bg-gradient-to-br from-indigo-50 to-purple-50"
              borderColorClass="border-indigo-100"
              iconBgClass="bg-indigo-100"
              iconColorClass="text-indigo-600"
            />
            <FeatureCard
              icon={<Clock />}
              title="Auto Expiration"
              description="All links automatically expire after 7 days to protect your privacy and security."
              bgColorClass="bg-gradient-to-br from-purple-50 to-pink-50"
              borderColorClass="border-purple-100"
              iconBgClass="bg-purple-100"
              iconColorClass="text-purple-600"
            />
            {/* Updated Feature Card */}
            <FeatureCard
              icon={<Clock />}
              title="Managed Links"
              description="Links expire automatically. Internal tokens manage link lifecycle."
              bgColorClass="bg-gradient-to-br from-pink-50 to-rose-50"
              borderColorClass="border-pink-100"
              iconBgClass="bg-pink-100"
              iconColorClass="text-rose-600"
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}