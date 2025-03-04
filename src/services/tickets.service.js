import ticketModel from "../models/ticket.model.js";

const getTickets = async () => {
    return await ticketModel.find();
};

const createTicket = async ({ amount, purchaser }) => {
    try {
        const newTicket = await ticketModel.create({
            amount,
            purchaser
        });
        return newTicket;
    } catch (error) {
        console.error("Error al crear el ticket:", error);
        throw new Error("No se pudo generar el ticket");
    }
};

const getTicketById = async (id) => {
    return await ticketModel.findById(id);
};

export default { getTickets, createTicket, getTicketById };