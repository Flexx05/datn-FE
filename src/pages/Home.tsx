import React, { useState } from "react";
import { Carousel } from "antd";
import ImageSlide from "../assets/image/slideshow-1_1920x 1.jpg";
import thuml from "../assets/image/product-remove.png";
import { CaretRightOutlined } from "@ant-design/icons";
import rectangle1 from "../assets/image/product.svg";
import about from "../assets/image/about.png";
import image_1 from "../assets/image/footer-1.png";
import image_2 from "../assets/image/footer-2.png";
import image_3 from "../assets/image/footer-3.png";
import Marquee from "react-fast-marquee";

const Home: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | number | null>("1");

  const handleCheckboxChange = (id: string) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };
  const banner = [
    { name: "HAGAN CORE TF LIGHT TOURING", slogan: "SKI BOOT LINERS" },
    { name: "HAGAN CORE TF LIGHT TOURING", slogan: "SKI BOOT LINERS" },
  ];

  const productHot = [
    {
      name: "Giày Thể Thao Sneaker MULGATI HX483A",
      thuml: thuml,
      price: "10.000đ",
      priceSale: "4000đ",
    },
    {
      name: "Giày Thể Thao Sneaker MULGATI HX483A",
      thuml: thuml,
      price: "10.000đ",
      priceSale: "4000đ",
    },
    {
      name: "Giày Thể Thao Sneaker MULGATI HX483A",
      thuml: thuml,
      price: "10.000đ",
      priceSale: "4000đ",
    },
  ];

  const filterHome = [
    { title: "Bán chạy", id: "1" },
    { title: "Mới", id: "2" },
    { title: "Giảm giá", id: "3" },
  ];
  document.title = "Trang chủ";

  const checkboxStyle: React.CSSProperties = {
    width: "14px",
    height: "38px",
    borderRadius: "0",
    appearance: "none",
    border: "1px solid #999",
    position: "relative",
    cursor: "pointer",
  };

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
      image: rectangle1,
      isNew: true,
      discount: 40,
      color: "cyan",
    },
    {
      id: 3,
      name: "Giày Thể Thao Sneaker MULGATI HX482C",
      price: "100.000 VND",
      image: rectangle1,
      isNew: true,
      discount: 40,
      color: "pink",
    },
    {
      id: 4,
      name: "Giày Thể Thao Sneaker MULGATI HX482C",
      price: "100.000 VND",
      image: rectangle1,
      isNew: true,
      discount: 40,
      color: "blue",
    },
    {
      id: 5,
      name: "Giày Thể Thao Sneaker MULGATI HX482C",
      price: "100.000 VND",
      image: rectangle1,
      isNew: true,
      discount: 45,
      color: "purple",
    },
    {
      id: 6,
      name: "Giày Thể Thao Sneaker MULGATI HX482C",
      price: "100.000 VND",
      image: rectangle1,
      isNew: true,
      discount: 45,
      color: "white",
    },
    {
      id: 7,
      name: "Giày Thể Thao Sneaker MULGATI HX482C",
      price: "100.000 VND",
      image: rectangle1,
      isNew: true,
      discount: 45,
      color: "white",
    },
    {
      id: 8,
      name: "Giày Thể Thao Sneaker MULGATI HX482C",
      price: "100.000 VND",
      image: rectangle1,
      isNew: true,
      discount: 45,
      color: "purple",
    },
    {
      id: 8,
      name: "Giày Thể Thao Sneaker MULGATI HX482C",
      price: "100.000 VND",
      image: rectangle1,
      isNew: true,
      discount: 45,
      color: "purple",
    },
    {
      id: 8,
      name: "Giày Thể Thao Sneaker MULGATI HX482C",
      price: "100.000 VND",
      image: rectangle1,
      isNew: true,
      discount: 45,
      color: "purple",
    },
    {
      id: 8,
      name: "Giày Thể Thao Sneaker MULGATI HX482C",
      price: "100.000 VND",
      image: rectangle1,
      isNew: true,
      discount: 45,
      color: "purple",
    },
    {
      id: 8,
      name: "Giày Thể Thao Sneaker MULGATI HX482C",
      price: "100.000 VND",
      image: rectangle1,
      isNew: true,
      discount: 45,
      color: "purple",
    },
  ];
  const articles = [
    {
      id: 1,
      name: "Lorem ipsum dolor sit amet consectetuer adipiscing",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typeset ting industry. Lorem Ipsum has been the industry's standard dummy ndustry's standard.",
      image: rectangle1,
      date: 25,
      birth: "Tháng 1",
    },
    {
      id: 2,
      name: "Lorem ipsum dolor sit amet consectetuer adipiscing",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typeset ting industry. Lorem Ipsum has been the industry's standard dummy ndustry's standard.",
      image: rectangle1,
      date: 25,
      birth: "Tháng 1",
    },
    {
      id: 3,
      name: "Lorem ipsum dolor sit amet consectetuer adipiscing",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typeset ting industry. Lorem Ipsum has been the industry's standard dummy ndustry's standard.",
      image: rectangle1,
      date: 25,
      birth: "Tháng 1",
    },
  ];

  const marqImage = [
    {
      img: image_1,
    },
    {
      img: image_2,
    },
    {
      img: image_3,
    },
    {
      img: image_1,
    },
    {
      img: image_2,
    },
    {
      img: image_3,
    },
    {
      img: image_2,
    },
  ];
  return (
    <>
      <Carousel>
        {banner.map((item) => (
          <div className="banner-item">
            <img src={ImageSlide} />
            <div className="slogan">
              <p>{item.name}</p>
              <span>{item.slogan}</span>
            </div>
          </div>
        ))}
      </Carousel>
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4">
          {productHot.map((item) => (
            <div className="p-4">
              <div className="hot-product">
                <div className="hot-name">{item.name}</div>
                <div className="hot-price">
                  <del className="old-price">{item.price}</del>
                  <span className="new-price">{item.priceSale}</span>
                </div>
                <img src={item.thuml} alt="@item.Name" />
                <a href="">
                  Mua ngay <CaretRightOutlined />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="title-filter mb-4">
          {filterHome.map((item) => {
            const isChecked = selectedId === item.id;

            return (
              <div key={item.id} className="flex box-fil">
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  checked={isChecked}
                  onChange={() => handleCheckboxChange(item.id)}
                  id={`cbtest-${item.id}`}
                  style={checkboxStyle}
                />
                <div>
                  <small
                    style={{
                      marginLeft: "8px",
                      color: isChecked ? "black" : "#cdcdcd",
                    }}
                    className="block"
                  >
                    {item.title}
                  </small>
                  <label
                    className="block"
                    htmlFor={`cbtest-${item.id}`}
                    style={{
                      marginLeft: "8px",
                      color: isChecked ? "black" : "#cdcdcd",
                    }}
                  >
                    {item.title}
                  </label>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white min-h-[400px] flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative w-full h-full overflow-hidden">
                <img
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
                <h3 className="text-sm font-medium mb-2 truncate">
                  {product.name}
                </h3>
                <p className="text-red-500 font-bold">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="intro">
        <div className="container mx-auto h-full">
          <div className="grid grid-cols-12 h-full">
            <div className="col-span-4 relative h-full">
              <img src={about} alt="" className="intro-img" />
            </div>
            <div className="col-span-8 p-4">
              <div className="content-detail mb-4 text-white"></div>
              <a href="" className="see-more">
                Xem thêm
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <small
          style={{
            marginLeft: "8px",
            color: "#cdcdcd",
          }}
          className="block small-title"
        >
          Giày chạy
        </small>
        <label
          className="block big-title"
          style={{
            marginLeft: "8px",
            color: "black",
          }}
        >
          SHOES
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="cursor-pointer bg-white min-h-[400px] flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative w-full h-full overflow-hidden">
                <img
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
                <h3 className="text-sm font-medium mb-2 truncate">
                  {product.name}
                </h3>
                <p className="text-red-500 font-bold">{product.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* /Bai viet/ */}
        <small
          style={{
            marginLeft: "8px",
            color: "#cdcdcd",
          }}
          className="block small-title"
        >
          MỚI NHẤT
        </small>
        <label
          className="block big-title"
          style={{
            marginLeft: "8px",
            color: "black",
          }}
        >
          BÀI VIẾT
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-10">
          {articles.map((item) => (
            <a href="" className="article">
              <div className="caculate">
                <p>{item.date}</p>
                <span>{item.birth}</span>
              </div>
              <img src={item.image} alt="" />
              <div className="article-title">{item.name}</div>
              <div className="article-des">{item.description}</div>
            </a>
          ))}
        </div>
      </div>
      <Marquee>
        {marqImage.map((item , index) => (
          <img className="marquee-img"  key={index} src={item.img} alt="" />
        ))}
      </Marquee>
    </>
  );
};

export default Home;
