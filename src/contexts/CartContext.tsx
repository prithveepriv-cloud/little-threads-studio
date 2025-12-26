import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, Product, WishlistItem } from '@/lib/types';
import { toast } from 'sonner';

interface CartState {
  items: CartItem[];
  wishlist: WishlistItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number; size: string; color: string } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; size: string; color: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; size: string; color: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'LOAD_STATE'; payload: CartState };

const initialState: CartState = {
  items: [],
  wishlist: [],
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(
        item =>
          item.product.id === action.payload.product.id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );
      
      if (existingIndex > -1) {
        const newItems = [...state.items];
        newItems[existingIndex].quantity += action.payload.quantity;
        return { ...state, items: newItems };
      }
      
      return {
        ...state,
        items: [...state.items, {
          product: action.payload.product,
          quantity: action.payload.quantity,
          size: action.payload.size,
          color: action.payload.color,
        }],
      };
    }
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          item =>
            !(item.product.id === action.payload.productId &&
              item.size === action.payload.size &&
              item.color === action.payload.color)
        ),
      };
    
    case 'UPDATE_QUANTITY': {
      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === action.payload.productId &&
          item.size === action.payload.size &&
          item.color === action.payload.color
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }
    
    case 'CLEAR_CART':
      return { ...state, items: [] };
    
    case 'ADD_TO_WISHLIST': {
      const exists = state.wishlist.find(item => item.product.id === action.payload.id);
      if (exists) return state;
      return {
        ...state,
        wishlist: [...state.wishlist, { product: action.payload }],
      };
    }
    
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.product.id !== action.payload),
      };
    
    case 'LOAD_STATE':
      return action.payload;
    
    default:
      return state;
  }
};

interface CartContextValue extends CartState {
  addItem: (product: Product, quantity: number, size: string, color: string) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('littleones-cart');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'LOAD_STATE', payload: parsed });
      } catch (e) {
        console.error('Failed to load cart state:', e);
      }
    }
  }, []);

  // Save state to localStorage on change
  useEffect(() => {
    localStorage.setItem('littleones-cart', JSON.stringify(state));
  }, [state]);

  const addItem = (product: Product, quantity: number, size: string, color: string) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity, size, color } });
    toast.success(`${product.name} added to bag!`, {
      description: `Size: ${size} • Color: ${color}`,
    });
  };

  const removeItem = (productId: string, size: string, color: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, size, color } });
    toast.success('Item removed from bag');
  };

  const updateQuantity = (productId: string, size: string, color: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId, size, color);
      return;
    }
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, size, color, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.success('Cart cleared');
  };

  const addToWishlist = (product: Product) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    toast.success(`${product.name} added to wishlist!`);
  };

  const removeFromWishlist = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
    toast.success('Removed from wishlist');
  };

  const isInWishlist = (productId: string) => {
    return state.wishlist.some(item => item.product.id === productId);
  };

  const cartTotal = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const cartCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
