import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient {

    constructor() {
        super()
        this.connect()
    }
    connect() {
        this.$connect
        console.log('Connected to database')
    }
    disconnect() {
        this.$disconnect
        console.log('Disconnected from database')
    }
}
