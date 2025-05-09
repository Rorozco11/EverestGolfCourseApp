'use client';

export function isLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check if user cookie exists
  const cookies = document.cookie.split(';');
  const userCookie = cookies.find(cookie => cookie.trim().startsWith('user='));
  
  return !!userCookie;
}

export function getUserData() {
  if (typeof window === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  const userCookie = cookies.find(cookie => cookie.trim().startsWith('user='));
  
  if (userCookie) {
    try {
      const userData = JSON.parse(decodeURIComponent(userCookie.split('=')[1]));
      return userData;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }
  
  return null;
} 