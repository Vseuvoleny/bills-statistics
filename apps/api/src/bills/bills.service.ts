import { Injectable, Logger } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from './entities/bill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BillsService {
  private readonly logger = new Logger(BillsService.name);

  constructor(
    @InjectRepository(Bill)
    private readonly billsRepository: Repository<Bill>,
  ) {}
  async create(createBillDto: CreateBillDto) {
    this.logger.log('Create Bills');
    try {
      const bill = this.billsRepository.create({
        ...createBillDto,
        consumption:
          createBillDto.consumption === null
            ? null
            : String(createBillDto.consumption),
        amount: String(createBillDto.amount),
        debt: createBillDto.debt === null ? null : String(createBillDto.debt),
      });

      const result = await this.billsRepository.save(bill);
      this.logger.log('Saved bill:', result);
      return result;
    } catch (error) {
      this.logger.error('Error happened', error);
      throw error;
    }
  }

  async findAll() {
    try {
      this.logger.log('Geting All Bills');
      return await this.billsRepository.find();
    } catch (error) {
      this.logger.error('Get an error', error);
    }
  }

  async findOne(id: string) {
    try {
      this.logger.log(`Looking for bill with ${id}`);
      const result = await this.billsRepository.findBy({ id });
      if (result) {
        return result;
      }
    } catch (error) {
      this.logger.error('Get an error', error);
    }
  }

  async update(id: string, updateBillDto: UpdateBillDto) {
    try {
      this.logger.log(`Looking for bill with ${id}`);
      const result = await this.billsRepository.findOneBy({ id });
      const newResult = { ...result, ...updateBillDto } as Bill;
      const res = await this.billsRepository.save(newResult);
      this.logger.log(`Save as`, res);
      return res;
    } catch (error) {
      this.logger.error('Get an error', error);
    }
  }

  async remove(id: string) {
    try {
      this.logger.log(`Looking for bill with ${id}`);
      const bill = await this.billsRepository.findOneBy({ id });
      if (bill) {
        await this.billsRepository.remove(bill);
        return { deleted: true };
      }
    } catch (error) {
      this.logger.error('Get an error', error);
    }
  }
}
