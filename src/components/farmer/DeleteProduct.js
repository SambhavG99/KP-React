import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteProduct, fetchProduct } from "../../actions";
import history from "../../history";
import Modal from "../Modal";

class DeleteProduct extends Component {
  componentDidMount(){
    this.props.fetchProduct(this.props.match.params.id);
  }
  renderActions(){
      return (
        <React.Fragment>
            <button onClick={() => this.props.deleteProduct(this.props.match.params.id)} className="ui button negative">Delete Product</button>
        </React.Fragment>
      );
  }

  renderContent(){
    if(!this.props.product)
      return "Are you sure you want to delete this product ?";
    
    return `Are you sure you want to delete ${this.props.product.name} ?`
  }

  render() {
    return (
      <div>
        Delete product
        <Modal
          onDismiss={() => history.push("/farmer/dashboard")}
          title="Delete Product"
          content={this.renderContent()}
          actions={this.renderActions()}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {product: state.products[ownProps.match.params.id]};
}

export default connect(mapStateToProps,{deleteProduct, fetchProduct})(DeleteProduct);
