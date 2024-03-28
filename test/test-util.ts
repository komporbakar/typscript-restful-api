import { Address, Contact, User } from "@prisma/client";
import bcrypt from "bcrypt";
import { prismaClient } from "../src/application/database";

export class UserTest {
  static async delete() {
    await prismaClient.user.deleteMany({
      where: {
        username: "test",
      },
    });
  }

  static async create() {
    await prismaClient.user.create({
      data: {
        username: "test",
        name: "test",
        password: await bcrypt.hash("rahasia", 10),
        token: "test",
      },
    });
  }

  static async get(): Promise<User> {
    const user = await prismaClient.user.findFirst({
      where: {
        username: "test",
      },
    });
    if (!user) {
      throw new Error("user not found");
    }
    return user;
  }
}

export class ContactTest {
  static async deleteAll() {
    await prismaClient.contact.deleteMany({
      where: {
        username: "test",
      },
    });
  }

  static async create() {
    await prismaClient.contact.create({
      data: {
        username: "test",
        first_name: "test",
        last_name: "test",
        email: "test@example.com",
        phone: "08123123",
      },
    });
  }

  static async get(): Promise<Contact> {
    const contact = await prismaClient.contact.findFirst({
      where: {
        username: "test",
      },
    });
    if (!contact) {
      throw new Error("contact not found");
    }
    return contact;
  }
}

export class AddressTest {
  static async deleteAll() {
    await prismaClient.address.deleteMany({
      where: {
        Contact: {
          username: "test",
        },
      },
    });
  }

  static async create() {
    const contact = await ContactTest.get();
    await prismaClient.address.create({
      data: {
        contact_id: contact.id,
        street: "test",
        city: "test",
        country: "test",
        postal_code: "test",
      },
    });
  }

  static async get(): Promise<Address> {
    const address = await prismaClient.address.findFirst({
      where: {
        Contact: {
          username: "test",
        },
      },
    });
    if (!address) {
      throw new Error("address not found");
    }
    return address;
  }
}
