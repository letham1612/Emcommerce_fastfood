import React, { useEffect, useState } from "react";
import "./Style.css";
import linesLogo from "../../assets/mobileLogo.png";

import { BsSearch } from "react-icons/bs";
import { Link as ScrollLink } from "react-scroll";
import Card1 from "./menuCards/card1/Card1";
import Card2 from "./menuCards/card2/Card2";
import { Button, Flex, Heading } from "@chakra-ui/react";
import MobSearch from "../../components/mobSearch/MobSearch";
import { TYPES_API, PRODUCTSBYTYPE_API } from '../../config/ApiConfig';


const Menu = ({ setPurchase, purchase }) => {
  const [combinedData, setCombinedData] = useState([]);
  const [rightNavClass, setRightNavClass] = useState("menu-childBox-left");

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchState, setSearchState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [menuTypes, setMenuTypes] = useState([]);
  const [productsByType, setProductsByType] = useState({});

  // Mobile Menu Search
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const fetchDataTypes = async () => {
    try {
      const response = await fetch(TYPES_API, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Lỗi khi gọi API');
      const data = await response.json();
      setMenuTypes(data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
    }
  };

  const fetchProductsByType = async (ID_Type) => {
    try {
      const response = await fetch(`${PRODUCTSBYTYPE_API}/${ID_Type}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Lỗi khi gọi API sản phẩm theo loại');
      const data = await response.json();
      
      data.forEach(product => {
          combinedData.push(product);
      });
      
      setProductsByType((prev) => ({ ...prev, [ID_Type]: data }));
    } catch (error) {
      console.error(`Lỗi khi lấy dữ liệu sản phẩm cho loại ${ID_Type}:`, error);
    }
  };

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    setLoading(true);
    setLoading(false);
    fetchDataTypes();

    // setCardData(menu  )
  }, []);

  useEffect(() => {
    menuTypes.forEach((type) => {
      if (!productsByType[type.ID_Type]) {
        fetchProductsByType(type.ID_Type);
      }
    });
  }, [menuTypes]);


  useEffect(() => {
    const handleScroll = () => {
      if (searchInput === "") {
        window.scrollY >= 70 && window.scrollY <= 19450
          ? setRightNavClass("menu-childBox-left-fixed")
          : setRightNavClass("menu-childBox-left");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [searchInput]);

  const debounce = (func, delay) => {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };
  const handleSearchInputChange = (event) => {
    const input = event.target.value;
    if (input !== "") {
      setSearchState(true);
    } else {
      setSearchState(false);
    }
    setSearchInput(input);
    debouncedSearch(input);
  };

  const search = (input) => { 
    const results = combinedData.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });

    setSearchResults(results);
  };

  const debouncedSearch = debounce(search, 300);

  return (
    <div className="menu-Body">
      <div className="menu-headerSection">
      ĐẶT MÓN DỄ DÀNG - TẬN HƯỞNG MỌI LÚC, MỌI NƠI ! 
        <button className="menu-headerSection-button">Đặt ngay </button>
      </div>
      <div className="menu-parentBox">
        <div className="menu-childBox">
          <div className="menu-childBox-left-wrapper">
            <div className={rightNavClass}>
              <img src={linesLogo} alt="" className="menu-linesLogo" />
              <Heading className="menu-linesText">MENU</Heading>

              <ul className="menu-childBox-left-ul">
                {
                  menuTypes.map((item, index) => (
                    <ScrollLink
                      key={index}
                      to={item.ID_Type}
                      spy={true}
                      smooth={true}
                      offset={-110}
                      duration={1000}
                      className="menu-childBox-left-links"
                    >
                      {item.Type_name}
                    </ScrollLink>
                  ))
                }
              </ul>
            </div>
          </div>
          <div className="menu-childBox-right">
            <div className="menu-mob-navbar">
              <div className="menu-searchIconBox" onClick={handleOpenDrawer}>
                <BsSearch size={20} />
              </div>
              <MobSearch
                isOpen={isDrawerOpen}
                onClose={handleCloseDrawer}
                searchInput={searchInput}
                handleSearchInputChange={handleSearchInputChange}
              />
              <ul className="menu-childBox-left-ul">
                {
                  menuTypes.map((item, index) => (
                    <ScrollLink
                      key={index}
                      to={item.ID_Type}
                      spy={true}
                      smooth={true}
                      offset={-110}
                      duration={1000}
                      className="menu-childBox-left-links"
                    >
                      {item.Type_name}
                    </ScrollLink>
                  ))
                }
              </ul>
            </div>
            <div className="menu-searchSection">
              <div className="menu-searchBox">
                <BsSearch size={20} />
                <input
                  type="search"
                  className="menu-search-input"
                  placeholder="Hôm nay ăn gì..."
                  value={searchInput}
                  onChange={handleSearchInputChange}
                />
              </div>
            </div>
            <div className="menu-menuCards-Section">
              {searchState ? (
                <div id="value-snackers" className="menu-grandChild">
                  <Flex gap={20}>
                    <Heading>
                      Kết quả tìm kiếm: {searchResults.length}{" "}
                    </Heading>
                    <Button
                      colorScheme="whatsapp"
                      onClick={() => {
                        setSearchInput("");
                        setSearchState(false);
                      }}
                    >
                      Thoát
                    </Button>
                  </Flex>
                  <div className="menu-childCards2">
                    <div className="menu-childCards-box2">
                      {searchResults?.map((card, index) => {
                        return (
                          <div className="value-snackers" key={index}>
                            <Card2
                              card={card}
                              setPurchase={setPurchase}
                              purchase={purchase}
                              loading={loading}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                 {
                    menuTypes.map((type) => (
                      <div key={type.ID_Type} id={type.ID_Type} className="menu-grandChild">
                        <Heading>{type.Type_name}</Heading>
                        <div className="menu-childCards">
                          <div className="menu-childCards-box">
                          {productsByType[type.ID_Type] && productsByType[type.ID_Type].map((product, index) => (
                          <div key={index} className="menu-product-item">    
                            {type.Type_name === 'Combo' ? (
                              <Card1
                                card={product}
                                setPurchase={setPurchase}
                                purchase={purchase}
                                loading={loading}
                              />
                            ) : (
                              <Card2
                                card={product}
                                setPurchase={setPurchase}
                                purchase={purchase}
                                loading={loading}
                              />
                            )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
