import TicketsRepository from "../repository/tickets.repository.js";

const getTickets = async () => {
    return await TicketsRepository.getTickets();
};

const getTicketById = async (ticketId) => {
    return await TicketsRepository.getTicketById(ticketId);
};

const createTicket = async ({ amount, purchaser }) => {
    try {
        const newTicket = await TicketsRepository.createTicket({
            amount,
            purchaser,
        });
        return newTicket;
    } catch (error) {
        console.error("Error al crear el ticket:", error);
        throw new Error("No se pudo generar el ticket");
    }
};

export default { getTickets, getTicketById, createTicket };