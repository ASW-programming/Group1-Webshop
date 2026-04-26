import { createContext, useContext, useState, useEffect, useRef } from "react";
import { getProducts } from "./calls.js";
import { useQuery } from "@tanstack/react-query";


const ShopContext = createContext();

export function ShopProvider({children}){

     // ===== PRODUCT DATA =====
    const {
        data: products = [],
        isLoading: productsLoading,
        isError: productsError,
    } = useQuery({ 
        queryKey: ["products"], 
        queryFn: getProducts 
    });

    // Maps out categories. Removes duplicates and converts back into array.
    const categories = [...new Set(products.map((p) => p.category))];

    // ===== CART FUNCTIONALITY =====

    const [isCartOpen, setIsCartOpen] = useState(false);
    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const [displayQuantity, setDisplayQuantity] = useState({});

    const [addedProducts, setAddedProducts] = useState(() => {
        const saved = localStorage.getItem("shoppingCart");
        return saved ? JSON.parse(saved) : [];
    });

    const addProduct = (product, amount = 1) => {
		setDisplayQuantity((prev) => {
			const newQty = (prev[product.id] ?? 0) + amount;
			if (newQty <= 0) {
				const updated = { ...prev };
				delete updated[product.id];
				return updated;
			}
			return { ...prev, [product.id]: newQty };
		});
		setAddedProducts((prev) => {
			const exists = prev.find((p) => p.id === product.id);
			const newQuantity = (exists?.quantity ?? 0) + amount;

			if (newQuantity <= 0)
				return prev.filter((p) => p.id !== product.id);
			if (exists)
				return prev.map((p) =>
					p.id === product.id ? { ...p, quantity: newQuantity } : p,
				);
			return [...prev, { ...product, quantity: newQuantity }];
		});
	};

    const clearCart = () => {
		setAddedProducts([]);
		setDisplayQuantity({});
		localStorage.removeItem("shoppingCart");
	};


     useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(addedProducts));
  }, [addedProducts]);


  // ===== PRODUCTCARD AND PRODUCTDETAIL Functionality =====

const [localQuantity, setLocalQuantity] = useState({});
    const timerRef = useRef({});
    const pendingAmount = useRef({});


    // Show in real time number of added products and after 1 second send to shopping cart.
    const handleQuantityChange = (product, amount, useTimer = true) => {
        // Instant feedback
        setLocalQuantity((prev) => {
            const newQty = (prev[product.id] ?? 0) + amount;
            if (newQty <= 0) {
                const updated = { ...prev };
                delete updated[product.id];
                return updated;
            }
            return { ...prev, [product.id]: newQty };
        });

        if(useTimer === false){
            addProduct(product, amount);
            return
        }

            // Keep track of total amount of items
            pendingAmount.current[product.id] =
                (pendingAmount.current[product.id] ?? 0) + amount;
        

        // Clear timer
        clearTimeout(timerRef.current[product.id]);

        // New timer with new total
        timerRef.current[product.id] = setTimeout(() => {
            addProduct(product, pendingAmount.current[product.id]);
            // Reset after data send
            pendingAmount.current[product.id] = 0;
        }, 1000);
    };

    //===== HAMBURGERMENU =====

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () =>
        setIsMenuOpen(!isMenuOpen);

  const value = {
    // product data
    products,
    productsLoading,
    productsError,
    categories,
    // cart functionality
    displayQuantity,
    addedProducts,
    addProduct,
    clearCart,
    isCartOpen,
    toggleCart,
    // Local state for quantity changes
    localQuantity,
    handleQuantityChange,
    //HamburgerMenu
    isMenuOpen,
    toggleMenu,
  };

  return (
    <ShopContext.Provider value={value}>
        {children}
    </ShopContext.Provider>
  );

}

export const useShop = () => useContext(ShopContext);