import React from 'react'
import { useLocation, Link } from 'react-router-dom'

function Pagination(props) {

    const { pathname, search } = useLocation()
    const query = new URLSearchParams(search)

    const { total, limit, currentPage } = props.pages
    const totalPage = Math.ceil(total / limit)

    function formatURL(page) {
        query.set("page", page)
        return `${pathname}?${query.toString()}`
    }

    function renderPage() {
        const pagesHtml = []
        const delta = 2
        const left = currentPage - delta
        const right = currentPage + delta

        for (let i = 1; i <= totalPage; i++) {
            if (i === currentPage || (i >= left && i <= right)) {
                pagesHtml.push(i)
            }
        }
        return pagesHtml
    }

    return (
        <>
            <ul className="pagination">
                <li className="page-item">
                    <Link
                        // Thay cho if ? :
                        // to={hasPrev && formatURL(prev)}
                        to={formatURL(1)}
                        className="page-link"
                        // disabled={currentPage <= 1}
                    >
                        Trang đầu
                    </Link>
                </li>
                {currentPage !== 1 && <li className={"page-item"}>
                    <a className="page-link">
                        ...
                    </a>
                </li>}

                {renderPage().map((item, index) => {
                    return (
                        <li className={`page - item ${currentPage === item ? "active" : ""} `} key={index}>
                            <Link className="page-link" to={formatURL(item)}>
                                {item}
                            </Link>
                        </li>
                    )
                })}
                {currentPage !== totalPage && <li className="page-item">
                    <a className="page-link">
                        ...
                    </a>
                </li>}
                <li className="page-item">
                    <Link
                        to={formatURL(totalPage)}
                        className="page-link"
                        // disabled={currentPage >= totalPage}
                    >
                        Trang cuối
                    </Link>
                </li>
            </ul>
        </>
    )
}

export default Pagination
