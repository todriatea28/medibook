import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';

export default function RatingModal({ doctorId, doctorName, isOpen, onClose, onRated }) {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: insertError } = await supabase
        .from('ratings')
        .upsert([
          {
            doctor_id: doctorId,
            patient_id: user.id,
            rating: Number(rating),
            comment: comment.trim(),
          }
        ], { onConflict: 'doctor_id, patient_id' });

      if (insertError) throw insertError;

      if (onRated) onRated();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm">
      <div className="w-full max-w-md p-6 space-y-4 bg-white border shadow-2xl rounded-3xl border-stone-200">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <h3 className="text-base font-bold text-stone-900">ექიმის შეფასება: {doctorName}</h3>
          <button onClick={onClose} className="font-bold text-stone-400 hover:text-stone-700">✕</button>
        </div>

        {error && (
          <div className="p-3 text-xs border text-rose-600 bg-rose-50 border-rose-200 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-xs font-semibold text-stone-700">შეფასება (1-დან 5-მდე)</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full px-4 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-800"
            >
              <option value="5">⭐⭐⭐⭐⭐ (5 - შესანიშნავი)</option>
              <option value="4">⭐⭐⭐⭐ (4 - ძალიან კარგი)</option>
              <option value="3">⭐⭐⭐ (3 - კარგი)</option>
              <option value="2">⭐⭐ (2 - დამაკმაყოფილებელი)</option>
              <option value="1">⭐ (1 - სუსტი)</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-xs font-semibold text-stone-700">კომენტარი (არასავალდებულო)</label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="გააზიარეთ თქვენი შთაბეჭდილება ვიზიტის შესახებ..."
              className="w-full px-4 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-800"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold transition bg-stone-100 text-stone-700 rounded-xl hover:bg-stone-200"
            >
              გაუქმება
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-xs font-semibold text-white transition shadow-md bg-rose-900 rounded-xl hover:bg-rose-800 disabled:opacity-60"
            >
              {loading ? 'იგზავნება...' : 'შეფასების გაგზავნა'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}