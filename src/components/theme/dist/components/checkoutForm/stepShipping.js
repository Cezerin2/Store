import React from "react";
import { Field, reduxForm } from "redux-form";
import { themeSettings, text } from "../../lib/settings";
import InputField from "./inputField";
import TextareaField from "./textareaField";

const validateRequired = value => value && value.length > 0 ? undefined : text.required;

const getFieldLabelByKey = key => {
  switch (key) {
    case "full_name":
      if (typeof text.fullName !== "undefined" && text.fullName != null) return text.fullName;
      return "";

    case "address1":
      if (typeof text.address1 !== "undefined" && text.address1 != null) return text.address1;
      return "";

    case "address2":
      if (typeof text.address2 !== "undefined" && text.address2 != null) return text.address2;
      return "";

    case "postal_code":
      if (typeof text.postal_code !== "undefined" && text.postal_code != null) return text.postal_code;
      return "";

    case "phone":
      if (typeof text.phone !== "undefined" && text.phone != null) return text.phone;
      return "";

    case "mobile":
      if (typeof text.mobile !== "undefined" && text.mobile != null) return text.mobile;
      return "";

    case "company":
      if (typeof text.company !== "undefined" && text.company != null) return text.company;
      return "";

    default:
      return "";
  }
};

const getFieldLabel = field => {
  const label = field.label && field.label.length > 0 ? field.label : getFieldLabelByKey(field.key);
  return field.required === true ? label : `${label} (${text.optional})`;
};

class CheckoutStepShipping extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeBillingAsShipping = event => {
      this.setState({
        billingAsShipping: event.target.checked
      });
    };

    this.state = {
      billingAsShipping: true
    };
  }

  render() {
    const {
      handleSubmit,
      pristine,
      invalid,
      valid,
      reset,
      submitting,
      processingCheckout,
      initialValues,
      shippingMethod,
      checkoutFields,
      settings,
      inputClassName,
      buttonClassName,
      editButtonClassName,
      title,
      show,
      isReadOnly,
      showPaymentForm,
      onEdit
    } = this.props;
    const hideBillingAddress = settings.hide_billing_address === true;
    const commentsField = checkoutFields.find(f => f.name === "comments");
    const commentsFieldPlaceholder = commentsField && commentsField.placeholder && commentsField.placeholder.length > 0 ? commentsField.placeholder : "";
    const commentsFieldLabel = commentsField && commentsField.label && commentsField.label.length > 0 ? commentsField.label : text.comments;
    const commentsFieldStatus = commentsField && commentsField.status.length > 0 ? commentsField.status : null;
    const commentsValidate = commentsFieldStatus === "required" ? validateRequired : null;
    const hideCommentsField = commentsFieldStatus === "hidden";

    if (!show) {
      return /*#__PURE__*/React.createElement("div", {
        className: "checkout-step"
      }, /*#__PURE__*/React.createElement("h1", null, /*#__PURE__*/React.createElement("span", null, "2"), title));
    }

    if (isReadOnly) {
      let shippingFields = null;

      if (shippingMethod && shippingMethod.fields && shippingMethod.fields.length > 0) {
        shippingFields = shippingMethod.fields.map((field, index) => {
          const fieldLabel = getFieldLabel(field);
          const fieldValue = initialValues.shipping_address[field.key];
          return /*#__PURE__*/React.createElement("div", {
            key: index,
            className: "checkout-field-preview"
          }, /*#__PURE__*/React.createElement("div", {
            className: "name"
          }, fieldLabel), /*#__PURE__*/React.createElement("div", {
            className: "value"
          }, fieldValue));
        });
      }

      return /*#__PURE__*/React.createElement("div", {
        className: "checkout-step"
      }, /*#__PURE__*/React.createElement("h1", null, /*#__PURE__*/React.createElement("span", null, "2"), title), shippingFields, !hideCommentsField && initialValues.comments !== "" && /*#__PURE__*/React.createElement("div", {
        className: "checkout-field-preview"
      }, /*#__PURE__*/React.createElement("div", {
        className: "name"
      }, commentsFieldLabel), /*#__PURE__*/React.createElement("div", {
        className: "value"
      }, initialValues.comments)), /*#__PURE__*/React.createElement("div", {
        className: "checkout-button-wrap"
      }, /*#__PURE__*/React.createElement("button", {
        type: "button",
        onClick: onEdit,
        className: editButtonClassName
      }, text.edit)));
    }

    let shippingFields = null;

    if (shippingMethod && shippingMethod.fields && shippingMethod.fields.length > 0) {
      shippingFields = shippingMethod.fields.map((field, index) => {
        const fieldLabel = getFieldLabel(field);
        const fieldId = `shipping_address.${field.key}`;
        const fieldClassName = `${inputClassName} shipping-${field.key}`;
        const validate = field.required === true ? validateRequired : null;
        return /*#__PURE__*/React.createElement(Field, {
          key: index,
          className: fieldClassName,
          name: fieldId,
          id: fieldId,
          component: InputField,
          type: "text",
          label: fieldLabel,
          validate: validate
        });
      });
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "checkout-step"
    }, /*#__PURE__*/React.createElement("h1", null, /*#__PURE__*/React.createElement("span", null, "2"), title), /*#__PURE__*/React.createElement("form", {
      onSubmit: handleSubmit
    }, shippingFields, !hideCommentsField && /*#__PURE__*/React.createElement(Field, {
      className: `${inputClassName} shipping-comments`,
      name: "comments",
      id: "customer.comments",
      component: TextareaField,
      type: "text",
      label: commentsFieldLabel,
      placeholder: commentsFieldPlaceholder,
      validate: commentsValidate,
      rows: "3"
    }), !hideBillingAddress && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, text.billingAddress), /*#__PURE__*/React.createElement("div", {
      className: "billing-as-shipping"
    }, /*#__PURE__*/React.createElement("input", {
      id: "billingAsShipping",
      type: "checkbox",
      onChange: this.onChangeBillingAsShipping,
      checked: this.state.billingAsShipping
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "billingAsShipping"
    }, text.sameAsShipping)), !this.state.billingAsShipping && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Field, {
      className: `${inputClassName} billing-fullname`,
      name: "billing_address.full_name",
      id: "billing_address.full_name",
      component: InputField,
      type: "text",
      label: text.fullName,
      validate: [validateRequired]
    }), /*#__PURE__*/React.createElement(Field, {
      className: `${inputClassName} billing-address1`,
      name: "billing_address.address1",
      id: "billing_address.address1",
      component: InputField,
      type: "text",
      label: text.address1,
      validate: [validateRequired]
    }), /*#__PURE__*/React.createElement(Field, {
      className: `${inputClassName} billing-address2`,
      name: "billing_address.address2",
      id: "billing_address.address2",
      component: InputField,
      type: "text",
      label: `${text.address2} (${text.optional})`
    }), /*#__PURE__*/React.createElement(Field, {
      className: `${inputClassName} billing-postalcode`,
      name: "billing_address.postal_code",
      id: "billing_address.postal_code",
      component: InputField,
      type: "text",
      label: `${text.postal_code} (${text.optional})`
    }), /*#__PURE__*/React.createElement(Field, {
      className: `${inputClassName} billing-phone`,
      name: "billing_address.phone",
      id: "billing_address.phone",
      component: InputField,
      type: "text",
      label: `${text.phone} (${text.optional})`
    }), /*#__PURE__*/React.createElement(Field, {
      className: `${inputClassName} billing-company`,
      name: "billing_address.company",
      id: "billing_address.company",
      component: InputField,
      type: "text",
      label: `${text.company} (${text.optional})`
    }))), /*#__PURE__*/React.createElement("div", {
      className: "checkout-button-wrap"
    }, /*#__PURE__*/React.createElement("button", {
      type: "submit",
      disabled: submitting || processingCheckout || invalid || initialValues.shipping_method_id === null || initialValues.payment_method_id === null,
      className: `${buttonClassName}${processingCheckout ? " is-loading" : ""}`
    }, showPaymentForm ? text.next : text.orderSubmit))));
  }

}

export default reduxForm({
  form: "CheckoutStepShipping",
  enableReinitialize: true,
  keepDirtyOnReinitialize: false
})(CheckoutStepShipping);