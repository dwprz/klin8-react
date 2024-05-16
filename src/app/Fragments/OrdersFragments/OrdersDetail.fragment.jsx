/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import convertToFormattedDate from "../../../helpers/convert-to-formated-date.helper";

function OrderDetail(props) {
  const [currentStatus, setCurrentStatus] = useState(null);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    setOrder(props.order);
  }, [props]);

  useEffect(() => {
    if (order) {
      const status = order.statuses.find((status) => status.isCurrentStatus);
      setCurrentStatus(status.statusName);
    }
  }, [order]);

  return (
    order && (
      <div className="flex flex-col justify-between mt-24">
        <div>
          <div className="px-10 sm:px-14 xl:px-24 text-sm text-gray-800">
            <p className="font-bold">{order.customerName}</p>
            <p className="mt-2">
              <i className="fa-solid fa-box me-2"></i>
              {order.itemName} ({order.quantity})
            </p>
            <p>
              <i className="fa-solid fa-cash-register me-2"></i>{" "}
              {order.totalPrice.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>

            <p>
              <i className="fa-solid fa-calendar-days me-2"></i>{" "}
              {convertToFormattedDate(order.createdAt)}
            </p>

            <p>
              <i className="fa-solid fa-house-chimney-user me-2"></i>
              {order.address ? order.address : "-"}
            </p>
          </div>

          {/* Status Detail */}
          <div className="px-5 sm:px-9 xl:px-[4.7rem] mt-10">
            {order.statuses.map((status, index) => {
              return (
                <div key={index} className="flex">
                  <div className="flex flex-col items-center h-[7rem] w-[4rem] overflow-hidden mt-[0.2rem]">
                    <div
                      className={`${
                        order.statuses.findIndex(
                          (status) => status.statusName === currentStatus
                        ) +
                          1 >
                        index
                          ? "bg-primary"
                          : "bg-gray-600"
                      } px-2 py-2 rounded-full z-10`}
                    ></div>
                    {order.statuses.length - 1 > index && (
                      <div
                        className={`${
                          order.statuses.findIndex(
                            (status) => status.statusName === currentStatus
                          ) > index
                            ? "border-primary"
                            : "border-gray-600"
                        } border-t w-[7rem] rotate-90 translate-y-10`}
                      ></div>
                    )}
                  </div>
                  <div
                    className={
                      order.statuses.findIndex(
                        (status) => status.statusName === currentStatus
                      ) +
                        1 >
                      index
                        ? "text-primary"
                        : "text-gray-600"
                    }
                  >
                    {status.date && (
                      <p>{convertToFormattedDate(status.date)}</p>
                    )}
                    <div className="flex items-center gap-4 h-max">
                      <i className={`${status.icon} text-2xl`}></i>
                      <p className="text-xs">{status.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
  );
}

export default OrderDetail;