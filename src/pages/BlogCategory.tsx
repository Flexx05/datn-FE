import { useState } from "react"
import { Layout, Pagination, Image } from "antd"
import blog1 from '../assets/image/Blog1.png'
import blog2 from '../assets/image/Blog2.png'
import blog3 from '../assets/image/Blog3.png'
import blog4 from '../assets/image/Blog4.png'
import blog5 from '../assets/image/Blog5.png'
import blog6 from '../assets/image/Blog6.png'
import blog7 from '../assets/image/Blog7.png'
import blog10 from '../assets/image/Blog10.png'
import blog11 from '../assets/image/Blog11.png'

import rectangle10 from '../assets/image/Rectangle 10.png'
import rectangle11 from '../assets/image/Rectangle 11.png'
import rectangle12 from '../assets/image/Rectangle 12.png'
import detailPrd05 from '../assets/image/detailPrd-05.png'
import detailPrd06 from '../assets/image/detailPrd-06.png'
const { Sider, Content } = Layout

export default function BlogCategory() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const blogs = [
    {
      id: 1,
      name: "Lorem ipsum dolor sit amet consectetuer adipiscing",
      description: "Lorem Ipsum is simply dummy text of the printing and typeset ting industry. Lorem Ipsum has been ..",
      image: blog1,

    },
    {
      id: 2,
      name: "Lorem ipsum dolor sit amet consectetuer adipiscing",
      description: "Lorem Ipsum is simply dummy text of the printing and typeset ting industry. Lorem Ipsum has been ..",
      image: blog2,

    },
    {
      id: 3,
      name: "Lorem ipsum dolor sit amet consectetuer adipiscing",
      description: "Lorem Ipsum is simply dummy text of the printing and typeset ting industry. Lorem Ipsum has been ..",
      image: blog3,

    },
    {
      id: 4,
      name: "Lorem ipsum dolor sit amet consectetuer adipiscing",
      description: "Lorem Ipsum is simply dummy text of the printing and typeset ting industry. Lorem Ipsum has been ..",
      image: blog4,

    },
    {
      id: 5,
      name: "Lorem ipsum dolor sit amet consectetuer adipiscing",
      description: "Lorem Ipsum is simply dummy text of the printing and typeset ting industry. Lorem Ipsum has been ..",
      image: blog5,

    },
    {
      id: 6,
      name: "Lorem ipsum dolor sit amet consectetuer adipiscing",
      description: "Lorem Ipsum is simply dummy text of the printing and typeset ting industry. Lorem Ipsum has been ..",
      image: blog6,

    },
    {
      id: 7,
      name: "Lorem ipsum dolor sit amet consectetuer adipiscing",
      description: "Lorem Ipsum is simply dummy text of the printing and typeset ting industry. Lorem Ipsum has been ..",
      image: blog7,

    },
    {
      id: 8,
      name: "Lorem ipsum dolor sit amet consectetuer adipiscing",
      description: "Lorem Ipsum is simply dummy text of the printing and typeset ting industry. Lorem Ipsum has been ..",
      image: detailPrd06,

    },
    {
      id: 9,
      name: "Lorem ipsum dolor sit amet consectetuer adipiscing",
      description: "Lorem Ipsum is simply dummy text of the printing and typeset ting industry. Lorem Ipsum has been ..",
      image: detailPrd05,

    },
    {
      id: 10,
      name: "Lorem ipsum dolor sit amet consectetuer adipiscing",
      description: "Lorem Ipsum is simply dummy text of the printing and typeset ting industry. Lorem Ipsum has been ..",
      image: blog10,

    },
    {
      id: 11,
      name: "Lorem ipsum dolor sit amet consectetuer adipiscing",
      description: "Lorem Ipsum is simply dummy text of the printing and typeset ting industry. Lorem Ipsum has been ..",
      image: blog11,

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
        {/* Thư mục */}
        <Sider width={250} className="bg-white p-4 lg:mr-8 mb-6 lg:mb-0" breakpoint="lg" collapsedWidth="0">
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



        {/* Danh sách bài viết */}
        <Content className=" bg-white ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div key={blog.id} className="bg-white min-h-[150px] flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative w-full h-64 overflow-hidden rounded">
                  <img
                    src={blog.image || "/placeholder.svg"}
                    alt={blog.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <a href="#" className="block">
                    <h3 className="text-xl font-bold mb-2 truncate">{blog.name}</h3>
                  </a>
                  <a href="#" className="block">
                    <p className="text-xs font-medium">{blog.description}</p>
                  </a>
                </div>

              </div>
            ))}
          </div>

          {/* Phân trang */}
          <div className="mt-8 flex justify-center">
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
