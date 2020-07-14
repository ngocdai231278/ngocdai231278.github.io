import React from 'react'
import {getImageProduct} from '../Utils/index'
import {Link} from 'react-router-dom'

function ProductItem(props) {
    //console.log(props.item)
    return (
        <>
            <div className="product-item card text-center">
                <Link to={`/product-detail-${props.item._id}`}><img src={getImageProduct(props.item.image)} /></Link>
                <h4><Link to={`/product-detail-${props.item._id}`}>{props.item.name}</Link></h4>
                <p>Giá Bán: <span>{props.item.price}</span></p>
            </div>
        </>
    )
}

export default ProductItem
