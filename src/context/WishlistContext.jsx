import { createContext, useContext, useState } from 'react';
import { loadWishlist, saveWishlist } from '../services/storage';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(loadWishlist);

  function toggleWishlist(id) {
    const next = wishlist.includes(id) ? wishlist.filter((item) => item !== id) : [...wishlist, id];
    saveWishlist(next);
    setWishlist(next);
  }

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
