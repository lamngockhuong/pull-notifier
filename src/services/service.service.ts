import { PrismaClient, Service } from '@prisma/client';

class ServiceService {
  public services = new PrismaClient().service;

  public async findServiceByKey(key: string): Promise<Service> {
    const findService: Service = await this.services.findUnique({ where: { service_key: key } });
    return findService;
  }
}

export default ServiceService;
