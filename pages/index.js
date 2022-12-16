import { useState, useMemo } from 'react';
import Layout from '../components/Layout';
import fsPromises from 'fs/promises';
import path from 'path';
import ProductCard from '../components/ProductCard';

export default function Home(props) {
  let products = props.products;
  const [items, setItems] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [merchantFilter, setMerchantFilter] = useState([]);
  const [brandFilter, setBrandFilter] = useState([]);
  const [filterSort, setFilterSort] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 9;

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const itemsData = useMemo(() => {
    let computedItems = items;

    if (searchTerm) {
      computedItems = computedItems.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) +
          item.brand.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (merchantFilter.length > 0) {
      computedItems = computedItems.filter((item) =>
        merchantFilter.includes(item.topOffers[0].merchant.name)
      );
    }

    if (brandFilter.length > 0) {
      computedItems = computedItems.filter((item) =>
        brandFilter.includes(item.brand.name)
      );
    }

    if (filterSort === 'Min Price') {
      computedItems = [...computedItems].sort(
        (a, b) => a.topOffers[0].price - b.topOffers[0].price
      );
    } else if (filterSort === 'Max Price') {
      computedItems = [...computedItems].sort(
        (a, b) => b.topOffers[0].price - a.topOffers[0].price
      );
    }

    if (minPrice && maxPrice) {
      computedItems = computedItems.filter(
        (item) =>
          item.topOffers[0].price < maxPrice &&
          item.topOffers[0].price > minPrice
      );
    }

    setTotalItems(computedItems.length);

    return computedItems.slice(
      (currentPage - 1) * itemsPerPage,
      (currentPage - 1) * itemsPerPage + itemsPerPage
    );
  }, [
    items,
    currentPage,
    searchTerm,
    merchantFilter,
    brandFilter,
    filterSort,
    maxPrice,
    minPrice,
  ]);

  const handleMerchantFilter = (e) => {
    if (e.target.checked) {
      setMerchantFilter((current) => [...current, e.target.value]);
    } else {
      let array = [...merchantFilter];
      let index = array.indexOf(e.target.value);
      if (index !== -1) {
        array.splice(index, 1);
        setMerchantFilter(array);
      }
    }
  };

  const handleBrandFilter = (e) => {
    if (e.target.checked) {
      setBrandFilter((current) => [...current, e.target.value]);
    } else {
      let array = [...brandFilter];
      let index = array.indexOf(e.target.value);
      if (index !== -1) {
        array.splice(index, 1);
        setBrandFilter(array);
      }
    }
  };

  const handleMerchantBtn = (e) => {
    let array = [...merchantFilter];
    let index = array.indexOf(e.currentTarget.textContent);
    if (index !== -1) {
      array.splice(index, 1);
      setMerchantFilter(array);
    }
  };

  const handleBrandBtn = (e) => {
    let array = [...brandFilter];
    let index = array.indexOf(e.currentTarget.textContent);
    if (index !== -1) {
      array.splice(index, 1);
      setBrandFilter(array);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const resetFilter = () => {
    setSearchTerm('');
    setMerchantFilter([]);
    setBrandFilter([]);
    setCurrentPage(1);
    setFilterSort('');
    setMinPrice(0);
    setMaxPrice(0);
  };

  let merchantArray = products.map(function (item) {
    return item.topOffers[0].merchant.name;
  });
  merchantArray = merchantArray.filter(
    (val, i, self) => self.indexOf(val) === i
  );

  let brandArray = products.map(function (item) {
    return item.brand.name;
  });
  brandArray = brandArray.filter((val, i, self) => self.indexOf(val) === i);

  return (
    <Layout>
      <div className='container py-3'>
        <nav className='row border-bottom my-3'>
          <h2 className='col-md-4'>Cimri Study Case</h2>
          <div className='col-md-8'>
            <input
              type='text'
              className='form-control w-75'
              id='search'
              placeholder='Marka veya Ürün Ara'
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </nav>
        <div className='row'>
          <div className='col-md-4'>
            <div>
              <div className='my-3'>
                <label htmlFor='search' className='form-label'>
                  Satıcı Filtresi
                </label>
                <ul className='list-group'>
                  {merchantArray.map((merchant, i) => {
                    return (
                      <li key={i} className='list-group-item w-75'>
                        <input
                          onChange={(e) => {
                            handleMerchantFilter(e);
                            setCurrentPage(1);
                          }}
                          type='checkbox'
                          value={merchant}
                          className='form-check-input'
                          checked={merchantFilter.includes(`${merchant}`)}
                        />
                        <label className='px-2'>{merchant}</label>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className='mb-3'>
                <label htmlFor='search' className='form-label'>
                  Marka Filtresi
                </label>
                <ul className='list-group'>
                  {brandArray.map((brand, i) => {
                    return (
                      <li key={i} className='list-group-item w-75'>
                        <input
                          onChange={(e) => {
                            handleBrandFilter(e);
                            setCurrentPage(1);
                          }}
                          type='checkbox'
                          value={brand}
                          className='form-check-input'
                          checked={brandFilter.includes(`${brand}`)}
                        />
                        <label className='px-2'>{brand}</label>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <select
                  className='form-select w-75'
                  value={filterSort}
                  onChange={(e) => {
                    setFilterSort(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option defaultValue=''>Fiyata Göre Sırala</option>
                  <option value='Min Price'>En Düşük Fiyat</option>
                  <option value='Max Price'>En Yüksek Fiyat</option>
                </select>
              </div>
              <div className='my-3'>
                <label className='form-label'>Fiyat Aralığı</label>
                <input
                  type='number'
                  min='0'
                  className='form-control
                  w-50
                  my-2
                  '
                  value={minPrice}
                  placeholder='10'
                  onChange={(e) => {
                    setMinPrice(e.target.value);
                  }}
                ></input>
                <input
                  type='number'
                  min='0'
                  className='form-control w-50 my-2'
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(e.target.value);
                  }}
                ></input>
              </div>
              <div className='my-3'>
                <button
                  type='button'
                  className='btn btn-danger btn-sm'
                  onClick={resetFilter}
                >
                  Filtreleri Sıfırla
                </button>
              </div>
            </div>
          </div>
          <div className='col-md-8'>
            <div className='d-flex flex-row flex-nowrap overflow-scroll w-75'>
              {merchantFilter.length > 0
                ? merchantFilter.map((filter, i) => {
                    return (
                      <div key={i}>
                        <button
                          className='btn btn-primary m-2'
                          onClick={(e) => {
                            handleMerchantBtn(e);
                          }}
                        >
                          {filter}
                        </button>
                      </div>
                    );
                  })
                : null}
              {brandFilter.length > 0
                ? brandFilter.map((filter, i) => {
                    return (
                      <div key={i}>
                        <button
                          className='btn btn-secondary m-2'
                          onClick={(e) => {
                            handleBrandBtn(e);
                          }}
                        >
                          {filter}
                        </button>
                      </div>
                    );
                  })
                : null}
            </div>
            <div className='d-flex flex-wrap justify-content-start'>
              {itemsData.length > 0 ? (
                itemsData.map((product) => {
                  return (
                    <ProductCard
                      title={product.title}
                      image={product.imageUrl}
                      topofferprice={product.topOffers[0].price}
                      topsecondofferprice={product.topOffers[1].price}
                      topoffer={product.topOffers[0].merchant.name}
                      topsecondoffer={product.topOffers[1].merchant.name}
                      key={product.id}
                    ></ProductCard>
                  );
                })
              ) : (
                <h2>Ürün Bulunamadı</h2>
              )}
            </div>
          </div>
        </div>
      </div>
      <nav className='d-flex justify-content-center'>
        <ul className='pagination'>
          <li>
            {pageNumbers.length > 0 ? (
              <button
                onClick={() =>
                  currentPage !== 1 ? paginate(currentPage - 1) : null
                }
                className='page-link'
              >
                {'Önceki'}
              </button>
            ) : null}
          </li>
          {pageNumbers.map((number) => (
            <li key={number} className='page-item'>
              <button onClick={() => paginate(number)} className='page-link'>
                {number}
              </button>
            </li>
          ))}
          <li>
            {pageNumbers.length > 0 ? (
              <button
                onClick={() =>
                  currentPage !== pageNumbers.length
                    ? paginate(currentPage + 1)
                    : null
                }
                className='page-link'
              >
                {'Sonraki'}
              </button>
            ) : null}
          </li>
        </ul>
      </nav>
    </Layout>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data.json');
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);

  return {
    props: objectData,
  };
}
