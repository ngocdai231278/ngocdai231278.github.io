import React from 'react'
import { getProduct, getProductComment, addCommentsProduct } from '../../Services/Api'
import { getImageProduct } from '../../Shared/Utils/index'
import Moment from 'moment'

function ProductDetail(props) {

    const id = props.match.params.id

    const [product, setProduct] = React.useState({})
    const [comments, setComments] = React.useState([])
    const [inputComments, setInputComments] = React.useState({})

    const getComment = () => {
        getProductComment(id, { params: { sort: "-_id" } }).then((res) => {
            setComments(res.data.data.docs)
            // console.log(res.data.data.docs)
        })
    }

    React.useEffect(() => {
        getProduct(id).then((res) => {
            setProduct(res.data.data)
            // console.log(res.data.data)
        }).catch(() => {
            props.history.push("/404")
        })

        getComment()

    }, [id])

    const onChangeInput = (event) => {
        const { name, value } = event.target

        setInputComments({ ...inputComments, [name]: value })
    }

    const onSubmitAddComments = (event) => {
        event.preventDefault()
        addCommentsProduct(id, inputComments).then((res) => {
            getComment()
        })
    }

    return (
        <>
            {/* List Product */}
            <div id="product">
                <div id="product-head" className="row">
                    <div id="product-img" className="col-lg-6 col-md-6 col-sm-12">
                        <img src={getImageProduct(product.image)} />
                    </div>
                    <div id="product-details" className="col-lg-6 col-md-6 col-sm-12">
                        <h1>{product.name}</h1>
                        <ul>
                            <li><span>Đi kèm:</span> {product.accessories} </li>
                            <li><span>Tình trạng:</span> {product.status} </li>
                            <li><span>Khuyến mại:</span> {product.promotion} </li>
                            <li id="price">Giá Bán (chưa bao gồm VAT)</li>
                            <li id="price-number"> {product.price} đ </li>
                            <li id="status">
                                {product.is_stock ? (<span className="badge badge-success" >Còn hàng</span>) : (<span className="badge badge-default" >Hết hàng</span>)}
                            </li>
                        </ul>
                        {product.is_stock ? (<div id="add-cart"><a href="#">Mua ngay</a></div>) : ("")}
                    </div>
                </div>
                <div id="product-body" className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <h3> {product.name} </h3>
                        <p> {product.details} </p>
                    </div>
                </div>
                {/* Comment */}
                <div id="comment" className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <h3>Bình luận sản phẩm</h3>
                        <form method="post">
                            <div className="form-group">
                                <label>Tên:</label>
                                <input
                                    name="name"
                                    required type="text"
                                    className="form-control"
                                    value={inputComments.name}
                                    onChange={onChangeInput}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input
                                    name="email"
                                    required type="email"
                                    className="form-control"
                                    id="pwd"
                                    value={inputComments.email}
                                    onChange={onChangeInput}
                                />
                            </div>
                            <div className="form-group">
                                <label>Nội dung:</label>
                                <textarea
                                    name="content"
                                    required rows={8} className="form-control"
                                    defaultValue={""}
                                    value={inputComments.content}
                                    onChange={onChangeInput}
                                />
                            </div>
                            <button
                                type="submit"
                                name="sbm"
                                className="btn btn-primary"
                                onClick={onSubmitAddComments}
                            >Gửi</button>
                        </form>
                    </div>
                </div>
                {/*	End Comment	*/}
                {/*	Comments List	*/}
                <div id="comments-list" className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        {comments.map((comment, index) => {
                            return (
                                <div className="comment-item" key={index}>
                                    <ul>
                                        <li><b> {comment.name} </b></li>
                                        <li> {Moment(comment.createdAt).fromNow()} </li>
                                        <li> <p> {comment.content} </p> </li>
                                    </ul>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {/*	End Comments List	*/}
            </div>
            {/*	End Product	*/}
            <div id="pagination">
                <ul className="pagination">
                    <li className="page-item"><a className="page-link" href="#">Trang trước</a></li>
                    <li className="page-item active"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">Trang sau</a></li>
                </ul>
            </div>
        </>
    )
}

export default ProductDetail
