import React from 'react'
import { getCategory, getProductsCategory } from '../../Services/Api'
import ProductItem from '../../Shared/Components/ProductItem'

function Category(props) {

    // Lấy id bằng params
    const id = props.match.params.id

    const [category, setCategory] = React.useState({})
    const [products, setProducts] = React.useState([])
    const [totalProducts, setTotalProducts] = React.useState(0)

    React.useEffect(() => {
        getCategory(id).then(({ data }) => {
            if (data && !data.data) return props.history.push("/404")
            getProductsCategory(id, { params: { limit: 12 } }).then(({ data }) => {
                setProducts(data.data.docs)
                // Dùng option chaining
                setTotalProducts(data?.data?.items?.total)
            })

            // Lấy ra name
            setCategory(data.data)
        }).catch((err) => props.history.push("/404"))
    }, [id])

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
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" href="#">Trang trước</a></li>
                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">Trang sau</a></li>
                    </ul>
                </div>
            </div>

        </>
    )
}

export default Category
