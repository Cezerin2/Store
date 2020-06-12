import React, { useEffect, useState } from "react"
import api from "../../lib/api"
import PageList from "./list"

const CustomPageList = props => {
  const [pages, setPages] = useState([])

  useEffect(() => {
    fetchData(props)
  }, [])

  //componentWillReceiveProps(nextProps) {
  useEffect(
    nextProps => {
      fetchData(nextProps)
    },
    [props]
  )

  const fetchData = ({ tags, sort }) => {
    const filter = {
      tags,
      sort,
    }

    api.ajax.pages.list(filter).then(({ status, json }) => {
      setPages(json)
    })
  }

  return <PageList pages={pages} />
}

export default CustomPageList
