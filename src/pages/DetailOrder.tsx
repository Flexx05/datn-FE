import { Button, Checkbox, Image, Input, Select } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import rectangle1 from '../assets/image/Rectangle 1.png';
import rectangle2 from '../assets/image/Rectangle 2.png';
import { AuthHeader } from "../components/authHeader";

const { Option } = Select;

interface OrderItem {
  id: number;
  name: string;
  color: string;
  size: number;
  price: number;
  image: string;
  quantity: number;
}

const orderItems: OrderItem[] = [
  { id: 1, name: "Diamond Halo Stud Aenean", color: "Xanh dương", size: 37, price: 552.0, image: rectangle1, quantity: 1 },
  { id: 2, name: "Diamond Halo Stud Aenean", color: "Xanh dương", size: 37, price: 552.0, image: rectangle2, quantity: 1 },
];

export default function DetailOrder() {
  const [contact, setContact] = useState({
    emailOrPhone: '',
    subscribe: false,
  });
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    country: '',
    postalCode: '',
    saveInfo: false,
  });

  const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 35;
  const tax = 20.2;
  const grandTotal = total + shipping + tax;

  return (
    <div className="bg-white min-h-screen font-roboto">
    <AuthHeader title={"Thanh toán"} />
      <div className="mx-auto flex flex-col md:flex-row min-h-screen md:gap-12 ">
        {/* Thông tin sản phẩm */}
        <div className="w-full h-full md:w-1/2 bg-[#eaf3f6] flex flex-col justify-start px-0 md:px-0" style={{ minHeight: '100vh' }}>
          <div className="max-w-[540px]  mx-auto w-full pt-8 pb-16 px-4 md:px-0">
           
            <div className="border-b border-[#dbe9ef] pb-4 mb-4">
              {orderItems.map(item => (
                <div key={item.id} className="flex items-center gap-4 mb-4  rounded-lg shadow-sm p-2 hover:bg-[#f7fafc] transition-all">
                  <div className="relative">
                    <Image src={item.image} alt={item.name} width={70} height={70} className="rounded-lg" />
                    <span className="absolute -top-2 -right-2 bg-gray-700 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{item.quantity}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm leading-tight">{item.name}</div>
                    <div className="text-xs text-gray-500">Màu: {item.color}</div>
                    <div className="text-xs text-gray-500">Size: {item.size}</div>
                  </div>
                  <div className="font-semibold text-sm text-right min-w-[80px]">${item.price.toFixed(2)}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between items-center"><span className="text-[#1a2343] cursor-pointer">Tổng tiền hàng</span><span className="text-right min-w-[80px]">${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></div>
              <div className="flex justify-between items-center"><span>Phí vận chuyển</span><span className="text-right min-w-[80px]">${shipping.toFixed(2)}</span></div>
              <div className="flex justify-between items-center"><span>Thuế (ước tính)</span><span className="text-right min-w-[80px]">${tax.toFixed(2)}</span></div>
              <hr className="my-2 border-[#dbe9ef]" />
              <div className="flex justify-between items-center text-lg font-bold"><span>Tổng tiền</span><span className="text-right min-w-[80px] text-[#1a2343]">${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></div>
            </div>
          </div>
        </div>

        {/* Thông tin liên lạc */}
        <div className="w-full md:w-1/2 flex flex-col  justify-start px-0 md:px-0" style={{ minHeight: '100vh' }} >
          <div className="max-w-[540px] mx-auto w-full bg-white rounded-xl  p-10">
            {/* Logo và breadcrumb */}
            
            {/* Form */}
            <div>
              <h2 className="text-lg font-bold mb-4">Thông tin liên lạc</h2>
              <Input
                placeholder="Email hoặc số điện thoại của bạn"
                className="mb-2"
                value={contact.emailOrPhone}
                onChange={e => setContact({ ...contact, emailOrPhone: e.target.value })}
                size="large"
              />
              <div className="w-full mb-6">
                <Checkbox
                  checked={contact.subscribe}
                  onChange={e => setContact({ ...contact, subscribe: e.target.checked })}
                  className="w-full"
                >
                  Nhận tin tức và ưu đãi mới nhất
                </Checkbox>
              </div>

              <h2 className="text-lg font-bold mb-4">Địa chỉ nhận hàng</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input placeholder="Tên" value={address.firstName} onChange={e => setAddress({ ...address, firstName: e.target.value })} size="large" />
                <Input placeholder="Họ" value={address.lastName} onChange={e => setAddress({ ...address, lastName: e.target.value })} size="large" />
              </div>
              <Input placeholder="Địa chỉ" className="mb-4" value={address.address} onChange={e => setAddress({ ...address, address: e.target.value })} size="large" />
              <Input placeholder="Khu căn hộ, số nhà... (Tuỳ chọn)" className="mb-4" value={address.apartment} onChange={e => setAddress({ ...address, apartment: e.target.value })} size="large" />
              <Input placeholder="Thành phố" className="mb-4" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} size="large" />
              <div className="flex gap-2 mb-4">
                <Select
                  placeholder="Quốc gia/Khu vực"
                  size="large"
                  className="w-1/2"
                >
                  <Option value="Vietnam">Vietnam</Option>
                  <Option value="USA">USA</Option>
                </Select>

                <Input
                  placeholder="Mã bưu điện"
                  value={address.postalCode}
                  onChange={e => setAddress({ ...address, postalCode: e.target.value })}
                  size="large"
                  className="w-1/2"
                />
              </div>

              <div className="w-full mb-6">
                <Checkbox
                  checked={address.saveInfo}
                  onChange={e => setAddress({ ...address, saveInfo: e.target.checked })}
                  className="w-full"
                >
                  Lưu thông tin cho lần mua hàng tiếp theo
                </Checkbox>
              </div>
              <div className="flex justify-between items-center mt-6">
                <Link to="/products/cart" className="text-xs text-blue-500">&lt; Quay lại giỏ hàng</Link>
                <Button type="primary" className="bg-gradient-to-r from-[#1a2343] to-[#3b5998] h-10 px-8 text-base font-semibold rounded-lg shadow hover:shadow-lg transition-all">Xác nhận vận chuyển</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
