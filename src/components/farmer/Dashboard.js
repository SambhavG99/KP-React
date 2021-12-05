import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../actions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  renderProducts() {
    if (!this.props.products) {
      return <div>No products</div>;
    }
    return this.props.products.map((product) => {
      return (
        <div className="card" key={product._id}>
          <div className="content">
            <img
              className="right floated mini ui image"
              src="https://semantic-ui.com/images/avatar/large/elliot.jpg"
            />
            <div className="header">{product.name}</div>
            <div className="meta">{product.category.name}</div>
            <div className="description">
              Quantity : {product.quantity} {product.unit}
            </div>
            <div className="description">
              Price Per Unit: {product.price_per_unit}
            </div>
          </div>
          <div className="extra content">
            <div className="ui two buttons">
              <div className="ui basic green button">EDIT</div>
              <Link to={`/farmer/deleteproduct/${product._id}`} className="ui basic red button">DELETE</Link>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div class="ui container">
        <h2> Dashboard </h2>
        <div class="ui section divider"></div>
        <Link to="/farmer/addproduct" className="ui button secondary">
          Add Product
        </Link>
        <h4 class="ui horizontal divider header">
          <i class="tag icon"></i>
          Your Products
        </h4>
        <div class="ui container cards centered">{this.renderProducts()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { products: Object.values(state.products) };
};
export default connect(mapStateToProps, { fetchProducts })(Dashboard);
