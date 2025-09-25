import React from 'react';

// Hardcoded product data
const productsData = [
  {
    id: 1,
    name: "Men-Black/Jordan Oversized T-Shirt",
    description: "Comfortable and stylish men's t-shirt.",
    category: "T-Shirts",
    price: 74185,
    discount: 85,
    size: "L",
    color: "Black",
    clothType: "100% Cotton",
    deliveryTime: "3-5 days",
    returnPolicy: "5 days return policy",
    additionalDetails: "Machine washable and weather proof. This product is sold out.",
    images: [
      "https://i.pinimg.com/736x/99/df/c6/99dfc6172b5df9a97c22d2af93aac789.jpg",
      "https://i.pinimg.com/736x/71/ed/b3/71edb347dbbcc9f5708fb2e141b4e6c9.jpg",
      "https://i.pinimg.com/736x/5e/06/2f/5e062fb9641aeb3558304ee1bb93a1d5.jpg"
    ],
    colorImages: {
      "Black": "https://i.pinimg.com/736x/99/df/c6/99dfc6172b5df9a97c22d2af93aac789.jpg"
    },
    specifications: {
      "Material": "100% Cotton",
      "Fit": "Oversized",
      "Sleeve": "Short",
      "Neck": "Round Neck"
    }
  },
  {
    id: 2,
    name: "Nxew's Men Oversized T-Shirt",
    description: "Comfortable and stylish men's T-shirt.",
    category: "T-Shirts",
    price: 399,
    discount: 42,
    size: "L",
    color: "Black",
    clothType: "100% Cotton",
    deliveryTime: "3-5 days",
    returnPolicy: "5 days return policy",
    additionalDetails: "Machine washable and weather proof.",
    images: [
      "https://i.pinimg.com/736x/78/3e/39/783e39cca642ba73cd5455ce8be39608.jpg",
      "https://i.pinimg.com/736x/a8/03/b7/a803b71b74c0b3c7f70938556d480111.jpg",
      "https://i.pinimg.com/736x/26/94/be/2694be21bc82399c67208bf6d65068a4.jpg",
      "https://i.pinimg.com/736x/37/a7/e2/37a7e22ccccb2fd9e158db92d9fe094d.jpg",
      "https://i.pinimg.com/736x/ae/36/14/ae36149467f17d37a86ab84051b321f7.jpg"
    ],
    colorImages: {
      "Black": "https://i.pinimg.com/736x/78/3e/39/783e39cca642ba73cd5455ce8be39608.jpg"
    },
    specifications: {
      "Material": "100% Cotton",
      "Fit": "Oversized",
      "Sleeve": "Short",
      "Neck": "Round Neck"
    }
  },
  {
    id: 3,
    name: "Alien Men-Oversized T-Shirt",
    description: "Comfortable and stylish T-shirt.",
    category: "T-Shirts",
    price: 349,
    discount: 26,
    size: "L",
    color: "Black",
    clothType: "Cotton",
    deliveryTime: "3-5 days",
    returnPolicy: "5 days return policy",
    additionalDetails: "Machine washable and weather proof. This product is sold out.",
    images: [
      "https://i.pinimg.com/736x/22/3e/6e/223e6ec6ab0a025177a6502a10d4cceb.jpg",
      "https://i.pinimg.com/736x/1f/f9/3e/1ff93ece8aa88d219e7f653815af9968.jpg",
      "https://i.pinimg.com/736x/0a/71/e1/0a71e1b76821af8f9ef8ceb1d843a1b7.jpg",
      "https://i.pinimg.com/736x/ad/35/e2/ad35e2b64522a040c6fc3d0c64e8c09f.jpg"
    ],
    colorImages: {
      "Black": "https://i.pinimg.com/736x/22/3e/6e/223e6ec6ab0a025177a6502a10d4cceb.jpg"
    },
    specifications: {
      "Material": "100% Cotton",
      "Fit": "Oversized",
      "Sleeve": "Short",
      "Neck": "Round Neck"
    }
  },
  {
    id: 4,
    name: "Nxew's white-Sweat T-Shirt",
    description: "Stylish and comfortable to wear.",
    category: "sweat T-Shirts",
    price: 449.99,
    discount: 32,
    size: "XL, XXL",
    color: "white",
    clothType: "100% cotton",
    deliveryTime: "3-5 days",
    returnPolicy: "5 days return policy",
    additionalDetails: "High-quality cotton, perfect for winter.",
    images: [
      "https://i.pinimg.com/736x/f1/4f/81/f14f81d82a4cc1f45abc6f0a9f5deffe.jpg",
      "https://i.pinimg.com/736x/67/45/86/674586f94e1db394448a9ab0257cc729.jpg"
    ],
    colorImages: {
      "white": "https://i.pinimg.com/736x/f1/4f/81/f14f81d82a4cc1f45abc6f0a9f5deffe.jpg"
    },
    specifications: {
      "Material": "100% cotton",
      "Fit": "Slim Fit",
      "Sleeve": "Long Sleeve",
      "Neck": "Collareless"
    }
  },
  {
    id: 5,
    name: "Nxew's Black Sweat T-Shirt",
    description: "Weather proof.",
    category: "sweat T-Shirts",
    price: 499.99,
    discount: 37,
    size: "XXL",
    color: "Black",
    clothType: "100% Cotton",
    deliveryTime: "3-5 days",
    returnPolicy: "5 days return policy",
    additionalDetails: "Breathable fabric, Comfortable to wear.",
    images: [
      "https://i.pinimg.com/736x/a8/28/16/a82816b8a65b325163dd0271d08780c4.jpg",
      "https://i.pinimg.com/736x/a7/00/04/a70004de24160bca35a5ce2a16012957.jpg"
    ],
    colorImages: {
      "Black": "https://i.pinimg.com/736x/68/41/79/684179f8e602a855fc3a87695ed47d76.jpg"
    },
    specifications: {
      "Material": "100% cotton",
      "Fit": "Regular Fit",
      "Sleeve": "Long Sleeve",
      "Neck": "Collarless"
    }
  },
  {
    id: 6,
    name: "Nxew's Half sleeve Shirt",
    description: "RELAXED FIT EMBROIDERED SHIRT",
    category: "Half sleeve Shirts",
    price: 349.99,
    discount: 20,
    size: "L",
    color: "Blue",
    clothType: "Cotton Viscose",
    deliveryTime: "3-5 days",
    returnPolicy: "5 days return policy",
    additionalDetails: "Stylish and comfortable, perfect for casual outings. This product is sold out.",
    images: [
      "https://i.pinimg.com/736x/ca/d0/dd/cad0dd3c7f3880dee714da8bdecdf723.jpg",
      "https://i.pinimg.com/736x/13/1d/aa/131daac4414ce7338ccdd6941ad7d130.jpg"
    ],
    colorImages: {
      "Blue": "https://i.pinimg.com/736x/ca/d0/dd/cad0dd3c7f3880dee714da8bdecdf723.jpg"
    },
    specifications: {
      "Material": "Cotton Viscose",
      "Fit": "Relaxed Fit",
      "Sleeve": "Half Sleeves",
      "Neck": "Cuban Collar"
    }
  },
  {
    id: 7,
    name: "Half sleeve Acid wash T-Shirt",
    description: "RELAXED FIT EMBROIDERED T-SHIRT",
    category: "T-Shirts",
    price: 249.99,
    discount: 24,
    size: "L",
    color: "Blue",
    clothType: "Cotton",
    deliveryTime: "3-5 days",
    returnPolicy: "5 days return policy",
    additionalDetails: "Men's Blue Hustle Typography Oversized Acid Wash T-shirt",
    images: [
      "https://i.pinimg.com/736x/8b/0b/21/8b0b21072e783ba7534c8975519f2d85.jpg",
      "https://i.pinimg.com/736x/81/91/62/81916265cf66a6079ff353528add0773.jpg",
      "https://i.pinimg.com/736x/03/ab/0c/03ab0c096a7b92e5609cd7b72ec585f6.jpg"
    ],
    colorImages: {
      "Blue": "https://i.pinimg.com/736x/8b/0b/21/8b0b21072e783ba7534c8975519f2d85.jpg"
    },
    specifications: {
      "Material": "Cotton",
      "Fit": "Relaxed Fit",
      "Sleeve": "Half Sleeves",
      "Neck": "Round Neck",
      "Cloth Type": "100% Cotton"
    }
  },
  {
    id: 8,
    name: "Formal Shirt",
    description: "",
    category: "Shirts",
    price: 449.99,
    discount: 25,
    size: "L",
    color: "Gray",
    clothType: "Cotton cum Polyester",
    deliveryTime: "3-5 days",
    returnPolicy: "5 days return policy",
    additionalDetails: "Men's Gray Hustle Formal shirt. This product is sold out.",
    images: [
      "https://i.pinimg.com/736x/79/b9/30/79b9303c53a85ef2d2d6928836823672.jpg",
      "https://i.pinimg.com/736x/8e/7c/0e/8e7c0ef2dbf1c52b6f9bae8a9dcfbae4.jpg",
      "https://i.pinimg.com/736x/ee/a9/62/eea96278d28fdfa1157f6347fc08a466.jpg"
    ],
    colorImages: {
      "Gray": "https://i.pinimg.com/736x/79/b9/30/79b9303c53a85ef2d2d6928836823672.jpg"
    },
    specifications: {
      "Material": "Cotton cum Polyester",
      "Sleeve": "full Sleeves",
      "collar": "Spread Collar",
      "Occasion": "Formal",
      "Pattern": "Solid"
    }
  }
];

const ProductList = ({ setSelectedProduct }) => {
  // Helper to calculate discounted price
  const getDiscountedPrice = (price, discount) => {
    return Math.round(price * (1 - discount / 100));
  };

  // Check if product is sold out
  const isSoldOut = (additionalDetails) =>
    additionalDetails && additionalDetails.toLowerCase().includes("sold out");

  return (
    <div className="products-container">
      {productsData.map((product) => {
        const mainImage = product.images?.[0]?.trim() || "";
        const discountedPrice = getDiscountedPrice(product.price, product.discount);
        const isOutOfStock = isSoldOut(product.additionalDetails);

        return (
          <div
            key={product.id}
            className={`product-card ${isOutOfStock ? 'out-of-stock' : ''}`}
            onClick={() => !isOutOfStock && setSelectedProduct(product)}
          >
            {/* Image */}
            <div className="product-image-wrapper">
              <img
                src={mainImage}
                alt={product.name}
                className="product-image"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
                }}
              />
              {isOutOfStock && (
                <div className="sold-out-badge">SOLD OUT</div>
              )}
            </div>

            {/* Info */}
            <div className="product-info">
              <div className="product-title">{product.name}</div>
              <div className="product-category">{product.category}</div>
              <div className="product-price">
                <span className="original-price">₹{product.price}</span>
                <span className="discounted-price">₹{discountedPrice}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;