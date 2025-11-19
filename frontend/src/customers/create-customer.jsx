import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuid } from "uuid";
("uuid");

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const idempotencyId = uuid();

const formSchema = z
  .object({
    name: z
      .string()
      .min(1, {
        message: "Field is required",
      })
      .max(4, {
        message: "max of 4 characters",
      }),
    address: z
      .string()
      .min(1, {
        message: "Field is required",
      })
      .max(20, {
        message: "max of 20 characters",
      }),
    active: z.boolean(),
    taxNumber: z
      .string()
      .optional()
      .refine((value) => !value || value.length === 6, {
        message: "Length needs to be exact 6",
      }),
    type: z
      .string()
      .refine((value) => ["domestic", "international"].includes(value), {
        message: "Customer type is required",
      }),
  })
  .refine(
    (data) => {
      if (data.active && !data.taxNumber) {
        return false;
      }

      return true;
    },
    {
      message: "Taxnumber is required",
      path: ["taxNumber"],
    }
  );

const Createcustomer = ({ customer }) => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: customer
      ? { ...customer }
      : {
          name: "",
          taxNumber: "",
          active: false,
          address: "",
          type: "",
        },
  });

  // 2. Define a submit handler.
  async function onSubmit(values) {
    try {
      const result = await fetch(
        `${import.meta.env.VITE_BASE_URL}/customers${
          customer ? "/" + customer.id : ""
        }`,
        {
          method: customer ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            "Idempotency-Key": idempotencyId,
          },
          body: JSON.stringify({
            customer: { ...values, ...(customer && { id: customer.id }) },
          }),
        }
      );

      if (result.status === 400) {
        return result.json().then((errorData) => {
          toast.error(errorData.error || "Bad Request");
        });
      }

      await result.json();
      toast.success(
        customer
          ? `Customer "${values.name}" edited successfully.`
          : `Customer "${values.name}" created successfully.`
      );
      navigate("/customers");
    } catch (e) {
      toast.error("Error occurred:" + e);
    }
  }

  return (
    <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg text-left">
      <h1 className="text-2xl font-medium mb-8">
        {customer ? "Edit Customer Form" : "Create Customer Form"}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Customer name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="HQ address here..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Customer Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="domestic">Domestic</SelectItem>
                      <SelectItem value="international">
                        International
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="taxNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tax Number</FormLabel>
                <FormControl>
                  <Input placeholder="1234..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{customer ? "Save" : "Submit"}</Button>
        </form>
      </Form>
    </div>
  );
};

export default Createcustomer;
