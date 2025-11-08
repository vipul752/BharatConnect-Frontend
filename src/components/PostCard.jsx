import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deletePost as deletePostAPI, updatePost as updatePostAPI } from '../utils/api';
import { deletePost, updatePost } from '../store/postsSlice';
import { FaComment, FaShare, FaEllipsisH, FaEdit, FaTrash, FaHeart, FaBookmark } from 'react-icons/fa';

const PostCard = ({ post, isMyPost = false }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: post.title,
    content: post.content,
  });
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const dispatch = useDispatch();

  const formatDate = (date) => {
    const postDate = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now - postDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return postDate.toLocaleDateString(undefined, options);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        setLoading(true);
        const response = await deletePostAPI(post._id);
        if (response.success) {
          dispatch(deletePost(post._id));
        }
      } catch (error) {
        console.error('Failed to delete post:', error);
        alert('Failed to delete post');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editData.title || !editData.content) {
      alert('Title and content are required');
      return;
    }

    try {
      setLoading(true);
      const response = await updatePostAPI(post._id, editData);
      if (response.success) {
        dispatch(updatePost({ ...post, ...editData, updatedAt: new Date().toISOString() }));
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Failed to update post:', error);
      alert('Failed to update post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="bg-white border border-black/[0.08] rounded-[18px] shadow-[0_18px_36px_rgba(17,17,20,0.08)] mb-6 overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600" />
      <div className="p-6">
        <header className="mb-5 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-orange-400 to-orange-600 text-lg font-bold text-white shadow-lg shadow-orange-500/30">
              {post.authorId?.name?.charAt(0).toUpperCase() || 'U'}
              <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border border-white bg-emerald-400" />
            </span>
            <div>
              <h3 className="text-base font-semibold text-black">
                {post.authorId?.name || 'Unknown User'}
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.25em] text-black/40">
                {formatDate(post.createdAt)}
              </p>
            </div>
          </div>

          {isMyPost && (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="rounded-full border border-black/10 p-2 text-black/40 transition hover:border-orange-400/60 hover:text-black"
                aria-haspopup="menu"
                aria-expanded={showMenu}
              >
                <FaEllipsisH />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-3 w-48 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-xl" role="menu">
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setShowMenu(false);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-black/70 transition hover:bg-orange-500/5"
                  >
                    <FaEdit className="text-orange-500" />
                    <span>Edit story</span>
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    <FaTrash />
                    <span>{loading ? 'Deleting...' : 'Remove'}</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </header>

        {isEditing ? (
          <form onSubmit={handleUpdate} className="space-y-3">
            <input
              type="text"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-lg font-semibold text-black/80 transition focus:border-orange-400 focus:shadow-[0_0_0_4px_rgba(255,107,44,0.18)]"
            />
            <textarea
              value={editData.content}
              onChange={(e) => setEditData({ ...editData, content: e.target.value })}
              rows="4"
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black/70 transition focus:border-orange-400 focus:shadow-[0_0_0_4px_rgba(255,107,44,0.18)]"
            ></textarea>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-black/90 disabled:translate-y-0 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save changes'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditData({ title: post.title, content: post.content });
                }}
                className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-black/60 transition hover:bg-black/5"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-black">{post.title}</h2>
            <p className="text-sm leading-relaxed text-black/70 whitespace-pre-wrap">{post.content}</p>
          </div>
        )}
      </div>

  <footer className="border-t border-black/5 bg-black/5 px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-semibold text-black/50">
          <button
            onClick={() => setLiked(!liked)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 transition ${
              liked ? 'bg-orange-500/10 text-orange-600' : 'hover:bg-black/5'
            }`}
          >
            <FaHeart className={liked ? 'text-orange-500' : ''} />
            <span>Appreciate</span>
          </button>
          <button className="inline-flex items-center gap-2 rounded-full px-4 py-2 transition hover:bg-black/5">
            <FaComment />
            <span>Discuss</span>
          </button>
          <button className="inline-flex items-center gap-2 rounded-full px-4 py-2 transition hover:bg-black/5">
            <FaShare />
            <span>Share</span>
          </button>
          <button
            onClick={() => setSaved(!saved)}
            className={`inline-flex items-center gap-2 rounded-full px-3 py-2 transition ${
              saved ? 'bg-orange-500/10 text-orange-600' : 'hover:bg-black/5'
            }`}
          >
            <FaBookmark />
            <span className="hidden sm:inline">Save</span>
          </button>
        </div>
      </footer>
    </article>
  );
};

export default PostCard;
