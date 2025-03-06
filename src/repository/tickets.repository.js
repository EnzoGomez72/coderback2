import TicketsDao from "../dao/tickets.dao.js";

export default class TicketsRepository {
    static async getTickets() {
        return await TicketsDao.find();
    }

    static async getTicketById(ticketId) {
        return await TicketsDao.findById(ticketId);
    }

    static async createTicket(ticket) {
        return await TicketsDao.create(ticket);
    }
}