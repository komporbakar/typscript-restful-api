import { Address, User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  AddressResponse,
  CreateAddressRequest,
  getAddressRequest,
  removeAddressRequest,
  toAddressResponse,
  UpdateAddressRequest,
} from "../model/address-model";
import { AddressValidation } from "../validation/address-validation";
import { Validation } from "../validation/validation";
import { ContactService } from "./contact-service";

export class AddressService {
  static async create(
    user: User,
    request: CreateAddressRequest
  ): Promise<AddressResponse> {
    const requestAddress = Validation.validate(
      AddressValidation.CREATE,
      request
    );

    await ContactService.checkContactMustExist(
      user.username,
      request.contact_id
    );
    const address = await prismaClient.address.create({
      data: requestAddress,
    });

    return toAddressResponse(address);
  }

  static async checkAddressId(
    addressId: number,
    contact_id: number
  ): Promise<Address> {
    const address = await prismaClient.address.findUnique({
      where: {
        id: addressId,
        contact_id: contact_id,
      },
    });

    if (!address) {
      throw new ResponseError(404, "address not found");
    }

    return address;
  }

  static async get(
    user: User,
    request: getAddressRequest
  ): Promise<AddressResponse> {
    const getRequest = Validation.validate(AddressValidation.GET, request);
    await ContactService.checkContactMustExist(
      user.username,
      getRequest.contact_id
    );
    const response = await this.checkAddressId(
      getRequest.id,
      getRequest.contact_id
    );
    return toAddressResponse(response);
  }

  static async update(
    user: User,
    request: UpdateAddressRequest
  ): Promise<AddressResponse> {
    const updateRequest = Validation.validate(
      AddressValidation.UPDATE,
      request
    );
    await ContactService.checkContactMustExist(
      user.username,
      updateRequest.contact_id
    );
    await this.checkAddressId(updateRequest.id, updateRequest.contact_id);

    const address = await prismaClient.address.update({
      where: {
        id: updateRequest.id,
      },
      data: updateRequest,
    });

    return toAddressResponse(address);
  }

  static async remove(
    user: User,
    request: removeAddressRequest
  ): Promise<AddressResponse> {
    const removeRequest = Validation.validate(
      AddressValidation.REMOVE,
      request
    );
    await ContactService.checkContactMustExist(
      user.username,
      removeRequest.contact_id
    );
    await this.checkAddressId(removeRequest.id, removeRequest.contact_id);

    const remove = await prismaClient.address.delete({
      where: {
        id: removeRequest.id,
      },
    });
    if (!remove) {
      throw new ResponseError(400, "address failed to remove");
    }
    return toAddressResponse(remove);
  }

  static async list(user: User, contactId: number): Promise<AddressResponse[]> {
    await ContactService.checkContactMustExist(user.username, contactId);

    const addresses = await prismaClient.address.findMany({
      where: {
        contact_id: contactId,
      },
    });

    return addresses.map((item) => toAddressResponse(item));
  }
}
