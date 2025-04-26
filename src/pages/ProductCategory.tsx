import { useState } from "react"
import { Layout, Select, Pagination, Image } from "antd"
import rectangle1 from '../assets/image/Rectangle 1.png'
import rectangle2 from '../assets/image/Rectangle 2.png'
import rectangle3 from '../assets/image/Rectangle 3.png'
import rectangle4 from '../assets/image/Rectangle 4.png'
import rectangle5 from '../assets/image/Rectangle 5.png'
import rectangle6 from '../assets/image/Rectangle 6.png'
import rectangle7 from '../assets/image/Rectangle 7.png'
import rectangle8 from '../assets/image/Rectangle 8.png'
import rectangle9 from '../assets/image/Rectangle 9.png'
import rectangle10 from '../assets/image/Rectangle 10.png'
import rectangle11 from '../assets/image/Rectangle 11.png'
import rectangle12 from '../assets/image/Rectangle 12.png'
const { Sider, Content } = Layout
const { Option } = Select

export default function ProductCategory() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const products = [
    {
      id: 1,
      name: "Giày Thể Thao Sneaker MULGATI HX482C",
      price: "100.000 VND",
      image: rectangle1,
      isNew: true,
      discount: 40,
      color: "blue",
    },
    {
      id: 2,
      name: "Giày Thể Thao Sneaker MULGATI HX482C",
      price: "100.000 VND",
      image: rectangle2,
      isNew: true,
      discount: 40,
      color: "cyan",
    },
    {
      id: 3,
      name: "Giày Thể Thao Sneaker MULGATI HX482C",
      price: "100.000 VND",
      image: rectangle3,
      isNew: true,
      discount: 40,
      color: "pink",
    },
    {
      id: 4,
      name: "Giày Thể Thao Sneaker MULGATI HX482C",
      price: "100.000 VND",
      image: rectangle4,
      isNew: true,
      discount: 40,
      color: "blue",
    },
    {
      id: 5,
      name: "Giày Thể Thao Sneaker MULGATI HX482C",
      price: "100.000 VND",
      image: rectangle5,
      isNew: true,
      discount: 45,
      color: "purple",
    },
    {
      id: 6,
      name: "Giày Thể Thao Sneaker MULGATI HX482C",
      price: "100.000 VND",
      image: rectangle6,
      isNew: true,
      discount: 45,
      color: "white",
    },
    {
      id: 7,
      name: "Giày Thể Thao Sneaker MULGATI HX482C",
      price: "100.000 VND",
      image: rectangle7,
      isNew: true,
      discount: 45,
      color: "white",
    },
    {
      id: 8,
      name: "Giày Thể Thao Sneaker MULGATI HX482C",
      price: "100.000 VND",
      image: rectangle8,
      isNew: true,
      discount: 45,
      color: "purple",
    },
    {
      id: 9,
      name: "Giày Thể Thao Sneaker MULGATI HX482C",
      price: "100.000 VND",
      image: rectangle9,
      isNew: true,
      discount: 45,
      color: "blue",
    },
  ]

  const featuredProducts = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet consectetur adipiscing",
      image: rectangle10,
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet consectetur adipiscing",
      image: rectangle11,
    },
    {
      id: 3,
      title: "Lorem ipsum dolor sit amet consectetur adipiscing",
      image: rectangle12,
    },
  ]

  return (

    <Layout className="min-h-screen bg-white px-4 md:px-8 lg:px-11 py-6 font-roboto">
      <Layout>
        <Sider width={250} className="bg-white p-4 lg:mr-8 mb-6 lg:mb-0" breakpoint="lg" collapsedWidth="0">
          {/* Thư mục */}
          <div className="mb-6 bg-gray-100 relative p-5">
            <h2 className="text-base font-bold uppercase ">THƯ MỤC</h2>
          {/* Thanh line */}
            <div className="relative mb-4 ">
              <div className="h-1 w-20 bg-orange-400"></div>
              <div className="absolute bottom-0 left-0 w-full h-px bg-gray-300"></div>
            </div>

            <ul className="divide-y divide-gray-200 w-full">
              {Array(5).fill(0).map((_, index) => {
                const key = `category-${index}`;
                return (
                  <li
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`flex justify-between items-center cursor-pointer px-2 py-3 transition-all duration-200 ${selectedCategory === key ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
                      }`}
                  >
                    <span className="text-gray-800 text-sm font-medium">Tin khuyến mãi</span>
                    <span className="text-gray-400 text-base font-bold">+</span>
                  </li>
                );
              })}
            </ul>
          </div>


          {/* Sản phẩm mới ra mắt */}
          <div className="mb-6">
            <h2 className="text-base font-bold mb-4 ">Các sản phẩm mới ra mắt</h2>
            {/* Thanh line */}
            <div className="relative mb-4 ">
              <div className="h-1 w-20 bg-orange-400"></div>
              <div className="absolute bottom-0 left-0 w-full h-px bg-gray-300"></div>
            </div>
            <div className="space-y-4 ">
              {featuredProducts.map((product) => (
                <div key={product.id} className="flex space-x-2 border-b pb-2">
                  <div className="flex-shrink-0">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      width={60}
                      height={60}
                      className="object-cover"
                    />
                  </div>
                  <div className="text-sm">
                    <a href="#" className="leading-tight block font-semibold text-black">{product.title}</a>
                    <a href="#" className="block text-xs text-gray-500 mt-1">25/04/2025</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Từ khóa */}
          <div>
            <h2 className="text-base font-bold mb-4 uppercase">TỪ KHÓA</h2>
            {/* Thanh line */}
            <div className="relative mb-4 ">
              <div className="h-1 w-20 bg-orange-400"></div>
              <div className="absolute bottom-0 left-0 w-full h-px bg-gray-300"></div>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Thể thao", "Xu hướng", "Trang trí", "Nam", "Nữ", "Giày thể thao", "Sport"].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="px-2 py-1 border border-gray-300 rounded text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </Sider>



        <Content className=" bg-white ">
          <div className="bg-white p-4 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-y-4 md:gap-x-6">
            <div>
              <Select defaultValue="bestseller" style={{ width: 150 }} className="mr-4">
                <Option value="bestseller">Bán chạy</Option>
                <Option value="newest">Mới nhất</Option>
                <Option value="price-asc">Giá tăng dần</Option>
                <Option value="price-desc">Giá giảm dần</Option>
              </Select>
            </div>

            <div className="flex gap-4">
              <Select defaultValue="size" style={{ width: 150 }} className="mr-4">
                <Option value="size">Kích thước</Option>
                <Option value="38">38</Option>
                <Option value="39">39</Option>
                <Option value="40">40</Option>
                <Option value="41">41</Option>
                <Option value="42">42</Option>
              </Select>

              <Select defaultValue="price" style={{ width: 150 }} className="mr-4">
                <Option value="price">Giá</Option>
                <Option value="0-100">0 - 100.000 VND</Option>
                <Option value="100-200">100.000 - 200.000 VND</Option>
                <Option value="200-300">200.000 - 300.000 VND</Option>
              </Select>

              <Select defaultValue="color" style={{ width: 150 }}>
                <Option value="color">Màu sắc</Option>
                <Option value="black">Đen</Option>
                <Option value="white">Trắng</Option>
                <Option value="blue">Xanh</Option>
                <Option value="red">Đỏ</Option>
                <Option value="pink">Hồng</Option>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white min-h-[400px] flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative w-full h-80 overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover rounded"
                  />
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.isNew && (
                      <span className="m-0 text-xs px-2 py-0.5 rounded-bl-md rounded-tr-md text-white font-bold bg-green-600">
                        MỚI
                      </span>
                    )}
                    {product.discount && (
                      <span className="m-0 text-xs px-2 py-0.5 rounded-bl-md rounded-tr-md text-white font-bold bg-red-500">
                        -{product.discount}%
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-sm font-medium mb-2 truncate">{product.name}</h3>
                  <p className="text-red-500 font-bold">{product.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
