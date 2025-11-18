import { Router, type Request, type Response } from "express";
import { CustomerService } from "./service.ts";

const customerRouter: Router = Router();

customerRouter.get("/", (req: Request, res: Response) => {
  const customers = new CustomerService().query();

  return res.send({
    customers,
  });
});

customerRouter.post("/", async (req: Request, res: Response) => {
  console.log(req.body);
  const { customer } = req.body;

  const result = new CustomerService().add(customer);

  // Save the response for idempotency middleware
  if (
    res.locals &&
    typeof res.locals.__saveIdempotencyResponse === "function"
  ) {
    await res.locals.__saveIdempotencyResponse({
      status: 201,
      body: result,
    });
  }

  return res.send({
    customer: { ...result },
  });
});

customerRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { customer } = req.body;

    const result = new CustomerService().update(id as string, customer);

    return res.send({
      customer: { ...result },
    });
  } catch (error) {
    res.sendStatus(500);
  }
});

customerRouter.delete("/:id", (req: Request, res: Response) => {
  try {
    return res.send({
      customers: [{ name: "Test Customer" }],
    });
  } catch (error) {
    res.sendStatus(500);
  }
});

export default customerRouter;
