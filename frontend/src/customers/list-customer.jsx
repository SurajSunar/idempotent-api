import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

const CustomerListPage = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setError("");
        setIsLoading(true);

        const result = await fetch(
          `${import.meta.env.VITE_BASE_URL}/customers`,
          {
            headers: { "Idempotency-Key": 1 },
          }
        );

        const { customers } = await result.json();

        setCustomers(customers);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <h1>Customer List</h1>
        <Button className="cursor-pointer">
          <a href={"/customers/create"}> Add Customer</a>
        </Button>
      </div>

      <Table className="text-left">
        <TableCaption>List of customers</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>TaxNumber</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <>Loading...</>
          ) : (
            customers?.map((cust) => (
              <TableRow key={cust.name}>
                <TableCell className="font-medium">{cust.name}</TableCell>
                <TableCell>{cust.address}</TableCell>
                <TableCell>{cust.taxNumber}</TableCell>
                <TableCell className="capitalize">{cust.type}</TableCell>
                <TableCell>{cust.active ? "Active" : "Inactive"}</TableCell>
                <TableCell className="text-right">
                  <Button>
                    <a href={`/customers/${cust.id}`}>Edit</a>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
          {error && <div>{error}</div>}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomerListPage;
