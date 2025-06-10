import { useQuery } from '@tanstack/react-query';
import { FilterOutlined, SearchOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { Layout, Pagination, Select, Spin, Input, Drawer } from "antd";
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IBrand, ICategory } from '../interface/category.interface';
import { IProduct } from '../interface/product.interface';
import { brandService } from '../services/brand.service';
import { categoryService } from '../services/category.service';
import { productService } from '../services/product.service';

const { Sider, Content } = Layout;
const { Option } = Select;

export default function ProductCategory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Lấy slug từ URL
  const selectedCategorySlug = searchParams.get('category') || 'all';
  const selectedBrandSlug = searchParams.get('brand') || 'all';

  // UI states
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [subCategories, setSubCategories] = useState<{ [key: string]: ICategory[] }>({});

  // Query data
  const { data: productsData, isLoading: isLoadingProducts } = useQuery<{ docs: IProduct[] }>({
    queryKey: ['products'],
    queryFn: productService.getAllProducts
  });
  const { data: brandData, isLoading: isLoadingBrand } = useQuery<IBrand[]>({
    queryKey: ['brands'],
    queryFn: brandService.getAllBrands
  });
  const { data: categoriesData, isLoading: isLoadingCategories } = useQuery<ICategory[]>({
    queryKey: ['categories'],
    queryFn: categoryService.getAllCategories
  });
  const { data: newProductsData } = useQuery<{ docs: IProduct[] }>({
    queryKey: ['products', 'new'],
    queryFn: productService.getAllProducts
  });

  
  // Helper: slug <-> id
  const getIdFromSlug = (slug: string, type: 'brand' | 'category'): string => {
    if (slug === 'all') return 'all';
    if (type === 'brand') {
      return brandData?.find(b => b.slug === slug)?._id?.toString() || 'all';
    }
    // category
    const cat = categoriesData?.find(c => c.slug === slug);
    if (cat) return cat._id.toString();
    for (const arr of Object.values(subCategories)) {
      const sub = arr.find(sc => sc.slug === slug);
      if (sub) return sub._id.toString();
    }
    return 'all';
  };
  const getSlugFromId = (id: string, type: 'brand' | 'category'): string => {
    if (id === 'all') return 'all';
    if (type === 'brand') {
      return brandData?.find(b => b._id === id)?.slug || 'all';
    }
    // category
    const cat = categoriesData?.find(c => c._id === id);
    if (cat) return cat.slug;
    for (const arr of Object.values(subCategories)) {
      const sub = arr.find(sc => sc._id === id);
      if (sub) return sub.slug;
    }
    return 'all';
  };

  // Lấy id thực tế để filter
  const selectedCategoryId = getIdFromSlug(selectedCategorySlug, 'category');
  const selectedBrandId = getIdFromSlug(selectedBrandSlug, 'brand');

  // Cập nhật URL khi chọn filter
  const updateUrlParams = (newCategoryId?: string, newBrandId?: string) => {
    const params = new URLSearchParams(searchParams);
    if (newCategoryId !== undefined) {
      const slug = getSlugFromId(newCategoryId, 'category');
      slug === 'all' ? params.delete('category') : params.set('category', slug);
    }
    if (newBrandId !== undefined) {
      const slug = getSlugFromId(newBrandId, 'brand');
      slug === 'all' ? params.delete('brand') : params.set('brand', slug);
    }
    setSearchParams(params);
  };

  // Xử lý chọn filter
  const handleCategorySelect = (categoryId: string) => updateUrlParams(categoryId, undefined);
  const handleBrandSelect = (brandId: string) => updateUrlParams(undefined, brandId);

  // Tự động mở accordion nếu có filter
  useEffect(() => {
    if (selectedCategorySlug !== 'all') setShowAllCategories(true);
    if (selectedBrandSlug !== 'all') setShowAllBrands(true);
  }, [selectedCategorySlug, selectedBrandSlug]);

  // Lọc sản phẩm
  const filteredProducts = useMemo(() => {
    if (!productsData?.docs) return [];
    return productsData.docs.filter(product => {
      const matchCat = selectedCategoryId === 'all' || product.categoryId === selectedCategoryId;
      const matchBrand = selectedBrandId === 'all' || product.brandId === selectedBrandId;
      const matchSearch = !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchBrand && matchSearch;
    });
  }, [productsData?.docs, selectedCategoryId, selectedBrandId, searchQuery]);

  // Sản phẩm mới
  const featuredProducts = useMemo(() => {
    if (!newProductsData?.docs) return [];
    return newProductsData.docs
      .filter(product => product.isActive)
      .slice(0, 3)
      .map(product => ({
        id: product._id,
        slug: product.slug,
        title: product.name,
        image: product.image[0],
        price: product.variation?.[0]?.salePrice
      }));
  }, [newProductsData?.docs]);

  // Lấy subcategory khi expand
  const handleExpandCategory = async (parentId: string) => {
    if (expandedCategory === parentId) {
      setExpandedCategory(null);
      return;
    }
    setExpandedCategory(parentId);
    if (!subCategories[parentId]) {
      const subs = await categoryService.getAllSubCategory(parentId);
      setSubCategories(prev => ({ ...prev, [parentId]: subs }));
    }
  };

  // Hiển thị tên filter
  const getSelectedBrandName = () => {
    if (selectedBrandId === 'all') return 'Tất cả';
    return brandData?.find(b => b._id === selectedBrandId)?.name || 'Tất cả';
  };
  const getSelectedCategoryName = () => {
    if (selectedCategoryId === 'all') return 'Tất cả';
    const cat = categoriesData?.find(c => c._id === selectedCategoryId);
    if (cat) return cat.name;
    for (const arr of Object.values(subCategories)) {
      const sub = arr.find(sc => sc._id === selectedCategoryId);
      if (sub) return sub.name;
    }
    return 'Tất cả';
  };

  // Render sản phẩm
  const renderProducts = () => {
    if (isLoadingProducts) return <Spin size="large" className="col-span-full" />;
    if (filteredProducts.length === 0) {
      return <div className="col-span-full text-center text-gray-500 py-8">Không có sản phẩm nào phù hợp với bộ lọc</div>;
    }
    return filteredProducts.map((product: IProduct) => (
      <div
        key={product._id}
        className="bg-white min-h-[400px] flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => navigate(`/products/${product.slug}`)}
      >
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={product.image[0] || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover rounded"
          />
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isActive && (
              <span className="m-0 text-xs px-2 py-0.5 rounded-bl-md rounded-tr-md text-white font-bold bg-green-600">
                MỚI
              </span>
            )}
            {product.variation && product.variation[0]?.salePrice < product.variation[0]?.regularPrice && (
              <span className="m-0 text-xs px-2 py-0.5 rounded-bl-md rounded-tr-md text-white font-bold bg-red-500">
                -{Math.round((1 - product.variation[0].salePrice / product.variation[0].regularPrice) * 100)}%
              </span>
            )}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-sm font-medium mb-2 truncate">{product.name}</h3>
          <div className="flex justify-between items-center">
            <span className="text-red-500 font-bold">
              {product.variation && product.variation[0]?.salePrice.toLocaleString('vi-VN')}đ
            </span>
            <span className="text-gray-400 line-through">
              {product.variation && product.variation[0]?.regularPrice.toLocaleString('vi-VN')}đ
            </span>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <Layout className="min-h-screen bg-white px-3 md:px-8 lg:px-11 py-6 font-roboto">
      {/* Sider */}
      <Sider width={250} className="bg-white p-4 lg:mr-8 mb-6 lg:mb-0" breakpoint="lg" collapsedWidth="0">
        {/* Thương hiệu */}
        <div className="mb-6 bg-gray-100 relative p-5">
          <h2 className="text-base font-bold uppercase">THƯƠNG HIỆU</h2>
          <div className="relative mb-4">
            <div className="h-1 w-20 bg-orange-400"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gray-300"></div>
          </div>
          <ul className="divide-y divide-gray-200 w-full">
            <li
              onClick={() => {
                handleBrandSelect('all');
                setShowAllBrands(!showAllBrands);
              }}
              className={`flex justify-between items-center cursor-pointer px-2 py-2 transition-all duration-200 
                ${selectedBrandId === 'all' ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"}`}
            >
              <span className="text-gray-600 text-sm font-medium">Tất cả</span>
              <span className="text-gray-400 text-base font-bold">
                {showAllBrands ? <UpOutlined style={{ fontSize: '12px' }} /> : <DownOutlined style={{ fontSize: '12px' }} />}
              </span>
            </li>
            {isLoadingBrand ? (
              <li className="px-2 py-3 text-gray-500">Đang tải...</li>
            ) : (
              showAllBrands && brandData?.map((brand: any) => (
                <li
                  key={brand._id}
                  onClick={() => handleBrandSelect(brand._id)}
                  className={`flex justify-between items-center cursor-pointer px-2 py-2 transition-all duration-200 
                    ${selectedBrandId === brand._id ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"}`}
                >
                  <span className="text-gray-800 text-sm font-medium">{brand.name}</span>
                </li>
              ))
            )}
          </ul>
        </div>
        {/* Danh mục */}
        <div className="mb-6 bg-gray-100 relative p-5">
          <h2 className="text-base font-bold uppercase">DANH MỤC</h2>
          <div className="relative mb-4">
            <div className="h-1 w-20 bg-orange-400"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gray-300"></div>
          </div>
          <ul className="divide-y divide-gray-200 w-full">
            <li
              onClick={() => {
                handleCategorySelect('all');
                setShowAllCategories(!showAllCategories);
                setExpandedCategory(null);
              }}
              className={`flex justify-between items-center cursor-pointer px-2 py-2 transition-all duration-200 
                ${selectedCategoryId === 'all' ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"}`}
            >
              <span className="text-gray-800 text-sm font-medium">Tất cả</span>
              <span className="text-gray-400 text-base font-bold">
                {showAllCategories ? <UpOutlined style={{ fontSize: '12px' }} /> : <DownOutlined style={{ fontSize: '12px' }} />}
              </span>
            </li>
            {isLoadingCategories ? (
              <li className="px-2 py-3 text-gray-500">Đang tải...</li>
            ) : (
              showAllCategories && categoriesData?.map((cat: any) => {
                const hasSubCategories = cat.subCategories?.length > 0;
                return (
                  <React.Fragment key={cat._id}>
                    <li
                      onClick={() => {
                        if (hasSubCategories) {
                          handleExpandCategory(cat._id);
                        } else {
                          handleCategorySelect(cat._id);
                        }
                      }}
                      className={`flex justify-between items-center cursor-pointer px-2 py-2 transition-all duration-200 
                        ${selectedCategoryId === cat._id ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"}`}
                    >
                      <span className="text-gray-800 text-sm font-medium">{cat.name}</span>
                      {hasSubCategories && (
                        <span className="text-gray-400 text-base font-bold">
                          {expandedCategory === cat._id ?
                            <UpOutlined style={{ fontSize: '12px' }} /> :
                            <DownOutlined style={{ fontSize: '12px' }} />
                          }
                        </span>
                      )}
                    </li>
                    {hasSubCategories && expandedCategory === cat._id && Array.isArray(subCategories[cat._id]) && (
                      <ul className="pl-6 bg-gray-50">
                        {subCategories[cat._id].map((subCat: any) => (
                          <li
                            key={subCat._id}
                            onClick={() => handleCategorySelect(subCat._id)}
                            className={`flex items-center cursor-pointer px-2 py-2 transition-all duration-200 
                              ${selectedCategoryId === subCat._id ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"}`}
                          >
                            <span className="text-left text-gray-600 text-sm">{subCat.name}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </ul>
        </div>
        {/* Sản phẩm mới ra mắt */}
        <div className="mb-6 bg-gray-100 relative p-5">
          <h2 className="text-base font-bold mb-4">Các sản phẩm mới ra mắt</h2>
          <div className="relative mb-4">
            <div className="h-1 w-20 bg-orange-400"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gray-300"></div>
          </div>
          <div className="space-y-4">
            {featuredProducts.length === 0 ? (
              <div className="text-gray-500 text-sm text-center py-2">
                Chưa có sản phẩm mới
              </div>
            ) : (
              featuredProducts.map((product: any) => (
                <div
                  key={product.id}
                  className="flex space-x-3 border-b pb-3 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => navigate(`/products/${product.slug}`)}
                >
                  <div className="flex-shrink-0 w-16 h-16 overflow-hidden rounded">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {product.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-red-500">
                      {product.price?.toLocaleString('vi-VN')}đ
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Sider>
      {/* Content */}
      <Content className="bg-white">
        <div className="bg-white p-4 mb-6 space-y-4">
          {/* Hiển thị bộ lọc hiện tại */}
          <div className="flex flex-wrap gap-2 items-center mb-4">
            <span className="text-sm font-medium text-gray-600">Đang lọc:</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              Danh mục: {getSelectedCategoryName()}
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              Thương hiệu: {getSelectedBrandName()}
            </span>
            {(selectedCategoryId !== 'all' || selectedBrandId !== 'all') && (
              <button
                onClick={() => updateUrlParams('all', 'all')}
                className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm hover:bg-red-200 transition-colors"
              >
                Xóa tất cả bộ lọc
              </button>
            )}
          </div>
          {/* Search and Filter header */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <Input
                placeholder="Tìm kiếm sản phẩm..."
                prefix={<SearchOutlined className="text-gray-400" />}
                className="w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                allowClear
              />
            </div>
            <button
              onClick={() => setIsFilterVisible(true)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FilterOutlined />
              <span>Bộ lọc</span>
            </button>
          </div>
        </div>
        {/* Filter Drawer */}
        <Drawer
          title="Bộ lọc sản phẩm"
          placement="right"
          onClose={() => setIsFilterVisible(false)}
          open={isFilterVisible}
          width={300}
        >
          <div className="space-y-6">
            {/* Sắp xếp */}
            <div>
              <h3 className="text-sm font-medium mb-2">Sắp xếp theo</h3>
              <Select defaultValue="bestseller" style={{ width: '100%' }}>
                <Option value="bestseller">Bán chạy</Option>
                <Option value="newest">Mới nhất</Option>
                <Option value="price-asc">Giá tăng dần</Option>
                <Option value="price-desc">Giá giảm dần</Option>
              </Select>
            </div>
            {/* Kích thước */}
            <div>
              <h3 className="text-sm font-medium mb-2">Kích thước</h3>
              <Select mode="multiple" style={{ width: '100%' }} placeholder="Chọn kích thước">
                {['38', '39', '40', '41', '42'].map(size => (
                  <Option key={size} value={size}>{size}</Option>
                ))}
              </Select>
            </div>
            {/* Giá */}
            <div>
              <h3 className="text-sm font-medium mb-2">Khoảng giá</h3>
              <Select style={{ width: '100%' }}>
                <Option value="price">Tất cả</Option>
                <Option value="0-100">0 - 100.000 VND</Option>
                <Option value="100-200">100.000 - 200.000 VND</Option>
                <Option value="200-300">200.000 - 300.000 VND</Option>
              </Select>
            </div>
            {/* Màu sắc */}
            <div>
              <h3 className="text-sm font-medium mb-2">Màu sắc</h3>
              <Select mode="multiple" style={{ width: '100%' }} placeholder="Chọn màu sắc">
                <Option value="black">Đen</Option>
                <Option value="white">Trắng</Option>
                <Option value="blue">Xanh</Option>
                <Option value="red">Đỏ</Option>
                <Option value="pink">Hồng</Option>
              </Select>
            </div>
            {/* Filter actions */}
            <div className="flex gap-2 pt-4">
              <button
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => setIsFilterVisible(false)}
              >
                Áp dụng
              </button>
              <button
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => {
                  updateUrlParams('all', 'all');
                  setIsFilterVisible(false);
                }}
              >
                Đặt lại
              </button>
            </div>
          </div>
        </Drawer>
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {renderProducts()}
        </div>
        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <Pagination defaultCurrent={1} total={filteredProducts.length} />
        </div>
      </Content>
    </Layout>
  );
}