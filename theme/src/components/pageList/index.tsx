import React,{useState,useEffect} from 'react';
import api from '../../lib/api';
import PageList from './list';

 const CustomPageList = (props) => {
	const [pages, setPages] = ([])
	useEffect(() => fetchData(props),[])

	componentWillReceiveProps(nextProps) {
		fetchData(nextProps);
	}

	fetchData = ({ tags, sort }) => {
		const filter = {
			tags,
			sort
		};

		api.ajax.pages.list(filter).then(({ status, json }) => {
			this.setState({
				pages: json
			});
		});
	};

		const { pages } = this.state;
		return <PageList pages={pages} />;
	}
}
export default CustomPageList