import { useState, useEffect } from 'react';
import Util from '../../../Utils';
import { NavLink } from 'react-router-dom';

export const Collection = () => {
  const [collections, setCollections] = useState([]);

  // 🔹 Sub-category wise group & count
  const getSubCategoryCollections = (products) => {
    const map = {};

    products.forEach((item) => {
      const subCatId = item.sub_sub_category_id;

      if (!map[subCatId]) {
        map[subCatId] = {
          id: subCatId,
          name: item.sub_sub_category_name,
          image: item.subsubcategory.image,
          count: 1,
        };
      } else {
        map[subCatId].count += 1;
      }
    });

    return Object.values(map);
  };

  // 🔹 API Call
  const GetCollections = async () => {
    try {
      const response = await Util.getdata('get_product');

      if (response?.data?.status === true && response.data.data.length > 0) {
        const groupedData = getSubCategoryCollections(response.data.data);
        setCollections(groupedData);
      }
    } catch (error) {
      console.log('Error fetching collections:', error);
    }
  };

  useEffect(() => {
    GetCollections();
  }, []);

  return (
    <>
      <Util.Component.Nav />

      {/* 🔹 Breadcrumb */}
      <section class="page-title-section">
        <div className="header-bg-overlay">
          <img src="images/breadcrumb.webp" alt="Products Banner" className="page-title-bg-image" />
          <div className="container position-absolute" style={{ top: '20%', left: '0', right: '0' }}>
            <div className="text-center">
              <h4 className="page-title">Collections</h4>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <NavLink to="/dashboard">Home</NavLink>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Collections
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Collection Section */}
      <section className="collection-section mt-5">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
            {collections.length > 0 ? (
              collections.map((item) => (
                <div className="col" key={item.id}>
                  <div className="collection-item">
                    <img src={item.image} alt={item.name} />

                    <div className="collection-details">
                      <h5 className="collection-title">{item.name}</h5>
                      <span className="collection-count">{item.count} Items</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No collections found</p>
            )}
          </div>
        </div>
      </section>

      <Util.Component.Footer />
    </>
  );
};
