import type { Customer } from "../type/customer.ts";
import { v4 as uuidv4 } from "uuid";

let customers: Customer[] = [];

export class CustomerService {
  query() {
    return customers;
  }

  getbyId(id: string) {
    return customers.find((row) => row.id === id);
  }

  add(customer: Partial<Customer>) {
    customer.id = uuidv4();
    const newCustomer = { ...customer, id: uuidv4() } as Customer;
    customers.push(newCustomer);

    return newCustomer;
  }

  update(id: string, customer: Partial<Customer>) {
    const index = customers.findIndex((row) => row.id === id);

    if (index < 0) {
      throw new Error(`ID ${id} doesnot exist`);
    }

    customers[index] = { ...customers[index], ...customer } as Customer;
    return customers[index];
  }

  delete(id: string) {
    const index = customers.findIndex((row) => row.id === id);

    if (index < 0) {
      throw new Error(`ID ${id} doesnot exist`);
    }

    const deleteCustomer = customers[index];
    customers = customers.splice(index, 1);
    return deleteCustomer;
  }
}
