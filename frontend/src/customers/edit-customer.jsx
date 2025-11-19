import React, { useEffect, useState } from "react";
import Createcustomer from "./create-customer";
import { useParams } from "react-router-dom";
import { uuid } from "zod";
import { toast } from "sonner";

const Editcustomer = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState();

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const result = await fetch(
          `${import.meta.env.VITE_BASE_URL}/customers/${id}`,
          {
            headers: { "Idempotency-Key": uuid() },
          }
        );

        const { customer } = await result.json();

        setCustomer(customer);
      } catch (error) {
        console.log(error);

        toast.error("Error occurred fetching customer");
      }
    };

    fetchCustomer();
  }, [id]);

  return <div>{customer && <Createcustomer customer={customer} />}</div>;
};

export default Editcustomer;
