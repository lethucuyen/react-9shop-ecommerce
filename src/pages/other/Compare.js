import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { removeFromCompare } from "../../redux/actions/compareActions";
import { getDiscountPrice } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import Rating from "../../components/product/sub-components/ProductRating";

const Compare = ({
  location,
  cartItems,
  compareItems,
  addToCart,
  removeFromCompare,
  currency,
}) => {
  const { pathname } = location;
  const { addToast } = useToasts();

  return (
    <Fragment>
      <MetaTags>
        <title>9Shop | Compare</title>
        <meta
          name="description"
          content="Compare page of 9Shop react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Compare
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="compare-main-area pt-90 pb-100">
          <div className="container">
            {compareItems && compareItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-12">
                  <div className="compare-page-content">
                    <div className="compare-table table-responsive">
                      <table className="table table-bordered mb-0">
                        <tbody>
                          <tr>
                            <th className="title-column">Thông tin sản phẩm</th>
                            {compareItems.map((compareItem, key) => {
                              const cartItem = cartItems.filter(
                                (item) => item.id === compareItem.id
                              )[0];
                              return (
                                <td className="product-image-title" key={key}>
                                  <div className="compare-remove">
                                    <button
                                      onClick={() =>
                                        removeFromCompare(compareItem, addToast)
                                      }
                                    >
                                      <i className="pe-7s-trash" />
                                    </button>
                                  </div>
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/product/" +
                                      compareItem.id
                                    }
                                    className="image"
                                  >
                                    <img
                                      className="img-fluid"
                                      src={
                                        process.env.PUBLIC_URL +
                                        compareItem.image[0]
                                      }
                                      alt=""
                                    />
                                  </Link>
                                  <div className="product-title">
                                    <Link
                                      to={
                                        process.env.PUBLIC_URL +
                                        "/product/" +
                                        compareItem.id
                                      }
                                    >
                                      {compareItem.name}
                                    </Link>
                                  </div>
                                  <div className="compare-btn">
                                    {compareItem.affiliateLink ? (
                                      <a
                                        href={compareItem.affiliateLink}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                      >
                                        {" "}
                                        HÀNG SẮP VỀ{" "}
                                      </a>
                                    ) : compareItem.variation &&
                                      compareItem.variation.length >= 1 ? (
                                      <Link
                                        to={`${process.env.PUBLIC_URL}/product/${compareItem.id}`}
                                      >
                                        Lựa chọn
                                      </Link>
                                    ) : compareItem.stock &&
                                      compareItem.stock > 0 ? (
                                      <button
                                        onClick={() =>
                                          addToCart(compareItem, addToast)
                                        }
                                        className={
                                          cartItem !== undefined &&
                                          cartItem.quantity > 0
                                            ? "active"
                                            : ""
                                        }
                                        disabled={
                                          cartItem !== undefined &&
                                          cartItem.quantity > 0
                                        }
                                        title={
                                          compareItem !== undefined
                                            ? "Đã thêm vào giỏ"
                                            : "Thêm vào giỏ"
                                        }
                                      >
                                        {cartItem !== undefined &&
                                        cartItem.quantity > 0
                                          ? "Đã thêm vào giỏ"
                                          : "Thêm vào giỏ"}
                                      </button>
                                    ) : (
                                      <button disabled className="active">
                                        Hết hàng
                                      </button>
                                    )}
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                          <tr>
                            <th className="title-column">Giá tiền</th>
                            {compareItems.map((compareItem, key) => {
                              const discountedPrice = getDiscountPrice(
                                compareItem.price,
                                compareItem.discount
                              );
                              const finalProductPrice = (
                                compareItem.price * currency.currencyRate
                              ).toFixed(2);
                              const finalDiscountedPrice = (
                                discountedPrice * currency.currencyRate
                              ).toFixed(2);
                              return (
                                <td className="product-price" key={key}>
                                  {discountedPrice !== null ? (
                                    <Fragment>
                                      <span className="amount old">
                                        {parseInt(
                                          finalProductPrice,
                                          10
                                        ).toLocaleString() +
                                          currency.currencySymbol}
                                      </span>
                                      <span className="amount">
                                        {parseInt(
                                          finalDiscountedPrice,
                                          10
                                        ).toLocaleString() +
                                          currency.currencySymbol}
                                      </span>
                                    </Fragment>
                                  ) : (
                                    <span className="amount">
                                      {parseInt(
                                        finalProductPrice,
                                        10
                                      ).toLocaleString() +
                                        currency.currencySymbol}
                                    </span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>

                          <tr>
                            <th className="title-column">Mô tả</th>
                            {compareItems.map((compareItem, key) => {
                              return (
                                <td className="product-desc" key={key}>
                                  <p>
                                    {compareItem.shortDescription
                                      ? compareItem.shortDescription
                                      : "N/A"}
                                  </p>
                                </td>
                              );
                            })}
                          </tr>
                          <tr>
                            <th className="title-column">Chất liệu vải</th>
                            {compareItems.map((compareItem, key) => {
                              return (
                                <td className="product-desc" key={key}>
                                  <p style={{ fontSize: "14px" }}>
                                    {compareItem.material
                                      ? compareItem.material
                                      : "N/A"}
                                  </p>
                                </td>
                              );
                            })}
                          </tr>
                          <tr>
                            <th className="title-column">Size</th>
                            {compareItems.map((compareItem, key) => {
                              let listSize = [];
                              compareItem.variation.map((item, key1) => {
                                item.size.map((size) =>
                                  listSize.push(size.name)
                                );
                              });
                              console.log(listSize);
                              let uniq = [...new Set(listSize)];
                              console.log(uniq);
                              return (
                                <td className="product-desc" key={key}>
                                  <p style={{ fontSize: "14px" }}>
                                    {uniq.length > 0
                                      ? uniq.join(" - ").toUpperCase()
                                      : "N/A"}
                                  </p>
                                </td>
                              );
                            })}
                          </tr>
                          <tr>
                            <th className="title-column">Rating</th>
                            {compareItems.map((compareItem, key) => {
                              return (
                                <td className="product-rating" key={key}>
                                  <Rating ratingValue={compareItem.rating} />
                                </td>
                              );
                            })}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-shuffle"></i>
                    </div>
                    <div className="item-empty-area__text">
                      Không tìm thấy sản phẩm nào trong danh sách so sánh <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                        Thêm sản phẩm
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Compare.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
  removeFromCompare: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    compareItems: state.compareData,
    currency: state.currencyData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },

    removeFromCompare: (item, addToast) => {
      dispatch(removeFromCompare(item, addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Compare);
