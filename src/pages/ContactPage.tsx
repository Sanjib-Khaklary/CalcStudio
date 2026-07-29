import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, HelpCircle } from 'lucide-react';
import { AdBanner } from '../components/AdBanner';

interface ContactPageProps {
  onShowToast: (title: string, description?: string, type?: 'success' | 'info' | 'error') => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onShowToast }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Feedback / Feature Request');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      onShowToast('Missing Fields', 'Please fill in all required fields.', 'error');
      return;
    }

    setSubmitted(true);
    onShowToast('Message Sent!', 'Thank you for reaching out to CalcStudio support.');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-4">
      <AdBanner type="top" />

      <div className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest bg-sky-100 dark:bg-sky-950 px-2.5 py-0.5 rounded-md">
          Support & Feedback
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Contact CalcStudio Support
        </h1>
        <p className="text-sm text-slate-500">
          Have a feature request, bug report, or business inquiry? Drop us a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Contact Form */}
        <div className="md:col-span-7">
          {submitted ? (
            <div className="p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Thank You, {name}!</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Your message has been received. Our team will review your inquiry shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Your Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. alex@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Topic</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold outline-none focus:border-sky-500"
                >
                  <option>Feedback / Feature Request</option>
                  <option>Bug Report</option>
                  <option>AdSense / Advertising Inquiry</option>
                  <option>General Support</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Message *</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold outline-none focus:border-sky-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Info Column */}
        <div className="md:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-3">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Mail className="w-4 h-4 text-sky-400" />
              <span>Direct Contact</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Email support: <a href="mailto:support@calcstudio.app" className="text-sky-400 underline font-mono">support@calcstudio.app</a>
            </p>
            <p className="text-[11px] text-slate-400">
              We respond to all technical and feature inquiry emails within 24 hours.
            </p>
          </div>
        </div>

      </div>

      <AdBanner type="bottom" />
    </div>
  );
};
