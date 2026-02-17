import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const clearError = useCallback(() => setError(null), []);

  const loadUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/auth/me');
      setUser(response.data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const registerUser = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post('/auth/register', payload);
      setUser(response.data.user);
      return response.data.user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const loginUser = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post('/auth/login', payload);
      setUser(response.data.user);
      return response.data.user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logoutUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.post('/auth/logout');
      setUser(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get('/user/profile');
      return response.data.user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      loading,
      error,
      registerUser,
      loginUser,
      logoutUser,
      loadUser,
      fetchProfile,
      clearError
    }),
    [user, loading, error, registerUser, loginUser, logoutUser, loadUser, fetchProfile, clearError]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
