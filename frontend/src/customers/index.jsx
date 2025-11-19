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

        const result = await fetch("http://localhost:3000/customers", {
          headers: { "Idempotency-Key": 1 },
        });

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

      <Table>
        <TableCaption>List of customers</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="text-right">TaxNumber</TableHead>
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
                <TableCell className="text-right">{cust.taxNumber}</TableCell>
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
