import { Table } from 'react-bootstrap'
import {useSelector} from "react-redux";

export default function Cart(){

    let state = useSelector((state) => state)

    return (
        <div>
            <Table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>안녕</td>
                    <td>안녕</td>
                    <td>안녕</td>
                </tr>
                </tbody>
            </Table>
        </div>
    )
}
