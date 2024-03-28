import supertest from "supertest";
import { logger } from "../src/application/logging";
import { web } from "../src/application/web";
import { ContactTest, UserTest } from "./test-util";

describe("POST /api/contacts", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to create new contact", async () => {
    const response = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", `test`)
      .send({
        first_name: "Arif",
        last_name: "Nurrohman",
        email: "arif@gmail.com",
        phone: "081263213",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.first_name).toBe("Arif");
    expect(response.body.data.last_name).toBe("Nurrohman");
    expect(response.body.data.email).toBe("arif@gmail.com");
    expect(response.body.data.phone).toBe("081263213");
  });
  it("should reject create new contact if request is invalid", async () => {
    const response = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", `test`)
      .send({
        first_name: "",
        last_name: "",
        email: "arif@gmail",
        phone: "08126321353244444444444444444444",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:contactsId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to get contact", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .get(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", `test`);

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.first_name).toBe(contact.first_name);
    expect(response.body.data.last_name).toBe(contact.last_name);
    expect(response.body.data.email).toBe(contact.email);
    expect(response.body.data.phone).toBe(contact.phone);
  });
  it("should reject get contact if is contactId is invalid", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .get(`/api/contacts/${contact.id + 1}`)
      .set("X-API-TOKEN", `test`);

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

describe("PUT /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to update contact", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .put(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", `test`)
      .send({
        first_name: "Hamid",
        last_name: "khanedy",
        email: "arif12@gmail.com",
        phone: "0812633213",
      });
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.first_name).toBe("Hamid");
    expect(response.body.data.last_name).toBe("khanedy");
    expect(response.body.data.email).toBe("arif12@gmail.com");
    expect(response.body.data.phone).toBe("0812633213");
  });

  it("should reject update contact if is contactId is invalid", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .put(`/api/contacts/${contact.id + 1}`)
      .set("X-API-TOKEN", `test`)
      .send({
        first_name: "Hamid",
        last_name: "khanedy",
        email: "arif12@gmail.com",
        phone: "0812633213",
      });
    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
  it("should reject update contact if request is invalid", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .put(`/api/contacts/${contact.id + 1}`)
      .set("X-API-TOKEN", `test`)
      .send({
        first_name: "",
        last_name: "",
        email: "arif12@gmail.com",
        phone: "0812633213",
      });
    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});

describe("DELETE /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to delete contact", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .delete(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", `test`);
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK");
  });
  it("should reject delete contact if is contactId is invalid", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .delete(`/api/contacts/${contact.id + 1}`)
      .set("X-API-TOKEN", `test`);
    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to get all contacts", async () => {
    const response = await supertest(web)
      .get("/api/contacts")
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

  it("should be able to get all contacts using name", async () => {
    const response = await supertest(web)
      .get("/api/contacts")
      .query({
        name: "es",
      })
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });
  it("should be able to get all contacts using email", async () => {
    const response = await supertest(web)
      .get("/api/contacts")
      .query({
        email: ".com",
      })
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

  it("should be able to get all contacts using phone", async () => {
    const response = await supertest(web)
      .get("/api/contacts")
      .query({
        phone: "08",
      })
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

  it("should be able name invalid", async () => {
    const response = await supertest(web)
      .get("/api/contacts")
      .query({
        name: "kuydasdas",
      })
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(0);
  });

  it("should be able search contact paging", async () => {
    const response = await supertest(web)
      .get("/api/contacts")
      .query({
        page: 2,
        size: 1,
      })
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(0);
    expect(response.body.paging.current_page).toBe(2);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(1);
  });
});
