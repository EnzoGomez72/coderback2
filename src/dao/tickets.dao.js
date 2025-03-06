import ticketModel from "../models/ticket.model.js";

export default class TicketsDao {
    static async find() {
        return await ticketModel.find();
    }

    static async findById(ticketId) {
        return await ticketModel.findById(ticketId);
    }

    static async create(ticket) {
        return await ticketModel.create(ticket);
    }
}