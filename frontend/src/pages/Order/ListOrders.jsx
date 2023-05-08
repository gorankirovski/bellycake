import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import { MetaData, Loader } from "../../components/allComponents";

import { useDispatch, useSelector } from "react-redux";
import { myOrders, clearErrors } from "../../actions/orderActions";
import { toast } from "react-hot-toast";

import './ListOrder.css';

const ListOrders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(myOrders());

    if (error) {
      toast.error(error, {
        className: "myToast",
      });
      dispatch(clearErrors());
    }
  }, [dispatch, toast, error]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
          searchable: true,
        },
        {
          label: "Num of Items",
          field: "numOfItems",
          sort: "asc",
          searchable: true
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
          searchable: true
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
          searchable: true
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };
    console.log(data)
    if (!orders) {
      data.rows.push({
        id: 'Empty',
        numOfItems: '0',
        amount: 'Null',
        status: 'Null',
        actions: 'Null'
      })
      return data
    }

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status:
          order.orderStatus &&
          String(order.orderStatus).includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),
        actions: (
          <Link to={`/order/${order._id}`} className="viewOrderBtn">
            <i className="fa fa-eye"></i>
          </Link>
        ),
      });
    });

    return data;
  };

  return (
    <div className="myOrdersBox">
      <MetaData title={"My Orders"} />

      <h1 className="myOrdersHeader">My Orders</h1>

      {loading ? (
        <Loader />
      ) : (
        <MDBDataTable
          data={setOrders()}
          className="px-3 section__p1 per__order"
          bordered
          striped
          // hover
          responsive
          theadTextWhite
          tbodyTextWhite
          dark
          theadColor="#137a9c"
        />
      )}
    </div>
  );
};

export default ListOrders;
