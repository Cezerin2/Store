import React from "react";
import PropTypes from "prop-types";
import { themeSettings } from "../lib/settings";
import MetaTags from "../components/metaTags";
import PageList from "../components/pageList";

const PageContainer = props => {
  const {
    state: {
      pageDetails
    }
  } = props;
  const pageListTag = themeSettings.page_list_tag;
  const pageListTagDefined = pageListTag && pageListTag.length > 0;
  const pageListPath = pageListTagDefined ? `/${pageListTag}` : null;
  const showPageList = pageListTagDefined && pageDetails.path === pageListPath;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MetaTags, {
    title: pageDetails.meta_title,
    description: pageDetails.meta_description,
    canonicalUrl: pageDetails.url,
    ogType: "article",
    ogTitle: pageDetails.meta_title,
    ogDescription: pageDetails.meta_description
  }), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-content",
    dangerouslySetInnerHTML: {
      __html: pageDetails.content
    }
  }), showPageList && /*#__PURE__*/React.createElement(PageList, {
    tags: pageListTag,
    sort: "-date_created"
  })))));
};

PageContainer.propTypes = {
  state: PropTypes.shape({
    pageDetails: PropTypes.shape({})
  }).isRequired
};
export default PageContainer;