import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Navbar';

const Profile = () => {
  const { user, fetchProfile, loading, error } = useAuth();
  const [profile, setProfile] = useState(user);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchProfile();
        setProfile(data);
      } catch (err) {
        // handled in context
      }
    };

    if (!user) {
      loadProfile();
    }
  }, [fetchProfile, user]);

  if (loading && !profile) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-sm font-medium text-neutral-600">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-soft border border-neutral-200 p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-neutral-900">Your Profile</h1>
            <p className="text-sm text-neutral-600">Account details</p>
          </div>

        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
            {error}
          </div>
        )}

          <div className="space-y-4">
            <div>
              <p className="text-xs text-neutral-500">Name</p>
              <p className="text-base font-semibold text-neutral-900">{profile?.name || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-500">Email</p>
              <p className="text-base font-semibold text-neutral-900">{profile?.email || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-500">Created at</p>
              <p className="text-base font-semibold text-neutral-900">
                {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : '-'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
