
import React, { useState } from 'react';
import { BLOG_POSTS } from '../constants';
import { BlogPost } from '../types';
import { generateBlogSummary } from '../services/geminiService';

const Blog: React.FC = () => {
  const [summaries, setSummaries] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState<{ [key: number]: boolean }>({});

  const handleSummarize = async (post: BlogPost) => {
    if (summaries[post.id]) return;
    
    setLoading(prev => ({ ...prev, [post.id]: true }));
    const summary = await generateBlogSummary(post.content);
    setSummaries(prev => ({ ...prev, [post.id]: summary }));
    setLoading(prev => ({ ...prev, [post.id]: false }));
  };

  return (
    <div className="animate-fadeIn py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Knowledge Hub</h1>
            <p className="text-lg text-slate-600">Insights, trends, and strategies for global business leaders.</p>
          </div>
          <div className="mt-6 md:mt-0">
             <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center">
               <i className="fas fa-sparkles mr-2"></i>
               Powered by Gemini AI
             </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="h-64 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full uppercase">{post.category}</span>
                  <span className="text-slate-400 text-sm">{post.date}</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">{post.title}</h2>
                <p className="text-slate-600 mb-6">{post.excerpt}</p>
                
                {summaries[post.id] ? (
                  <div className="mb-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100 animate-fadeIn">
                    <h4 className="text-xs font-bold text-indigo-700 uppercase mb-2 flex items-center">
                      <i className="fas fa-brain mr-2"></i> AI Executive Summary
                    </h4>
                    <div className="text-sm text-slate-700 whitespace-pre-wrap">
                      {summaries[post.id]}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => handleSummarize(post)}
                    disabled={loading[post.id]}
                    className="flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-700 mb-6 disabled:opacity-50"
                  >
                    {loading[post.id] ? (
                       <><i className="fas fa-circle-notch fa-spin mr-2"></i> Summarizing...</>
                    ) : (
                       <><i className="fas fa-sparkles mr-2"></i> Get AI Summary</>
                    )}
                  </button>
                )}

                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                    <span className="text-sm font-medium text-slate-700">{post.author}</span>
                  </div>
                  <a href={`#blog/${post.id}`} className="text-indigo-600 font-bold text-sm flex items-center group">
                    Read Full Story
                    <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
