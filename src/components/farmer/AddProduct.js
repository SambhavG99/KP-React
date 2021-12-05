import React, { Component } from "react";
import { reduxForm, Field, formValues } from "redux-form";
import farmer_portal from "../../api/farmer_portal";
import { addProduct } from "../../actions";
import TextField from "../TextField";
import { connect } from "react-redux";
import FileInput from "../FileInput";

const units = [
  { _id: "kilogram", name: "Kilogram" },
  { _id: "quintal", name: "Quintal" },
  { _id: "tonne", name: "Tonne" },
  { _id: "gram", name: "Gram" },
];

class AddProduct extends Component {
  state = { categories: [] };
  componentDidMount() {
    const fetchCategories = async () => {
      const { data } = await farmer_portal.get("/category");
      this.setState({ categories: data });
    };

    fetchCategories();
  }
  renderDropDown = ({ data, label, input }) => {
    const renderedOptions = data.map((item) => {
      return (
        <option key={item._id} value={item._id}>
          {item.name}
        </option>
      );
    });

    return (
      <div className="field">
        <label htmlFor={label}>{label}</label>
        <select
          className="ui dropdown"
          onChange={input.onChange}
          value={input.value}
        >
          <option value="">Select {label}</option>
          {renderedOptions}
        </select>
      </div>
    );
  };

  onSubmit(formValues) {
    console.log(formValues);
    let data = new FormData();
    for (let field in formValues) {
      if (field === "images") data.append(field, formValues[field].file);
      data.append(field, formValues[field]);
    }
    this.props.addProduct(data);
  }

  renderLoader() {
    if (this.props.req_loading_status === "loading") {
      return (
        <div className="ui icon message">
          <i className="notched circle loading icon"></i>
          <div className="content">
            <div className="header">This might take some time...</div>
            <p>Adding your product</p>
          </div>
        </div>
      );
    }

    if (this.props.req_loading_status === "loaded") {
      return (
        <div className="ui success message transition hidden">
          <i className="close icon"></i>
          <div className="header">Your item has been successfully added.</div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="ui container">
        <h1>Add Product</h1>
        <form
          className="ui form error"
          method="POST"
          onSubmit={this.props.handleSubmit((formValues) =>
            this.onSubmit(formValues)
          )}
        >
          <Field
            component={FileInput}
            label="Upload Product Image(s)"
            name="images"
            type="file"
          />
          <Field component={TextField} label="Product Name" name="name" />
          <Field
            component={this.renderDropDown}
            label="Category"
            name="categoryId"
            data={this.state.categories}
          />
          <Field component={TextField} label="Quantity" name="quantity" />
          <Field
            component={this.renderDropDown}
            label="Unit of Quantity"
            name="unit"
            data={units}
          />
          <Field
            component={TextField}
            label="Price per Unit"
            name="price_per_unit"
          />
          <button className="ui primary button">Add Product</button>
          {this.renderLoader()}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return { req_loading_status: state.products.loading_status };
};

export default connect(mapStateToProps, { addProduct })(
  reduxForm({
    form: "addProduct",
  })(AddProduct)
);
