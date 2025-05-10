import { useState } from "react";
import { Button, Input, Breadcrumb, Image } from "antd";
import { MinusOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import rectangle1 from '../assets/image/Rectangle 1.png';
import rectangle2 from '../assets/image/Rectangle 2.png';

interface CartItem {
  id: number;
  name: string;
  color: string;
  size: number;
  price: number;
  quantity: number;
  image: string;
}

export default function DetailCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Diamond Halo Stud Aenean",
      color: "Xanh dương",
      size: 37,
      price: 552.0,
      quantity: 1,
      image: rectangle1,
    },
    {
      id: 2,
      name: "Diamond Halo Stud Aenean",
      color: "Xanh dương",
      size: 37,
      price: 552.0,
      quantity: 1,
      image: rectangle2,
    },
    {
      id: 3,
      name: "Diamond Halo Stud Aenean",
      color: "Xanh dương",
      size: 37,
      price: 552.0,
      quantity: 1,
      image: rectangle2,
    },
  ]);

  const [note, setNote] = useState("");

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)));
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const updateCart = () => {
    console.log("Cart updated");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl font-roboto">
      {/* Breadcrumb */}
      <Breadcrumb
        className="mb-6 text-sm"
        items={[{ title: <Link to="/">Trang chủ</Link> }, { title: "Giỏ hàng" }]}
      />

      {/* Cart Header */}
      <h1 className="text-2xl font-bold mb-8">GIỎ HÀNG</h1>

      {/* Cart Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 font-medium">Sản phẩm</th>
              <th className="text-left py-4 font-medium">Giá</th>
              <th className="text-center py-4 font-medium">Số lượng</th>
              <th className="text-left py-4 font-medium">Tổng</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="object-cover w-full h-full"
                        preview={false}
                      />
                    </div>
                    <div className="text-sm">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-600">Màu: {item.color}</p>
                      <p className="text-gray-600">Size: {item.size}</p>
                    </div>
                  </div>
                </td>

                <td className="py-4 font-medium">${item.price.toFixed(2)}</td>

                <td className="py-4">
                  <div className="flex items-center justify-center">
                    <div className="flex items-center border border-gray-300 rounded-full overflow-hidden w-28 h-10">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="flex justify-center items-center w-10 h-10 hover:bg-gray-100 text-lg"
                      >
                        <MinusOutlined />
                      </button>

                      <div className="flex-1 flex justify-center items-center text-base">
                        {item.quantity}
                      </div>

                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex justify-center items-center w-10 h-10 hover:bg-gray-100 text-lg"
                      >
                        <PlusOutlined />
                      </button>
                    </div>
                  </div>
                </td>

                <td className="py-4 font-medium">${(item.price * item.quantity).toFixed(2)}</td>

                <td className="py-4">
                  <Button
                    type="text"
                    icon={<DeleteOutlined  style={{  color: "#333" }}/>}
                    onClick={() => removeItem(item.id)}
                    className="text-gray-500 hover:text-red-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cart Footer */}
      <div className="mt-10 flex flex-col md:flex-row gap-8 items-start">
        {/* Ghi chú */}
        <div className="flex-1">
          <Input.TextArea
            placeholder="Ghi chú"
            rows={6}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Tổng tiền + nút */}
        <div className="flex flex-col md:items-end gap-4 md:gap-2 w-full md:w-auto">
          {/* Tổng tiền */}
          <div className="flex flex-col md:items-end">
            <div className="flex gap-2 items-center text-base md:text-lg">
              <span className="font-medium text-gray-600">Tổng tiền:</span>
              <span className="text-2xl font-bold text-amber-500">${calculateTotal().toFixed(2)}</span>
            </div>
            <p className="text-gray-500 text-sm">Phí vận chuyển và thuế tính khi thanh toán</p>
          </div>

          {/* Các nút */}
          <div className="flex flex-wrap md:flex-nowrap gap-3 mt-4">
            <Button className="bg-black text-white hover:bg-gray-800 px-6 h-12 text-sm uppercase font-semibold">
              Tiếp tục mua sắm
            </Button>
            <Button onClick={updateCart} className="bg-black text-white hover:bg-gray-800 px-6 h-12 text-sm uppercase font-semibold">
              Cập nhật giỏ hàng
            </Button>
            <Button type="primary" className="bg-black text-white hover:bg-gray-800 px-6 h-12 text-sm uppercase font-semibold">
              Kiểm tra
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
