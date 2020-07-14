import React from 'react'
import { Link } from 'react-router-dom'

function Menu({ data }) {
    //  console.log(data)

    return (
        <>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <nav>
                        <div id="menu" className="collapse navbar-collapse">
                            <ul>
                                {data.map((item) => {
                                    return (
                                        <li className="menu-item" key={item._id}>
                                            <Link to={`/category-${item._id}`}>{item.name}</Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}

// Truyền props mặc định cho component
Menu.defaultProps = {
    data: []
}

export default Menu
