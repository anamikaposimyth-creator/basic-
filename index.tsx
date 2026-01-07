import { GoogleGenAI } from "@google/genai";

// --- Configuration & Professional Content ---
const BLOG_DATA = [
    {
        id: 1,
        title: "The 2024 Digital Sovereignty Report",
        excerpt: "Exploring how decentralized architectures are reshaping enterprise data security models in the modern era.",
        content: "Decentralized data architectures are no longer experimental; they are becoming the standard for enterprise security in 2024. By distributing data across multiple secure nodes, organizations can significantly reduce the risk of catastrophic breaches while maintaining high accessibility for authorized users. Our research shows a 40% reduction in unauthorized access attempts for firms using mesh-based storage.",
        author: "Dr. Alistair Vance",
        date: "May 14, 2024",
        category: "Strategy",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Scaling AI Without Losing Humanity",
        excerpt: "Why the human-in-the-loop model remains the most successful strategy for high-stakes AI adoption.",
        content: "As organizations race to implement generative AI, the most successful ones are prioritizing human-in-the-loop systems. This approach ensures that AI enhances productivity without sacrificing the nuanced judgment and ethical oversight that only human experts can provide. At Nexus, we believe the future is 'Human + AI', not 'Human vs AI'.",
        author: "Elena Rodriguez",
        date: "April 28, 2024",
        category: "Technology",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop"
    }
];

// --- Utilities ---
const $ = (selector: string) => document.querySelector(selector);
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// --- Routing Engine ---
function handleRouting() {
    const hash = window.location.hash || '#home';
    const pageId = hash.startsWith('#') ? hash : '#home';
    const targetPageId = `page-${pageId.substring(1)}`;

    // Update visibility with transition
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(el => {
        el.classList.remove('active');
    });
    
    const activeEl = document.getElementById(targetPageId);
    if (activeEl) {
        activeEl.classList.add('active');
    }

    // Update Nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = (link as HTMLAnchorElement).getAttribute('href');
        if (href === pageId) {
            link.classList.add('text-indigo-600', 'scale-105');
            link.classList.remove('text-slate-600');
        } else {
            link.classList.remove('text-indigo-600', 'scale-105');
            link.classList.add('text-slate-600');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    $('#mobile-menu')?.classList.add('hidden');
}

// --- Blog Renderer ---
async function renderBlog() {
    const container = $('#blog-posts-container');
    if (!container) return;

    container.innerHTML = BLOG_DATA.map(post => `
        <article class="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group">
            <div class="h-72 overflow-hidden relative">
                <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000">
                <div class="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-600 border border-white">
                    ${post.category}
                </div>
            </div>
            <div class="p-12">
                <div class="flex items-center space-x-3 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">
                    <span>${post.date}</span>
                    <span class="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span>By ${post.author}</span>
                </div>
                <h2 class="text-3xl font-extrabold text-slate-900 mb-6 group-hover:text-indigo-600 transition-colors leading-tight">${post.title}</h2>
                <p class="text-slate-500 mb-10 text-lg leading-relaxed">${post.excerpt}</p>
                
                <div id="summary-${post.id}" class="hidden mb-10 p-8 bg-indigo-50/50 rounded-3xl border border-indigo-100 animate-fade-in ring-4 ring-white">
                    <div class="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-4 flex items-center">
                        <i class="fas fa-brain mr-2"></i> AI Executive Insight
                    </div>
                    <div class="text-sm text-slate-700 summary-text font-medium leading-relaxed italic">Processing content for insights...</div>
                </div>

                <div class="flex flex-col sm:flex-row items-center justify-between pt-10 border-t border-slate-50 gap-6">
                    <button class="ai-summary-btn w-full sm:w-auto text-xs font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800 transition-all flex items-center justify-center" data-id="${post.id}">
                        <i class="fas fa-sparkles mr-2"></i> Generate Summary
                    </button>
                    <a href="#blog" class="w-full sm:w-auto text-center text-sm font-black text-slate-900 hover:text-indigo-600 transition-all flex items-center justify-center group/link uppercase tracking-widest">
                        Read Analysis
                        <i class="fas fa-arrow-right ml-3 group-hover/link:translate-x-2 transition-transform"></i>
                    </a>
                </div>
            </div>
        </article>
    `).join('');

    // Attach listeners
    document.querySelectorAll('.ai-summary-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const id = parseInt((e.currentTarget as HTMLElement).dataset.id || '0');
            const post = BLOG_DATA.find(p => p.id === id);
            if (!post) return;

            const summaryEl = document.getElementById(`summary-${id}`);
            const summaryText = summaryEl?.querySelector('.summary-text');
            
            if (summaryEl) {
                summaryEl.classList.remove('hidden');
                (e.currentTarget as HTMLButtonElement).disabled = true;
                (e.currentTarget as HTMLButtonElement).innerHTML = '<i class="fas fa-circle-notch fa-spin mr-2"></i> Analyzing...';
            }

            try {
                const response = await ai.models.generateContent({
                    model: 'gemini-3-flash-preview',
                    contents: `You are a professional business analyst. Provide a 2-sentence executive summary for this article: "${post.content}". Focus on strategic value.`,
                });
                if (summaryText) summaryText.textContent = response.text || "Summary currently restricted.";
            } catch (err) {
                if (summaryText) summaryText.textContent = "Nexus Cloud is temporarily busy. Please retry shortly.";
            } finally {
               (e.currentTarget as HTMLButtonElement).style.visibility = 'hidden';
            }
        });
    });
}

// --- AI Concierge ---
function initConcierge() {
    const toggleBtn = $('#toggle-chat');
    const chatWindow = $('#ai-chat-window');
    const closeBtn = $('#close-chat');
    const chatForm = $('#chat-form') as HTMLFormElement;
    const chatInput = $('#chat-input') as HTMLInputElement;
    const chatMessages = $('#chat-messages');

    toggleBtn?.addEventListener('click', () => {
        chatWindow?.classList.toggle('hidden');
    });

    closeBtn?.addEventListener('click', () => {
        chatWindow?.classList.add('hidden');
    });

    chatForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userMsg = chatInput.value.trim();
        if (!userMsg) return;

        appendMessage('user', userMsg);
        chatInput.value = '';

        const botMsgId = 'bot-' + Date.now();
        appendMessage('bot', 'Connecting to Nexus Core...', botMsgId);

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: userMsg,
                config: {
                    systemInstruction: "You are Nexus Core, the AI executive assistant for Nexus Global Solutions. You represent a high-end, futuristic consulting firm. Be extremely professional, concise, and helpful. If asked about services, mention Cloud Orchestration, Cognitive Automation, and Cyber Resilience. Always maintain a tone of strategic mastery."
                }
            });
            updateMessage(botMsgId, response.text || "I was unable to retrieve a valid response from the core.");
        } catch (err) {
            updateMessage(botMsgId, "The Nexus Core is currently undergoing maintenance. Please reach out to our human partners at partners@nexus-global.com.");
        }
    });

    function appendMessage(role: 'user' | 'bot', text: string, id?: string) {
        if (!chatMessages) return;
        const div = document.createElement('div');
        div.className = `flex ${role === 'user' ? 'justify-end' : 'justify-start'} mb-4`;
        div.id = id || '';
        div.innerHTML = `
            <div class="${role === 'user' ? 'bg-indigo-600 text-white rounded-[1.5rem] rounded-br-none' : 'bg-white border border-slate-200 text-slate-700 rounded-[1.5rem] rounded-bl-none'} px-5 py-4 shadow-sm max-w-[85%] text-sm font-medium leading-relaxed animate-fade-in">
                ${text}
            </div>
        `;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function updateMessage(id: string, text: string) {
        const el = document.getElementById(id);
        if (el) {
            const inner = el.querySelector('div');
            if (inner) inner.textContent = text;
        }
    }
}

// --- Interaction Handlers ---
function initForm() {
    const form = $('#contact-form') as HTMLFormElement;
    const success = $('#form-success');
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        form.classList.add('hidden');
        success?.classList.remove('hidden');
    });
}

function initMobileMenu() {
    const btn = $('#mobile-menu-btn');
    const menu = $('#mobile-menu');
    btn?.addEventListener('click', (e) => {
        e.stopPropagation();
        menu?.classList.toggle('hidden');
    });

    // Close menu when clicking outside
    document.addEventListener('click', () => {
        menu?.classList.add('hidden');
    });
}

// --- Lifecycle ---
window.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('hashchange', handleRouting);
    handleRouting();
    renderBlog();
    initConcierge();
    initForm();
    initMobileMenu();
});