import React from 'react'
import { getCategory, getProductsCategory } from '../../Services/Api'
import ProductItem from '../../Shared/Components/ProductItem'
import Pagination from '../../Shared/Components/Pagination'

function Category(props) {
    // Lấy id bằng params
    const id = props.match.params.id

    const [category, setCategory] = React.useState({})
    const [products, setProducts] = React.useState([])
    const [totalProducts, setTotalProducts] = React.useState(0)
    
    // Pagination
    const query = new URLSearchParams(props.location.search)

    const [pages, setPages] = React.useState({
        limit: 12,
        total: 0,
    })

    const page = query.get("page") || 1

    React.useEffect(() => {
        getCategory(id).then(({ data }) => {
            if (data && !data.data) return props.history.push("/404")
            getProductsCategory(id, {
                 params: { 
                        limit: 12,
                        page: page
                    } 
                }).then(({ data }) => {
                setProducts(data.data.docs)
                // Dùng option chaining
                setTotalProducts(data?.data?.items?.total)

                setPages({ ...pages, ...data.data.pages })
            })

            // Lấy ra name
            setCategory(data.data)
        }).catch((err) => props.history.push("/404"))
    }, [id, page])

    return (
        <>
            <div>
                {/*	List Product	*/}
                <div className="products">
                    <h3>{category.name} (hiện có {totalProducts} sản phẩm)</h3>
                    <div className="product-list card-deck">
                        {products.map((product) => {
                            return <ProductItem key={product._id} item={product} />
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

export default Category
