import supertest from "supertest";
import { logger } from "../src/application/logging";
import { web } from "../src/application/web";
import { AddressTest, ContactTest, UserTest } from "./test-util";

describe("POST /api/contacts/:contactId/addresses", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to create new address", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set("X-API-TOKEN", `test`)
      .send({
        street: "Jl. Jendral Sudirman",
        city: "Jakarta",
        province: "DKI Jakarta",
        country: "Indonesia",
        postal_code: "12345",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.street).toBe("Jl. Jendral Sudirman");
    expect(response.body.data.city).toBe("Jakarta");
    expect(response.body.data.province).toBe("DKI Jakarta");
    expect(response.body.data.country).toBe("Indonesia");
    expect(response.body.data.postal_code).toBe("12345");
  });
  it("should reject create new address if request is invalid", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set("X-API-TOKEN", `test`)
      .send({
        street: "Jl. Jendral Sudirman",
        city: "Jakarta",
        province: "DKI Jakarta",
        country: "",
        postal_code: "",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
  it("should reject create new address if contact not found", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .post(`/api/contacts/${contact.id + 1}/addresses`)
      .set("X-API-TOKEN", `test`)
      .send({
        street: "Jl. Jendral Sudirman",
        city: "Jakarta",
        province: "DKI Jakarta",
        country: "Indonesia",
        postal_code: "23413",
      });

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:contactId/addresses/:addressId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
    await AddressTest.create();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to get address", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await supertest(web)
      .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set("X-API-TOKEN", `test`);
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.street).toBe(address.street);
    expect(response.body.data.city).toBe(address.city);
    expect(response.body.data.province).toBe(address.province);
    expect(response.body.data.country).toBe(address.country);
    expect(response.body.data.postal_code).toBe(address.postal_code);
  });

  it("should reject get address if is addressId not found", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await supertest(web)
      .get(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
      .set("X-API-TOKEN", `test`);
    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
  it("should reject get address if is contactId not found", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await supertest(web)
      .get(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
      .set("X-API-TOKEN", `test`);
    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

describe("PUT /api/contacts/:contactId/addresses/:addressId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
    await AddressTest.create();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to update address", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await supertest(web)
      .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "Jl. Haji Ahmad",
        city: "Sorong",
        province: "Papua",
        country: "Indonesia Merdeka",
        postal_code: "9623",
      });
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.street).toBe("Jl. Haji Ahmad");
    expect(response.body.data.city).toBe("Sorong");
    expect(response.body.data.province).toBe("Papua");
    expect(response.body.data.country).toBe("Indonesia Merdeka");
    expect(response.body.data.postal_code).toBe("9623");
  });
  it("should reject update address if is addressId not found", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await supertest(web)
      .put(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "Jl. Haji Ahmad",
        city: "Sorong",
        province: "Papua",
        country: "Indonesia Merdeka",
        postal_code: "9623",
      });
    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
  it("should reject update address if is bad request", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await supertest(web)
      .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "Jl. Haji Ahmad",
        city: "Sorong",
        province: "",
        country: "Indonesia Merdeka",
        postal_code: "9623",
      });
    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});

describe("DELETE /api/contacts/:contactId/addresses/:addressId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
    await AddressTest.create();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to delete address", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await supertest(web)
      .delete(`/api/contacts/${contact.id}/addresses/${address.id}`)
      .set("X-API-TOKEN", "test");
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK");
  });
  it("should reject delete address if is addressId not found", async () => {
    const contact = await ContactTest.get();
    const address = await AddressTest.get();
    const response = await supertest(web)
      .delete(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
      .set("X-API-TOKEN", "test");
    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:contactId/addresses/", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
    await AddressTest.create();
  });

  afterEach(async () => {
    await AddressTest.deleteAll();
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to list addresses", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .get(`/api/contacts/${contact.id}/addresses`)
      .set("X-API-TOKEN", "test");
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
  });
  it("should reject list addresses if is contactId not found", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .get(`/api/contacts/${contact.id + 1}/addresses`)
      .set("X-API-TOKEN", "test");
    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});
