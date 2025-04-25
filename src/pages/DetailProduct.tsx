import { useState } from "react";
import { Button, InputNumber, Tabs, Radio, Rate } from "antd";
import { ShoppingCartOutlined, HeartOutlined, ShareAltOutlined } from "@ant-design/icons";
import rectangle3 from '../assets/image/Rectangle 3.png'; // IMPORT HÌNH
import rectangle4 from '../assets/image/Rectangle 4.png'; 
import rectangle1 from '../assets/image/Rectangle 1.png'; 
import detailPrd01 from '../assets/image/detailPrd-01.png'
import detailPrd02 from '../assets/image/detailprd-02.png'
import detailPrd03 from '../assets/image/detailPrd-03.png'
import detailPrd04 from '../assets/image/detailPrd-04.png'
import detailPrd05 from '../assets/image/detailPrd-05.png'
import detailPrd06 from '../assets/image/detailPrd-06.png'

const { TabPane } = Tabs;

export default function DetailProduct() {
  const [color, setColor] = useState<string>("pink");
  const [size, setSize] = useState<number>(36);
  const [quantity, setQuantity] = useState<number>(1);

  const colors = [
    { value: "blue", color: "bg-blue-600" },
    { value: "red", color: "bg-red-500" },
    { value: "black", color: "bg-black" },
    { value: "white", color: "bg-white border" },
    { value: "gray", color: "bg-gray-400" },
    { value: "pink", color: "bg-pink-400" },
  ];

  const sizes = [36, 37, 38, 39, 40, 41, 42];

  const thumbnails = [detailPrd01, detailPrd02, detailPrd03, detailPrd04]; // thêm mảng ảnh phụ

  return (
    <div className="container mx-auto max-w-7xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Hình ảnh sản phẩm */}
        <div>
          <img
            src={rectangle3}
            alt="Main Product"
            className="w-full rounded-lg"
          />
          {/* Ảnh phụ */}
          <div className="flex gap-4 mt-4">
            {thumbnails.map((thumb, index) => (
              <img
                key={index}
                src={thumb}
                alt={`Thumb ${index}`}
                className="w-20 h-20 object-cover rounded-lg border"
              />
            ))}
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div>
          <h1 className="text-2xl font-bold mb-2">Diamond Halo Stud Aenean</h1>

          <div className="flex items-center mb-4">
            <Rate disabled defaultValue={0} />
          </div>

          <div className="text-3xl font-bold text-green-700 mb-4">$552.00</div>

          <div className="space-y-2 text-gray-700 text-sm mb-6">
            <div><strong>Tình trạng:</strong> Còn hàng</div>
            <div><strong>Mã số SP:</strong> E-00073</div>
            <div><strong>Danh mục:</strong> Sản phẩm bán chạy, Giày chạy</div>
            <div><strong>Từ khóa:</strong> Giày, Đen, L, Hồng, Xanh, X, XL</div>
          </div>

          {/* Màu sắc */}
          <div className="mb-6">
            <div className="font-semibold mb-2">MÀU:</div>
            <div className="flex gap-3">
              {colors.map((item) => (
                <div
                  key={item.value}
                  className={`w-8 h-8 rounded-full cursor-pointer ${item.color} ${color === item.value ? "ring-2 ring-yellow-500" : ""}`}
                  onClick={() => setColor(item.value)}
                ></div>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mb-6">
            <div className="font-semibold mb-2">SIZE:</div>
            <Radio.Group
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="flex gap-3"
            >
              {sizes.map((s) => (
                <Radio.Button key={s} value={s} className="border">
                  {s}
                </Radio.Button>
              ))}
            </Radio.Group>
          </div>

          {/* Số lượng */}
          <div className="flex items-center gap-4 mb-6">
            <InputNumber
              min={1}
              max={10}
              value={quantity}
              onChange={(value) => setQuantity(value || 1)}
            />
            <Button
              type="primary"
              size="large"
              icon={<ShoppingCartOutlined />}
              className="bg-yellow-400 hover:bg-yellow-500 border-0 flex items-center justify-center"
            >
              THÊM VÀO GIỎ
            </Button>
            <Button
              type="primary"
              size="large"
              icon={<ShoppingCartOutlined />}
              className="bg-yellow-400 hover:bg-yellow-500 border-0 flex items-center justify-center"
            >
              ĐẶT HÀNG
            </Button>
            <Button
              size="large"
              icon={<HeartOutlined />}
              className="border border-gray-300"
            />
          </div>

          {/* Hướng dẫn và chia sẻ */}
          <div className="flex items-center justify-between border-t pt-4 text-sm text-gray-600">
            <div className="flex items-center gap-2 cursor-pointer hover:text-green-600">
              <span>📋</span> HƯỚNG DẪN CHỌN SIZE
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-green-600">
              <ShareAltOutlined /> CHIA SẺ
            </div>
          </div>
        </div>
      </div>

      {/* Tabs mô tả - nhận xét */}
      <div className="mt-12">
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="MÔ TẢ" key="1">
            <p className="mt-4 text-gray-700 leading-relaxed">
              {/* Phần mô tả sản phẩm */}
              <div className="product-description text-justify space-y-6">

                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridicu lus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                </p>

                {/* Hình 1 */}
                <div className="flex justify-center">
                  <img src={detailPrd05} alt="Chi tiết sản phẩm 1" className="w-full max-w-md rounded-lg shadow-md" />
                </div>

                <p>
                  Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridicu lus mus. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                </p>

                {/* Hình 2 */}
                <div className="flex justify-center">
                  <img src={detailPrd06} alt="Chi tiết sản phẩm 2" className="w-full max-w-md rounded-lg shadow-md" />
                </div>

                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridicu lus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                </p>
              </div>
            </p>
          </TabPane>

          <TabPane tab="NHẬN XÉT" key="2">
            <p className="mt-4 text-gray-700 leading-relaxed">
              Chưa có nhận xét nào.
            </p>
          </TabPane>
        </Tabs>
      </div>
      {/* Phần sản phẩm cùng danh mục */}
      <div className="related-products mt-16">
        <h2 className="text-2xl font-bold mb-6 border-b-2 border-orange-400 inline-block pb-2">
          Sản phẩm cùng danh mục
        </h2>

        {/* Slider (giả lập dạng lưới) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sản phẩm 1 */}
          <div className="border p-4 rounded-lg hover:shadow-lg transition">
            <div className="relative">
              <img src={rectangle1} alt="Giày 1" className="w-full rounded" />
              <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                Mới
              </span>
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                -69%
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-semibold">
                Giày Thể Thao Sneaker MULGATI HX483A
              </h3>
              <p className="text-black font-bold mt-1">100.000 VND</p>
            </div>
          </div>

          {/* Sản phẩm 2 */}
          <div className="border p-4 rounded-lg hover:shadow-lg transition">
            <div className="relative">
              <img src={rectangle4}  alt="Giày 2" className="w-full rounded" />
              <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                Mới
              </span>
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                -69%
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-semibold">
                Giày Thể Thao Sneaker MULGATI HX483A
              </h3>
              <p className="text-black font-bold mt-1">100.000 VND</p>
            </div>
          </div>

          {/* Sản phẩm 3 */}
          <div className="border p-4 rounded-lg hover:shadow-lg transition">
            <div className="relative">
              <img src={rectangle3} alt="Giày 3" className="w-full rounded" />
              <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                Mới
              </span>
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                -69%
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-semibold">
                Giày Thể Thao Sneaker MULGATI HX483A
              </h3>
              <p className="text-black font-bold mt-1">100.000 VND</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
