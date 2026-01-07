
import { BlogPost, Service } from './types';

export const SERVICES: Service[] = [
  {
    id: 1,
    title: 'Strategic Consulting',
    description: 'We help you navigate complex market dynamics with data-driven strategies and expert insights.',
    icon: 'fa-chart-line'
  },
  {
    id: 2,
    title: 'Digital Transformation',
    description: 'Modernize your infrastructure and workflows with cutting-edge technology and seamless integration.',
    icon: 'fa-microchip'
  },
  {
    id: 3,
    title: 'Operational Excellence',
    description: 'Optimize your business processes for maximum efficiency, scalability, and performance.',
    icon: 'fa-gears'
  },
  {
    id: 4,
    title: 'Brand Experience',
    description: 'Create lasting impressions with customer-centric design and compelling brand narratives.',
    icon: 'fa-palette'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'The Future of AI in Enterprise',
    excerpt: 'How generative AI is reshaping the landscape of modern corporate operations...',
    content: 'Full article about AI integration in large-scale enterprises and the shifting paradigms of automation.',
    author: 'Sarah Chen',
    date: 'Oct 12, 2023',
    image: 'https://picsum.photos/seed/ai-blog/800/400',
    category: 'Technology'
  },
  {
    id: 2,
    title: 'Sustainable Growth Strategies',
    excerpt: 'Balancing rapid expansion with environmental and social responsibility in 2024...',
    content: 'Deep dive into ESG (Environmental, Social, and Governance) principles for modern businesses.',
    author: 'Marcus Thorne',
    date: 'Sep 28, 2023',
    image: 'https://picsum.photos/seed/growth/800/400',
    category: 'Strategy'
  }
];
