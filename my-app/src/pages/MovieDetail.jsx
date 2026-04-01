import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../context/AuthContext'
import api from '../api/api'

export default function MovieDetail() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const movie = state?.movie
  const watchlistId = state?.watchlistId

  const [comment, setComment] = useState('')
  const [rating, setRating] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  if (!movie) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 text-center">
        <p className="text-gray-400">Movie not found.</p>
        <button onClick={() => navigate('/dashboard')} className="mt-4 text-indigo-400 hover:text-indigo-300">
          Back to Dashboard
        </button>
      </div>
    )
  }

  const handleSubmitComment = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSubmitting(true)
    try {
      await api.post('/comments', {
        userId: user.id,
        movieId: movie.id,
        comment: comment.trim(),
        ...(rating && { rating: parseInt(rating, 10) }),
      })
      setSuccess('Comment added successfully!')
      setComment('')
      setRating('')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add comment')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"
      >
        <ArrowLeftIcon className="h-5 w-5" /> Back to Watchlist
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={movie.poster_url}
          alt={movie.name}
          className="w-full md:w-72 h-auto rounded-lg object-cover"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-white">{movie.name}</h1>
          {movie.genre && <p className="text-gray-400 mt-2">{movie.genre}</p>}
          <div className="flex gap-6 mt-4">
            {movie.runtime && (
              <span className="text-gray-300 text-sm">{movie.runtime} min</span>
            )}
            {movie.overall_rating && (
              <span className="text-yellow-400 text-sm">⭐ {movie.overall_rating}/10</span>
            )}
          </div>
        </div>
      </div>

      {/* Comment Form */}
      <div className="mt-10 bg-gray-800 rounded-lg border border-white/10 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Add a Comment & Rating</h2>

        {success && (
          <div className="mb-4 rounded-md bg-green-500/10 border border-green-500/50 p-4">
            <p className="text-sm text-green-400">{success}</p>
          </div>
        )}
        {error && (
          <div className="mb-4 rounded-md bg-red-500/10 border border-red-500/50 p-4">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmitComment} className="space-y-4">
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-300">
              Comment
            </label>
            <textarea
              id="comment"
              required
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mt-1 block w-full rounded-md bg-white/5 px-3 py-2 text-white outline outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500"
              placeholder="What did you think of this movie?"
            />
          </div>

          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-300">
              Rating (1-10, optional)
            </label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="mt-1 block w-full rounded-md bg-white/5 px-3 py-2 text-white outline outline-1 outline-white/10 focus:outline-2 focus:outline-indigo-500"
            >
              <option value="">No rating</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Comment'}
          </button>
        </form>
      </div>
    </div>
  )
}
