import React from "react";
import api from "../../lib/api";
import PageList from "./list";

class CustomPageList extends React.Component {
  constructor(props) {
    super(props);

    this.fetchData = ({
      tags,
      sort
    }) => {
      const filter = {
        tags,
        sort
      };
      api.ajax.pages.list(filter).then(({
        status,
        json
      }) => {
        this.setState({
          pages: json
        });
      });
    };

    this.state = {
      pages: []
    };
  }

  componentDidMount() {
    this.fetchData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchData(nextProps);
  }

  render() {
    const {
      pages
    } = this.state;
    return /*#__PURE__*/React.createElement(PageList, {
      pages: pages
    });
  }

}

export default CustomPageList;