import React from 'react'
import ProductItem from '../../Shared/Components/ProductItem'
import { getProducts } from '../../Services/Api'

function Home() {

    const [productNews, setProductNews] = React.useState([])
    const [productFeature, setProductFeature] = React.useState([])

    React.useEffect(() => {
        getProducts({ params: { limit: 6 } }).then((res) => {
            setProductNews(res.data.data.docs)
        })

        getProducts({ params: { limit: 6, "filter[is_featured]": true } }).then((res) => {
            setProductFeature(res.data.data.docs)
        })

    }, [])

    return (
        <>
            {/* Feature Product */}
            <div className="products">
                <h3>Sản phẩm nổi bật</h3>
                <div className="product-list card-deck">
                    {productFeature.map((product) => {
                        return <ProductItem key={product._id} item={product} />
                    })}
                </div>
            </div>
            {/* End Feature Product */}

            {/* Latest Product */}
            <div className="products">
                <h3>Sản phẩm mới</h3>
                <div className="product-list card-deck">
                    {productNews.map((product) => {
                        return <ProductItem key={product._id} item={product} />
                    })}
                </div>
            </div>
            {/* End Latest Product */}
        </>
    )
}

export default Home
