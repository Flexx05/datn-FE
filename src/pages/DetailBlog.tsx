import { Image, Layout } from "antd"
import { useState } from "react"
import blog10 from '../assets/image/Blog10.png'
import blog11 from '../assets/image/Blog11.png'
import blog6 from '../assets/image/Blog6.png'

import detailPrd05 from '../assets/image/detailPrd-05.png'
import detailPrd06 from '../assets/image/detailPrd-06.png'

import { CalendarOutlined, LinkOutlined, MessageOutlined } from "@ant-design/icons"
import rectangle12 from '../assets/image/Rectangle 12.png'
const { Sider, Content } = Layout

export default function DetailBlog() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const blogs = [
    {
      id: 1,
      name: "Lorem ipsum dolor sit amet consectetuer adipiscing",
      description: "Lorem Ipsum is simply dummy text of the printing and typeset ting industry. Lorem Ipsum has been ..",
      image: blog6,
    }
  ]
  const featuredProducts = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet consectetur adipiscing",
      image: detailPrd05,
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet consectetur adipiscing",
      image: detailPrd06,
    },
    {
      id: 3,
      title: "Lorem ipsum dolor sit amet consectetur adipiscing",
      image: rectangle12,
    },
  ]

  return (
    <Layout className="min-h-screen bg-white px-4 md:px-8 lg:px-11 py-6 font-roboto">
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
        <Content className="bg-white">
          <div className="max-w-5xl mx-auto">
            {/* Hình to và text giới thiệu */}
            {blogs.map((blog) => (
              <div key={blog.id} className="flex flex-col">
                <div className="w-full h-auto">
                  <Image
                    src={blogs[0].image || "/placeholder.svg"}
                    alt={blogs[0].name}
                    preview={false}
                    className="w-full object-cover rounded"
                  />
                </div>

                <div className="p-4">
                  <a href="">
                    <h1 className="text-2xl font-bold mb-4">{blog.name}</h1>
                  </a>
                  <p className="text-gray-700 mb-4">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since. Ut enim ad minim veniam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut iaculis arcu. Proin tincidunt, ipsum nec vehicula euismod, neque nibh pretium lorem, at ornare risus sem et risus. Curabitur pulvinar dui viverra libero lobortis in dictum velit luctus.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam libero lobortis in dictum velit luctus. Donec imperdiet tincidunt interdum.
                  </p>
                  <p className="text-black font-semibold mb-2">Here, we bring you a look-see:</p>
                  <p className="text-gray-700 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam libero lobortis in dictum velit luctus.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut iaculis arcu. Proin tincidunt, ipsum nec vehicula euismod, neque nibh pretium lorem, at ornare risus sem et risus. Curabitur pulvinar dui viverra libero lobortis in dictum velit luctus. Donec imperdiet tincidunt interdum.
                  </p>
                </div>
              </div>
            ))}

            {/* Phần ảnh 2 đôi giày */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              <Image src={blog10} alt="Image 1" preview={false} className="w-full h-72 object-cover rounded" />
              <Image src={blog11} alt="Image 2" preview={false} className="w-full h-72 object-cover rounded" />
            </div>

            {/* Nội dung mô tả */}
            <div className="px-4">
              <p className="text-gray-700 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut iaculis arcu. Proin tincidunt, ipsum nec vehicula euismod, neque nibh pretium lorem, at ornare risus sem et risus. Curabitur pulvinar dui viverra libero lobortis in dictum velit luctus. Donec imperdiet tincidunt interdum.
              </p>
              <p className="text-gray-700 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut iaculis arcu. Proin tincidunt, ipsum nec vehicula euismod neque.
              </p>
            </div>

            {/* Ngày đăng, bình luận, chia sẻ */}
            <div className="flex flex-wrap items-center justify-between border-t pt-4 px-4 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <CalendarOutlined />
                  25/04/2025
                </span>
                <span className="flex items-center gap-1">
                  <MessageOutlined />
                  0 BÌNH LUẬN
                </span>
              </div>
              <div className="flex items-center gap-1 cursor-pointer hover:text-black">
                <LinkOutlined />
                <span>Chia sẻ</span>
              </div>
            </div>
            <div className="border-t mt-3"></div>

            {/* Bài đăng tương tự */}
            <div className="p-4 mt-8">
              <h2 className="text-2xl font-bold mb-6">Bài đăng tương tự</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[featuredProducts[1], featuredProducts[2]].map((product) => (
                  <div key={product.id} className="">
                    <div className="w-full h-[200px]">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <a href="">
                        <h3 className="text-sm font-bold mb-2">{product.title}</h3>
                      </a>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been ..
                      </p>
                    </div>
                  </div>
                ))}
                {/* Ô trống để đủ 3 ô */}
                <div className="hidden md:block" />
              </div>
            </div>

            {/* Form bình luận */}
            <div className="p-4 mt-8">
              <h2 className="text-xl font-bold mb-4">Để lại bình luận</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input type="text" placeholder="Tên của bạn (*)" className="border p-2 w-full rounded" />
                <input type="email" placeholder="Email của bạn (*)" className="border p-2 w-full rounded" />
                <input type="text" placeholder="Điện thoại (*)" className="border p-2 w-full rounded" />
              </div>
              <textarea placeholder="Ghi lời bình luận" className="border p-2 w-full rounded h-40 mb-4"></textarea>
              <button className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-6 py-2 rounded">
                Gửi bình luận
              </button>
            </div>
          </div>
        </Content>
    </Layout>
  )
}
