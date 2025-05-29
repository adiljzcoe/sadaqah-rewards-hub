
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { Calendar, User, Clock, Heart, Share2, BookOpen } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'The Power of Digital Sadaqah: Transforming Charitable Giving in the Modern Age',
    excerpt: 'Discover how technology is revolutionizing Islamic charitable giving and making it easier than ever to support those in need around the world.',
    author: 'Dr. Sarah Ahmad',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'Islamic Finance',
    featured: true,
    image: 'Digital charity concept'
  },
  {
    id: 2,
    title: 'Understanding Zakat in the Digital Era: A Complete Guide',
    excerpt: 'Learn about the principles of Zakat and how modern platforms are making it easier to calculate and distribute this important pillar of Islam.',
    author: 'Imam Abdullah Hassan',
    date: '2024-01-12',
    readTime: '8 min read',
    category: 'Islamic Education',
    featured: false,
    image: 'Zakat calculation guide'
  },
  {
    id: 3,
    title: '5 Ways Your Charity Donations Create Lasting Impact',
    excerpt: 'Explore the ripple effects of charitable giving and how your contributions continue to benefit communities long after the initial donation.',
    author: 'Fatima Al-Zahra',
    date: '2024-01-10',
    readTime: '6 min read',
    category: 'Impact Stories',
    featured: false,
    image: 'Community impact visualization'
  },
  {
    id: 4,
    title: 'Building Transparency in Islamic Charity: Our Partnership Model',
    excerpt: 'Learn how we ensure 100% transparency in charitable giving through our verified partnership network and real-time tracking systems.',
    author: 'Ahmed Rahman',
    date: '2024-01-08',
    readTime: '7 min read',
    category: 'Transparency',
    featured: false,
    image: 'Transparency in charity'
  }
];

const categories = ['All', 'Islamic Finance', 'Islamic Education', 'Impact Stories', 'Transparency', 'Technology'];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  
  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Knowledge Hub</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Insights, guides, and stories about Islamic charity, digital giving, and creating positive impact in our communities.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-islamic-green-600 hover:bg-islamic-green-700" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Post */}
        {selectedCategory === 'All' && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Article</h2>
            {blogPosts.filter(post => post.featured).map(post => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/3 h-64 md:h-auto bg-gradient-to-br from-islamic-green-400 to-islamic-green-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <BookOpen className="h-16 w-16 mx-auto mb-4" />
                      <p className="font-medium">{post.image}</p>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    <CardContent className="p-8">
                      <div className="flex items-center space-x-4 text-gray-600 text-sm mb-4">
                        <Badge className="bg-islamic-green-100 text-islamic-green-800">{post.category}</Badge>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-4 text-gray-900">{post.title}</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">{post.excerpt}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-gray-700 font-medium">{post.author}</span>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Share2 className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                          <Button className="bg-islamic-green-600 hover:bg-islamic-green-700" size="sm">
                            Read More
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.filter(post => !post.featured || selectedCategory !== 'All').map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <div className="text-white text-center">
                  <BookOpen className="h-12 w-12 mx-auto mb-2" />
                  <p className="font-medium text-sm">{post.image}</p>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 text-gray-600 text-xs mb-3">
                  <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500">
                    <User className="h-3 w-3 mr-1" />
                    <span>{post.author}</span>
                  </div>
                  
                  <Button size="sm" variant="outline" className="text-xs">
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="mt-16 bg-islamic-green-50 border-islamic-green-200">
          <CardContent className="p-8 text-center">
            <Heart className="h-12 w-12 text-islamic-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-islamic-green-800">Stay Updated</h3>
            <p className="text-islamic-green-700 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest insights on Islamic charity, impact stories, and charitable giving tips.
            </p>
            <div className="flex max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 px-4 py-2 border border-islamic-green-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-islamic-green-500"
              />
              <Button className="bg-islamic-green-600 hover:bg-islamic-green-700 rounded-l-none">
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Blog;
