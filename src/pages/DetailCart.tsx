import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cartService } from '../services/cart.service';

const DetailCart = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // Lấy dữ liệu giỏ hàng từ API
  const {
    data: cartData,
    isLoading: isCartLoading,
    error,
    refetch, // Thêm refetch để gọi lại dữ liệu thủ công
  } = useQuery<any>({
    queryKey: ['cart'],
    queryFn: () => cartService.getCart(),
  });
  console.log('Cart Data:', cartData?.cart);

  // State để quản lý cartItems
  const [cartItems, setCartItems] = useState<any[]>([]);

  // Cập nhật cartItems khi cartData thay đổi
  useEffect(() => {
  if (cartData?.cart) {
    const updatedCartItems = cartData.cart.map((item: any) => {
      const variant = item.variant || {};
      const sizeAttr = variant.attributes?.find((a: any) => a.attributeName === 'Kích thước')?.values[0];
      const colorAttr = variant.attributes?.find((a: any) => a.attributeName === 'Màu sắc')?.values[0];

      return {
        id: item.productId,
        productId: item.productId,
        variantId: item.variantId || '',
        name: item.product.name,
        image: variant.image || item.product.images[0] || '',
        size: sizeAttr || item.size || 'Size mặc định', // Ưu tiên item.size từ server
        color: item.color || colorAttr || 'Màu mặc định', // Ưu tiên item.color từ server
        regularPrice: variant.regularPrice,
        salePrice: variant.salePrice,
        quantity: item.quantity,
        stock: variant.stock,
        selected: item.selected || true,
      };
    });
    setCartItems(updatedCartItems);
  }
}, [cartData]);

  // Toggle chọn sản phẩm
  const toggleSelectItem = (itemId: string) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === itemId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  // Chọn tất cả sản phẩm
  const toggleSelectAll = () => {
    const allSelected = cartItems.every((item) => item.selected);
    setCartItems((items) =>
      items.map((item) => ({ ...item, selected: !allSelected }))
    );
  };

  // Cập nhật số lượng và đồng bộ với server
  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    const item = cartItems.find((item) => item.id === itemId);
    if (item) {
      const maxQuantity = Math.min(newQuantity, item.stock);
      setCartItems((items) =>
        items.map((item) =>
          item.id === itemId ? { ...item, quantity: maxQuantity } : item
        )
      );
      try {
        const response = await cartService.updateCartQuantity({
          productId: item.productId,
          variantId: item.variantId, // Sử dụng variantId từ item
          quantity: maxQuantity,
        });
        console.log('Update quantity response:', response); // Log phản hồi
        await refetch(); // Làm mới dữ liệu từ server
      } catch (error) {
        console.error('Lỗi khi cập nhật số lượng:', error);
        // Rollback state nếu thất bại
        setCartItems((items) =>
          items.map((item) =>
            item.id === itemId ? { ...item, quantity: item.quantity } : item
          )
        );
        await refetch(); // Làm mới để đồng bộ với server
      }
    }
  };

  // Xóa sản phẩm và đồng bộ với server
  const removeItem = async (itemId: string) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item) {
      setCartItems((items) => items.filter((item) => item.id !== itemId));
      try {
        const response = await cartService.removeCart({
          productId: item.productId,
          variantId: item.variantId, // Sử dụng variantId từ item
        });
        console.log('Remove item response:', response); // Log phản hồi
        await refetch(); // Làm mới dữ liệu từ server
      } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
        // Rollback state nếu thất bại
        await refetch(); // Làm mới để đồng bộ với server
      }
    }
  };

  const getItemPrice = (item: any) => {
    return item.salePrice > 0 ? item.salePrice : item.regularPrice;
  };

  const getItemTotal = (item: any) => {
    return getItemPrice(item) * item.quantity;
  };

  // Lấy các sản phẩm được chọn
  const getSelectedItems = () => {
    return cartItems.filter((item) => item.selected);
  };

  // Tính tổng tiền của các sản phẩm được chọn
  const getSelectedSubtotal = () => {
    return getSelectedItems().reduce((total, item) => total + getItemTotal(item), 0);
  };

  const getTotalSavings = () => {
    return getSelectedItems().reduce((savings, item) => {
      if (item.salePrice > 0) {
        return savings + ((item.regularPrice - item.salePrice) * item.quantity);
      }
      return savings;
    }, 0);
  };

  const shippingFee = 30000;
  const freeShippingThreshold = 500000;
  const selectedItems = getSelectedItems();
  const selectedSubtotal = getSelectedSubtotal();
  const totalSavings = getTotalSavings();
  const finalTotal = selectedSubtotal + (selectedSubtotal >= freeShippingThreshold ? 0 : shippingFee);

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert('Vui lòng chọn ít nhất một sản phẩm để thanh toán');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem('selectedCartItems', JSON.stringify(selectedItems));
      navigate('/checkout');
    }, 500);
  };

  if (isCartLoading) {
    return <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">Đang tải...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center text-red-500">Có lỗi xảy ra khi tải giỏ hàng</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Giỏ hàng trống</h2>
            <p className="text-gray-600 mb-8">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const allSelected = cartItems.length > 0 && cartItems.every((item) => item.selected);
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900" style={{ color: '#8BC42D' }}>Giỏ hàng</h1>
          <p className="text-gray-600 mt-2">
            Bạn có {cartItems.length} sản phẩm trong giỏ hàng
            {selectedItems.length > 0 && (
              <span className="ml-2 text-blue-600 font-medium">
                ({selectedItems.length} sản phẩm được chọn)
              </span>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Free Shipping Progress - chỉ tính cho sản phẩm được chọn */}
            {selectedSubtotal > 0 && selectedSubtotal < freeShippingThreshold && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-900">
                    Mua thêm {(freeShippingThreshold - selectedSubtotal).toLocaleString()}₫ để được miễn phí vận chuyển
                  </span>
                  <span className="text-xs text-blue-700">
                    {Math.round((selectedSubtotal / freeShippingThreshold) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((selectedSubtotal / freeShippingThreshold) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Select All */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="font-medium text-gray-900">
                  Chọn tất cả ({cartItems.length} sản phẩm)
                </span>
              </label>
            </div>

            {/* Cart Items List */}
            <div className="bg-white rounded-lg shadow-sm">
              {cartItems.map((item, index) => (
                <div key={item.id} className={`p-6 ${index !== cartItems.length - 1 ? 'border-b' : ''}`}>
                  <div className="flex items-start space-x-4">
                    {/* Checkbox */}
                    <div className="flex-shrink-0 pt-2">
                      <input
                        type="checkbox"
                        checked={item.selected}
                        onChange={() => toggleSelectItem(item.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>

                    {/* Product Image */}
                    <Link to={`/products/${item.productId}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-md hover:opacity-75 transition-opacity"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/products/${item.productId}`}
                        className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        {item.name}
                      </Link>
                      <div className="mt-1 space-y-1">
                        <p className="text-sm text-gray-500">Size: {item.size}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">Màu:</span>
                          <div className="flex items-center gap-1">
                            <div 
                              className="w-4 h-4 rounded border border-gray-300"
                              style={{ backgroundColor: item.color }}
                            ></div>
                            <span className="text-sm text-gray-500"></span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">Còn lại: {item.stock} sản phẩm</p>
                      </div>


                      {/* Price */}
                      <div className="mt-2 flex items-center space-x-2">
                        <span className="text-lg font-semibold text-gray-900">
                          {getItemPrice(item).toLocaleString()}₫
                        </span>
                        {item.salePrice > 0 && (
                          <>
                            <span className="text-sm text-gray-500 line-through">
                              {item.regularPrice.toLocaleString()}₫
                            </span>
                            <span className="text-sm text-red-600 font-medium">
                              -{Math.round(((item.regularPrice - item.salePrice) / item.regularPrice) * 100)}%
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Quantity & Remove */}
                    <div className="flex flex-col items-end space-y-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="px-4 py-2 text-center min-w-[60px] font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                          disabled={item.quantity >= item.stock}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <p className={`text-lg font-semibold ${item.selected ? 'text-blue-600' : 'text-gray-400'}`}>
                          {getItemTotal(item).toLocaleString()}₫
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="flex justify-start">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>

          {/* Order Summary - chỉ tính cho sản phẩm được chọn */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Tóm tắt đơn hàng
                {selectedItems.length > 0 && (
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    ({selectedItems.length} sản phẩm)
                  </span>
                )}
              </h3>

              {selectedItems.length > 0 ? (
                <>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Tạm tính ({selectedItems.length} sản phẩm):</span>
                      <span>{selectedSubtotal.toLocaleString()}₫</span>
                    </div>

                    {totalSavings > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Tiết kiệm:</span>
                        <span>-{totalSavings.toLocaleString()}₫</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Phí vận chuyển:</span>
                      <span>
                        {selectedSubtotal >= freeShippingThreshold ? (
                          <span className="text-green-600 font-medium">Miễn phí</span>
                        ) : (
                          `${shippingFee.toLocaleString()}₫`
                        )}
                      </span>
                    </div>

                    <div className="border-t pt-3 flex justify-between text-lg font-semibold">
                      <span>Tổng cộng:</span>
                      <span className="text-blue-600">{finalTotal.toLocaleString()}₫</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    disabled={isLoading || selectedItems.length === 0}
                    className="w-full mt-6 bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Đang xử lý...
                      </div>
                    ) : (
                      `Thanh toán (${selectedItems.length})`
                    )}
                  </button>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Chưa có sản phẩm nào được chọn</p>
                  <p className="text-sm text-gray-400">Vui lòng chọn sản phẩm để thanh toán</p>
                </div>
              )}

              {/* Security Info */}
              <div className="mt-4 flex items-center justify-center text-xs text-gray-500">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Thanh toán an toàn & bảo mật
              </div>

              {/* Policies */}
              <div className="mt-4 text-xs text-gray-500 space-y-1">
                <p>• Miễn phí đổi trả trong 30 ngày</p>
                <p>• Bảo hành chính hãng</p>
                <p>• Hỗ trợ 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailCart;