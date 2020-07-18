import React, { useState, useEffect } from 'react'
import { getProducts } from '../../Services/Api'
import ProductItem from '../../Shared/Components/ProductItem'
import Pagination from '../../Shared/Components/Pagination'

function Search(props) {
    // Lấy props do được bao bởi Route trong App.js
    
    // 1. Trong Header lấy giá trị trong thẻ input Search
    // 2. Đẩy giá trị lên query string
    // 3. Trong page Search lấy giá trị đó và gán trong params khi lấy API products
    // 4. Render mảng products
    // console.log(props)
    
    const query = new URLSearchParams(props.location.search)
    const q = query.get("q")

    const [products, setProducts] = useState([])

    // Pagination
    const [pages, setPages] = React.useState({
        limit: 12,
        total: 0,
    })
    const page = query.get("page") || 1

    useEffect(() => {
        getProducts({
            params: {
                name: q,
                limit: 12,
                page: page
            }
        }).then(({ data }) => {
            setProducts(data.data.docs)
            setPages({ ...pages, ...data.data.pages })
        })
    }, [q, page])

    return (
        <>
            <div>
                {/*	List Product	*/}
                <div className="products">
                    <div id="search-result">Kết quả tìm kiếm với từ khóa: <span>{q}</span></div>
                    <div className="product-list card-deck">
                        {products.map((product) => {
                            return (
                                <ProductItem key={product._id} item={product} />
                            )
                        })}
                    </div>
                </div>
                {/*	End List Product	*/}
                <div id="pagination">
                    <Pagination pages={pages} />
                </div>
            </div>
        </>
    )
}

export default Search
