import { Image, Select } from "antd";
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

        
      </div>
    </div>
  );
}
