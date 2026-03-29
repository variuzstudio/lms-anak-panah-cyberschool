import { useState } from 'react';
import { Plus, MessageSquare, Calendar, Megaphone, User, Send, ThumbsUp, Trash2, Edit } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import { mockForumPosts, ForumPost, ForumComment } from '../data/mockData';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';

export default function ForumPage() {
  const { user, hasPermission } = useAuth();
  const [posts, setPosts] = useState<ForumPost[]>(mockForumPosts);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'pengumuman' | 'event' | 'diskusi'>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'diskusi' as 'pengumuman' | 'event' | 'diskusi'
  });
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');

  if (!hasPermission('view_forum')) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400">Anda tidak memiliki akses ke forum</p>
      </div>
    );
  }

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(p => p.category === selectedCategory);

  const handleCreatePost = () => {
    if (!user) return;
    
    if (!newPost.title.trim() || !newPost.content.trim()) {
      toast.error('Judul dan konten tidak boleh kosong');
      return;
    }

    const post: ForumPost = {
      id: `POST${posts.length + 1}`,
      title: newPost.title,
      content: newPost.content,
      authorId: user.id,
      authorRole: user.role,
      authorName: user.name,
      category: newPost.category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: [],
      visibility: 'public'
    };

    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '', category: 'diskusi' });
    setIsCreateDialogOpen(false);
    toast.success('Postingan berhasil dibuat!');
  };

  const handleAddComment = (postId: string) => {
    if (!user || !newComment.trim()) return;

    const comment: ForumComment = {
      id: `COMMENT${Date.now()}`,
      postId,
      authorId: user.id,
      authorRole: user.role,
      authorName: user.name,
      content: newComment,
      createdAt: new Date().toISOString()
    };

    setPosts(posts.map(p => 
      p.id === postId 
        ? { ...p, comments: [...p.comments, comment] }
        : p
    ));

    setNewComment('');
    toast.success('Komentar berhasil ditambahkan');
  };

  const handleDeletePost = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    if (user?.role !== 'admin' && post.authorId !== user?.id) {
      toast.error('Anda tidak memiliki akses untuk menghapus postingan ini');
      return;
    }

    if (confirm('Apakah Anda yakin ingin menghapus postingan ini?')) {
      setPosts(posts.filter(p => p.id !== postId));
      toast.success('Postingan berhasil dihapus');
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'pengumuman':
        return <Megaphone size={20} className="text-[#00aeff]" />;
      case 'event':
        return <Calendar size={20} className="text-[#1aff00]" />;
      case 'diskusi':
        return <MessageSquare size={20} className="text-[#c800ff]" />;
      default:
        return <MessageSquare size={20} />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'pengumuman':
        return 'bg-[#00aeff]/20 text-[#00aeff] border-[#00aeff]';
      case 'event':
        return 'bg-[#1aff00]/20 text-[#1aff00] border-[#1aff00]';
      case 'diskusi':
        return 'bg-[#c800ff]/20 text-[#c800ff] border-[#c800ff]';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-400';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'text-[#00aeff]';
      case 'guru':
        return 'text-[#1aff00]';
      case 'murid':
        return 'text-[#c800ff]';
      case 'orangtua':
        return 'text-[#ffb700]';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-['Acumin_Variable_Concept',sans-serif]">FORUM & EVENT</h1>
          <p className="text-gray-400 mt-1">Pengumuman, event, dan diskusi sekolah</p>
        </div>
        {hasPermission('create_forum_post') && (
          <button
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-[#00aeff] hover:bg-[#00aeff]/80 text-white px-6 py-3 rounded-lg font-['Acumin_Variable_Concept',sans-serif] text-sm flex items-center gap-2 transition-all"
          >
            <Plus size={20} />
            BUAT POSTINGAN
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-lg font-['Acumin_Variable_Concept',sans-serif] text-sm transition-all whitespace-nowrap ${
            selectedCategory === 'all'
              ? 'bg-[#00aeff] text-white'
              : 'bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12]'
          }`}
        >
          SEMUA
        </button>
        <button
          onClick={() => setSelectedCategory('pengumuman')}
          className={`px-4 py-2 rounded-lg font-['Acumin_Variable_Concept',sans-serif] text-sm transition-all whitespace-nowrap ${
            selectedCategory === 'pengumuman'
              ? 'bg-[#00aeff] text-white'
              : 'bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12]'
          }`}
        >
          PENGUMUMAN
        </button>
        <button
          onClick={() => setSelectedCategory('event')}
          className={`px-4 py-2 rounded-lg font-['Acumin_Variable_Concept',sans-serif] text-sm transition-all whitespace-nowrap ${
            selectedCategory === 'event'
              ? 'bg-[#1aff00] text-black'
              : 'bg-white/[0.03] border border-white/[0.06] hover:border-[#1aff00]'
          }`}
        >
          EVENT
        </button>
        <button
          onClick={() => setSelectedCategory('diskusi')}
          className={`px-4 py-2 rounded-lg font-['Acumin_Variable_Concept',sans-serif] text-sm transition-all whitespace-nowrap ${
            selectedCategory === 'diskusi'
              ? 'bg-[#c800ff] text-white'
              : 'bg-white/[0.03] border border-white/[0.06] hover:border-[#c800ff]'
          }`}
        >
          DISKUSI
        </button>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-12 text-center">
            <MessageSquare size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-400">Belum ada postingan</p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div key={post.id} className="bg-white/[0.03] border border-white/[0.06] rounded-lg overflow-hidden">
              <div className="p-6">
                {/* Post Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <User className={getRoleColor(post.authorRole)} size={40} />
                    <div>
                      <p className="font-medium">{post.authorName}</p>
                      <p className="text-sm text-gray-400">
                        {post.authorRole.charAt(0).toUpperCase() + post.authorRole.slice(1)} • {' '}
                        {format(new Date(post.createdAt), 'dd MMM yyyy, HH:mm', { locale: localeId })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getCategoryColor(post.category)}`}>
                      {getCategoryIcon(post.category)}
                      {post.category.toUpperCase()}
                    </span>
                    {(user?.role === 'admin' || post.authorId === user?.id) && (
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Post Content */}
                <h3 className="text-xl font-['Acumin_Variable_Concept',sans-serif] mb-3">{post.title}</h3>
                <p className="text-gray-300 mb-4 whitespace-pre-wrap">{post.content}</p>

                {/* Post Actions */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/[0.06]">
                  <button
                    onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    <MessageSquare size={16} />
                    {post.comments.length} Komentar
                  </button>
                  <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                    <ThumbsUp size={16} />
                    Suka
                  </button>
                </div>
              </div>

              {/* Comments Section */}
              {expandedPost === post.id && (
                <div className="border-t border-white/[0.06] bg-white/[0.02] p-6 space-y-4">
                  {/* Existing Comments */}
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <User className={getRoleColor(comment.authorRole)} size={32} />
                      <div className="flex-1 bg-white/[0.03] rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium text-sm">{comment.authorName}</p>
                          <p className="text-xs text-gray-400">
                            {format(new Date(comment.createdAt), 'dd MMM, HH:mm', { locale: localeId })}
                          </p>
                        </div>
                        <p className="text-sm text-gray-300">{comment.content}</p>
                      </div>
                    </div>
                  ))}

                  {/* Add Comment */}
                  <div className="flex gap-3 pt-4">
                    <User className={getRoleColor(user?.role || 'murid')} size={32} />
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        placeholder="Tulis komentar..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                        className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#00aeff] transition-all"
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        className="bg-[#00aeff] hover:bg-[#00aeff]/80 rounded-lg px-4 py-2 transition-all"
                      >
                        <Send size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Create Post Dialog */}
      {isCreateDialogOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg max-w-2xl w-full">
            <div className="p-6 border-b border-white/[0.06]">
              <h2 className="text-xl font-['Acumin_Variable_Concept',sans-serif]">BUAT POSTINGAN BARU</h2>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-['Acumin_Variable_Concept',sans-serif] mb-2">Kategori</label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value as any })}
                  className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2 focus:outline-none focus:border-[#00aeff] transition-all"
                >
                  <option value="diskusi">Diskusi</option>
                  <option value="pengumuman">Pengumuman</option>
                  <option value="event">Event</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-['Acumin_Variable_Concept',sans-serif] mb-2">Judul</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="Masukkan judul postingan..."
                  className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2 focus:outline-none focus:border-[#00aeff] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-['Acumin_Variable_Concept',sans-serif] mb-2">Konten</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="Tulis konten postingan..."
                  rows={6}
                  className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2 focus:outline-none focus:border-[#00aeff] transition-all resize-none"
                />
              </div>
            </div>

            <div className="p-6 border-t border-white/[0.06] flex gap-3 justify-end">
              <button
                onClick={() => {
                  setIsCreateDialogOpen(false);
                  setNewPost({ title: '', content: '', category: 'diskusi' });
                }}
                className="px-6 py-2 border border-white/[0.06] rounded-lg hover:bg-white/[0.02] transition-all"
              >
                Batal
              </button>
              <button
                onClick={handleCreatePost}
                className="px-6 py-2 bg-[#00aeff] hover:bg-[#00aeff]/80 rounded-lg font-['Acumin_Variable_Concept',sans-serif] transition-all"
              >
                POSTING
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
