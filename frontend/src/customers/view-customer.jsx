import React, { useEffect, useState } from "react";
import { Link, useNavigate, useNavigation, useParams } from "react-router-dom";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { v4 as uuid } from "uuid";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const Viewcustomer = () => {
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

  return (
    <div>
      <Card>
        <CardHeader>
          <CardHeader className="text-left hover:underline">
            <Link to="/customers">Back</Link>
          </CardHeader>
          <CardTitle>Customer: {customer?.name}</CardTitle>
          <CardDescription>Details of the customer</CardDescription>
          <CardAction>
            <Button>
              <Link to={"edit"}>Edit Customer</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="space-y-8 text-left [&>p]:border [&>p]:rounded-lg [&>p]:p-4">
            <p>Address: {customer?.address}</p>
            <p>Tax Number: {customer?.taxNumber}</p>
            <p>Customer Type: {customer?.type}</p>
            <p>
              Status:{" "}
              {customer?.active ? (
                <span className="text-green-500">Active</span>
              ) : (
                <span className="text-red-500">InActive</span>
              )}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Viewcustomer;
